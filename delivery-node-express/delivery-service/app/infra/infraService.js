import producer from "../message-broker/producer.js";

const INTERVAL = 3000;

let scope = {
  broker: {
    enable: true,
    timeout: null,
    producer(value) {
      producer.sendInfra({
        where: "DELIVERY_SERVICE",
        who: "BROKER",
        value: value,
      });
    },
  },
  database: {
    enable: true,
    timeout: null,
    producer(value) {
      producer.sendInfra({
        where: "DELIVERY_SERVICE",
        who: "DATABASE",
        value: value,
      });
    },
  },
};

const toggle = (data) => {
  if (data.enable) {
    data.producer(!data.enable);
  }
  data.enable = false;

  clearTimeout(data.timeout);
  data.timeout = setTimeout(() => {
    data.producer(!data.enable);
    data.enable = true;
  }, INTERVAL);
};

export default {
  isBrokerEnable() {
    return scope.broker.enable;
  },
  isDatabaseEnable() {
    return scope.database.enable;
  },
  disableBroker() {
    toggle(scope.broker);
  },
  disableDatabase() {
    toggle(scope.database);
  },
};
