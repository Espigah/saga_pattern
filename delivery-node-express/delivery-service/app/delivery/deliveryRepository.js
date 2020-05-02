import deliveryModel from "./deliveryModel.js";
import database from "../database/index.js";

export default {
  save({ nome, order_id, payment_id, transaction_id, transaction_status }) {
    return database.connect().then(() => {
      const orderModel = new deliveryModel({
        nome,
        order_id,
        payment_id,
        transaction_id,
        transaction_status,
      });
      return orderModel.save();
    });
  },
};
