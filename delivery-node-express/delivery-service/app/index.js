//import "dotenv" from "dotenv";
import express from "express";
import consign from "consign";
import deliveryConsumer from "./delivery/deliveryConsumer.js";
import infraService from "./infra/infraService.js";

const app = express();

app.disable("x-powered-by");

consign({
  cwd: "app",
  verbose: process.env.APP_DEBUG === "true" || false,
  locale: "pt-br",
})
  .include("./middlewares/globals")
  .then("../routes")
  .into(app);

app.post("/disable/broker", (req, res) => {
  infraService.disableBroker();
  res.send(true);
});

app.post("/disable/database", (req, res) => {
  infraService.disableDatabase();
  res.send(true);
});

app.listen(process.env.APP_PORT || 3000, () => {
  console.log("[ running! ]");
  deliveryConsumer.consumer();
});
