# Account Builds Application

A web application for exploring and tracking OSRS account builds with step-by-step guides.

## Project Structure

This repository contains both the frontend and backend code for the Account Builds application:

- **client/**: React frontend application
- **server/**: Node.js/Express backend API

## Features

- Search for account builds
- View detailed step-by-step guides for each build
- Track your progress with checkboxes for each step
- Save your progress locally
- Responsive design for mobile and desktop

## Local Development

### Backend

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your database configuration (see `.env.example`)

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your API configuration:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5050/api
   ```

4. Start the development server:
   ```
   npm start
   ```

## Deployment

For detailed deployment instructions, please see the [Deployment Guide](./DEPLOYMENT_GUIDE.md).

The guide includes instructions for deploying:
- The backend to Render or Heroku
- The frontend to Netlify, Vercel, or GitHub Pages
- Setting up a PostgreSQL database

## License

This project is licensed under the MIT License - see the LICENSE file for details.