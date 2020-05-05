import client from "./client.js";

const topics = process.env.OBSERVER.split(" ")
  .map((topic) => topic.trim().split(":"))
  .map((topic) => {
    return { topic: topic[0], partition: topic[1] || 0 };
  });

export default {
  create() {
    return client.createConsumer(topics, {
      autoCommit: false,
    });
  },
};
