# UstaBul Backend API

Complete Node.js/Express backend for the UstaBul platform - connecting skilled workers with employers.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ustabul
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start MongoDB:**
```bash
# Using MongoDB service
mongod

# Or if using MongoDB Compass, just open it
```

4. **Start the server:**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

5. **Verify server is running:**
Open browser and go to: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "UstaBul API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📁 Project Structure

```
backend/
├── controllers/        # Request handlers and business logic
│   ├── auth.controller.js
│   ├── worker.controller.js
│   ├── employer.controller.js
│   ├── job.controller.js
│   ├── application.controller.js
│   └── review.controller.js
├── middleware/        # Authentication and validation
│   └── auth.middleware.js
├── models/           # MongoDB schemas
│   ├── User.model.js
│   ├── WorkerProfile.model.js
│   ├── EmployerProfile.model.js
│   ├── Job.model.js
│   ├── Application.model.js
│   └── Review.model.js
├── routes/           # API route definitions
│   ├── auth.routes.js
│   ├── worker.routes.js
│   ├── employer.routes.js
│   ├── job.routes.js
│   ├── application.routes.js
│   └── review.routes.js
├── .env              # Environment variables
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies and scripts
├── server.js         # Application entry point
└── README.md         # This file
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)
- `PUT /update-profile` - Update profile (Protected)
- `POST /change-password` - Change password (Protected)

### Workers (`/api/workers`)
- `GET /profile` - Get worker profile (Protected)
- `POST /profile` - Create worker profile (Worker only)
- `PUT /profile` - Update worker profile (Worker only)
- `POST /portfolio` - Add portfolio item (Worker only)
- `PUT /portfolio/:itemId` - Update portfolio item (Worker only)
- `DELETE /portfolio/:itemId` - Delete portfolio item (Worker only)
- `POST /certificates` - Add certificate (Worker only)
- `DELETE /certificates/:certId` - Delete certificate (Worker only)
- `GET /:workerId/public` - Get public worker profile
- `GET /search` - Search workers

### Employers (`/api/employers`)
- `GET /profile` - Get employer profile (Protected)
- `POST /profile` - Create employer profile (Employer only)
- `PUT /profile` - Update employer profile (Employer only)
- `GET /:employerId/public` - Get public employer profile

### Jobs (`/api/jobs`)
- `GET /search` - Search jobs (Public)
- `GET /:jobId` - Get job details (Public)
- `POST /` - Create job (Employer only)
- `PUT /:jobId` - Update job (Employer only)
- `DELETE /:jobId` - Delete job (Employer only)
- `PATCH /:jobId/status` - Update job status (Employer only)
- `PATCH /:jobId/publish` - Publish job (Employer only)
- `PATCH /:jobId/close` - Close job (Employer only)
- `GET /employer/my-jobs` - Get employer's jobs (Employer only)
- `GET /worker/available` - Get available jobs (Worker only)

### Applications (`/api/applications`)
- `POST /` - Submit application (Worker only)
- `GET /worker/my-applications` - Get worker's applications (Worker only)
- `PATCH /:applicationId/withdraw` - Withdraw application (Worker only)
- `GET /employer/job/:jobId` - Get job applications (Employer only)
- `PATCH /:applicationId/status` - Update application status (Employer only)
- `POST /:applicationId/accept` - Accept application (Employer only)
- `POST /:applicationId/reject` - Reject application (Employer only)
- `GET /:applicationId` - Get application details (Protected)

### Reviews (`/api/reviews`)
- `POST /` - Create review (Protected)
- `GET /user/:userId` - Get user reviews (Protected)
- `GET /job/:jobId` - Get job reviews (Protected)
- `PUT /:reviewId/response` - Add response to review (Protected)
- `POST /:reviewId/report` - Report review (Protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a token:
1. Register or login via `/api/auth/register` or `/api/auth/login`
2. The response will include a `token` field
3. Include this token in subsequent requests:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}
```

### Example:
```javascript
// Login request
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.data.token;

// Use token in protected requests
const profileResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🗄️ Database Models

### User
- Basic authentication and user info
- User type (worker/employer/admin)
- Profile completion status

### WorkerProfile
- Skills and experience
- Portfolio items
- Certificates
- Location and availability
- Ratings and reviews

### EmployerProfile
- Company information
- Tax details
- Verification status
- Payment reliability
- Ratings

### Job
- Job details and requirements
- Budget and duration
- Location (with geospatial support)
- Status tracking
- Applications count

### Application
- Worker proposals
- Employer responses
- Status workflow
- Timestamps

### Review
- Ratings and comments
- Multi-aspect ratings
- Responses and disputes

## 🛠️ Development

### Running in development mode:
```bash
npm run dev
```

This uses nodemon for automatic server restart on file changes.

### Testing the API:
You can use:
- Postman
- Insomnia
- cURL
- Or the frontend application

### Common Issues:

**MongoDB connection error:**
```
Make sure MongoDB is running:
- Check if mongod service is active
- Or open MongoDB Compass
- Verify connection string in .env
```

**Port already in use:**
```
Change PORT in .env to a different value (e.g., 5001)
```

**JWT errors:**
```
Make sure JWT_SECRET in .env is set
Reset your token by logging in again
```

## 📦 NPM Scripts

```json
{
  "start": "node server.js",           // Production mode
  "dev": "nodemon server.js",          // Development mode
  "seed": "node seeders/seed.js"       // Seed database (if you create seed file)
}
```

## 🔄 Updating Frontend API URL

In your frontend `.env` file, make sure the API URL points to your backend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚦 API Response Format

All API responses follow this structure:

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description in Turkish",
  "errors": [] // Validation errors if any
}
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ustabul |
| JWT_SECRET | Secret key for JWT | your_secret_key_here |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment mode | development |

## 🎯 Next Steps

1. ✅ Backend is running
2. ✅ MongoDB is connected
3. ✅ API endpoints are working
4. 🔜 Test with your frontend
5. 🔜 Add more features as needed

## 💡 Tips

- Keep `.env` file secure and never commit it
- Use meaningful commit messages
- Test API endpoints before frontend integration
- Monitor MongoDB for data consistency
- Check server logs for debugging

## 🆘 Need Help?

If you encounter issues:
1. Check server logs in terminal
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check if ports are available
5. Review environment variables

---

**Happy Coding! 🎉**