from kafka import KafkaConsumer, TopicPartition
import os
import json
import time


GROUP_ID = "KafkaConsumer-Python"


def observe(topicActionList):
    print("[ observe ]", topicActionList)
    try:

        topicActionMap = dict((x, y) for x, y in topicActionList)

        def tryconvert(value):
            try:
                return json.loads(value.decode('utf-8'))
            except:
                return {}

        consumer = KafkaConsumer(bootstrap_servers=os.getenv(
            "MESSAGE_BROKER", "localhost:9092"),
            value_deserializer=tryconvert,
            group_id=GROUP_ID,
            consumer_timeout_ms=100000,
            auto_commit_interval_ms=2000,
            enable_auto_commit=False)

        topicPartitionList = [TopicPartition(x[0], 0) for x in topicActionList]
        consumer.assign(topicPartitionList)

        def commit():
            print("[ observe::consumer::commit ]")
            consumer.commit()

        for msg in consumer:
            print("[ observe::consumer ]", msg)
            try:               
                action = topicActionMap.get(msg.topic)
                action(msg.value, commit)
            except Exception as e:
                print(msg, e)
                continue

    except Exception as e:
        print("[ observe:error ]", e)
        time.sleep(2000)
        observe(topicActionList)
        pass
