FROM python:3.12-slim

# Avoid Python cache
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
COPY sample-log.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script
COPY log-parser.py .

# Default command (adjust if script uses CLI args)
ENTRYPOINT ["python", "log-parser.py"]

