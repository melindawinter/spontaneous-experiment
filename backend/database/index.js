//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri = "mongodb://localhost/spontaneous-experiment";

mongoose.connect(uri).then(
  () => {
    console.log("Connected to Mongo");
  },
  err => {
    console.log("Error connecting to mongo");
    console.log(err);
  }
);

module.exports = mongoose.connection;
