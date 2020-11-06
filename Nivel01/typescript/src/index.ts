import express from 'express';
import {helloWord} from './routes';

const app  = express();

app.get('/', (request, response) =>{
    helloWord(request, response);
})

app.listen(3000);