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
import Db from "../../db.js";

export default {
    name: "isSubscriptionAvailable",
    description: "Returns if the the subscription is available",
    type: GraphQLBoolean,
    args: {},
    resolve(_, args, context){
        return NtpCheck.getCurrentTime().then(result => {
            return Db.models.user.count({where: {'isSubscribed': 1, 'isBlackListed' : 0}}).then(c => {
                console.log((result >= new Date("2017-07-02T11:00:00") && result <= new Date("2020-07-02T11:00:00") && c < 1))
                return result >= new Date("2019-01-15T10:00:00") && result <= new Date("2019-01-31T01:59:00") && c < 100;
            })
        });
    }
}
