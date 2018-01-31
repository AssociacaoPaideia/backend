import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";

import Db from "../../../db.js";
import { resolve } from "url";
import jwt from "jsonwebtoken";
import config from "../../../config";

const ChangePassword =  {
    type: GraphQLBoolean,
    name: "ChangePassword",
    description: "Receives a JWT token and updates the use password relate to that account.",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        newPassword: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, args) {
        console.log(args)
        var descripted = jwt.decode(args.token, config.jwt_email_secret);
        return Db.models.user.update({password : args.newPassword}, {where: {id: descripted.id, email: descripted.email}}).spread((affectedCount, affectedRow) => {            
            return affectedCount == 1;
        });
    }
}

export default ChangePassword