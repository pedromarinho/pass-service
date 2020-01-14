import "reflect-metadata";
import express from 'express';
import bodyParser from "body-parser";
import BaseRouter from './routes/index'

const port = process.env.PORT || 3000;

// create and setup express app
const app = express();

app.use(bodyParser.json());

app.use('/', BaseRouter);

app.listen(port, () => {
    console.log(`[SERVER] Running at http://localhost:${port}`);
});
