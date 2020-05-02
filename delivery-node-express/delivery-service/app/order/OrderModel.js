import mongoose from "mongoose";

var Schema = mongoose.Schema;

var userDataSchema = new Schema(
  {
    nome: { type: String, required: true },
    transaction_id: String,
    transaction_status: String,
  },
  { collection: "contatos" }
);

var Order = mongoose.model("Order", userDataSchema);

export default Order;
