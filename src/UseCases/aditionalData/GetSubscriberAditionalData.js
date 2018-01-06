import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import Db from "../../../db.js";
import SubscriberAditionalData from "../../InputType/SubscriberAditionalData.js"

const GetSubscriberAditionalData = {
    type: new GraphQLList(SubscriberAditionalData),
    description: "Retorna a lista de inscritos.",
    args: {
        id: {
            type: GraphQLInt
        },
        userId: {
            type: GraphQLInt
        }
    },
    resolve(root, args){
        return Db.models.subscriber.findAll({where: args, order: [["firstName", "ASC"]]});
    }
}

export default GetSubscriberAditionalData;