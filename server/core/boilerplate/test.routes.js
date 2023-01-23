// __ __ __ Routes has __ __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

var express = require("express");
var router = express.Router();
var controller = require("../../controllers/admin/auth.controller");

router.route("/test").get(controller.index);
router.route("/test").post(controller.store);
router.route("/test/:id").get(controller.edit);
router.route("/test/:id").put(controller.update);
router.route("/test/:id").delete(controller.destroy);

module.exports = router;
