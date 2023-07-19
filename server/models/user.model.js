const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLoggedIn: { type: Boolean },
  },
  { collection: "user-data" }
);

const model = mongoose.model("user-data", User);

module.exports = model;
