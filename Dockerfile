# Use lightweight Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory inside container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy entire project
COPY . .

# Expose port 8000
EXPOSE 8000

# Use Gunicorn to serve Django
# Replace 'backend' with your Django project folder name if different
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]