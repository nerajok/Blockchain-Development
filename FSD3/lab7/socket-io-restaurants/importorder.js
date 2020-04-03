const mongoose = require("mongoose");

const connectionString =
  "mongodb://neraj:neraj@cluster0-shard-00-00-brbg7.mongodb.net:27017,cluster0-shard-00-01-brbg7.mongodb.net:27017,cluster0-shard-00-02-brbg7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("Mongoose connected successfully ");
    },
    error => {
      console.log("Mongoose could not connected to database : " + error);
    }
  );

const Order = require('./model/Order');

const insertData = () => {
  console.log("inserting data to heroku");

  Order.insertMany([
    {
      orderId:"1234",
      item: "Chicken 65",
      customer_name: "Brock",
    },
    {
      orderId:"1235",
      item: "Butter Chicken",
      customer_name: "Kajal",
    }
  ])
    .then(() => console.log("insert mongo successfull"))
    .catch(e => console.log(e));
};

// invoke...
insertData();
