//import "dotenv" from "dotenv";
import express from "express";
import consign from "consign";
import OrderService from "./order/OrderService.js";

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

app.get("/", (req, res) => {
  OrderService.save({ nome: 1, transaction_id: 2 })
    .then((a) => {
      res.send(JSON.stringify(a));
    })
    .catch((a) => {
      res.send(JSON.stringify(a));
    });
});

app.listen(process.env.APP_PORT || 3000, () => {
  console.log("=> Servidor rodando!");
});
