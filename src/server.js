import Express from "express";
import GraphHTTP from "express-graphql";
import Schema from "./schema";
import graphql from "graphql";
import jwt from 'express-jwt';
import db from "./db.js";
import path from 'path';
import bodyParser from 'body-parser'
import MailSender from "./Application/MailSender"
var cors = require('cors');

//Configs
const APP_PORT = 3000;


const app = Express();

app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

app.post("/graphql",
    jwt({secret: process.env.JWT_SECRET, credentialsRequired: false}),
    GraphHTTP({
        schema: Schema,
        pretty: true,
        graphiql: false
    }));

app.get("/graphql",
    GraphHTTP({
        schema: Schema,
        pretty: true,
        graphiql: true
    }));

app.use('/files', Express.static(path.join(__dirname, 'files')));

app.listen(process.env.PORT || APP_PORT, ()=>{
    console.log("Listening on ${APP_PORT}" + process.env.PORT);
});