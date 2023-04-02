const express = require("express");
const Video = require("../schema/Video");
const verify = require("../verifyToken");
const router = express.Router();

// upload video

router.post("/upload", verify, async (req, res) => {
  const newVideo = new Video(req.body);

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete video

router.delete("/delete/:id", verify, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update video

router.put("/update/:id", verify, async (req, res) => {
  try {
    const updatedMovie = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get videos

router.get("/all", async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", verify, async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     res.status(200).json(video);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// get random video

router.get("/get-random", async (req, res) => {
  try {
    const randomVideo = await Video.aggregate([{ $sample: { size: 4 } }]);
    res.status(200).json(randomVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get movie for a specific person

router.get("/get/:publisherId", verify, async (req, res) => {
  try {
    const videos = await Video.find({ publisherId: req.params.publisherId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search functionality

router.get("/search", async (req, res) => {
  const searchQuery = req.query.title;
  try {
    const videos = await Video.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
