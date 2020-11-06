import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World com Prettier' });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
