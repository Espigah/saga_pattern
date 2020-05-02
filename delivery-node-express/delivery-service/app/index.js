//import "dotenv" from "dotenv";
import express from "express";
import consign from "consign";
import deliveryService from "./delivery/deliveryService.js";

import consumer from "./message-broker/consumer.js";

import infraService from "./infra/infraService.js";

//require("dotenv").config();

//const database = require("./database");
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

var t = Date.now();
consumer.observerFailure((data) => {
  console.log(t, data);
});
consumer.observerTrigger((data) => {
  console.log(t, data);
});

app.get("/", (req, res) => {
  deliveryService.deliveryOrder({
    nome: 1,
    order_id: 1,
    payment_id: 1,
    transaction_id: 2,
  })
    .then((a) => {
      producer.send();
      res.send(JSON.stringify(a));
    })
    .catch((a) => {
      res.send(JSON.stringify(a));
    });
});

app.post("/disable/broker", (req, res) => {
  infraService.disableBroker();
  res.send(true);
});

app.post("/disable/database", (req, res) => {
  infraService.disableDatabase();
  res.send(true);
});

app.listen(process.env.APP_PORT || 3000, () => {
  console.log("=> Servidor rodando!");
});
