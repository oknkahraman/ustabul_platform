# UstaBul Backend API

Production-ready Node.js + Express + MongoDB backend for the UstaBul platform.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running locally:
```bash
# On macOS
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 4. Seed Database (Optional)
```bash
npm run seed
```
This will create:
- 5 Employers in Istanbul, Ankara, İzmir
- 10 Workers with various skills
- 20 Jobs across different locations

Test credentials:
- Employer: `employer1@ustabul.com` / `123456`
- Worker: `worker1@ustabul.com` / `123456`

### 5. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Employer Profile
- `PUT /api/profile/employer` - Update employer profile (protected, employer only)
- `GET /api/profile/me` - Get current user's profile (protected)

### Worker Profile
- `PUT /api/profile/worker` - Update worker profile (protected, worker only)
- `GET /api/profile/me` - Get current user's profile (protected)

### Jobs
- `POST /api/jobs` - Create job (protected, employer only)
- `GET /api/jobs` - List jobs (supports city/district filters)
  - Query params: `?city=İstanbul&district=Kadıköy&skills=Elektrik`
- `GET /api/jobs/:id` - Get single job
- `GET /api/jobs/my-jobs` - Get employer's jobs (protected, employer only)
- `DELETE /api/jobs/:id` - Delete job (protected, employer only)

### Applications
- `POST /api/applications` - Apply for job (protected, worker only)
- `GET /api/applications/job/:jobId` - Get job applications (protected, employer only)
- `GET /api/applications/my-applications` - Get worker's applications (protected, worker only)
- `PUT /api/applications/:id/approve` - Approve application (protected, employer only)
- `PUT /api/applications/:id/reject` - Reject application (protected, employer only)

## 🛠️ Technical Stack

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose v8+** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

## 🔐 Authentication

All protected routes require a Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

## ⚙️ Key Features

✅ **Mongoose v8+ Compatible** - No deprecated `next()` in pre-save hooks  
✅ **Auto Timestamps** - Uses `{ timestamps: true }` instead of manual fields  
✅ **Proper Error Handling** - All controllers wrapped in try/catch  
✅ **Role-Based Authorization** - Separate permissions for workers/employers  
✅ **Location-Based Filtering** - Filter jobs by city/district  
✅ **Turkish Error Messages** - User-friendly responses  

## 📂 Project Structure

```
backend/
├── controllers/       # Business logic
├── models/           # Mongoose schemas
├── routes/           # API routes
├── middleware/       # Auth & validation
├── utils/            # Helpers & seed script
├── server.js         # Entry point
├── package.json      # Dependencies
└── .env             # Environment config
```

## 🧪 Testing the API

Use Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","fullName":"Test User","role":"worker"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Get jobs
curl http://localhost:5000/api/jobs?city=İstanbul
```

## 🚨 Common Issues

**MongoDB connection error:**
- Make sure MongoDB is running
- Check MONGODB_URI in .env

**JWT errors:**
- Verify JWT_SECRET is set in .env
- Check token format: `Bearer <token>`

**Port already in use:**
- Change PORT in .env
- Kill process: `lsof -ti:5000 | xargs kill`

## 📝 License

MIT