import client from "./client.js";

import infraService from "../infra/infraService.js";

const send = (topic, data) => {
  return new Promise((resolve, reject) => {
    console.log("[ producer::send ]", topic, data);

    if (!infraService.isBrokerEnable()) {
      console.log("[ producer::send ] disabled");
      return reject("Broker disabled");
    }

    try {
      client.connect().then((producer) => {
        console.log("[ producer::sending ]");
        producer.send([{ topic: topic, messages: data }], (err, data) => {
          if (err) {
            console.log("[ producer::send::err ]", err);
            return reject(err);
          }
          console.log("[ producer::send::ok ]", data);
          resolve(data);
        });
      });
    } catch (error) {
      console.log("[ producer::err ]", err);
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
    return send(process.env.TOPIC_INFRA, { who, where, what, value });
  },
};
