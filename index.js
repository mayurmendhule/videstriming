const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const port = 27017;

const userRoutes = require("./routes/user");
const videoRoutes = require("./routes/video");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection established"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
