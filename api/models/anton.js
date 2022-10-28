// import module
const mongoose = require("mongoose");

// anton Schema
const antonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  atn: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    //dd/mm/yyyy
    match: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  },
});

// export model
module.exports = mongoose.model("Anton", antonSchema);
