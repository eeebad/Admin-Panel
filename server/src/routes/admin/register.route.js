var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/register.controller");
var uploads = require("../../config/multer")

router
  .route("/")
  .post(uploads.single("profile"), controller.store); //to register user

module.exports = router;
