// import anton model
const Anton = require("../models/anton");

// Error handler
const errorHandler = (error) => {
  console.log(error);
  res.status(500).json({ error: error });
};

// check anton middleware

const checkAnton = (req, res, next) => {
  const atn = req.params.atn;
  Anton.find({ atn: atn })
    .exec()
    .then((data) =>
      data.length
        ? next()
        : res.status(403).json({ message: "Anton not found" })
    )
    .catch(errorHandler);
};

module.exports = checkAnton;
