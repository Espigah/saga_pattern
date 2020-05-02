import client from "./client.js";



let consumerFailure = client.createConsumer(
  [{ topic: process.env.TOPIC_FAILURE, partition: 0 }],
  {
    autoCommit: true,
  }
);

let consumerTrigger = client.createConsumer(
  [{ topic: process.env.TOPIC_TRIGGER, partition: 0 }],
  {
    autoCommit: true,
  }
);

export default {
  observerFailure(action) {
    consumerFailure.on("message", function (message) {
      console.log("[consumer]", message);
      action(message);
    });
  },
  observerTrigger(action) {
    consumerTrigger.on("message", function (message) {
      console.log("[consumer]", message);
      action(message);
    });
  },
};
