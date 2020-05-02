import client from "./client.js";

import infraService from "../infra/infraService.js";

const send = (topic, data) => {
  return new Promise((resolve, reject) => {
    console.log("[ Producer::send ]");

    if (!infraService.isBrokerEnable()) {
      console.log("[ Producer::send ] disabled");
      return reject("Broker disabled");
    }

    try {
      client.connect().then((producer) => {
        console.log("[ Producer::sending ]");
        producer.send([{ topic: topic, messages: data }], (err, data) => {
          if (err) {
            console.log("[ Producer::send::err ]", err);
            return reject(err);
          }
          console.log("[ Producer::send::ok ]", data);
          resolve(data);
        });
      });
    } catch (error) {
      console.log("[ send::Producer::err ]", err);
      reject(error);
    }
  });
};

export default {
  sendSuccess(data) {
    return send(process.env.TOPIC_SUCCESS, data);
  },
  sendFailure(data) {
    return send(process.env.TOPIC_FAILURE, data);
  },
  sendInfra({ where, who, what, value }) {
    return send(process.env.INFRA_EVENT, { who, where, what, value });
  },
};
