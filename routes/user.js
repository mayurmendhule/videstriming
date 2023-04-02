const express = require("express");
const User = require("../schema/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    profession: req.body.profession,
    photoUrl: req.body.photoUrl,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong Credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SEC);

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-User/:userId", async (req, res) => {
  try {
    const getuser = await User.findById(req.params.userId);
    res.status(200).json(getuser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
