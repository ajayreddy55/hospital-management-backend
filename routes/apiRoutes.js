const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../middleware/jwtAuth");
const bcrypt = require("bcrypt");

const {
  departmentFacilityModel,
  departmentModel,
} = require("../database-models/departmentData");
const doctorsDataModel = require("../database-models/doctorsData");
const patientsDataModel = require("../database-models/patientsData");
const nurseDataModel = require("../database-models/nurseData");

const router = express.Router();

//getting departments
router.get("/all-departments", jwtAuth, async (request, response) => {
  try {
    const departmentsRes = await departmentModel.find();

    return response.status(200).json({ departmentsList: departmentsRes });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//adding departments
router.post("/add-department", jwtAuth, async (request, response) => {
  try {
    const { icon, name, departmentDescription } = request.body;

    const department = new departmentModel({
      icon,
      name,
      departmentDescription,
    });

    await department.save();

    return response
      .status(200)
      .json({ message: "Department Details Saved Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//getting department
router.get("/get-department/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const departmentRes = await departmentModel.findOne({ _id: id });

    if (departmentRes !== null) {
      return response.status(200).json({ departmentDetails: departmentRes });
    } else {
      return response.status(400).json({ message: "Department Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//updating department
router.put(
  "/modify-department-details/:id",
  jwtAuth,
  async (request, response) => {
    try {
      const { icon, name, departmentDescription } = request.body;
      const { id } = request.params;

      const departmentRes = await departmentModel.findOne({ _id: id });

      if (departmentRes !== null) {
        const updateDepartment = await departmentModel.updateOne(
          { _id: id },
          {
            $set: {
              icon: icon,
              name: name,
              departmentDescription: departmentDescription,
            },
          }
        );
        return response.status(200).json({ message: "Updated Successfully" });
      } else {
        return response.status(400).json({ message: "Department Not Found" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: error.message });
    }
  }
);

//deleting department
router.delete("/delete-department/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const departmentRes = await departmentModel.findOne({ _id: id });

    if (departmentRes !== null) {
      const deleteDepartment = await departmentModel.deleteOne({ _id: id });
      const deleteFacility = await departmentFacilityModel.deleteMany({
        departmentId: id,
      });
      return response
        .status(200)
        .json({ message: "Department Deleted Successfully" });
    } else {
      return response.status(400).json({ message: "Department Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//getting-department facilities
router.get(
  "/get-department-facilities/:id",
  jwtAuth,
  async (request, response) => {
    try {
      const { id } = request.params;
      const departmentFacilitiesRes = await departmentFacilityModel.find({
        departmentId: id,
      });

      return response
        .status(200)
        .json({ departmentFacilities: departmentFacilitiesRes });
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: error.message });
    }
  }
);

//getting-facility
router.get("/get-facility/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const departmentFacilitiesRes = await departmentFacilityModel.findOne({
      _id: id,
    });

    if (departmentFacilitiesRes !== null) {
      return response
        .status(200)
        .json({ departmentFacility: departmentFacilitiesRes });
    } else {
      return response.status(400).json({ message: "Facility Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//posting department facilities
router.post("/adding-facilities", jwtAuth, async (request, response) => {
  try {
    const { title, departmentId, facilityDescription } = request.body;

    const addingFacilities = new departmentFacilityModel({
      departmentId,
      title,
      facilityDescription,
    });

    await addingFacilities.save();

    return response
      .status(200)
      .json({ message: "Facility Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//updating facilities
router.put(
  "/modify-facility-details/:id",
  jwtAuth,
  async (request, response) => {
    try {
      const { id } = request.params;
      const { title, facilityDescription } = request.body;

      const departmentFacilitiesRes = await departmentFacilityModel.findOne({
        _id: id,
      });

      if (departmentFacilitiesRes !== null) {
        const updateFacility = await departmentFacilityModel.updateOne(
          { _id: id },
          { $set: { title: title, facilityDescription: facilityDescription } }
        );

        return response
          .status(200)
          .json({ message: "Facility Updated Successfully" });
      } else {
        return response.status(400).json({ message: "Facility Not Found" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: error.message });
    }
  }
);

//deleting facility
router.delete("/delete-facility/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const departmentFacilitiesRes = await departmentFacilityModel.find({
      _id: id,
    });

    if (departmentFacilitiesRes !== null) {
      const deleteFacility = await departmentFacilityModel.deleteOne({
        _id: id,
      });

      return response
        .status(200)
        .json({ message: "Facility Deleted Successfully" });
    } else {
      return response.status(400).json({ message: "Facility Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//getting all doctors
router.get("/get-all-doctors", jwtAuth, async (request, response) => {
  try {
    const doctorsRes = await doctorsDataModel.find();

    return response.status(200).json({ doctors: doctorsRes });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

// adding doctor
router.post("/add-doctor", jwtAuth, async (request, response) => {
  try {
    const {
      name,
      email,
      password,
      address,
      phoneNumber,
      department,
      profile,
      facebookLink,
      twitterLink,
      googleLink,
      linkedinLink,
      profileImage,
    } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new doctorsDataModel({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      department,
      profile,
      facebookLink,
      twitterLink,
      googleLink,
      linkedinLink,
      profileImage,
    });

    await doctor.save();

    return response.status(200).json({ message: "Doctor Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//updating doctor
router.put("/modify-doctor/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      email,
      address,
      phoneNumber,
      department,
      profile,
      facebookLink,
      twitterLink,
      googleLink,
      linkedinLink,
      profileImage,
    } = request.body;

    const doctorRes = await doctorsDataModel.findOne({ _id: id });

    if (doctorRes !== null) {
      const updateDoctor = await doctorsDataModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            department: department,
            profile: profile,
            facebookLink: facebookLink,
            twitterLink: twitterLink,
            googleLink: googleLink,
            linkedinLink: linkedinLink,
            profileImage: profileImage,
          },
        }
      );

      return response
        .status(200)
        .json({ message: "Doctor Details Updated Successfully" });
    } else {
      return response.status(400).json({ message: "Doctor Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//get doctor details
router.get("/get-doctor-details/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const doctorRes = await doctorsDataModel.findOne({ _id: id });

    if (doctorRes !== null) {
      return response.status(200).json({ doctorDetails: doctorRes });
    } else {
      return response.status(400).json({ message: "Doctor Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//delete doctor
router.delete("/delete-doctor/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const doctorRes = await doctorsDataModel.findOne({ _id: id });

    if (doctorRes !== null) {
      const deleteDoctor = await doctorsDataModel.deleteOne({ _id: id });
      return response
        .status(200)
        .json({ message: "Doctor Details Deleted Successfully" });
    } else {
      return response.status(400).json({ message: "Doctor Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//getting all patients
router.get("/get-all-patients", jwtAuth, async (request, response) => {
  try {
    const patientsRes = await patientsDataModel.find();

    return response.status(200).json({ patients: patientsRes });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//adding patient
router.post("/add-patient", jwtAuth, async (request, response) => {
  try {
    const {
      name,
      email,
      password,
      address,
      phoneNumber,
      gender,
      birthDate,
      age,
      bloodGroup,
      profileImage,
    } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new patientsDataModel({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      gender,
      birthDate,
      age,
      bloodGroup,
      profileImage,
    });

    await patient.save();

    return response.status(200).json({ message: "Patient Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//updating patient
router.put("/modify-patient/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      email,
      address,
      phoneNumber,
      gender,
      birthDate,
      age,
      bloodGroup,
      profileImage,
    } = request.body;

    const patientRes = await patientsDataModel.findOne({ _id: id });

    if (patientRes !== null) {
      const updatePatient = await patientsDataModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDate: birthDate,
            age: age,
            bloodGroup: bloodGroup,
            profileImage: profileImage,
          },
        }
      );

      return response
        .status(200)
        .json({ message: "Patient Details Updated Successfully" });
    } else {
      return response.status(400).json({ message: "Patient Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//get patient details
router.get("/get-patient-details/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const patientRes = await patientsDataModel.findOne({ _id: id });

    if (patientRes !== null) {
      return response.status(200).json({ patientDetails: patientRes });
    } else {
      return response
        .status(400)
        .json({ message: "Patient Details Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//deleting patient
router.delete("/delete-patient/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const patientRes = await patientsDataModel.findOne({ _id: id });

    if (patientRes !== null) {
      const deletePatient = await patientsDataModel.deleteOne({ _id: id });
      return response
        .status(200)
        .json({ message: "Patient Details Deleted Successfully" });
    } else {
      return response
        .status(400)
        .json({ message: "Patient Details Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//getting all nurses
router.get("/get-all-nurses", jwtAuth, async (request, response) => {
  try {
    const nursesRes = await nurseDataModel.find();

    return response.status(200).json({ nurses: nursesRes });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//adding nurses
router.post("/adding-nurse", jwtAuth, async (request, response) => {
  try {
    const { name, email, password, address, phoneNumber, profileImage } =
      request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nurse = new nurseDataModel({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      profileImage,
    });

    await nurse.save();

    return response
      .status(200)
      .json({ message: "Nurse Details Saved Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//updating nurse
router.put("/modify-nurse/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, address, phoneNumber, profileImage } = request.body;

    const nurseRes = await nurseDataModel.findOne({ _id: id });

    if (nurseRes !== null) {
      const update = await nurseDataModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            profileImage: profileImage,
          },
        }
      );

      return response
        .status(200)
        .json({ message: "Nurse Details Updated Successfully" });
    } else {
      return response.status(400).json({ message: "Nurse Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

//delete nurse
router.delete("/delete-nurse/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const nurseRes = await nurseDataModel.findOne({ _id: id });

    if (nurseRes !== null) {
      const deleteRes = await nurseDataModel.deleteOne({ _id: id });
      return response
        .status(200)
        .json({ message: "Nurse Details Deleted Successfully" });
    } else {
      return response.status(400).json({ message: "Nurse Details Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

module.exports = router;
