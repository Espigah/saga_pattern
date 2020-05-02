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
  "mongodb://127.0.0.1:27017/db?connectTimeoutMS=300000&authSource=admin";
let databasePromise;
let collection;
const connect = () => {
  if (databasePromise) {
    return databasePromise;
  }

  console.log("connect");

  mongoose.connect(url);

  var Schema = mongoose.Schema;

  var userDataSchema = new Schema(
    {
      nome: { type: String, required: true },
      email: String,
      telefone: String,
    },
    { collection: "contatos" }
  );

  var Contatos = mongoose.model('UserData', userDataSchema); 
  
  var item = {
    nome: "d",
  };
  var data = new Contatos(item);
  data.save();
};

const close = () => {
  if (!databasePromise) {
    return Promise.resolve();
  }

  return databasePromise.then((db) => {
    db.close();
    databasePromise = null;
  });
};

const insert = (data) => {
  console.log("insert");
  return connect().then((db) => {
    console.log(insertOne);
    return collection.insertOne(data).then((result) => {
      console.log(JSON.stringify(result));
    });
  });
};
const find = () => {
  return connect().then((db) => {});
};

module.exports = {
  insert,
  find,
};
