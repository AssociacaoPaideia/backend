import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBigInt
} from "graphql";
import Db from "../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

//Tenho que apenas exportar o schema
export default {
    name: "UpdateSubscriber",
    description: "Updates a subscriber",
    type: Subscriber,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        birthDate: {
            type: GraphQLString
        },
        birthPlace: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        citizenCard: {
            type: GraphQLString
        }, 
        cpf: {
            type: GraphQLString
        },
        rg: {
            type: GraphQLString
        },
        photo: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        },
    },
    resolve(_, args, context){
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.subscriber.update(args, {where: {id: args.id}});
        }
        throw new Error("Não autorizado.");       
    }
};