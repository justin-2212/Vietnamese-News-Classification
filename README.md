# Vietnamese-News-Classification
An end-to-end Vietnamese news classification system built on a self-collected VNExpress dataset. This project benchmarks multiple machine learning and deep learning approaches, then deploys the best-performing fine-tuned PhoBERT model through a web-based demo.

## Features

- End-to-end Vietnamese news classification pipeline.
- Benchmarking of Naive Bayes, SVM, CNN, BiLSTM, and fine-tuned PhoBERT.
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
|--------|---------:|----------:|
| Naive Bayes | - | - |
| SVM | - | - |
| CNN | - | - |
| BiLSTM | - | - |
| **Fine-tuned PhoBERT** | **94.84%** | **0.798** |

PhoBERT achieved the best overall performance and was selected for deployment.

## Project Structure

```text
frontend/      React web application
backend/       FastAPI inference service
notebooks/     Model training and experiments
docs/          Project report
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

The fine-tuned PhoBERT model is not included in this repository because it exceeds GitHub's file size limit.
