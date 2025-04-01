# Task Management API

A RESTful API for managing tasks with user authentication.

## Features

- User authentication (JWT-based)
- CRUD operations for tasks
- SQLite database
- RESTful API design

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

#### Register User

- **POST** `/api/auth/register`
- Body:

```json
{
  "username": "string",
  "password": "string"
}
```

#### Login User

- **POST** `/api/auth/login`
- Body:

```json
{
  "username": "string",
  "password": "string"
}
```

### Tasks

#### Get All Tasks

- **GET** `/api/tasks`
- Headers: `Authorization: Bearer <token>`

#### Create Task

- **POST** `/api/tasks`
- Headers: `Authorization: Bearer <token>`
- Body:

```json
{
  "title": "string",
  "description": "string (optional)",
  "status": "pending|in-progress|completed (optional)"
}
```

#### Update Task

- **PUT** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Body:

```json
{
  "title": "string",
  "description": "string (optional)",
  "status": "pending|in-progress|completed (optional)"
}
```

#### Delete Task

- **DELETE** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`

## Testing

A Postman collection is included in the repository. To use it:

1. Import the `postman_collection.json` file into Postman
2. Set up environment variables:
   - `base_url`: Your API base URL (default: http://localhost:3000)
   - `token`: JWT token received after login
   - `task_id`: ID of the task to update/delete
