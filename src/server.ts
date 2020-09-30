import 'reflect-metadata'
import express from 'express';
import Routes from './routes';
import './database';
const app = express();
app.use(express.json());
app.use(Routes);
app.listen(3333, () => {
  console.log('server started on por 3333');
});
