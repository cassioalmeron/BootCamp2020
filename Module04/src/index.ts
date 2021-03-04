import express from 'express'
import { cassioAlmeron } from './routes';

const app = express();

app.get('/', cassioAlmeron)

app.listen(3333);