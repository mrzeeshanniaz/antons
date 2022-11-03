// import module
const mongoose = require("mongoose");

// anton Schema
const antonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  atn: {
    type: Number,
    required: true,
  },
  // YYYY/MM/DD
  dateOfBirth: {
    type: String,
    required: true,
  },
});

// export model
module.exports = mongoose.model("Anton", antonSchema);
