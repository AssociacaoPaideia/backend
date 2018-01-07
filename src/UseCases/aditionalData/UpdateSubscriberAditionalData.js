import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLScalarType
} from "graphql";
import Db from "../../../db.js";
import SubscriberAditionalData from "../../InputType/SubscriberAditionalData"

//Tenho que apenas exportar o schema
const UpdateSubscriberAditionalData = {
    name: "UpdateAditionalData",
    description: "Update a subscriber aditional data",
    type: SubscriberAditionalData,
    args: {
        id: {
            type: GraphQLString
        },
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
        }
    },
    resolve(_,args){
        return Db.models.subscriber_aditional_data.update(args, {where:{id:args.id}})
    }
}

export default UpdateSubscriberAditionalData