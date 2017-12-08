import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "./db";

import AddUser from "./src/UseCases/user/AddUser"
import GetUsers from "./src/UseCases/user/GetUsers.js"

import AddSubscriber from "./src/UseCases/subscriber/AddSubscriber.js"
import GetSubscribers from "./src/UseCases/subscriber/GetSubscribers.js"

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is the root query",
    fields: () => {
        return {
            users: GetUsers,
            subscribers: GetSubscribers
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Creating",
    fields(){
        return {
            addUser: AddUser,
            addSubscriber: AddSubscriber
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;