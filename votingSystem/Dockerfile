# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Copy the Django project files into the container at /app
COPY . /app

# Install the Python dependencies
RUN pip install -r requirements.txt

# Expose the port that the app will run on
EXPOSE 8000

# Define the command to run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]