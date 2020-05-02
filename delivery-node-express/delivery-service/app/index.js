require("dotenv").config();
const express = require("express");
const consign = require("consign");
const database = require("./database");
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
// database
//   .insert({ a: 1 })
//   .then((a) => {
//     console.log("find",a);
//     return database.find({});
//   })
//   .then((a) => {
//     console.log("ok",a);
//   })
//   .catch((e) => {
//     console.log("error",JSON.stringify(e));
//   });

  res.send("s");
});

app.listen(process.env.APP_PORT || 3000, () => {
  console.log("=> Servidor rodando!");
});
