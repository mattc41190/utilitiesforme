# Use Python image
FROM python:3.6.1-alpine

# Try to get image ready???
RUN apk update && apk upgrade && apk add gcc musl-dev libc-dev libc6-compat linux-headers build-base git libffi-dev openssl-dev

# Add labels
LABEL MAINTAINER_NAME="Matthew Cale"  
LABEL MAINTAINER_EMAIL="mattc41190@gmail.com"

# Copy the dependency manifest to /app in the container
COPY ./requirements.txt /app/requirements.txt

# Set the WORKDIR to /app (all command will be run from thsi context from here out)
WORKDIR /app

# Copy all file from diroectory to /app
COPY . /app

# Install requirements
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port 5000
EXPOSE 5000

# Set the starting program to shell
ENTRYPOINT [ "sh" ]

# Run the start server command 
CMD [ "run_dev.sh" ]