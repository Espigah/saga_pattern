from kafka import KafkaConsumer, TopicPartition
import os


def observe(topic, action):
    consumer = KafkaConsumer(bootstrap_servers=os.getenv(
        "MESSAGE_BROKER", "localhost:9092"), value_deserializer=lambda x: x.decode('utf-8'),  consumer_timeout_ms=1000000, enable_auto_commit=True)
    topicPartition = TopicPartition(topic, 0)
    consumer.assign([topicPartition])
    consumer.seek(topicPartition, 0)
    for msg in consumer:
        action(msg)
