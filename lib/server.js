import Express from "express";
import GraphHTTP from "express-graphql";
import Schema from "../schema";
import graphql from "graphql";
import jwt from 'express-jwt';
import db from "../db.js"
var config = require("../config.js");

//Configs
const APP_PORT = 3000;


const app = Express();

app.post("/graphql",
    jwt({secret: config.jwt_secret, credentialsRequired: false}),
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



app.listen(APP_PORT, ()=>{
    console.log("Listening on ${APP_PORT}");
});