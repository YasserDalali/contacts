# API Tests Documentation

This document provides sample requests for testing all API endpoints. Use a tool like Postman or cURL to test these endpoints.

Base URL: `http://localhost:5500/api`

## Authentication Routes

### 1. Test Authentication
```http
GET /auth/
Response: "test passed"
```

### 2. Sign Up
```http
POST /auth/sign-up
Content-Type: application/json

{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Test123!@#"
}

Expected Response (200):
{
    "message": "Success",
    "data": {
        "user": {
            "_id": "user_id",
            "username": "johndoe",
            "email": "john@example.com",
            "joining_date": "2024-03-14T12:00:00.000Z"
        },
        "token": "jwt_token_here"
    }
}
```

### 3. Sign In
```http
POST /auth/sign-in
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "Test123!@#"
}

Expected Response (200):
{
    "message": "Login successful",
    "data": {
        "user": {
            "_id": "user_id",
            "username": "johndoe",
            "email": "john@example.com"
        },
        "token": "jwt_token_here"
    }
}
```

## Contact Routes

### 1. Get All Contacts
```http
GET /contacts
Authorization: Bearer your_jwt_token

Expected Response (200):
{
    "data": [
        {
            "_id": "contact_id_1",
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "+1234567890"
        },
        {
            "_id": "contact_id_2",
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "+1987654321"
        }
    ]
}
```

### 2. Get Contact by ID
```http
GET /contacts/:id
Authorization: Bearer your_jwt_token

Expected Response (200):
{
    "data": {
        "_id": "contact_id_1",
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "+1234567890",
        "notes": []
    }
}
```

### 3. Create Contact
```http
POST /contacts
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1122334455",
    "address": "123 Main St, City, Country"
}

Expected Response (201):
{
    "message": "Contact created successfully",
    "data": {
        "_id": "new_contact_id",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "phone": "+1122334455",
        "address": "123 Main St, City, Country",
        "notes": []
    }
}
```

### 4. Edit Contact
```http
PUT /contacts/:id/edit
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
    "name": "Alice Johnson Updated",
    "email": "alice.updated@example.com",
    "phone": "+1122334455"
}

Expected Response (200):
{
    "message": "Contact updated successfully",
    "data": {
        "_id": "contact_id",
        "name": "Alice Johnson Updated",
        "email": "alice.updated@example.com",
        "phone": "+1122334455"
    }
}
```

### 5. Add Note to Contact
```http
PUT /contacts/contact/:id/addnote
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
    "note": "Meeting scheduled for next week"
}

Expected Response (200):
{
    "message": "Note added successfully",
    "data": {
        "_id": "contact_id",
        "name": "Alice Johnson",
        "notes": [
            {
                "_id": "note_id",
                "content": "Meeting scheduled for next week",
                "createdAt": "2024-03-14T12:00:00.000Z"
            }
        ]
    }
}
```

### 6. Delete Contact
```http
DELETE /contacts/:id
Authorization: Bearer your_jwt_token

Expected Response (200):
{
    "message": "Contact deleted successfully"
}
```

## Error Responses

### 1. Authentication Errors
```http
401 Unauthorized:
{
    "message": "Invalid credentials"
}

403 Forbidden:
{
    "message": "Access denied"
}
```

### 2. Validation Errors
```http
400 Bad Request:
{
    "message": "Validation error",
    "errors": {
        "email": "Invalid email format",
        "password": "Password must be at least 6 characters"
    }
}
```

### 3. Not Found
```http
404 Not Found:
{
    "message": "Resource not found"
}
```

### 4. Rate Limiting (Arcjet)
```http
429 Too Many Requests:
{
    "message": "Too Many Requests",
    "retryAfter": 60
}
```

## Testing Tips

1. First sign up and get a JWT token
2. Use the token in the Authorization header for all protected routes
3. Test error cases by:
   - Sending invalid data
   - Using expired/invalid tokens
   - Exceeding rate limits
   - Requesting non-existent resources
4. Test success cases with valid data
5. Verify response formats match the expected schemas 