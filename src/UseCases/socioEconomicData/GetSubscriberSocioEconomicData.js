import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import Db from "../../../db.js";
import SubscriberSocioEconomicData from "../../InputType/SubscriberSocioEconomicData.js"

const GetSubscriberSocioEconomicData = {
    type: new GraphQLList(SubscriberSocioEconomicData),
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
        return Db.models.subscriberSocioEconomicData.findAll({where: args});
    }
}

export default GetSubscriberSocioEconomicData;