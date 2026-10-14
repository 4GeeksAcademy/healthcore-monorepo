# HealthCore services — incident FastAPI (8000)
FROM python:3.13-slim
ENV PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
RUN pip install uv
WORKDIR /services/incident-api
COPY services/incident-api/requirements.txt requirements.txt
RUN uv pip install --system -r requirements.txt
COPY services/incident-api app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
