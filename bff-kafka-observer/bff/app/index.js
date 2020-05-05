import express from "express";
import consign from "consign";
import socket from "socket.io";
import http from "http";
import room from "./room.js";
import dotenv from "dotenv";


if (process.env.APP_DEBUG) {
  dotenv.config();
}

const app = express();
const httpClient = http.Server(app);
const io = socket(httpClient);

app.disable("x-powered-by");

consign({
  cwd: "app",
  verbose: process.env.APP_DEBUG === "true" || false,
  locale: "pt-br",
})
  .include("./middlewares/globals")
  .into(app);

app.get("/", function (req, res) {
  res.send("server is running");
});

httpClient.listen(5000, function () {
  console.log("socket listening on port 5000");
});

room(io);
