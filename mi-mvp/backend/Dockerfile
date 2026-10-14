FROM python:3.13-slim AS base

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN uv pip install --system -r requirements.txt

# Copy application
COPY backend/main.py .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]