import OrderRepository from "./OrderRepository.js";

export default {
  save({ nome, transaction_id, transaction_status }) {
    return OrderRepository.save({ nome, transaction_id, transaction_status });
  },
};
