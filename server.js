
const express = require("express");

const prisma = require("./prismaClient");


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

 // POST endpoint - Create User in PostgreSQL
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check required fields
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Check data types
        if (typeof name !== "string" || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "Name and email must be text"
            });
        }

        // Check empty spaces
        if (name.trim() === "" || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name and email cannot be empty"
            });
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Create user in PostgreSQL
        const newUser = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase()
            }
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {

        // Handle duplicate email
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        console.error("Create User Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});




 // GET endpoint - Fetch All Users from PostgreSQL
app.get("/api/users", async (req, res) => {
    try {

        const users = await prisma.user.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            users: users
        });

    } catch (error) {

        console.error("Fetch Users Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



 // GET endpoint - Fetch Single User by ID
app.get("/api/users/:id", async (req, res) => {
    try {

        const id = Number(req.params.id);

        // Validate ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user ID"
            });
        }

        // Find user in PostgreSQL
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: user
        });

    } catch (error) {

        console.error("Fetch User Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});




 // PUT endpoint - Update User
app.put("/api/users/:id", async (req, res) => {
    try {

        const id = Number(req.params.id);
        const { name, email } = req.body;

        // Validate ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user ID"
            });
        }

        // Check required fields
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Check data types
        if (typeof name !== "string" || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "Name and email must be text"
            });
        }

        // Check empty spaces
        if (name.trim() === "" || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name and email cannot be empty"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Update user in PostgreSQL
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase()
            }
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {

        // Handle user not found
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Handle duplicate email
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        console.error("Update User Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});





 // PATCH endpoint - Partially Update User
app.patch("/api/users/:id", async (req, res) => {
    try {

        const id = Number(req.params.id);
        const { name, email } = req.body;

        // Validate ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user ID"
            });
        }

        // Check if at least one field is provided
        if (name === undefined && email === undefined) {
            return res.status(400).json({
                success: false,
                message: "At least one field (name or email) is required"
            });
        }

        // Prepare update data
        const updateData = {};

        // Validate name if provided
        if (name !== undefined) {

            if (typeof name !== "string" || name.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Name must be non-empty text"
                });
            }

            updateData.name = name.trim();
        }

        // Validate email if provided
        if (email !== undefined) {

            if (typeof email !== "string" || email.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Email must be non-empty text"
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.trim())) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid email address"
                });
            }

            updateData.email = email.trim().toLowerCase();
        }

        // Update user in PostgreSQL
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: updateData
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {

        // Handle user not found
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Handle duplicate email
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        console.error("Patch User Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});




 // DELETE endpoint - Delete User
app.delete("/api/users/:id", async (req, res) => {
    try {

        const id = Number(req.params.id);

        // Validate ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user ID"
            });
        }

        // Delete user from PostgreSQL
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser
        });

    } catch (error) {

        // Handle user not found
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.error("Delete User Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});




// Handle server errors (500)
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
