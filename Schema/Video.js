const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  videoDuration: { type: Number, required: true },
  // thumbnailUrl: { type: String, required: true },
  category: { type: String, required: true },
  visibility: { type: String, required: true },
  publisherId: { type: String, required: true },
});

module.exports = mongoose.model("video", videoSchema);
