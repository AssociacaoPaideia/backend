import Express from "express";
import GraphHTTP from "express-graphql";
import Schema from "./schema";
import jwt from 'express-jwt'

//Configs
const APP_PORT = 3000;


const app = Express();

app.use("/graphql", GraphHTTP({
    schema: Schema,
    pretty: true, 
    graphiql: true
}));

app.listen(APP_PORT, ()=>{
    console.log("Listening on ${APP_PORT}");
});