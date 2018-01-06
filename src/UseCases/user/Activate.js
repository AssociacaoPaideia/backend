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

const Activate =  {
    type: GraphQLBoolean,
    name: "Activation",
    description: "Receives a JWT token and activate the user related to that token. Returns true if the user was successfully activated, false otherwise.",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, args) {
        console.log(args)
        var descripted = jwt.decode(args.token, config.jwt_email_secret);
        console.log(descripted)
        return Db.models.user.update({isActivated : true}, {where: {id: descripted.id, email: descripted.email}}).spread((affectedCount, affectedRow) => {            
            return affectedCount == 1;  
        });
    }
}

export default Activate