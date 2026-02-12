import express from 'express';
import userRoutes from "./routes/userRoutes.ts"
import sequelize from "./config/database.ts";
import User from "./models/User.ts";
try {
  await User.sync({ force: true });
  console.log('The table for the User model was just (re)created!');
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express()
const port = 3000;

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

app.listen(port, () => {
  console.log('http://localhost:' + port);
})
