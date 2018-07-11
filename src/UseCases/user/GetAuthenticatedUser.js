import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "../../db.js";
import User from "../../InputType/User.js"


const GetAuthenticatedUser =  {
    type: User,
    name: "Usuario",
    description: "Retorna um de usuário da base baseado no token de sessão",
    args: {},
    resolve(root, args, context) {
        console.log(context);
        if(context.user) {
            return Db.models.user.findOne({where: {id: context.user.id, isBlackListed: 0}});
        }
        throw new Error("Não autorizado.");
    }
}

export default GetAuthenticatedUser