import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";
import Db from "../../../db.js";
import SubscriberSocioEconomicData from "../../InputType/SubscriberSocioEconomicData.js"
import AddSubscriber from "../../UseCases/subscriber/AddSubscriber.js"

//Tenho que apenas exportar o schema
const AddSubscriberAditionalData = {
    name: "AditionalData",
    description: "Persists a subscriber aditional data",
    type: SubscriberSocioEconomicData,
    args: {
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
            type: GraphQLString,
        },
        fatherDegree: {
            type: GraphQLString,
        },
        subscriberId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolver(args){
        return Db.models.subscriberSocioEconomicData.create(args)
    }
}

export default AddSubscriberAditionalData