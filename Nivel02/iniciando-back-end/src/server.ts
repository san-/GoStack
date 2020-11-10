/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello World com Prettier' });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});