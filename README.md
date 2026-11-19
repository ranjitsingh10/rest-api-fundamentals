
# REST API Fundamentals

## Project Overview

This project is developed as part of the DecodeLabs Backend Development Internship.

The purpose of this project is to understand REST API fundamentals using Node.js and Express.js.

The API allows users to retrieve student information and create new student records through HTTP requests.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON
- Postman

## Project Setup

### 1. Clone or Download the Project

Download the project to your local computer.

### 2. Install Dependencies

Open the project folder in the terminal and run:

```bash
npm install
```

### 3. Start the Server

Run:

```bash
npm start
```

The server will run at:

http://localhost:3000

## API Endpoints

### 1. Home Route

**GET /**

Returns a welcome message.

### 2. Get All Students

**GET /api/students**

Returns the list of all students.

Example Response:

```json
{
  "success": true,
  "message": "Students data fetched successfully",
  "students": [
    {
      "id": 1,
      "name": "Rahul",
      "course": "Computer Science"
    },
    {
      "id": 2,
      "name": "Amit",
      "course": "Software Engineering"
    }
  ]
}
```

### 3. Create a Student

**POST /api/students**

Creates a new student record.

Example Request:

```json
{
  "name": "Ranjit",
  "course": "Backend Development"
}
```

Example Success Response:

```json
{
  "success": true,
  "message": "Student created successfully",
  "student": {
    "id": 3,
    "name": "Ranjit",
    "course": "Backend Development"
  }
}
```

## Input Validation

The API checks that:

- Name and course are required.
- Both values must be strings.
- Empty values are not accepted.

Invalid input returns HTTP 400 Bad Request.

## HTTP Status Codes

| Code | Description |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## Error Handling

The API handles invalid requests and unknown endpoints with appropriate error responses.

## Error Handling

The API handles:

- 400 Bad Request – Invalid input.
- 404 Not Found – Unknown API endpoint.
- 500 Internal Server Error – Unexpected server errors.


## Testing

The API endpoints were tested using Postman.

## Note

Student records are stored temporarily in an in-memory JavaScript array. Data will reset when the server restarts.

---

**Developed as part of DecodeLabs Backend Development Internship – Project 1.**
