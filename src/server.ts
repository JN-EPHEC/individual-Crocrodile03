import express, { Application } from 'express';
import userRoutes from "./routes/userRoutes.ts";

import sequelize from "./config/database.ts";
import User from "./models/User.ts";
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

// Enable URL-encoded from data parsing
app.use(express.urlencoded({extended: true}));

// Middleware to parse JSON
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);

// Static routes public
app.use(express.static('public'))
/*
const etudiants = [
  {id: 1, nom: "Dupont", prenom: "Jean"},
  {id: 2, nom: "Martin", prenom: "Sophie"},
  {id: 3, nom: "Doe", prenom: "John"}
];


app.get('/', (req: Request, res: Response): void  => {
  res.json(etudiants);
});

app.get('/api/hello/:name', (req: Request, res: Response) => {
  const name: String = req.params.name;
  const date = new Date();
  res.json({ message: `Bonjour ${name}`, timestamp: date.toISOString() });
})
app.use('/api/user', userRoutes);
*/

// Start server
app.listen(port, () => {
  console.log('http://localhost:' + port);
})
