var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/auth.controller");
var uploads = require("../../config/multer");

router.route("/login").post(controller.handleLogin); //to register user
module.exports = router;
