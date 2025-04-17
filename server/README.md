# Contacts App Server

This is the backend server for the Contacts application, built with Express.js and MongoDB.

## Technology Stack

- Node.js/Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started


### Prerequisites

- Node.js installed
- MongoDB connection string
- Environment variables set up

### Environment Variables

Create a `.env` file in the server root directory with the following variables:

```env
PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_EXPIRE=1d
JWT_SECRET=your_jwt_secret
ARCJET_KEY=your_arcjet_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. For production:
```bash
npm start
```

## API Endpoints

### Authentication

#### Register a new user
- **POST** `/api/auth/sign-up`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Success",
    "data": {
      "user": {
        "username": "string",
        "email": "string",
        "joining_date": "date"
      },
      "token": "jwt_token"
    }
  }
  ```

#### Login
- **POST** `/api/auth/sign-in`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "data": {
      "user": {
        "username": "string",
        "email": "string",
        "joining_date": "date"
      },
      "token": "jwt_token"
    }
  }
  ```

## Models

### User Model

```javascript
{
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
    ]
  },
  joining_date: {
    type: Date,
    required: true,
    default: Date.now
  }
}
```

## Security

### Arcjet Integration

The server uses Arcjet for advanced security and rate limiting features:

1. **Shield Protection**
   - Protects against common attacks like SQL injection
   - Running in LIVE mode (actively blocking threats)

2. **Bot Detection**
   - Blocks unauthorized bot traffic
   - Allows legitimate search engine bots (Google, Bing, etc.)
   - Running in LIVE mode

3. **Rate Limiting**
   - Token bucket algorithm implementation
   - Limits: 5 requests per 10 seconds
   - Maximum burst capacity: 10 requests
   - Tracks requests by IP address

### Environment Variables

Add this to your `.env` file:
```env
ARCJET_KEY=your_arcjet_key
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error description"
}
```

## Development

The server uses the following development tools:
- nodemon for hot reloading
- ESM modules (import/export syntax)
- MongoDB transactions for data integrity