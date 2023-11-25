const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const laboratoristDataSchema = new Schema({
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

const laboratoristDataModel = model("laboratoristData", laboratoristDataSchema);

module.exports = laboratoristDataModel;
