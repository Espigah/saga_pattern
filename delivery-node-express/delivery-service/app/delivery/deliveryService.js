import deliveryRepository from "./deliveryRepository.js";
import producer from "../message-broker/producer.js";
import infraService from "../infra/infraService.js";

export default {
  deliveryOrder(data) {
    if (!infraService.isDatabaseEnable()) {
      console.log("Database disabled");
      producer.sendFailure(data);
      return Promise.reject("Database disabled");
    }

    return deliveryRepository
      .save(data)
      .then((result) => {
        producer.sendSuccess({ ...data, result });
        return data;
      })
      .catch((err) => {
        let error = { ...data, err };
        producer.sendFailure(error);
        return Promise.reject(error);
      });
  },
};
