//const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");

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

db.on("error", console.error);
db.once("open", function () {
  console.log("Conectado ao MongoDB.");

  var Schema = mongoose.Schema;

  var userDataSchema = new Schema(
    {
      nome: { type: String, required: true },
      email: String,
      telefone: String,
    },
    { collection: "contatos" }
  );

  var Contatos = mongoose.model("UserData", userDataSchema);
  var item = {
    nome: "d",
  };
  var data = new Contatos(item);
  data.save();
});

mongoose.connect(url, options);
