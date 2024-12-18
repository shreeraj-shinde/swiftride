# `/users/register`

## Description

The `/users/register` endpoint allows new users to create an account in the system. By providing necessary details such as email, full name, and password, a new user account is created and securely stored.

## Request

### Method

`POST`

### URL

`/users/register`

### Headers

- `Content-Type: application/json`

### Request Body

The request body must be a JSON object containing the following **required** fields:

- `email` (string): The user's email address. Must be a valid and unique email.
- `fullName` (string): The user's full name.
  - `firstName` (string): The user's First name.
  - `lastName` (string): The user's Last name.
- `password` (string): The user's password. Must meet security requirements (e.g., minimum length, complexity).

#### Example Request Body

```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "SecurePassw0rd!"
}
```

{
"message": "User registered successfully",
"userId": "abc123xyz"
}{
"error": "Invalid email format"
}{
"error": "Email is already in use"
}{
"error": "An unexpected error occurred. Please try again later."
}