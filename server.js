const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwtAuth = require("./middleware/jwtAuth");

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000 || process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://ajayreddy6753:Ajay6753@ajayreddycluster.1x5u1ub.mongodb.net/hospitalManagment?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/uploads", express.static("public"));

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (request, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadFile = multer({ storage });

app.post(
  "/upload/images",
  jwtAuth,
  uploadFile.single("file"),
  (request, response) => {
    try {
      return response.status(200).json({
        filename: request.file.filename,
      });
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: error.message });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
