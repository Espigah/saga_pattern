import mongoose from "mongoose";

const options = {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
};
const url =
  process.env.DATABASE ||
  "mongodb://admin:admin@localhost:27017/db?connectTimeoutMS=300000&authSource=admin";

console.log(url);

var db = mongoose.connection;

db.on("error", (error) => {
  console.warn("[ database ]", error);
  //mongoose.connect(url, options);
});
db.once("open", function () {
  console.log("[ database ]", "connect");
});

let connection;
const connect = () => {
  if (connection) {
    return connection;
  }

  console.log("[ database ]", "connecting");
  return (connection = mongoose.connect(url, options));
};

connection = connect();

export default {
  connect,
};
