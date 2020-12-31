# Use Python image
FROM python:3.6.1-alpine

# Add Alpine Lib-C and Git binaries
RUN apk update && apk upgrade && apk add gcc musl-dev libc-dev build-base git openssl-dev

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

# Create settable enviornment variables
ENV FLASK_ENV="development"

# Set the starting program to shell
ENTRYPOINT [ "sh" ]

# Run the start server command 
CMD [ "run.sh", "development", "5000"]