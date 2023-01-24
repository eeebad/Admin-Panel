const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const admin = require("./src/routes/admin/user.route");
const auth = require("./src/routes/admin/auth.route");
const register = require("./src/routes/admin/register.route");
const refresh = require("./src/routes/admin/refreshToken.route");
const verifyJWT = require("./src/middlewares/verifyJWT.middleware");
const cookieParser = require("cookie-parser");
const db = require("./src/config/db");
const app = express();
const PORT = process.env.PORT || 5000;
const corOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
//db connection
db();
//setting the cookie parser middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/src/uploads/images")));
app.use(cors(corOptions));
app.use(logger("dev"));

app.use("/v1/admin/auth", auth);
app.use("/v1/admin/refresh", refresh);
app.use("/v1/admin/register", register);
app.use(verifyJWT);
app.use("/v1/admin", admin);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
