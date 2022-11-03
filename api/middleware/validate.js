// Import validator module
const { isAlpha, isEmail, isInt, isDate } = require("validator");

// Validate middleware
const validate = (req, res, next) => {
  let obj = {};
  if (req.method === "POST") {
    obj = {
      name: "",
      email: "",
      atn: "",
      dateOfBirth: "",
      ...req.body,
    };
  } else {
    obj = { ...req.body };
  }

  try {
    for (let property in obj) {
      switch (property) {
        case "name":
          if (!isAlpha(obj[property], "en-US", { ignore: "s" })) {
            throw new Error(`Invalid ${property}`);
          }
          break;
        case "email":
          if (!isEmail(obj[property])) {
            throw new Error(`Invalid ${property}`);
          }
          break;
        case "atn":
          if (!isInt(obj[property])) {
            throw new Error(`Invalid ${property}`);
          }
          break;
        case "dateOfBirth":
          if (!isDate(obj[property])) {
            throw new Error(`Invalid ${property}`);
          }
          break;
        default:
          throw new Error(`Invalid ${property}`);
      }
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validate;
