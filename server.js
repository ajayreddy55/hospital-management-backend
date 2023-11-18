const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const multer = require("multer");

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

// const storage = multer.diskStorage({
//   destination: function (request, file, cb) {
//     return cb(null, "./public/images");
//   },
//   filename: function (request, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const uploadFile = multer({ storage });

// app.post("/upload/images", uploadFile.single("file"), (request, response) => {
//   console.log(request.body);
//   console.log(request.file);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
