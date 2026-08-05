import os
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predictor import predict

# ============================================================================
# Pydantic Models
# ============================================================================
class PredictRequest(BaseModel):
    text: str


class PredictionResponse(BaseModel):
    label: str
    confidence: float
    scores: dict
    timestamp: str
    processingTimeMs: int


# ============================================================================
# FastAPI Application
# ============================================================================
app = FastAPI(title="PhoBERT Classifier", version="1.0.0")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict", response_model=PredictionResponse)
async def predict_endpoint(request: PredictRequest):
    """
    Classify Vietnamese news text into one of 14 categories using PhoBERT.
    
    The model was trained on word-segmented text, so preprocessing with
    Underthesea is automatically applied.

    Request body:
        {
            "text": "Bài báo tiếng Việt cần phân loại..."
        }

    Returns:
        {
            "label": "khoa học công nghệ",
            "confidence": 0.95,
            "scores": {
                "bất động sản": 0.001,
                "du lịch": 0.002,
                ...
            },
            "timestamp": "2024-01-01T12:00:00Z",
            "processingTimeMs": 150
        }
    """
    result = predict(request.text)
    
    return PredictionResponse(
        label=result["label"],
        confidence=result["confidence"],
        scores=result["scores"],
        timestamp=datetime.utcnow().isoformat() + "Z",
        processingTimeMs=result["processingTimeMs"],
    )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "name": "PhoBERT Classifier",
        "version": "1.0.0",
        "endpoints": {
            "predict": "POST /predict",
            "health": "GET /health",
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
