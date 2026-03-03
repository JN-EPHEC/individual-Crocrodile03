import express, { Application } from 'express';
import userRoutes from "./routes/userRoutes.ts";

import sequelize from "./config/database.ts";
import User from "./models/User.ts";
import { requestLogger } from './middlewares/logger.ts';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler.ts';

try {
  await User.sync({});
  console.log('The table for the User model was just (re)created!');
  await sequelize.sync({});
  console.log('All models were synchronized successfully.');
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app: Application = express()
const port = 3000;

// Middleware logger
app.use(requestLogger);

// Enable URL-encoded from data parsing
app.use(express.urlencoded({extended: true}));

// Middleware to parse JSON
app.use(express.json());

// Swagger api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/api/users', userRoutes);

// Static routes public
app.use(express.static('public'))

// Middleware qui gère les erreurs
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log('http://localhost:' + port);
})
