import kafka from "kafka-node";
const Consumer = kafka.Consumer;
const url = process.env.MESSAGE_BROKER || "localhost:9092";
console.log("[ message-broker ]", url);
let kafkaClient;

export default {
  connect() {
    console.log("[connect]");
    return new Promise((resolve, reject) => {
      const setup = () => {
        try {
          kafkaClient = new kafka.KafkaClient({ kafkaHost: url });
          console.log("[kafka::setup]");
          resolve(kafkaClient);
        } catch (error) {
          console.log("[kafka::error]", error);
          setTimeout(setup, 3000);
        }
      };
      setup();
    });
  },
  async createConsumer(fetchRequests, options) {
    return this.connect().then((kafkaClient) => {
      return new Promise((resolve, reject) => {
        const setup = () => {
          try {
            const consumer = new Consumer(kafkaClient, fetchRequests, options);
            console.log("[kafka::createConsumer]");

            let delayToReady = setTimeout(() => {
              console.log("[kafka::createConsumer] Ready");
              resolve(consumer);
            }, 1000);

            consumer.on("error", (e) => {
              clearTimeout(delayToReady);
              console.log("[kafka::createConsumer] error", e);
              setTimeout(setup, 3000);
            });
          } catch (error) {
            console.log("[kafka::error]", error);
            setTimeout(setup, 3000);
          }
        };
        setup();
      });
    });
  },
};
