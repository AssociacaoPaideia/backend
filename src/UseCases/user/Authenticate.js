import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "../../../db.js";
import { resolve } from "url";
import jwt from "jsonwebtoken"

const AuthObj = new GraphQLObjectType({
    name: "Auth",
    description: "Authetication object containing the user token",
    fields: () => {
        return {
            token: {
                type: GraphQLString,
                resolve(user) {
                    if(user){
                        var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
                        return token;
                    }
                    return;
                }
            }    
        }        
    }
});


const Authenticate =  {
    type: AuthObj,
    name: "Authentication",
    description: "Receives a user email and passwords, if it matches some in the database it will return a token.",
    args: {
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, args) {
        console.log(args)
        return Db.models.user.find({where: args});
    }
}

export default Authenticate