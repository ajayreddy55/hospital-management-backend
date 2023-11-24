const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const nurseDataSchema = new Schema({
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
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

const nurseDataModel = model("nurseData", nurseDataSchema);

module.exports = nurseDataModel;
