
# Use the official Python image from Docker Hub
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project to the container
COPY . .

# Expose the port that Flask will run on
EXPOSE 5000

# Command to run the Flask application
# CMD ["python3", "run.py"]
CMD ["python3", "run.py"]

