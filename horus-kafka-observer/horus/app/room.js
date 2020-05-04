import consumerFactory from "./message-broker/consumerFactory.js";

let clients = {};
let consumer;

const connection = (client) => {
  const join = (name) => {
    console.log("Joined: " + name);
    clients[client.id] = name;
    client.emit("update", "You have connected to the server.");

    consumerFactory.create().then((data) => {
      consumer = data;
      console.log("consumer:ok");
      consumer.on("message", (message) => {
        console.log("[consumer]", message);
        client.emit("update", message);
      });
    });
  };

  const disconnect = () => {
    console.log("Disconnect");
    if (consumer) {
      //consumer.close()
    }
    delete clients[client.id];
  };

  client.on("join", join);
  client.on("disconnect", disconnect);
};

export default (io) => {
  io.on("connection", connection);
};
