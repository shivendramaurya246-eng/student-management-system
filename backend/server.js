const connectDB =
require("./config/db");



const authRoutes =
require("./routes/authRoutes");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

.

app.use(
  "/api/auth",
  authRoutes
);
// MongoDB Connection

// Student Model
const Student = require("./models/Student");

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management System API Running"
  });
});

// Add Student
app.post("/api/students", async (req, res) => {
  try {
    const {
      name,
      rollNo,
      email,
      course,
      maths,
      science,
      english
    } = req.body;

    const percentage =
      (Number(maths) +
        Number(science) +
        Number(english)) / 3;

    const result =
      percentage >= 33 ? "Pass" : "Fail";

    const student = await Student.create({
      name,
      rollNo,
      email,
      course,
      maths,
      science,
      english,
      percentage,
      result
    });

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

// Get All Students
app.get("/api/students", async (req, res) => {

  try {

    const students =
      await Student.find().sort({
        createdAt: -1
      });

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Get Single Student
app.get("/api/students/:id", async (req, res) => {

  try {

    const student =
      await Student.findById(req.params.id);

    res.status(200).json(student);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Update Student
app.put("/api/students/:id", async (req, res) => {

  try {

    const {
      maths,
      science,
      english
    } = req.body;

    const percentage =
      (Number(maths) +
        Number(science) +
        Number(english)) / 3;

    const result =
      percentage >= 33 ? "Pass" : "Fail";

    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          percentage,
          result
        },
        {
          new: true
        }
      );

    res.status(200).json(student);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Delete Student
app.delete("/api/students/:id", async (req, res) => {

  try {

    await Student.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Student Deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Dashboard Statistics
app.get("/api/dashboard", async (req, res) => {

  try {

    const totalStudents =
      await Student.countDocuments();

    const passStudents =
      await Student.countDocuments({
        result: "Pass"
      });

    const failStudents =
      await Student.countDocuments({
        result: "Fail"
      });

    const students =
      await Student.find();

    let avg = 0;

    if (students.length > 0) {

      avg =
        students.reduce(
          (acc, item) =>
            acc + item.percentage,
          0
        ) / students.length;

    }

    res.json({

      totalStudents,
      passStudents,
      failStudents,
      averagePercentage:
        avg.toFixed(2)

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running On Port ${PORT}`
  );
});
