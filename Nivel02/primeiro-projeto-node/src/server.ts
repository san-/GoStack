import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'Hello World com Prettier' });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
