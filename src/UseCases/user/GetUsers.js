import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "../../../db.js";
import User from "../../InputType/User.js"


const GetUsers =  {
    type: new GraphQLList(User),
    name: "Usuarios",
    description: "Retorna a lista de usuários da base",
    args: {
        id: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        }
    },
    resolve(root, args) {
        if(context.user || context.user.id === args.id || context.user.isAdmin ) {
            return Db.models.user.findAll({where: args});
        }
        throw new Error("Não autorizado.");
    }
}

export default GetUsers