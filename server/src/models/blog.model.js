const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    profileImage: { type: String },
    comments: [
      {
        body: String,
        date: Date,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", BlogSchema);
