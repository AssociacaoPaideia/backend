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
        return Db.models.user.findAll({where: args});
    }
}

export default GetUsers