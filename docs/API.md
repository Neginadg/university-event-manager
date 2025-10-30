# API Documentation

## Overview

This document describes the API endpoints for the University Event Management System.

## Base URLs

- **Backend API**: `http://localhost:5000/api/v1`
- **AI Service**: `http://localhost:8000/api/v1`

## Authentication

All API endpoints require authentication using JWT tokens obtained through university LDAP/SSO.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Backend API Endpoints

### Authentication

#### POST `/auth/login`
University LDAP/SSO login

**Request Body:**
```json
{
  "username": "student123",
  "password": "university_password"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "student123",
    "role": "student",
    "department": "Computer Science",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Events

#### GET `/events`
Get all events with optional filtering

**Query Parameters:**
- `department`: Filter by department
- `category`: Filter by event category
- `date`: Filter by date range
- `search`: Search in title/description

**Response:**
```json
{
  "events": [
    {
      "id": "event_id",
      "title": "AI Workshop",
      "description": "Introduction to Machine Learning",
      "startDateTime": "2025-11-15T10:00:00Z",
      "endDateTime": "2025-11-15T12:00:00Z",
      "department": "Computer Science",
      "category": "WORKSHOP",
      "location": "Room 101",
      "maxAttendees": 50,
      "currentAttendees": 25,
      "instructor": {
        "name": "Dr. Smith",
        "department": "Computer Science"
      }
    }
  ]
}
```

#### POST `/events` (Instructors only)
Create a new event

**Request Body:**
```json
{
  "title": "AI Workshop",
  "description": "Introduction to Machine Learning",
  "startDateTime": "2025-11-15T10:00:00Z",
  "endDateTime": "2025-11-15T12:00:00Z",
  "department": "Computer Science",
  "category": "WORKSHOP",
  "location": "Room 101",
  "maxAttendees": 50
}
```

#### PUT `/events/:id` (Instructors only)
Update an existing event

#### DELETE `/events/:id` (Instructors only)
Delete an event

### Attendance

#### POST `/events/:id/attend`
Register for an event (Students only)

**Response:**
```json
{
  "message": "Successfully registered for event",
  "attendanceId": "attendance_id"
}
```

#### DELETE `/events/:id/attend`
Unregister from an event (Students only)

#### GET `/events/:id/attendees` (Instructors only)
Get list of attendees for an event

### Analytics

#### GET `/analytics/events/:id` (Instructors only)
Get event analytics

**Response:**
```json
{
  "eventId": "event_id",
  "totalRegistrations": 45,
  "attendanceRate": 0.9,
  "departmentBreakdown": {
    "Computer Science": 30,
    "Engineering": 15
  },
  "registrationTrend": [
    {"date": "2025-11-01", "count": 10},
    {"date": "2025-11-02", "count": 15}
  ]
}
```

## AI Service Endpoints

### Chatbot

#### POST `/chatbot/message`
Send message to chatbot

**Request Body:**
```json
{
  "message": "I'm interested in AI events",
  "userId": "user_id",
  "sessionId": "session_id"
}
```

**Response:**
```json
{
  "response": "I found 3 AI-related events for you!",
  "sessionId": "session_id",
  "recommendations": [
    {
      "eventId": "event_id",
      "relevanceScore": 0.95,
      "reason": "Matches your Computer Science department and AI interests"
    }
  ]
}
```

### Recommendations

#### GET `/recommendations/events`
Get personalized event recommendations

**Query Parameters:**
- `userId`: User ID
- `limit`: Number of recommendations (default: 10)

**Response:**
```json
{
  "recommendations": [
    {
      "event": {
        "id": "event_id",
        "title": "Machine Learning Basics",
        "department": "Computer Science"
      },
      "score": 0.92,
      "reasons": [
        "Matches your department",
        "Similar to previously attended events"
      ]
    }
  ]
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "details": "Authentication failed with university LDAP"
  }
}
```

### Common Error Codes
- `INVALID_CREDENTIALS`: Authentication failed
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `VALIDATION_ERROR`: Request data validation failed
- `UNIVERSITY_SYSTEM_ERROR`: Issue with university system integration
