const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentFacilitiesSchema = new Schema({
  departmentId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  facilityDescription: {
    type: String,
    required: true,
  },
});

const departmentSchema = new Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  departmentDescription: {
    type: String,
    required: true,
  },
});

const departmentFacilityModel = mongoose.model(
  "departmentFacilitiesData",
  departmentFacilitiesSchema
);
const departmentModel = mongoose.model("departmentData", departmentSchema);

module.exports = { departmentFacilityModel, departmentModel };
