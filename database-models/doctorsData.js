const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const doctorsDataSchema = new Schema({
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
  department: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  googleLink: {
    type: String,
  },
  linkedinLink: {
    type: String,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

const doctorsDataModel = model("doctorsData", doctorsDataSchema);

module.exports = doctorsDataModel;
