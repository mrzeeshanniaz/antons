// import modules
const express = require("express");
const mongoose = require("mongoose");

// import api routes
const antonRoute = require("./api/routes/anton");

//app listening port
const port = process.env.PORT || 5000;

// create express app
const app = express();

// app request parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// db connection string
const url = "mongodb://localhost:27017/antonsDB";

// mongodb connection via mongoose
mongoose
  .connect(url, (err) => {
    err ? console.log(err) : console.log("DB connection successful");
  })
  .catch((err) => console.log(err));

// app routes middleware
app.use("/anton", antonRoute);

// Submitted URL  not found middleware
app.use((req, res, next) => {
  const error = new Error("Submitted URL not found");
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

// listening app
app.listen(port);
