# 📝 BlogVerse — Modern MERN Stack Blogging Platform

BlogVerse is a complete, feature-rich, full-stack blogging platform built using the MERN stack (MongoDB, Express, React, Node.js). It provides a sleek, responsive interface for users to register, manage their profiles, and write, update, read, or delete blog posts.

---

## 🚀 Key Features

*   **Secure Authentication**: User registration and login powered by `bcrypt` hashing and JSON Web Tokens (JWT) stored securely in HTTP-only cookies.
*   **State Management**: Seamless global state synchronization on the frontend using Redux Toolkit.
*   **Rich User Profiles**: Customizable user profiles with optional profile picture upload support handled by `multer`.
*   **Complete Blog CRUD**: Authorized users can create, edit, and delete their blog posts, complete with category categorization and estimated read times.
*   **Responsive Styling**: Fully responsive user interface crafted with Tailwind CSS and Lucide Icons.
*   **Concurrent Dev Environment**: Single-command development startup for both frontend and backend using `concurrently`.

---

## 🛠️ Tech Stack

### Frontend
*   **Core**: React (v18)
*   **State Management**: Redux Toolkit & React Redux
*   **Routing**: React Router DOM (v6) with Protected Route guard wrappers
*   **Styling**: Tailwind CSS & PostCSS
*   **HTTP Client**: Axios (configured with credentials for secure cookie management)
*   **Feedback**: React Toastify (for notifications) & React Loader Spinner

### Backend
*   **Core**: Node.js & Express
*   **Database**: MongoDB & Mongoose (ODM)
*   **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `cookie-parser`
*   **Security**: Password hashing via `bcrypt` & CORS configuration
*   **File Uploads**: `multer` middleware (for user profile pictures)
*   **Environment**: Dotenv for configuration management

---

## 📂 Repository Structure

```text
Blog-Website/
├── Backend/                    # Express server and database logic
│   ├── src/
│   │   ├── Database/           # MongoDB configuration using Mongoose
│   │   ├── features/
│   │   │   ├── users/          # User routes, schemas, controllers, and repositories
│   │   │   └── blogs/          # Blog CRUD routes, schemas, controllers, and repositories
│   │   ├── middlewares/        # Authentication guards and global error handlers
│   │   ├── utils/              # Helper utilities
│   │   └── app.js              # Express app config (CORS, Parsers, routes)
│   ├── server.js               # Database connection and server entrypoint
│   └── package.json            # Backend scripts and dependencies
│
└── frontend/                   # React Single Page Application (SPA)
    ├── public/                 # Static assets
    ├── src/
    │   ├── api/                # Axios instance configuration
    │   ├── components/         # Shared and feature-specific React components
    │   ├── Redux/              # Redux slices and store configuration
    │   ├── utils/              # Client-side utility functions
    │   ├── App.js              # React Router structure
    │   └── index.js            # Frontend entrypoint
    └── package.json            # React scripts and dependencies
```

---

## 🔌 API Endpoints Documentation

### User Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Authenticate user & set cookie | ❌ |
| `POST` | `/logout` | Clear auth cookies & terminate session | ❌ |
| `GET` | `/me` | Restore user session from JWT cookie |  |
| `PUT` | `/profile` | Update profile details (username, profile image) |  |

### Blog Routes (`/api/blog`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/` | Create a new blog post |  |
| `GET` | `/` | Fetch all blog posts | ❌ |
| `GET` | `/:id` | Fetch details of a single blog post | ❌ |
| `PUT` | `/:id` | Update an existing blog post |  |
| `DELETE` | `/:id` | Delete a blog post |  |

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (v16.x or higher)
*   npm (v7.x or higher)
*   MongoDB Instance (Atlas or Local)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Blog-Website
```

### 2. Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `Backend/` directory:
```env
PORT=8000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=1d
COOKIE_EXPIRES_IN=1
```

#### Frontend Configuration
Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

### 3. Install Dependencies
Run npm install in both directories:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🏃 Run the Application

You can launch both the **Backend API Server** and the **React Frontend Server** concurrently from the `Backend` directory:

```bash
cd Backend
npm run dev
```

*   **Backend Server** runs at: [http://localhost:8000](http://localhost:8000)
*   **Frontend Server** runs at: [http://localhost:3000](http://localhost:3000)
