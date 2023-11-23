const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const patientsDataSchema = new Schema({
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
  gender: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  age: {
    type: Number,
  },
  bloodGroup: {
    type: String,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

const patientsDataModel = model("patientsData", patientsDataSchema);

module.exports = patientsDataModel;
