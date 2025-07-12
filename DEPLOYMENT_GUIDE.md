# Deployment Guide for Account Builds Application

This guide provides step-by-step instructions for deploying the Account Builds application, which consists of a React frontend and a Node.js/Express backend with a PostgreSQL database.

## Table of Contents

1. [Backend Deployment](#backend-deployment)
   - [Preparing the Backend for Deployment](#preparing-the-backend-for-deployment)
   - [Deploying to Heroku](#deploying-to-heroku)
   - [Deploying to Render](#deploying-to-render)
2. [Frontend Deployment](#frontend-deployment)
   - [Configuring the Frontend](#configuring-the-frontend)
   - [Deploying to Netlify](#deploying-to-netlify)
   - [Deploying to Vercel](#deploying-to-vercel)
   - [Deploying to GitHub Pages](#deploying-to-github-pages)
3. [Database Setup](#database-setup)
4. [Testing the Deployment](#testing-the-deployment)
5. [Troubleshooting](#troubleshooting)

## Backend Deployment

### Preparing the Backend for Deployment

1. The backend code has been updated to use environment variables for configuration:
   - The port is now configurable via the `PORT` environment variable
   - Database connection parameters are loaded from environment variables
   - Error handling has been added to API endpoints

2. Configuration files have been created:
   - `Procfile` for Heroku deployment
   - `.gitignore` to exclude unnecessary files
   - `.env.example` as a template for environment variables
   - Updated `package.json` with Node.js version specification

### Deploying to Heroku

1. Create a Heroku account if you don't have one: https://signup.heroku.com/

2. Install the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

3. Login to Heroku:
   ```
   heroku login
   ```

4. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

5. Add a PostgreSQL database:
   ```
   heroku addons:create heroku-postgresql:mini
   ```

6. Deploy the server:
   ```
   git subtree push --prefix server heroku main
   ```

7. Set environment variables:
   ```
   heroku config:set NODE_ENV=production
   ```

8. Open the app:
   ```
   heroku open
   ```

### Deploying to Render

#### Option 1: Using the render.yaml Blueprint (Recommended)

The repository includes a `render.yaml` file that makes deployment extremely easy by automatically setting up both the web service and the database.

1. **Create a Render account**:
   - Go to https://render.com/ and sign up for a free account
   - Verify your email address

2. **Deploy using Blueprint**:
   - In the Render dashboard, click on "New +"
   - Select "Blueprint"
   - Connect your GitHub account if you haven't already
   - Select the repository "account-builds"
   - Render will automatically detect the `render.yaml` file
   - Review the resources that will be created:
     - A web service for the backend
     - A PostgreSQL database
   - Click "Apply" to start the deployment

3. **Initialize your database**:
   - After deployment, go to your database dashboard in Render
   - Click on "Connect" and select "External Connection"
   - Use a PostgreSQL client (like pgAdmin, DBeaver, or the psql command line) to connect to your database
   - Run the SQL script to create your tables:
   ```sql
   CREATE TABLE account_builds (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     difficulty VARCHAR(50),
     estimated_time VARCHAR(50)
   );

   CREATE TABLE build_steps (
     id SERIAL PRIMARY KEY,
     build_id INTEGER REFERENCES account_builds(id),
     step_number INTEGER NOT NULL,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     requirements TEXT,
     notes TEXT,
     external_link VARCHAR(255)
   );
   ```

4. **Test your backend API**:
   - Open your browser and navigate to your backend URL + "/api/builds" (e.g., https://account-builds-backend.onrender.com/api/builds)
   - You should see a JSON response (might be an empty array if you haven't added any data yet)

5. **Monitor your deployment**:
   - In the Render dashboard, you can view logs for your web service
   - Click on "Logs" in the left sidebar of your web service dashboard
   - You can see build logs, deployment logs, and runtime logs
   - This is useful for troubleshooting any issues

#### Option 2: Manual Setup

If you prefer to set up the services manually or need more customization:

1. **Create a Render account**:
   - Go to https://render.com/ and sign up for a free account
   - Verify your email address

2. **Connect your GitHub repository**:
   - In the Render dashboard, click on "New +"
   - Select "Web Service"
   - Connect your GitHub account if you haven't already
   - Select the repository "account-builds"

3. **Configure the Web Service**:
   - Name: "account-builds-backend" (or any name you prefer)
   - Region: Choose the region closest to your users
   - Branch: main (or your preferred branch)
   - Root Directory: server
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Free (or select a paid plan if you need more resources)

4. **Set Environment Variables**:
   - Scroll down to the "Environment" section
   - Add the following environment variables:
     - `NODE_ENV`: production
     - `PORT`: 10000 (Render will automatically set the PORT, but you can specify it)
     - `DB_HOST`: (will be filled after creating the database)
     - `DB_PORT`: 5432
     - `DB_USER`: (will be filled after creating the database)
     - `DB_PASSWORD`: (will be filled after creating the database)
     - `DB_DATABASE`: (will be filled after creating the database)

5. **Create a PostgreSQL database**:
   - In the Render dashboard, click on "New +"
   - Select "PostgreSQL"
   - Configure your database:
     - Name: "account-builds-db" (or any name you prefer)
     - Database: "account_builds" (this will be your DB_DATABASE value)
     - User: (Render will generate this, use it for DB_USER)
     - Region: Choose the same region as your web service
     - Plan: Free (or select a paid plan if you need more resources)
   - Click "Create Database"

6. **Get database connection details**:
   - After the database is created, go to the database dashboard
   - You'll see "Connections" information with:
     - Internal Database URL: This contains all the connection information
     - The format is: `postgres://user:password@host:port/database`
     - Extract these values and update your environment variables:
       - `DB_HOST`: The host part from the URL (usually ends with .render.com)
       - `DB_USER`: The user part from the URL
       - `DB_PASSWORD`: The password part from the URL
       - `DB_DATABASE`: The database part from the URL (should be "account_builds")

7. **Initialize your database**:
   - Go to your database dashboard in Render
   - Click on "Connect" and select "External Connection"
   - Use a PostgreSQL client (like pgAdmin, DBeaver, or the psql command line) to connect to your database
   - Run the SQL script to create your tables (same as in Option 1)

8. **Deploy your Web Service**:
   - Go back to your web service dashboard
   - If you've updated environment variables, click "Manual Deploy" and select "Clear build cache & deploy"
   - Wait for the deployment to complete
   - Once deployed, you'll see a URL for your service (e.g., https://account-builds-backend.onrender.com)

9. **Test your backend API**:
   - Open your browser and navigate to your backend URL + "/api/builds" (e.g., https://account-builds-backend.onrender.com/api/builds)
   - You should see a JSON response (might be an empty array if you haven't added any data yet)

10. **Monitor your deployment**:
    - In the Render dashboard, you can view logs for your web service
    - Click on "Logs" in the left sidebar of your web service dashboard
    - You can see build logs, deployment logs, and runtime logs
    - This is useful for troubleshooting any issues

## Frontend Deployment

### Configuring the Frontend

1. The frontend code has been updated to use environment variables for the API base URL:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5050/api";
   ```

2. Create a `.env` file for local development:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5050/api
   ```

3. Create a `.env.production` file for production:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.com/api
   ```

### Deploying to Netlify

1. Create a Netlify account: https://app.netlify.com/signup

2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```
   netlify login
   ```

4. Build the client:
   ```
   cd client
   npm run build
   ```

5. Deploy to Netlify:
   ```
   netlify deploy --prod
   ```

6. Set environment variables in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add `REACT_APP_API_BASE_URL` with your backend URL

### Deploying to Vercel

1. Create a Vercel account: https://vercel.com/signup

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Login to Vercel:
   ```
   vercel login
   ```

4. Deploy to Vercel:
   ```
   cd client
   vercel --prod
   ```

5. Set environment variables in the Vercel dashboard:
   - Go to Project settings > Environment Variables
   - Add `REACT_APP_API_BASE_URL` with your backend URL

### Deploying to GitHub Pages

1. Add the `homepage` field to your `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/account-builds"
   ```

2. Install the `gh-pages` package:
   ```
   cd client
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }
   ```

4. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Database Setup

1. For Heroku, the PostgreSQL database is automatically set up when you add the Heroku Postgres addon.

2. For Render, you need to create a PostgreSQL database and connect it to your web service.

3. You'll need to create the necessary tables in your database. Here's a sample SQL script:

   ```sql
   CREATE TABLE account_builds (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     difficulty VARCHAR(50),
     estimated_time VARCHAR(50)
   );

   CREATE TABLE build_steps (
     id SERIAL PRIMARY KEY,
     build_id INTEGER REFERENCES account_builds(id),
     step_number INTEGER NOT NULL,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     requirements TEXT,
     notes TEXT,
     external_link VARCHAR(255)
   );
   ```

4. You can run this script using the database management tools provided by your hosting platform.

## Testing the Deployment

1. After deploying both the backend and frontend, open your frontend URL in a browser.

2. Verify that the application can:
   - Load the list of builds from the backend
   - Display the details of a build when clicked
   - Show the steps for a build
   - Save progress using local storage

3. Check the browser console for any errors related to API calls.

## Troubleshooting

### Backend Issues

1. **Database Connection Errors**:
   - Verify that your database connection environment variables are correctly set
   - Check if your database is accessible from your backend service
   - Ensure your database has the correct tables and schema

2. **Application Errors**:
   - Check the logs of your backend service for error messages
   - For Heroku: `heroku logs --tail`
   - For Render: Check the logs in the Render dashboard

### Frontend Issues

1. **API Connection Errors**:
   - Verify that the `REACT_APP_API_BASE_URL` environment variable is correctly set
   - Check if CORS is properly configured on the backend
   - Ensure the backend URL is accessible from the frontend

2. **Build Errors**:
   - Check the build logs for any compilation errors
   - Ensure all dependencies are correctly installed

## Summary and Recommendations

### Recommended Deployment Strategy

For the Account Builds application, we recommend the following deployment strategy:

1. **Backend**: Deploy to Render using the Blueprint feature with the provided `render.yaml` file
   - This automatically sets up both the web service and the PostgreSQL database
   - Environment variables are automatically configured
   - Free tier is sufficient for development and testing

2. **Frontend**: Deploy to Vercel or Netlify
   - Both platforms offer excellent free tiers with automatic deployments from GitHub
   - They provide global CDN distribution for fast loading times
   - Set the `REACT_APP_API_BASE_URL` environment variable to point to your Render backend

### Best Practices

1. **Database Management**:
   - Regularly backup your database
   - Consider using Render's automatic backup feature for production databases
   - Use database migrations for schema changes in production

2. **Environment Variables**:
   - Never commit sensitive information like API keys or database credentials to your repository
   - Use environment variables for all configuration
   - Create separate environments for development, staging, and production

3. **Monitoring and Logging**:
   - Regularly check your application logs for errors
   - Set up alerts for critical errors
   - Monitor your application's performance and resource usage

4. **Security**:
   - Ensure your API endpoints are properly secured
   - Use HTTPS for all communications
   - Implement proper authentication and authorization

5. **Scaling**:
   - Start with the free tier for development and testing
   - Upgrade to paid plans when you need more resources or reliability
   - Consider using a custom domain for production deployments
