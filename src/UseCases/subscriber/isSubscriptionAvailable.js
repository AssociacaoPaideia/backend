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
    name: "isSubscriptionAvailable",
    description: "Returns if the the subscription is available",
    type: GraphQLBoolean,
    args: {},
    resolve(_, args, context){
        return NtpCheck.getCurrentTime().then(result => {
            return new Date(2018, 6, 21, 22, 56).getDate() >= result.getDate()
        });
    }
}