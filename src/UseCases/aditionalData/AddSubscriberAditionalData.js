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
import SubscriberAditionalData from "../../InputType/SubscriberAditionalData"

//Tenho que apenas exportar o schema
const AddSubscriberAditionalData = {
    name: "Aditional data",
    description: "Persists a subscriber aditional data",
    type: SubscriberAditionalData,
    args: {
        scholarDegree: {
            type: GraphQLString
        },
        highSchoolYear: {
            type: GraphQLInt,
        },
        schoolType: {
            type: GraphQLString,
        },
        scholarship: {
            type: GraphQLBoolean,
        },
        intendedCourse: {
            type: GraphQLString,
        },
        intendedInstitution: {
            type: GraphQLString,
        },
        enemGrade: {
            type: GraphQLInt,
        },
        subscriberId: {
            type: GraphQLInt,
        }   
    },
    resolve(_,args){
        return Db.models.subscriber_aditional_data.create(args)
    }
}

export default AddSubscriberAditionalData