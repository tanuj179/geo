# Geo Data App

## Project Overview

A full-stack geospatial data management application with authentication features. Users can register, log in, and interact with geospatial data on a dynamic dashboard. 

### Implemented Features
- Basic user registration and login functionality.
- User dashboard for managing geospatial data.
- MongoDB as the database for storing user and geospatial data.

### Pending Enhancements
- Integration of Leaflet for interactive maps.
- Drawing tools integration for geospatial data manipulation.

## Technologies

- Backend: Node.js, Express.js, MongoDB
- Frontend: Next.js, TypeScript
- Authentication: JSON Web Tokens (JWT)

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- MongoDB Atlas Account (for hosting MongoDB in the cloud)
- Vercel Account (for deployment)

### Screenshots

- **Landing Page**
  
  ![Landing Page](https://github.com/user-attachments/assets/7c488e87-3c80-47de-adcb-5239cf955cd2)

- **Register Page**
  
  ![Register Page](https://github.com/user-attachments/assets/47c78f00-4277-4bb5-a79a-28111c82e01e)

- **Login Page**
  
  ![Login Page](https://github.com/user-attachments/assets/47e6ab93-60da-418a-b328-7e21363a928c)

- **Dashboard Page**
  
  ![Dashboard Page](https://github.com/user-attachments/assets/b5f84b70-b98e-484d-b48a-8b69eda69a0c)

---

## Backend Setup

1. Navigate to Backend Directory
   cd backend

2. Install Backend Dependencies
   npm install

3. Set Up Environment Variables

   Create a .env file in the backend directory:
   touch .env

   Add the following environment variables to the .env file:
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-jwt-secret

   - MONGODB_URI: Replace your-mongodb-atlas-connection-string with your MongoDB Atlas connection string (see MongoDB Atlas Setup).
   - JWT_SECRET: Replace your-jwt-secret with a secure, random string for JWT authentication.

4. Start the Backend Server
   npm start

   The backend server should now be running at http://localhost:5000.

---

## Frontend Setup

1. Navigate to Frontend Directory
   cd ../frontend

2. Install Frontend Dependencies
   npm install

3. Set Up Environment Variables

   Create a .env.local file in the frontend directory:
   touch .env.local

   Add the following environment variables to the .env.local file:
   NEXT_PUBLIC_API_URL=http://localhost:5000/api

4. Start the Frontend Development Server
   npm run dev

   The frontend application should now be running at http://localhost:3000.

---

## MongoDB Atlas Setup

Since we're deploying the application to Vercel, we need a cloud-hosted MongoDB instance. Follow these steps to migrate your local MongoDB database to MongoDB Atlas.

1. Sign Up for MongoDB Atlas

   - Visit MongoDB Atlas and sign up for a free account.

2. Create a New Cluster

   - Click on Build a Cluster and select the free tier.

3. Configure Cluster

   - Choose your preferred cloud provider and region.

4. Create a Database User

   - Under Database Access, click Add New Database User.
   - Set a username and password (make note of these for the connection string).

5. Whitelist IP Address

   - Under Network Access, click Add IP Address.
   - For development purposes, you can allow access from anywhere:
     0.0.0.0/0

     - Note: For production, it's recommended to specify exact IP addresses for security.

6. Get the Connection String

   - In your cluster view, click Connect > Connect Your Application.
   - Copy the connection string. It will look like:
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

7. Update .env File

   Replace your-mongodb-atlas-connection-string in your .env file with the connection string from MongoDB Atlas, replacing <username>, <password>, and <dbname> with your credentials and desired database name.

---

## Deployment Instructions

### Deploying to Vercel

1. Push Code to Git Repository

   Ensure your code is committed and pushed to a Git repository such as GitHub, GitLab, or Bitbucket.

2. Deploy Backend to Vercel

   1. Create a vercel.json File in Backend

      In the backend directory, create a vercel.json file:
      touch vercel.json

      Add the following configuration to vercel.json:
      {
        "version": 2,
        "builds": [
          { "src": "index.js", "use": "@vercel/node" }
        ],
        "routes": [
          { "src": "/(.*)", "dest": "index.js" }
        ]
      }

   2. Update package.json Scripts

      Ensure your package.json in the backend directory has a start script:
      "scripts": {
        "start": "node index.js"
      }

   3. Import Backend Project into Vercel

      - Log in to your Vercel account.
      - Click New Project and select your backend repository.
      - Configure the project:
        - Root Directory: backend
        - Leave other settings as default.
      - Click Import.

   4. Set Environment Variables in Vercel

      - After importing, go to Settings > Environment Variables.
      - Add the following variables:

        | Key           | Value                                |
        |---------------|--------------------------------------|
        | PORT          | 5000                                 |
        | MONGODB_URI   | your-mongodb-atlas-connection-string |
        | JWT_SECRET    | your-jwt-secret                      |

   5. Deploy the Backend

      - Click Deploy and wait for the deployment to finish.
      - Note the backend URL provided by Vercel (e.g., https://your-backend.vercel.app).

3. Update Frontend Environment Variables

   In the frontend/.env.local file, update NEXT_PUBLIC_API_URL to point to your deployed backend:
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api

4. Deploy Frontend to Vercel

   1. Import Frontend Project into Vercel

      - Click New Project and select your frontend repository.
      - Configure the project:
        - Framework Preset: Next.js
        - Root Directory: frontend
      - Click Import.

   2. Set Environment Variables in Vercel

      - Go to Settings > Environment Variables.
      - Add the following variable:

        | Key                   | Value                                  |
        |-----------------------|----------------------------------------|
        | NEXT_PUBLIC_API_URL   | https://your-backend.vercel.app/api   |

   3. Deploy the Frontend

      - Click Deploy and wait for the deployment to finish.
      - Your application should now be accessible via the frontend Vercel URL.

---

## Running the Application Locally

1. Start the Backend Server

   In the backend directory:
   cd backend
   npm start

2. Start the Frontend Server

   In a new terminal window, navigate to the frontend directory:
   cd frontend
   npm run dev

3. Access the Application

   Open your browser and navigate to http://localhost:3000.

---

## Additional Notes

- Environment Variables

  - Never commit your .env files to version control.
  - Use .gitignore to exclude them.

- CORS Configuration

  - Ensure your backend API allows requests from your frontend's origin.
  - You might need to configure CORS in your backend:

    const cors = require('cors');

    app.use(cors({
      origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'],
      credentials: true,
    }));

- Testing

  - Test both locally and after deployment to ensure everything works correctly.

- Security

  - Always use strong, unique secrets for JWT_SECRET.
  - Restrict IP addresses accessing your MongoDB Atlas in production.

---

## License

This project is licensed under the MIT License.

---

Feel free to contribute to this project by submitting a pull request or creating an issue to report bugs or suggest new features.
