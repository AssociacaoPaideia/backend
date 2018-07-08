import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "../../db.js";
import SubscriberFile from "../../InputType/SubscriberFile.js"


const GetFiles =  {
    type: new GraphQLList(SubscriberFile),
    name: "Arquivo",
    description: "Retorna um arquivo da base",
    args: {
        subscriberId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: GraphQLString
        }
    },
    resolve(root, args, context) {
        if(context.user || context.user.isAdmin ) {
            return Db.models.subscriberFiles.findAll({where: args});
        }
        throw new Error("Não autorizado.");
    }
}

export default GetFiles