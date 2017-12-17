import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
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
            type: GraphQLInt
        },
        rg: {
            type: GraphQLInt
        },
        photo: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLInt
        },
    },
    resolver(args){
        return Db.models.subscriber.create(args)
    }
};