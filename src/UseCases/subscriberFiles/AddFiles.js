import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBigInt,
    GraphQLBoolean,
} from "graphql";
import Db from "../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

//Tenho que apenas exportar o schema
export default {
    name: "addFiles",
    description: "Adds a subscriber files",
    type: GraphQLBoolean,
    args: {
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        file: {
            type: new GraphQLNonNull(GraphQLString)
        },
        subscriberId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve(_, args, context){
        //if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.subscriberFiles.create(args)
        //}
        throw new Error("Não autorizado.");
    }
};