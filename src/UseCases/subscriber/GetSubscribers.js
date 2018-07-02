import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLOutputType
} from "graphql";
import Db from "../../db.js";
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
            type: GraphQLString
        },
        rg: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    },
    resolve(root, args, context){
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.subscriber.findAll({where: {'users.isSubscribed': 1}, include: ['users']});
        }
        throw new Error("Não autorizado.");
    }
};