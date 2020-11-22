/* eslint-disable no-console */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }
    console.error(err);
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

const port = 3333;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
