import express from 'express';

const app = express()
const port = 3000;

app.get('/', (req: Request, res: Response): void  => {
  res.send('Bienvenu sur mon server api !');
});

app.listen(port, () => {
  console.log('http://localhost:' + port);
})