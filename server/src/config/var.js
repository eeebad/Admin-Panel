require("dotenv").config();

module.exports = {
  mongo: {
    uri: process.env.MONGO_URI,
  },
  port: process.env.PORT,
};
