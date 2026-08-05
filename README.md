# Vietnamese News Classification System

An end-to-end Vietnamese news classification system built on a self-collected VNExpress dataset. This project benchmarks multiple machine learning and deep learning approaches and deploys the best-performing fine-tuned PhoBERT model through a web-based demo.

## Features

- End-to-end Vietnamese news classification pipeline.
- Benchmarking of Naive Bayes, SVM, CNN, BiLSTM, and a fine-tuned PhoBERT model.
- Web application for real-time text classification.
- RESTful backend for model inference.

## Tech Stack

- **Language:** Python, TypeScript
- **Frontend:** React
- **Backend:** FastAPI
- **Machine Learning:** Scikit-learn, TensorFlow
- **Transformer:** PhoBERT
- **Version Control:** Git

## Experimental Results

| Model | Accuracy | Macro F1 |
|-------------------------|---------:|---------:|
| Naive Bayes | 88.01% | 0.600 |
| SVM | 94.45% | 0.792 |
| CNN (Single Kernel) | 92.52% | 0.698 |
| Multi-Kernel CNN | 92.99% | 0.710 |
| BiLSTM | 87.07% | 0.633 |
| **PhoBERT (Fine-tuned)** | **94.84%** | **0.798** |

The fine-tuned PhoBERT model achieved the best overall performance and was selected for deployment in the web application.

## Project Structure

```text
frontend/      React web application
backend/       FastAPI inference service
data/          Raw VNExpress dataset (.csv)
notebooks/     Model training and benchmarking
docs/          Project report
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- The `data/` directory contains the raw VNExpress dataset used for model training and evaluation.
- The fine-tuned PhoBERT model is not included in this repository because it exceeds GitHub's file size limit.
