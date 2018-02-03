import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLOutputType
} from "graphql";
import Db from "../../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

export default {
    type: new GraphQLList(Subscriber),
    name: "GetSubscribers",
    description: "Retorna a lista de inscritos.",
    args: {
        userId: {
            type: GraphQLInt
        },
        id: {
            type: GraphQLInt
        },
        cpf: {
            type: GraphQLInt
        }                    
    },
    resolve(root, args, context){
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.user.findAll({where: args});
        }
        throw new Error("Não autorizado.");
    }
};