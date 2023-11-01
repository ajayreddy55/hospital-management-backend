const express = require("express");
const mongoose = require("mongoose");
const hospitalUserData = require("../database-models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const isUserExists = await hospitalUserData.findOne({ email: email });

    if (isUserExists !== null) {
      const comparePassword = await bcrypt.compare(
        password,
        isUserExists.password
      );
      if (comparePassword) {
        const payload = {
          id: isUserExists._id,
        };
        const jwtToken = jwt.sign(payload, "HOSPITAL_LOGIN", {
          expiresIn: "24hr",
        });

        return response
          .status(200)
          .json({ token: jwtToken, message: "Successfully Logged in" });
      } else {
        return response.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return response.status(400).json({ message: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (request, response) => {
  try {
    const { email, name, password } = request.body;
    const isUserExists = await hospitalUserData.findOne({ email: email });

    if (isUserExists === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new hospitalUserData({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      return response.status(200).json({ message: "Registration Success" });
    } else {
      return response.status(400).json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuth, async (request, response) => {
  const userDetails = await hospitalUserData.findOne({ _id: request.userId });
  return response.status(200).json({ userDetails: userDetails });
});

router.put("/update-details", jwtAuth, async (request, response) => {
  try {
    const { name, email } = request.body;
    const userDetails = await hospitalUserData.updateOne(
      { _id: request.userId },
      { $set: { name: name, email: email } }
    );
    return response
      .status(200)
      .json({ message: "User Details Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-password", jwtAuth, async (request, response) => {
  try {
    const { password } = request.body;
    const userDetails = await hospitalUserData.findOne({ _id: request.userId });

    const comparePasswordOld = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (comparePasswordOld) {
      return response.status(400).json({
        message:
          "New Password is same as Old Password, Please enter different one",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await hospitalUserData.updateOne(
        { _id: request.userId },
        { $set: { password: hashedPassword } }
      );
      return response
        .status(200)
        .json({ message: "Password Updated Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
