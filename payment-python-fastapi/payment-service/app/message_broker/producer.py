from kafka import KafkaProducer
import os
import json

producer = KafkaProducer(bootstrap_servers=os.getenv(
    "MESSAGE_BROKER", "localhost:9092"), value_serializer=lambda v: json.dumps(v).encode('utf-8'))




def send_success():
    print("producer:send_success")
    producer.send(os.getenv("TOPIC_SUCCESS"), {'foo': 'bar'})

def send_failure():
    print("producer:send_failure")
    producer.send(os.getenv("TOPIC_FAILURE"), {'foo': 'bar'})


 def send_infra(where, who, what, value):
    return send(os.getenv("TOPIC_INFRA"), { 'who':who, 'where':where, 'what':what, 'value':value });