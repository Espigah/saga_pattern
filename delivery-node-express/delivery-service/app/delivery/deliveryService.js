import deliveryRepository from "./deliveryRepository.js";
import producer from "../message-broker/producer.js";
import infraService from "../infra/infraService.js";

export default {
  deliveryOrder({
    nome,
    order_id,
    payment_id,
    transaction_id,
    transaction_status,
  }) {
    if (!infraService.isDatabaseEnable()) {
      console.log("Database disabled");
      producer.sendFailure(data);
      return Promise.reject("Database disabled");
    }

    return deliveryRepository
      .save({
        nome,
        order_id,
        payment_id,
        transaction_id,
        transaction_status,
      })
      .then((data) => {
        producer.sendSuccess(data);
        return data;
      })
      .catch((err) => {
        producer.sendFailure(data);
        return Promise.reject(err);
      });
  },
};
