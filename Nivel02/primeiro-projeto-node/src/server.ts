import express from 'express';
import routes from './routes';

const app = express();

interface Teste{
    a: string
}

    app.get('/', (request, response)=>{
    console.log('teste')
          return response.json({message: "Hello World!"});

      });

app.listen(3333, ()=>{
    console.log('Server started on port 3333.')
    console.info('ok')
})


