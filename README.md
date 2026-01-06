# NodeJS Microservices Task App

A simple microservices application built with **Node.js**, **Express**, **MongoDB**, and **RabbitMQ**. It demonstrates inter-service communication where creating a task asynchronously triggers events (e.g., for notifications).

## 🚀 Services

The application consists of three main microservices:

1.  **User Service** (`user-service`):
    - Manages user profiles.
    - Runs on Port `3000`.
2.  **Task Service** (`task-service`):
    - Manages task creation and retrieval.
    - Publishes events to RabbitMQ when a task is created.
    - Runs on Port `3001`.
3.  **Notification Service** (`notifiacation-service`):
    - Intended consumer for task events to send notifications.
    - Runs on Port `3002`.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Containerized)
- **Message Broker**: RabbitMQ
- **Orchestration**: Docker Compose

## 📦 Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)

## 🏃‍♂️ Running the app

You can spin up the entire architecture (databases, broker, and services) with a single command.

1.  **Start Services**:

    ```bash
    docker-compose up --build
    ```

2.  **Verify Status**:
    - **RabbitMQ Admin**: `http://localhost:15672` (Default User/Pass: `guest`/`guest`)
    - **User Service**: `http://localhost:3000`
    - **Task Service**: `http://localhost:3001`

## 📡 API Endpoints

### User Service (`http://localhost:3000`)

| Method | Endpoint | Description       | Body Params                                       |
| ------ | -------- | ----------------- | ------------------------------------------------- |
| POST   | `/user`  | Create a new user | `{ "name": "John", "email": "john@example.com" }` |
| GET    | `/user`  | List all users    | -                                                 |

### Task Service (`http://localhost:3001`)

| Method | Endpoint     | Description    | Body Params                                                      |
| ------ | ------------ | -------------- | ---------------------------------------------------------------- |
| POST   | `/api/tasks` | Create a task  | `{ "title": "Buy Milk", "description": "...", "userId": "..." }` |
| GET    | `/api/tasks` | List all tasks | -                                                                |

_> **Note**: Creating a task sends a message to the `task_queue` in RabbitMQ._

## 📂 Project Structure

```bash
NodeJS TaskApp/
├── docker-compose.yml       # Orchestrates Mongo, RabbitMQ, and Node Apps
├── user-service/            # User logic & DB
├── task-service/            # Task logic & RabbitMQ Producer
└── notifiacation-service/   # Notification logic
```

## 📝 Configuration

Environment variables are handled via `docker-compose.yml` for container execution.

- **MongoDB**: `mongodb://mongo:27017/<service-name>`
- **RabbitMQ**: `amqp://rabbitmq`

## 📄 License

This project is licensed under the ISC License.
