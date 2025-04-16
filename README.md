

---


# task-api-nest-fulltext

A task management API built with **NestJS**, featuring **PostgreSQL full-text search**, **JWT-based authentication**, and **task assignment with weight-based priority**. This project is designed to test and demonstrate full-text search capabilities using PostgreSQL with NestJS and TypeORM.

## 🔥 Features

- **User Authentication:** Secure registration and login with JWT.
- **Task Management:** CRUD operations for tasks (title, description, weight).
- **Task Assignment:** Assign tasks to specific users.
- **Full-Text Search:** Search tasks by title or description using `tsvector` and `to_tsquery`.
- **Database:** PostgreSQL powered by TypeORM.
- **Validation:** Uses `class-validator` for input validation.
- **Security:** Passwords hashed with bcrypt.

---

## 📦 Prerequisites

- Node.js v18+
- PostgreSQL
- Nest CLI (`npm i -g @nestjs/cli`)
- npm or yarn

---

## ⚙️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/worashf/task-api-nest-fulltext.git
cd task-api-nest-fulltext
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure PostgreSQL:**

- Create a database named `task_management`.
- Update database credentials in `src/app.module.ts` and `src/data-source.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'task_management',
  autoLoadEntities: true,
  synchronize: false,
});
```

4. **Run Migrations:**

```bash
npm run typeorm migration:run -- -d src/data-source.ts
```

5. **Start the development server:**

```bash
npm run start:dev
```

> App will be available at `http://localhost:3000`

---

## 🗂 Project Structure

```
src/
├── auth/                     # Auth module (JWT, login/register)
├── tasks/                    # Tasks module (CRUD, search, assignment)
│   ├── dto/                  
│   ├── task.entity.ts        # Task entity with full-text search
│   ├── tasks.controller.ts   
│   ├── tasks.service.ts      
│   └── tasks.module.ts       
├── users/                    # User management
├── migrations/               # DB migrations
├── data-source.ts            # TypeORM config
└── app.module.ts             # Root module
```

---

## 🧪 API Endpoints

### 🔐 Authentication

- `POST /auth/register`  
  Register a new user  
  Body:  
  ```json
  { "username": "string", "password": "string" }
  ```

- `POST /auth/login`  
  Login and receive a JWT  
  Body:  
  ```json
  { "username": "string", "password": "string" }
  ```

### ✅ Tasks (Protected Routes)

> All task endpoints require a `Bearer token` in the `Authorization` header.

- `POST /tasks` – Create a task  
- `GET /tasks` – List all tasks  
- `GET /tasks/search?query=term` – Full-text search  
- `GET /tasks/:id` – Get task by ID  
- `PUT /tasks/:id` – Update task  
- `DELETE /tasks/:id` – Delete task

---

## 💻 Example Usage

```bash
# Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
# Save the returned access_token

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"This is a test","weight":5,"assignedToId":1}'

# Search tasks
curl -X GET "http://localhost:3000/tasks/search?query=test" \
  -H "Authorization: Bearer <your-token>"
```

---

## 🔎 Full-Text Search Details

Utilizes PostgreSQL full-text search with:

- `tsvector` column on `Task` entity
- `GIN` index for fast lookup
- Search supports:
  - Exact terms (`test`)
  - Multi-term queries (`test task`)
  - Prefix matching (`test:*`)
- Results are ranked using `ts_rank`

---

## 🚀 Production Notes

- Use `.env` and `@nestjs/config` to store secrets
- Use `synchronize: false` with migrations
- Monitor FTS performance for large data
- Consider adding:
  - Rate limiting
  - CORS config
  - Logging (e.g., `winston`)

---

## 🤝 Contributing

PRs and issues are welcome! Let’s improve this template together.

---

## 📄 License

MIT © [worashf](https://github.com/worashf)


Let me know if you want to auto-generate this into a real `README.md` file or want deployment setup for Render, Railway, or VPS.