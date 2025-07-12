# Account Builds Server

This is the backend server for the Account Builds application.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=osrs_builds
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Deployment

### Heroku Deployment

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

### Render Deployment

1. Create a Render account: https://render.com/

2. Create a new Web Service and connect your GitHub repository.

3. Configure the service:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Add all the database connection variables

4. Create a PostgreSQL database in Render.

5. Connect your web service to the database using the connection string provided by Render.

## Updating the Frontend

After deploying the backend, update the API base URL in the frontend:

1. Open `client/src/api/builds.ts`
2. Change the `API_BASE_URL` to your deployed server URL:
   ```javascript
   const API_BASE_URL = "https://your-app-name.herokuapp.com/api";
   // or
   const API_BASE_URL = "https://your-app-name.onrender.com/api";
   ```

3. Deploy the frontend.