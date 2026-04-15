# SmartTutorET Backend – Full API Documentation

## Base URL

```
/api
```

---

# 🔐 AUTH ROUTES

### 1. Register User

**POST /api/auth/register**

Request:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

Description: Create a new user account.

---

### 2. Login

**POST /api/auth/login**

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "string",
    "email": "string",
    "role": "student|tutor|manager"
  }
}
```

Description: Authenticate user and return JWT token.

---

### 3. Verify Email

**GET /api/auth/verify/:token**
Description: Verify user email.

---

### 4. Forgot Password

**POST /api/auth/forgot-password**

Request:

```json
{
  "email": "string"
}
```

Description: Send reset password link.

---

### 5. Reset Password

**POST /api/auth/reset-password/:token**

Request:

```json
{
  "password": "string"
}
```

Description: Reset user password.

---

# 👤 USER ROUTES

### Get Current User

**GET /api/users/me**

Response:

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "role": "string"
}
```

Description: Get logged-in user profile.

---

### Get All Users (Admin)

**GET /api/users/all**

Response:

```json
[
  {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
]
```

Description: Fetch all users (admin only).

---

### Delete User (Admin)

**DELETE /api/users/:id**
Description: Delete a user by ID.

---

# 🎓 COURSE ROUTES

### Create Course (Tutor)

**POST /api/course/create**

Request:

```json
{
  "title": "string",
  "description": "string"
}
```

Response:

```json
{
  "message": "Course created"
}
```

Description: Approved tutors create courses.

---

### Enroll Course (Student)

**POST /api/course/enroll/:courseId**

Response:

```json
{
  "message": "Enrolled successfully"
}
```

Description: Student enrolls in a course.

---

# 💼 JOB ROUTES

### Get Jobs

**GET /api/jobs**

Response:

```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string"
  }
]
```

Description: Retrieve all tutor job posts.

---

# 👨‍🏫 TUTOR ROUTES

### Apply for Tutor Role

**POST /api/tutor/apply/:jobId**

Request:

```json
{}
```

Response:

```json
{
  "message": "Application submitted successfully",
  "application": {
    "_id": "string",
    "jobId": "string",
    "userId": "string",
    "status": "pending"
  }
}
```

Description: User applies for a tutor job.

---

# 🧑‍💼 MANAGER ROUTES

### Create Tutor Job

**POST /api/manager/job**

Request:

```json
{
  "title": "string",
  "description": "string"
}
```

Description: Manager creates tutor job post.

---

### Approve Tutor Application

**PUT /api/manager/approve/:applicationId**

Response:

```json
{
  "message": "Tutor application approved",
  "status": "approved"
}
```

Description: Manager approves tutor application.

---

### Reject Tutor Application

**PUT /api/manager/reject/:applicationId**

Response:

```json
{
  "message": "Tutor application rejected",
  "status": "rejected"
}
```

Description: Manager rejects tutor application.

---

### Get All Applications

**GET /api/manager/applications**

Response:

```json
[
  {
    "_id": "string",
    "userId": "string",
    "jobId": "string",
    "status": "pending|approved|rejected"
  }
]
```

Description: Get all tutor applications.

---

# 🔐 AUTH HEADER (IMPORTANT)

For protected routes:

```
Authorization: Bearer <token>
content-type:application/json
```