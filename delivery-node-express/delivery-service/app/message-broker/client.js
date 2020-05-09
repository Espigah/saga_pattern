import kafka from "kafka-node";

const url = process.env.MESSAGE_BROKER || "localhost:9092";
console.log("[ message-broker ]", url);
const kafkaClient = new kafka.KafkaClient({ kafkaHost: url });

let producerReady = new Promise((resolve, reject) => {
  let producer = new kafka.Producer(kafkaClient);
  producer.on("ready", function () {
    resolve(producer);
    console.log("[ producer::ready ]");
  });

  producer.on("error", function (err) {
    console.log("[ producer::error ]", err);
    reject(err);
  });
});

let createConsumer = (fetchRequests, options, callback) => {
  const consumerClient = new kafka.KafkaClient({ kafkaHost: url });

  let Consumer = kafka.Consumer;

  const create = () => {
    console.log("[ consumer::creating ] ", fetchRequests);
    let consumer = new Consumer(consumerClient, fetchRequests, options);
    consumer.on("error", (err) => {
      console.log("[ consumer::error ]", err);
      consumer.off("message", callback);
      setTimeout(create, 2000);
    });
    consumer.on("message", callback);
  };
  create();
};

export default {
  connect() {
    return producerReady;
  },
  createConsumer,
};
