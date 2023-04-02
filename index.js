const express = require("express");
const app = express();
const Port = 4200;
const UploadRoute = require("./routes/UploadImage");

app.use("/", UploadRoute);

app.listen(Port, () => {
  console.log(`Server Started on ${Port}`);
});
