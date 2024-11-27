
# Bean Scene Backend API

This project serves as the backend for the Bean Scene mobile application, providing RESTful API endpoints for user authentication, menu items, and ticket orders.

---

## Table of Contents

- [Setup](#setup)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Token Authentication](#token-authentication)
- [Testing with curl](#testing-with-curl)
- [Troubleshooting](#troubleshooting)

---

## Setup

### Prerequisites

- **Node.js** 
- **MongoDB**
- **Git Bash** or **WSL** (for testing with `curl` commands)

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <repository_url>
   cd Bean-Scene-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running. To check on WSL:
  ```
  sudo systemctl status mongod
  ```
  If it is not:
  ```
  sudo systemctl start mongod
  ```

  By default, the application connects to:
   ```
   mongodb://localhost:27017/restaurantdb
   ```

---

## Seeding the Server - Dev Only

1. Navigate to seed.js file in a new terminal
  ```
  cd ./Bean-Scene-Backend/Database/Data
  ```

2. Seed the database by running seed.js
  ```
  node seed.js
  ```

## Starting the Server

1. Start the server with `nodemon`:
   ```bash
   nodemon app.js
   ```

2. If successful, you should see output similar to:
   ```
   Server is running on port 3000
   MongoDB connected
   ```

---

## API Endpoints

### 1. **User Registration**

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

---

### 2. **User Login**

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN"
  }
  ```

---

### 3. **Token Authentication**

- **URL**: `/api/auth/auth`
- **Method**: `POST`
- **Headers**:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "message": "Token is valid",
    "user": {
      "id": "user_id"
    }
  }
  ```

---

## Testing with `curl`

### 1. Register a User
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpassword"}' \
http://localhost:3000/api/auth/register
```

---

### 2. Login a User
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpassword"}' \
http://localhost:3000/api/auth/login
```

---

### 3. Authenticate a Token
Replace `<JWT_TOKEN>` with the token received from the login response:
```bash
curl -X POST -H "Authorization: Bearer <JWT_TOKEN>" \
http://localhost:3000/api/auth/auth
```

---

## Troubleshooting

### MongoDB Not Connected
- Ensure MongoDB is running locally:
  ```bash
  mongod
  ```
- Check that the connection string in `app.js` is correct:
  ```javascript
  mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true });
  ```

---

### Invalid Token
- Ensure the `Authorization` header is correctly formatted:
  ```
  Bearer <JWT_TOKEN>
  ```

---

### Server Not Starting
- Check for errors in the terminal.
- Ensure all dependencies are installed with:
  ```bash
  npm install
  ```

---
