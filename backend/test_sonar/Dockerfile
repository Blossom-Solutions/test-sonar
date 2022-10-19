# pull the official base image
FROM python:3.10.8-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

# set work directory
WORKDIR /usr/src/app/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip 
COPY ./requirements.txt /usr/src/app/backend
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/backend

EXPOSE 8000

RUN python manage.py initial_setup
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]