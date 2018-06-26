import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} from "graphql";
import NtpCheck from "../../Application/NtpCheck.js"

export default {
    name: "isEditalAvailabe",
    description: "Returns if the the edital is available",
    type: GraphQLBoolean,
    args: {},
    resolve(_, args, context){
        return NtpCheck.getCurrentTime().then(result => {
            return  result >= new Date("2018-06-29T15:00:00")
        });
    }
}
