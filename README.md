
# REST API Fundamentals & Database Integration

## Project Overview

This project is developed as part of the DecodeLabs Backend Development Internship.

The project focuses on understanding REST API fundamentals, backend development, database integration, and CRUD operations using Node.js and Express.js.

It consists of two parts:

- **Project 1 – REST API Fundamentals:** Creating REST API endpoints using Node.js and Express.js.
- **Project 2 – Database Integration:** Integrating PostgreSQL with Prisma ORM to perform database operations.

The API supports student management through in-memory storage and user management through a PostgreSQL database.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Prisma ORM
- Prisma Client
- REST API
- JSON
- Postman
- npm

---

# Project 1 – REST API Fundamentals

## Features

- Retrieve all students.
- Create new student records.
- Input validation.
- Error handling.
- HTTP status codes.
- Handling unknown API endpoints.

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

## Storage

Student records are stored temporarily in an in-memory JavaScript array.

Data will reset when the server restarts.

---

# Project 2 – Database Integration

## Project Overview

Project 2 extends the existing REST API by integrating a PostgreSQL database using Prisma ORM.

Unlike Project 1, user records are stored permanently in PostgreSQL.

The API supports complete CRUD operations:

- Create users.
- Retrieve all users.
- Retrieve a user by ID.
- Update complete user information.
- Partially update user information.
- Delete users.

## Database Technologies

- PostgreSQL 17
- Prisma ORM 7
- Prisma Client
- Prisma PostgreSQL Adapter
- Node.js
- Express.js

## Database Configuration

The project uses PostgreSQL as its relational database.

Database name:

`decode_labs_p2`

Database user:

`ranjitsingh`

Table:

`User`

### User Model

| Field | Data Type | Description |
|---|---|---|
| id | Int | Unique user ID |
| name | String | User name |
| email | String | Unique email address |
| createdAt | DateTime | Record creation time |
| updatedAt | DateTime | Last update time |

The user ID is automatically generated.

Email addresses must be unique.

## Database Connection

The database connection string is stored in an environment variable.

Example `.env` configuration:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/decode_labs_p2?schema=public"
```

Replace `USERNAME` and `PASSWORD` with your local PostgreSQL credentials.

**Important:** Never upload your actual `.env` file or database password to GitHub.

## Database Migration

Prisma Migrate is used to manage database schema changes.

Create and apply a migration:

```bash
npx prisma migrate dev --name create-user-table
```

Generate Prisma Client:

```bash
npx prisma generate
```

For an existing database with committed migrations, apply migrations using:

```bash
npx prisma migrate deploy
```

## User API Endpoints

### 1. Create a User

**POST /api/users**

Creates a new user in PostgreSQL.

Example Request:

```json
{
  "name": "Rahul Singh",
  "email": "rahul@example.com"
}
```

Success Status: `201 Created`

### 2. Get All Users

**GET /api/users**

Retrieves all users from PostgreSQL.

Success Status: `200 OK`

### 3. Get User by ID

**GET /api/users/:id**

Retrieves a specific user using their unique ID.

Success Status: `200 OK`

If the user does not exist, the API returns `404 Not Found`.

### 4. Update a User

**PUT /api/users/:id**

Updates the complete user information.

Both name and email are required.

Example Request:

```json
{
  "name": "Rahul Kumar",
  "email": "rahulkumar@example.com"
}
```

Success Status: `200 OK`

### 5. Partially Update a User

**PATCH /api/users/:id**

Updates only the fields provided in the request.

Example Request:

```json
{
  "name": "Rahul Singh Updated"
}
```

The email remains unchanged.

Success Status: `200 OK`

### 6. Delete a User

**DELETE /api/users/:id**

Deletes a user from PostgreSQL using their ID.

Success Status: `200 OK`

If the user does not exist, the API returns `404 Not Found`.

## Input Validation

The User API validates:

- Name and email are required when creating a user.
- Name and email must be strings.
- Empty values are not accepted.
- Email must have a valid format.
- Duplicate email addresses are not allowed.
- User IDs must be valid positive integers.
- PATCH requires at least one field.
- PUT requires both name and email.

## Error Handling

The API handles:

- `400 Bad Request` – Invalid input or user ID.
- `404 Not Found` – User or API endpoint not found.
- `409 Conflict` – Duplicate email address.
- `500 Internal Server Error` – Unexpected server errors.

Prisma error codes are used to handle database-related errors.

## Database Persistence

Project 2 uses PostgreSQL for permanent data storage.

User records remain saved even after the Express server is stopped or restarted.

This is different from Project 1, where student records are stored temporarily in an in-memory array.

---

# Project Setup

## Prerequisites

Install the following:

- Node.js
- npm
- PostgreSQL 17
- Postman

## 1. Install Dependencies

Open the project folder in the terminal and run:

```bash
npm install
```

## 2. Configure PostgreSQL

Create a PostgreSQL database named:

`decode_labs_p2`

Configure your database connection string in the root `.env` file.

Use the `.env` example provided in the Database Configuration section.

## 3. Apply Database Migrations

Run:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

## 4. Start the Server

Run:

```bash
npm start
```

The server will run at:

http://localhost:3000

---

# Testing

The API endpoints were tested using Postman.

Testing included:

- GET and POST student endpoints.
- All six User CRUD endpoints.
- Input validation.
- Duplicate email validation.
- Invalid user ID validation.
- User not found responses.
- Unknown API endpoint handling.
- Database persistence after server restart.
- Existing Project 1 endpoint verification.

## HTTP Status Codes

| Code | Description |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Security Notes

- Database credentials are stored in `.env`.
- `.env` should not be committed to GitHub.
- Prisma handles database queries.
- Unique email constraints prevent duplicate email records.

---

## Project Summary

This project demonstrates practical backend development concepts, including:

- REST API development.
- HTTP methods and status codes.
- Request validation.
- Error handling.
- PostgreSQL database integration.
- Prisma ORM.
- Database migrations.
- CRUD operations.
- Persistent data storage.

---

**Developed as part of the DecodeLabs Backend Development Internship – Project 1 & Project 2.**
