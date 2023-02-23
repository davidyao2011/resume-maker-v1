const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = mutler({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
});

app.get("/", (req, res) => {
  res.json({
    message: "Hi Everyone",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
