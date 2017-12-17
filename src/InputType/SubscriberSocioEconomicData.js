
import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import Subscriber from "./Subscriber"

const SubscriberSocioEconomicData = new GraphQLObjectType({
    name: "SocioEconomicData",
    description: "Describer a subscriber socio-economic data",
    fields: () => {
        return {
            bruteFamilyIncome: {
                type: GraphQLString,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            isWorking: {
                type: GraphQLBoolean,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            workingHours: {
                type: GraphQLInt,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            helpsFinanciallyAtHome: {
                type: GraphQLBoolean,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            motherDegree: {
                type: GraphQLString,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            fatherDegree: {
                type: GraphQLString,
                resolve(socioEconomicData){
                    return socioEconomicData.bruteFamilyIncome;
                }
            },
            subscriber: {
                type: Subscriber,
                resolve(socioEconomicData){
                    return socioEconomicData.getSubscriber()
                }
            }
        }
    }

});

export default SubscriberSocioEconomicData