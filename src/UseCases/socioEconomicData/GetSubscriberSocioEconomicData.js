import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import Db from "../../db.js";
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
        var subscriber = Db.model.subscriber.find({where: {userId: subscriberId}});
        if(context.user && ((subscriber && subscriber.userId == context.user.id) || context.user.isAdmin)) 
            return Db.models.subscriberSocioEconomicData.findAll({where: args});
        throw new Error("Não autorizado");
    }
}

export default GetSubscriberSocioEconomicData;