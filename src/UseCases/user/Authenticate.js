import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "../../db.js";
import { resolve } from "url";
import jwt from "jsonwebtoken"
import User from "../../InputType/User.js"

const AuthObj = new GraphQLObjectType({
    name: "Auth",
    description: "Authetication object containing the user token",
    fields: () => {
        return {
            token: {
                type: GraphQLString,
                resolve(user) {                    
                    if(user && user.isActivated){
                        var jwtObj = {
                            id: user.id,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            isActivated: user.isActivated
                        }
                        console.log(user);
                        return jwt.sign(jwtObj, process.env.JWT_SECRET);
                    }
                    return;
                }
            },
            user: {
                type: User
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
    resolve(root, args, context) {
        console.log(args)
        return Db.models.user.find({where: args});
    }
}

export default Authenticate