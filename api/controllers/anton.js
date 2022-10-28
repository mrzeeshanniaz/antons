// import anton model
const Anton = require("../models/anton");

// Create new anton
exports.create_anton = (req, res) => {
  Anton.find({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        return res.status(403).json({ message: "Email already exists" });
      }
      const anton = new Anton({
        name: req.body.name,
        email: req.body.email,
        atn: req.body.atn,
        dateOfBirth: req.body.dateOfBirth,
      });

      anton
        .save()
        .then((anton) => {
          res.status(201).json({
            message: "anton added successfully",
            createdAnton: {
              _id: anton._id,
              name: anton.name,
              email: anton.email,
              atn: anton.atn,
              dateOfBirth: anton.dateOfBirth,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Update anton
exports.update_anton = (req, res) => {
  const atn = req.params.atn;
  Anton.updateOne({ atn }, { $set: { ...req.body } })
    .then((data) =>
      res.status(201).json({ message: "anton data updated successfully" })
    )
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Delete anton
exports.delete_anton = (req, res) => {
  const atn = req.params.atn;
  Anton.deleteOne({ atn })
    .then((data) =>
      res.status(200).json({ message: "anton deleted successfully" })
    )
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Get all antons
exports.get_all_antons = (req, res) => {
  Anton.find()
    .select("_id name email atn dateOfBirth")
    .then((data) => res.status(200).json({ antons: data }))
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Get single anton
exports.get_anton = (req, res) => {
  const atn = req.params.atn;
  Anton.find({ atn })
    .select("_id name email atn dateOfBirth")
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Anton not found" });
      }
      res.status(200).json({ anton: data[0] });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
