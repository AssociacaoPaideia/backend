import {
    GraphQLNonNull,
    GraphQLString
} from "graphql";

import Db from "../../../db";
import User from "../../InputType/User.js"

const AddUser = {
    name: "addUser",
    description: "Adiciona um usuario",
    type: User,
    args: { 
        firstName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        pwd: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolver: (args) => {
        return Db.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase(),
            password: args.pwd
        });        
    }
};


export default AddUser;