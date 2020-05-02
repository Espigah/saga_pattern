import mongoose from "mongoose";

var Schema = mongoose.Schema;

var userDataSchema = new Schema(
  {
    nome: { type: String, required: true },
    order_id: { type: String, required: true },
    payment_id: { type: String, required: true },
    transaction_id: String,
    transaction_status: String,
  },
  { collection: "deliveries" }
);

var Order = mongoose.model("delivery", userDataSchema);

export default Order;
