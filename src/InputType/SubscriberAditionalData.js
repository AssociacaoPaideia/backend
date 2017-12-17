
import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import Subscriber from "./Subscriber"

const SubscriberAditionalData = new GraphQLObjectType({
    name: "SubscriberAditionalData",
    description: "Representes some aditional data for a subscriber",
    fields: () => {
        return {
            scholarDegree: {
                type: GraphQLString,
                resolve(aditionalData){
                    return aditionalData.scholarDegree
                }
            },
            highSchoolYear: {
                type: GraphQLInt,
                resolve(aditionalData){
                    return aditionalData.highSchoolYear
                }
            },
            schoolType: {
                type: GraphQLString,
                resolve(aditionalData){
                    return aditionalData.schoolType
                }
            },
            scholarship: {
                type: GraphQLBoolean,
                 resolve(aditionalData){
                    return aditionalData.scholarship
                }        
            },
            intendedCourse: {
                type: GraphQLBoolean,
                resolve(aditionalData){
                    return aditionalData.intendedCourse
                }
            },
            intendedInstitution: {
                type: GraphQLString,
                resolve(aditionalData){
                    return aditionalData.intendedInstitution
                }
            },
            enemGrade: {
                type: GraphQLInt,
                resolve(aditionalData){
                    return aditionalData.enemGrade   
                }
            },
            subscriber: {
                type: Subscriber,
                resolve(aditionalData){
                    return aditionalData.getSubscriber()
                }
            }        
        }
    }
});

export default SubscriberAditionalData