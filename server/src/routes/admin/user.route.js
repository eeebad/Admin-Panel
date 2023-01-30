// __ __ __ Routes has __ __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/user.controller");
var uploads = require("../../config/multer");

//to get all users
router.route("/").get(controller.index).post(uploads.single("profileImage"), controller.store);

//for specific user
router
  .route("/:id")
  .get(controller.edit)
  .put(uploads.single("profileImage"), controller.update)
  .delete(controller.destroy);

module.exports = router;
