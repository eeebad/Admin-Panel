const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const adminUser = require("./src/routes/admin/user.route");
const db = require("./src/config/db");
const app = express();
db();
const PORT = process.env.PORT || 5000;
const corOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/src/uploads/images")));
app.use(cors(corOptions));
app.use(logger("dev"));

app.use("/v1/admin", adminUser);
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
