# MERN Task

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing cars and categories with an admin panel.

## Tech Stack
- **Frontend**: React, Redux Toolkit, TailwindCSS, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB with Mongoose ORM

## Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/abdulrehman1363/mern-task.git
   cd mern-task/backend
2. Install Dependencies
   ```bash
   npm install
3. Create .env file in the root and paste the below
   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern_task
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
4. Run the project
   ```bash
   npm start

### Frontend Setup

1. Move to Frontend Folder
   ```bash
   cd mern-task/backend
2. Install Dependencies
   ```bash
   npm install
3. Run the project
   ```bash
   npm run dev
