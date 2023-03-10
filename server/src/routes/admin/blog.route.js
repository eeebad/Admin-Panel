// __ __ __ Routes has __ __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/blog.controller");
var uploads = require("../../config/multer");

router.route("/").get(controller.index).post(controller.store);
router
  .route("/:id")
  .get(controller.edit)
  .put(uploads.single("profile"), controller.update)
  .delete(controller.destroy);

module.exports = router;
