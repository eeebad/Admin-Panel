const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Setup schema
var testSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    app_token: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("test", testSchema);
