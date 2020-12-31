# Use Python image
FROM python:3.6.1-alpine

# Add Alpine Lib-C and Git binaries
RUN apk update && apk upgrade && apk add gcc musl-dev libc-dev build-base git openssl-dev

# Add labels
LABEL MAINTAINER_NAME="Matthew Cale"  
LABEL MAINTAINER_EMAIL="mattc41190@gmail.com"

# Copy the dependency manifest to /app in the container
COPY ./requirements.txt /app/requirements.txt

# Set the WORKDIR to /app (all commands will be run from thsi context from here out)
WORKDIR /app

# Copy all file from diroectory to /app
COPY . /app

# Install requirements
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose ports
EXPOSE 5000
EXPOSE 80

# Create settable enviornment variables
ENV APP_ENV="development"
ENV APP_PORT="5000"

# Set the starting program to shell
ENTRYPOINT [ "sh" ]

# Run the start server command 
RUN echo ${APP_ENV} ${APP_PORT}
CMD [ "run.sh", "${APP_ENV} ${APP_PORT}"]