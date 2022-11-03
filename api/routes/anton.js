// import modules
const express = require("express");

//import  middleware
const checkAnton = require("../middleware/checkAnton");
const validate = require("../middleware/validate");

// import anton controller
const antonController = require("../controllers/anton");

// create express router
const router = express.Router();

// Create anton
router.post("/", validate, antonController.create_anton);

// // Update anton
router.patch("/:atn", validate, checkAnton, antonController.update_anton);

// // Delete anton
router.delete("/:atn", checkAnton, antonController.delete_anton);

// // get list of all antons
router.get("/", antonController.get_all_antons);

// //get single anton
router.get("/:atn", antonController.get_anton);

module.exports = router;
