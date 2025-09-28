const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
// connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DataBase connected successfully"))
  .catch((e) => console.log(e));

//   use middle ware
app.use(express.json());

app.listen(process.env.PORT, ()=>{
console.log(`Server is now running on the port ${process.env.PORT}`)
});