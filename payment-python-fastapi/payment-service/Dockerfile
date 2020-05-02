FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

EXPOSE 80

COPY ./app /app

COPY ./requirements.txt /app/requirements.txt


RUN apt-get update \
    && apt-get clean \
    && pip install --upgrade pip

RUN pip install -r /app/requirements.txt \
    && rm -rf /root/.cache/pip