import {
    GraphQLNonNull,
    GraphQLString
} from "graphql";

import Db from "../../../db";
import User from "../../InputType/User.js"
import MailSender from "../../Application/MailSender"
import jwt from "jsonwebtoken";
import config from "../../../config.js"


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
    resolve(root, args, context, info){          
        console.log(args)
        return Db.models.user.create(args).then( (user) => {
            var persistedUser = user.get({plain: true});
            console.log(persistedUser)
            var jwtObj = {
                id: persistedUser.id,
                email: persistedUser.email
            }
            var activationToken = jwt.sign( jwtObj , config.jwt_email_secret) 
            console.log(activationToken)
            MailSender.sendActivationMail(persistedUser.email, activationToken);
            return persistedUser;
        });
    }
};


export default AddUser;