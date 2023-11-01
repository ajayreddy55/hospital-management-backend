const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const hospitalUserData = mongoose.model("hospitalUserData", userDataSchema);

module.exports = hospitalUserData;
