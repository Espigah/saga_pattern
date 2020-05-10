payload
```
{
    "detail" : String
    "transaction_id": uuid
}
```

```
docker-compose exec kafka    bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_CREATE_EVENT"
```


```
docker-compose exec kafka    bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_CREATE_FAILURE_EVENT"
```

{"detail" : "String",    "transaction_id": "2"}