# Performance Review System API Documentation

## Overview

The Performance Review System is a comprehensive platform for managing employee performance reviews. This document provides detailed information about all API endpoints, data models, and their relationships.

## Entity Relationships

### Employee
- Has one Department (Many-to-One)
- Has one Position (Many-to-One)
- Has one Role (Many-to-One)
- Has many Reviews as reviewer (One-to-Many)
- Has many Reviews as reviewee (One-to-Many)
- Has many Review Requests as reviewer (One-to-Many)
- Has many Review Requests as reviewee (One-to-Many)
- Has many Assignments as manager (One-to-Many)
- Has many Assignments as employee (One-to-Many)

### Review Cycle
- Has many Assignments (One-to-Many)
- Has many Review Requests (One-to-Many)
- Has many Reviews (One-to-Many)

## Base URL
```
http://localhost:3000
```

## Authentication and Authorization

### Login
```http
POST /auth/login
```
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "user": {
    "id": "number",
    "email": "string",
    "role": {
      "role_name": "string"
    },
    "first_name": "string",
    "last_name": "string",
    "department": {
      "department_id": "number",
      "department_name": "string"
    },
    "position": {
      "position_id": "number",
      "position_name": "string"
    }
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Missing email or password

## Employees

### Get All Employees
```http
GET /employees
```
Returns a list of all employees.

**Query Parameters:**
- `department_id` (optional): Filter by department
- `position_id` (optional): Filter by position
- `role_id` (optional): Filter by role
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "data": [
    {
      "employee_id": "number",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "department": {
        "department_id": "number",
        "department_name": "string",
        "description": "string"
      },
      "position": {
        "position_id": "number",
        "position_name": "string",
        "description": "string"
      },
      "role": {
        "role_id": "number",
        "role_name": "string",
        "description": "string"
      },
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "last_page": "number"
  }
}
```

### Create Employee
```http
POST /employees
```
Creates a new employee. Requires admin role.

**Request Body:**
```json
{
  "first_name": "string (required)",
  "last_name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min: 8 chars)",
  "department_id": "number (required)",
  "position_id": "number (required)",
  "role_id": "number (required)"
}
```

**Validation Rules:**
- `email`: Must be unique and valid email format
- `password`: Minimum 8 characters
- `department_id`: Must exist in departments table
- `position_id`: Must exist in positions table
- `role_id`: Must exist in roles table

**Response:**
```json
{
  "employee_id": "number",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "department": {
    "department_id": "number",
    "department_name": "string"
  },
  "position": {
    "position_id": "number",
    "position_name": "string"
  },
  "role": {
    "role_id": "number",
    "role_name": "string"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `403 Forbidden`: User not authorized
- `409 Conflict`: Email already exists

## Review Cycles

### Get All Review Cycles
```http
GET /review-cycles
```
Returns a list of all review cycles.

**Query Parameters:**
- `status` (optional): Filter by status (draft, active, completed)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "data": [
    {
      "cycle_id": "number",
      "start_date": "string (ISO 8601)",
      "end_date": "string (ISO 8601)",
      "status": "draft | active | completed",
      "assignments_count": "number",
      "reviews_count": "number",
      "completion_rate": "number",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "last_page": "number"
  }
}
```

### Create Review Cycle
```http
POST /review-cycles
```
Creates a new review cycle. Requires admin role.

**Request Body:**
```json
{
  "start_date": "string (ISO 8601) (required)",
  "end_date": "string (ISO 8601) (required)",
  "status": "draft | active | completed (default: draft)",
  "assignments": [
    {
      "manager_id": "number (required)",
      "employee_id": "number (required)"
    }
  ]
}
```

**Validation Rules:**
- `start_date`: Must be a future date
- `end_date`: Must be after start_date
- `assignments`: 
  - `manager_id`: Must exist in employees table
  - `employee_id`: Must exist in employees table
  - Manager and employee cannot be the same person

**Response:**
```json
{
  "cycle_id": "number",
  "start_date": "string (ISO 8601)",
  "end_date": "string (ISO 8601)",
  "status": "draft",
  "assignments": [
    {
      "assignment_id": "number",
      "manager": {
        "employee_id": "number",
        "first_name": "string",
        "last_name": "string"
      },
      "employee": {
        "employee_id": "number",
        "first_name": "string",
        "last_name": "string"
      }
    }
  ],
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `403 Forbidden`: User not authorized
- `409 Conflict`: Overlapping review cycle dates

## Reviews

### Get All Reviews
```http
GET /reviews
```
Returns a list of reviews based on user's role and permissions.

**Query Parameters:**
- `cycle_id` (optional): Filter by review cycle
- `reviewer_id` (optional): Filter by reviewer
- `reviewee_id` (optional): Filter by reviewee
- `status` (optional): Filter by status (pending, submitted)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "data": [
    {
      "review_id": "number",
      "reviewer": {
        "employee_id": "number",
        "first_name": "string",
        "last_name": "string",
        "position": {
          "position_name": "string"
        }
      },
      "reviewee": {
        "employee_id": "number",
        "first_name": "string",
        "last_name": "string",
        "position": {
          "position_name": "string"
        }
      },
      "review_cycle": {
        "cycle_id": "number",
        "start_date": "string (ISO 8601)",
        "end_date": "string (ISO 8601)"
      },
      "status": "pending | submitted",
      "ratings": [
        {
          "question_id": "number",
          "question_text": "string",
          "rating": "number",
          "comment": "string"
        }
      ],
      "overall_comment": "string",
      "submitted_at": "string (ISO 8601)",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "last_page": "number"
  }
}
```

### Submit Review
```http
POST /reviews/:id/submit
```
Submits a completed review.

**Request Body:**
```json
{
  "ratings": [
    {
      "question_id": "number",
      "rating": "number (1-5)",
      "comment": "string"
    }
  ],
  "overall_comment": "string"
}
```

**Validation Rules:**
- All questions must be answered
- Ratings must be between 1 and 5
- Overall comment is required
- Review must be within the review cycle's start and end dates

**Response:**
```json
{
  "review_id": "number",
  "status": "submitted",
  "ratings": [
    {
      "question_id": "number",
      "rating": "number",
      "comment": "string"
    }
  ],
  "overall_comment": "string",
  "submitted_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `403 Forbidden`: User not authorized
- `404 Not Found`: Review not found
- `409 Conflict`: Review already submitted

## Departments

### Get All Departments
```http
GET /departments
```
Returns a list of all departments.

**Response:**
```json
{
  "data": [
    {
      "department_id": "number",
      "department_name": "string",
      "description": "string",
      "employee_count": "number",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "meta": {
    "total": "number"
  }
}
```

### Create Department
```http
POST /departments
```
Creates a new department. Requires admin role.

**Request Body:**
```json
{
  "department_name": "string (required, unique)",
  "description": "string"
}
```

**Validation Rules:**
- `department_name`: Must be unique

**Response:**
```json
{
  "department_id": "number",
  "department_name": "string",
  "description": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

## Positions

### Get All Positions
```http
GET /positions
```
Returns a list of all positions.

**Query Parameters:**
- `department_id` (optional): Filter by department

**Response:**
```json
{
  "data": [
    {
      "position_id": "number",
      "position_name": "string",
      "description": "string",
      "department": {
        "department_id": "number",
        "department_name": "string"
      },
      "employee_count": "number",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ],
  "meta": {
    "total": "number"
  }
}
```

### Create Position
```http
POST /positions
```
Creates a new position. Requires admin role.

**Request Body:**
```json
{
  "position_name": "string (required, unique)",
  "description": "string",
  "department_id": "number (required)"
}
```

**Validation Rules:**
- `position_name`: Must be unique within department
- `department_id`: Must exist in departments table

**Response:**
```json
{
  "position_id": "number",
  "position_name": "string",
  "description": "string",
  "department": {
    "department_id": "number",
    "department_name": "string"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

## Authentication

All endpoints except `/auth/login` require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

### Token Expiration
- Access tokens expire after 24 hours
- When a token expires, the client must obtain a new token by logging in again

## Rate Limiting

The API implements rate limiting to prevent abuse. Limits are:
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

## Pagination

All list endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes metadata:
```json
{
  "data": [...],
  "meta": {
    "total": "number",
    "page": "number",
    "last_page": "number"
  }
}
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["validation error messages"],
  "error": "Bad Request"
}
```

#### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

#### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden",
  "error": "Forbidden"
}
```

#### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

#### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Resource already exists",
  "error": "Conflict"
}
```

#### 422 Unprocessable Entity
```json
{
  "statusCode": 422,
  "message": ["validation error messages"],
  "error": "Unprocessable Entity"
}
```

#### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too many requests",
  "error": "Too Many Requests",
  "retryAfter": "number (seconds)"
}
```

#### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Best Practices

1. **Authentication**
   - Always use HTTPS in production
   - Store tokens securely
   - Never send tokens in URL parameters

2. **Rate Limiting**
   - Implement exponential backoff when rate limited
   - Cache responses when appropriate

3. **Error Handling**
   - Always check for error responses
   - Handle network errors gracefully
   - Implement retry logic for transient failures

4. **Data Validation**
   - Validate all input on both client and server
   - Sanitize user input
   - Use appropriate data types

## Notes

- All timestamps are in ISO 8601 format
- All IDs are integers
- All endpoints return JSON responses
- All POST/PATCH requests expect JSON request bodies
- All endpoints are protected by JWT authentication except for the login endpoint
- Database constraints ensure referential integrity
- Soft deletes are implemented for all entities
- Audit logs track all changes to entities
