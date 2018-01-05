import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBigInt
} from "graphql";
import Db from "../../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

//Tenho que apenas exportar o schema
export default {
    name: "addSubscriber",
    description: "Adds a subscriber",
    type: Subscriber,
    args: {
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
    resolve(_, args){
        return Db.models.subscriber.create(args)
    }
};