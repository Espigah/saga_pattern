import client from "./client.js";

const createConsumer = (topic, action) => {
  const topicList = [{ topic: topic, partition: 0 }];
  const options = {
    autoCommit: true,
  };

  const callback = (message) => {
    console.log("[consumer]", message);
    action(message);
  };

  client.createConsumer(topicList, options, callback);
};

export default {
  observerFailure(action) {
    createConsumer(process.env.TOPIC_FAILURE, action);
  },
  observerTrigger(action) {
    createConsumer(process.env.TOPIC_TRIGGER, action);
  },
};
