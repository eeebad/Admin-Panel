// __ __ __ Routes has __ __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/user.controller");
var uploads = require("../../config/multer")
router.route("/get-users").get(controller.index); //to get all users
router.route("/register-user").post(uploads.single("profile"),controller.store); //to register user
router.route("/edit-user/:id").get(controller.edit); //to edit user
router.route("/update-user/:id").put(uploads.single("profile"),controller.update); //to update user
router.route("/delete-user/:id").delete(controller.destroy); //to delete user

module.exports = router;
