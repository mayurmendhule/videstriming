const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profession: { type: String, required: true },
  password: { type: String, required: true },
  photoUrl: { type: String },
});

module.exports = mongoose.model("user", userSchema);
