const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");


// Register Admin
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    const adminExists =
      await Admin.findOne({ email });

    if (adminExists) {

      return res.status(400).json({
        message: "Admin Already Exists"
      });

    }

    const admin =
      await Admin.create({
        name,
        email,
        password
      });

    res.status(201).json({
      success: true,
      admin
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Login Admin
router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const admin =
      await Admin.findOne({ email });

    if (!admin) {

      return res.status(401).json({
        message: "Invalid Email"
      });

    }

    const match =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!match) {

      return res.status(401).json({
        message: "Invalid Password"
      });

    }

    const token =
      jwt.sign(
        {
          id: admin._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

    res.json({
      success: true,
      token
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;