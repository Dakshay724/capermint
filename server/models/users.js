const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { unique: true, type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, min: 6, max: 12 },
  loginToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
