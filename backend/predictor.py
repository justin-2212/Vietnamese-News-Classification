import os
import time
import torch
from underthesea import word_tokenize
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# ============================================================================
# Category Mapping
# ============================================================================
# Maps label index to category name (must match training order)
LABEL_ID_TO_CATEGORY = {
    0: "bất động sản",
    1: "du lịch",
    2: "giáo dục",
    3: "giải trí",
    4: "góc nhìn",
    5: "khoa học công nghệ",
    6: "kinh doanh",
    7: "pháp luật",
    8: "sức khỏe",
    9: "thể thao",
    10: "thời sự",
    11: "tâm sự",
    12: "xe",
    13: "đời sống",
}

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

# ============================================================================
# Global Cache
# ============================================================================
_tokenizer = None
_model = None
_device = None


def get_model_and_tokenizer():
    """Lazy load model and tokenizer on first request."""
    global _tokenizer, _model, _device

    if _tokenizer is None or _model is None:
        _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load model first
        _model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_DIR,
            trust_remote_code=True,
            local_files_only=True,
        ).to(_device)
        _model.eval()

        # Load tokenizer
        _tokenizer = AutoTokenizer.from_pretrained(
            MODEL_DIR,
            trust_remote_code=True,
            local_files_only=True,
            use_fast=False,
        )
        
        # Set tokenizer max_length to match model's max_position_embeddings
        max_pos = _model.config.max_position_embeddings
        _tokenizer.model_max_length = max_pos

    return _tokenizer, _model, _device


def preprocess_text(text: str) -> str:
    """
    Preprocess Vietnamese text using word segmentation.
    
    This step is CRITICAL because PhoBERT was trained on word-segmented text:
        "đội_tuyển Việt_Nam giành chiến_thắng..."
    
    NOT on raw text:
        "đội tuyển Việt Nam giành chiến thắng..."
    
    Args:
        text: Raw Vietnamese text
        
    Returns:
        Word-segmented text with underscores (format="text")
    """
    text = str(text).strip()
    if not text:
        return ""
    
    # word_tokenize with format="text" returns underscore-separated tokens
    # Example: "Tôi yêu Việt Nam" -> "Tôi yêu Việt_Nam"
    segmented = word_tokenize(text, format="text")
    return segmented


def predict(text: str):
    """
    Classify Vietnamese text into one of 14 categories.
    
    Pipeline:
        1. Preprocess (word segmentation with Underthesea)
        2. Tokenize (PhoBERT tokenizer)
        3. Forward pass
        4. Softmax probabilities
        5. Return predictions
    
    Args:
        text: Raw Vietnamese text
        
    Returns:
        dict with keys: label, confidence, scores, processingTimeMs
    """
    start_time = time.time()
    
    # Get model and tokenizer
    tokenizer, model, device = get_model_and_tokenizer()
    
    # Step 1: Preprocess - word segmentation
    preprocessed_text = preprocess_text(text)
    
    # Step 2: Tokenize with PhoBERT tokenizer
    # CRITICAL: Must match training parameters exactly (max_length=256)
    inputs = tokenizer(
        preprocessed_text,
        return_tensors="pt",
        truncation=True,
        max_length=256,
        padding="max_length",
    ).to(device)
    
    # Debug: Print input shape to verify it matches training config
    print(f"Input shape: {inputs['input_ids'].shape}")
    
    # Step 3: Forward pass
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    
    # Step 4: Softmax to get probabilities
    probs = torch.softmax(logits, dim=-1)[0].cpu().numpy()
    
    # Step 5: Build results
    scores = {
        LABEL_ID_TO_CATEGORY[idx]: float(prob)
        for idx, prob in enumerate(probs)
    }
    
    # Find top prediction
    top_idx = probs.argmax()
    label = LABEL_ID_TO_CATEGORY[top_idx]
    confidence = float(probs[top_idx])
    
    processing_time = int((time.time() - start_time) * 1000)
    
    return {
        "label": label,
        "confidence": confidence,
        "scores": scores,
        "processingTimeMs": processing_time,
    }
