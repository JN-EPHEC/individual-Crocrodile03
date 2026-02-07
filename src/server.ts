import express from 'express';

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




app.listen(port, () => {
  console.log('http://localhost:' + port);
})
