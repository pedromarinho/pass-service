import "reflect-metadata";
import express from 'express';
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import BaseRouter from './routes/index'

const port = process.env.PORT || 3000;
let options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}

// create and setup express app
const app = express();

app.use(bodyParser.json());

app.use('/', BaseRouter);

https.createServer(options, app).listen(port, () => {
    console.log(`[SERVER] Running at https://localhost:${port}`);
});