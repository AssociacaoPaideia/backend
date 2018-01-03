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
    resolve(_, args){
        console.log(args)
        var user = Db.models.user.create(args); 
        MailSender.sendMail(args["email"]);
        return user;
    }
};


export default AddUser;