
const express = require("express");

const app = express();

const PORT = 3000;

// JSON request body read karne ke liye
app.use(express.json());

// Temporary students data
const students = [
    {
        id: 1,
        name: "Rahul",
        course: "Computer Science"
    },
    {
        id: 2,
        name: "Amit",
        course: "Software Engineering"
    }
];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to my REST API!");
});

// GET endpoint
app.get("/api/students", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Students data fetched successfully",
        students: students
    });
});



// POST endpoint with Input Validation
app.post("/api/students", (req, res) => {

    const { name, course } = req.body;

    // Check required fields
    if (!name || !course) {
        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });
    }

    // Check data types
    if (typeof name !== "string" || typeof course !== "string") {
        return res.status(400).json({
            success: false,
            message: "Name and course must be text"
        });
    }

    // Check empty spaces
    if (name.trim() === "" || course.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name and course cannot be empty"
        });
    }

    // Create new student
    const newStudent = {
        id: students.length + 1,
        name: name.trim(),
        course: course.trim()
    };

    // Add student to array
    students.push(newStudent);

    // Send success response
    res.status(201).json({
        success: true,
        message: "Student created successfully",
        student: newStudent
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});


// Handle unknown routes (404 Not Found)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
