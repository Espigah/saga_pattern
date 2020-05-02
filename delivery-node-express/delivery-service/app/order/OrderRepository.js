import OrderModel from "./OrderModel.js";
import database from "../database/index.js";

export default {
  save({ nome, transaction_id, transaction_status }) {
    return database.connect().then(() => {
      const orderModel = new OrderModel({
        nome,
        transaction_id,
        transaction_status,
      });
      return orderModel.save();
    });
  },
};
