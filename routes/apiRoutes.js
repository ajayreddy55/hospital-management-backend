const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../middleware/jwtAuth");

const {
  departmentFacilityModel,
  departmentModel,
} = require("../database-models/departmentData");

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

      const departmentFacilitiesRes = await departmentFacilityModel.find({
        departmentId: id,
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
      departmentId: id,
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

module.exports = router;
