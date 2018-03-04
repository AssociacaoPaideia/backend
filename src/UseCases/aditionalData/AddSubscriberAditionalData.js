import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";
import Db from "../../db.js";
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
    resolve(_,args, context){
        var subscriber = Db.model.subscriber.find({where: {userId: subscriberId}});
        if(context.user && ((subscriber && subscriber.userId == context.user.id) || context.user.isAdmin)) 
            return Db.models.subscriber_aditional_data.create(args);
        throw new Error("Não autorizado.");
    }
}

export default AddSubscriberAditionalData