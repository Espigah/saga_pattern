import deliveryModel from "./deliveryModel.js";
import database from "../database/index.js";

export default {
  save({ detail, transaction_id, status }) {
    return database.connect().then(() => {
      const orderModel = new deliveryModel({
        detail,
        transaction_id,
        status,
        timestamp: Date.now()
      });
      return orderModel.save();
    });
  },
};
