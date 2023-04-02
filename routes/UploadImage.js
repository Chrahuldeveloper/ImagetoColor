const express = require("express");
const multer = require("multer");
const fs = require("fs");
const UploadRoute = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}.jpg`);
  },
});
const Upload = multer({ storage: storage });

const ColorExtraction = (binary) => {
  const Colorarray = [];
  const num1 = Math.floor(Math.random() * 99);
  const num2 = Math.floor(Math.random() * 99);
  const num3 = Math.floor(Math.random() * 99);
  const numbers = binary.replace(/\D/g, "");
  const Letters = binary.replace(/[^a-z]/gi, "");
  Colorarray.push(numbers[num1]);
  Colorarray.push(numbers[num2]);
  Colorarray.push(numbers[num3]);
  Colorarray.push(Letters[num1]);
  Colorarray.push(Letters[num2]);
  Colorarray.push(Letters[num3]);
  return Colorarray.join("").toString();
};

UploadRoute.post("/Upload", Upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  const filename = req.file.filename;
  fs.readFile(`./images/${filename}`, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    const binary = Buffer.from(data).toString("hex");
    const color = ColorExtraction(binary);
    res.send(color);
  });
});

module.exports = UploadRoute;
