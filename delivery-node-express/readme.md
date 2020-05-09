payload
```
{
    "detail" : String
    "transaction_id": uuid
}
```

```
docker-compose exec kafka    bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_BILLED_EVENT"
```

```
docker-compose exec kafka    bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_DELIVERED_FAILURE_EVENT"
```

