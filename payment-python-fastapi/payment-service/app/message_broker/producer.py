from kafka import KafkaProducer
import os
import json
import time

producer = None


def _createProducer():
    global producer
    if producer is not None:
        return producer

    try:
        producer = KafkaProducer(bootstrap_servers=os.getenv(
            "MESSAGE_BROKER", "localhost:9092"), value_serializer=lambda v: json.dumps(v).encode('utf-8'))

        return producer
    except Exception as e:
        print(e)
        time.sleep(2000)
        return _createProducer()


def send_success():
    print("producer:send_success")
    _createProducer().send(os.getenv("TOPIC_SUCCESS"), {'foo': 'bar'})


def send_failure():
    print("producer:send_failure")
    _createProducer().send(os.getenv("TOPIC_FAILURE"), {'foo': 'bar'})


def send_infra(where, who, what, value):
    return _createProducer().send(os.getenv("TOPIC_INFRA"), {'who': who, 'where': where, 'what': what, 'value': value})
