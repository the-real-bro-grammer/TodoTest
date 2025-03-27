# Todo Test - Backend Developer Interview Prompt

![Todo App](https://img.shields.io/badge/Status-In_Progress-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

Welcome to the **Todo Test**, a project designed for evaluating backend development skills. This
repository uses **Next.js** as the framework, **Knex.js** for database interactions, and
**Postgres** as the database.

---

## 🚀 Features

-   **User Management:** Create, retrieve, update, and delete users.
-   **Organization Management:** Manage organizations and associate users.
-   **Task Management:** Assign tasks to users, projects, and organizations.
-   **API-Driven Architecture:** RESTful endpoints for easy integration.
-   **[Technical Documentation](https://regular-hedge-57f.notion.site/Group-ToDo-18a673297fc7803c9364fbfeda2d58a1)** Is listed here

---

## 🛠️ Tech Stack

-   **Next.js** - Frontend framework with server-side rendering
-   **Express.js** - Backend framework for API routing
-   **Knex.js** - SQL query builder
-   **Postgres** - Relational database
-   **TypeScript** - Typed JavaScript for better development experience

---

## 🏗️ Setup Instructions

### Prerequisites

-   Node.js >= 18
-   PostgreSQL
-   Git

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/todo-test.git
    cd todo-test
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the database connection in `knexfile.js`:

    ```javascript
    module.exports = {
        development: {
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'your_db_user',
                password: 'your_db_password',
                database: 'todo_test'
            }
        }
    };
    ```

4. Run database migrations:

    ```bash
    npx knex migrate:latest
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## 📚 API Endpoints

### User API

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/user/[id]` | Retrieve user by ID |
| DELETE | `/api/user/[id]` | Delete user by ID   |
| PUT    | `/api/user/[id]` | Update user details |

#### Example Request:

**GET /api/user/1**

```bash
curl -X GET http://localhost:3000/api/user/1
```

**Response**:

```json
{
    "id": 1,
    "email": "test@example.com",
    "passwordHash": "...",
    "passwordSalt": "..."
}
```

---

### Organization API

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| POST   | `/api/organization`      | Create a new organization   |
| GET    | `/api/organization/[id]` | Retrieve organization by ID |
| DELETE | `/api/organization/[id]` | Delete organization by ID   |
| PUT    | `/api/organization/[id]` | Update organization details |

---

### Task API

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/api/task`      | Create a new task   |
| GET    | `/api/task/[id]` | Retrieve task by ID |
| DELETE | `/api/task/[id]` | Delete task by ID   |
| PUT    | `/api/task/[id]` | Update task details |

---

## 📦 Deployment

### Build for Production

```bash
npm run build
npm run start
```

---

## 📜 License

This project is licensed under the MIT License.

---

## ✨ Examples

### Adding a User

```bash
curl -X POST http://localhost:3000/api/user \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "password": "securepassword"
}'
```

### Creating a Task

```bash
curl -X POST http://localhost:3000/api/task \
-H "Content-Type: application/json" \
-d '{
  "title": "New Task",
  "description": "A task description",
  "creatorId": 1,
  "projectId": 1
}'
```

---
