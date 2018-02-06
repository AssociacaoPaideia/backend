import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLEnumType
} from "graphql";
import Db from "../../db.js";
import SubscriberSocioEconomicData from "../../InputType/SubscriberSocioEconomicData.js"
import AddSubscriber from "../../UseCases/subscriber/AddSubscriber.js"
import DegreeEnumType from "./../../InputType/DegreeEnumType.js"



//Tenho que apenas exportar o schema
const UpdateSubscriberAditionalData = {
    name: "UpdateAditionalData",
    description: "Update a subscriber aditional data",
    type: SubscriberSocioEconomicData,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        bruteFamilyIncome: {
            type: GraphQLString,
        },
        isWorking: {
            type: GraphQLBoolean,
        },
        workingHours: {
            type: GraphQLInt,
        },
        helpsFinanciallyAtHome: {
            type: GraphQLBoolean,
        },
        motherDegree: {
            type: DegreeEnumType,
        },
        fatherDegree: {
            type: DegreeEnumType,
        }
    },
    resolve(_, args){
        var subscriber = Db.model.subscriber.find({where: {userId: subscriberId}});
        if(context.user && ((subscriber && subscriber.userId == context.user.id) || context.user.isAdmin)) 
            return Db.models.subscriber_socio_economic.update(args, {where: {id: args.id}})
        throw new Error("Não autorizado.");
    }
}

export default UpdateSubscriberAditionalData