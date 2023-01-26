const express = require("express");

var blogRoutes = require("./blog.route");
var userRoutes = require("./user.route");

const router = express.Router();
//boilerplate
router.use("/blog", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;
