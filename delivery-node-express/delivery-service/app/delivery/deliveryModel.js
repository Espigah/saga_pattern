import mongoose from "mongoose";

var Schema = mongoose.Schema;

var userDataSchema = new Schema(
  {
    status: { type: String, required: true },
    detail: { type: String, required: true },
    transaction_id: { type: String, required: true },
    timestamp: Number
  },
  { collection: "deliveries" }
);

var Order = mongoose.model("delivery", userDataSchema);

export default Order;
