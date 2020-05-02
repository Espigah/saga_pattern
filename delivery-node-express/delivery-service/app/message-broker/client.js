import kafka from "kafka-node";

const url = process.env.MESSAGE_BROKER || "localhost:9092";
console.log("[ message-broker ]", url);
const kafkaClient = new kafka.KafkaClient({ kafkaHost: url });

let producerReady = new Promise((resolve, reject) => {
  let producer = new kafka.Producer(kafkaClient);
  producer.on("ready", function () {
    resolve(producer);
    console.log("[ :Producer::ready ] send");
  });

  producer.on("error", function (err) {
    console.log("[ :Producer:error ]", err);
    reject(err);
  });
});

export default {
  connect() {
    return producerReady;
  },
  createConsumer(fetchRequests, options) {
    let Consumer = kafka.Consumer;
    let consumer = new Consumer(kafkaClient, fetchRequests, options);
    return consumer;
  },
};
