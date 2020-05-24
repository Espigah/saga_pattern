import io from "socket.io-client";
import engine from "./engine.js";

export default () => {
  console.log("[ setup::socket] localhost:5000 ");
  const socket = io("localhost:5000", {});

  socket.on("connect", function (a) {
    console.log(" >> connect", a);
  });

  socket.on("event", function (a) {
    console.log(">> event", a);
  });

  socket.on("update", (event) => {
    console.log(">> update", event);
    engine.addProcess(event);
  });

  socket.on("disconnect", function (a) {
    console.log(a);
  });
};
