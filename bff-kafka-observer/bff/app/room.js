import consumerFactory from "./message-broker/consumerFactory.js";

let clients = {};
let consumer;

const connection = (client) => {
  console.log("connection")
  const join = () => {
    console.log("Joined: ");
    clients[client.id] = client;
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

  join()
  client.on("disconnect", disconnect);
};

export default (io) => {
  io.on("connection", connection);
};
