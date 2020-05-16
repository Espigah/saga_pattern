![TOPOLOGY](./docs/saga.jpg)

# View

![view](./docs/saga_view.jpg)

# Flow

## Success

![Success flow](./docs/saga_SUCCESS.jpg)


## Error

![Error flow - payment error](./docs/saga_ERROR_1.jpg)

![Error flow - order error](./docs/saga_ERROR_2.jpg)

# LITTLE READ

https://cloudnweb.dev/2020/01/implementing-saga-pattern-in-nodejs-microservices/

https://blog.couchbase.com/saga-pattern-implement-business-transactions-using-microservices-part/

https://medium.com/@tomasz_96685/saga-pattern-and-microservices-architecture-d4b46071afcf

https://microservices.io/patterns/data/saga.html

https://livebook.manning.com/book/microservices-patterns/chapter-4/v-11/

# Utils

```
docker-compose exec kafka  \
  bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_CREATE_EVENT"
```

```
docker-compose exec kafka  \
  bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_BILLED_EVENT"
```

```
docker-compose exec kafka  \
  bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_BILLED_EVENT"
```

```
docker-compose exec kafka  \
  bash -c "kafka-console-producer.sh --broker-list localhost:9092 --topic ORDER_DELIVERED_FAILURE_EVENT"
```

