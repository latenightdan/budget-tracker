const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = process.env.PORT || 8080;
const MONGODB_URI = "mongodb+srv://latenightdan:4d9Uvv54dTg3GYx@lndcluster.unp5u.mongodb.net/budgetDB?retryWrites=true&w=majority" 

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(MONGODB_URI || "mongodb://localhost/budget-tracker", {
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log("u in")
})
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});