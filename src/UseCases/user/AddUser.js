import {
    GraphQLNonNull,
    GraphQLString
} from "graphql";

import Db from "../../../db";
import User from "../../InputType/User.js"
import MailSender from "../../Application/MailSender"

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
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(_, args, context){
        console.log(`[context keys  ] - ${Object.keys(context)}`);
        console.log(`[context header] - ${(context.headers) ? Object.keys(context.headers) : null}`);
        console.log(`[context header authorizaton] - ${(context.headers && context.headers.authorization) ? context.headers.authorization : null}`);
    
        console.log(args)
        var user = Db.models.user.create(args); 
        MailSender.sendMail(args["email"]);
        return user;
    }
};


export default AddUser;