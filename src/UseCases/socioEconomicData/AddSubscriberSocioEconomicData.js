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
import Db from "../../../db.js";
import SubscriberSocioEconomicData from "../../InputType/SubscriberSocioEconomicData.js"
import AddSubscriber from "../../UseCases/subscriber/AddSubscriber.js"

const degreeEnum = new GraphQLEnumType({
    name: "DegreeEnum",
    values: {
        FUNDAMENTAL_INCOMPLETE:{}, 
        FUNDAMENTAL_COMPLETE:{},
        HIGHSCHOOL_INCOMPLETE:{},
        SUPERIOR_INCOMPLETE:{},
        SUPERIOR_COMPLETE:{}
    }
})

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
            type: degreeEnum,
        },
        fatherDegree: {
            type: degreeEnum,
        },
        subscriberId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve(_, args){
        return Db.models.subscriber_socio_economic.create(args)
    }
}

export default AddSubscriberAditionalData