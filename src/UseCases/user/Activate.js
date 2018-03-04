import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";

import Db from "../../db.js";
import { resolve } from "url";
import jwt from "jsonwebtoken";

const Activate =  {
    type: GraphQLBoolean,
    name: "Activation",
    description: "Receives a JWT token and activate the user related to that token. Returns true if the user was successfully activated, false otherwise.",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, args, context) {
        console.log(args)
        var descripted = jwt.decode(args.token, process.env.JWT_EMAIL_SECRET);
        if(!descripted){
            return false;
        }
        console.log(descripted)
        return Db.models.user.update({isActivated : true}, {where: {id: descripted.id, email: descripted.email}}).spread((affectedCount, affectedRow) => {            
            return affectedCount == 1;  
        });
    }
}

export default Activate