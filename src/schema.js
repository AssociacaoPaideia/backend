import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "./db";

import AddUser from "./UseCases/user/AddUser"
import GetUsers from "./UseCases/user/GetUsers.js"
import Authenticate from "./UseCases/user/Authenticate.js"
import Activate from "./UseCases/user/Activate.js"
import ChangePassword from "./UseCases/user/ChangePassword.js"
import UpdateUser from "./UseCases/user/UpdateUser.js"
import GetAuthenticatedUser from "./UseCases/user/GetAuthenticatedUser.js"

import AddSubscriber from "./UseCases/subscriber/AddSubscriber.js"
import GetSubscribers from "./UseCases/subscriber/GetSubscribers.js"
import UpdateSubscriber from "./UseCases/subscriber/UpdateSubscriber.js"
import ValidateSubscription from "./UseCases/subscriber/ValidateSubscription.js";

import AddSubscriberSocioEconomicData from "./UseCases/socioEconomicData/AddSubscriberSocioEconomicData.js"
import GetSubscriberSocioEconomicData from "./UseCases/socioEconomicData/GetSubscriberSocioEconomicData.js"
import UpdateSubscriberSocioEconomicData from "./UseCases/socioEconomicData/UpdateSubscriberSocioEconomicData.js"

import AddSubscriberAditionalData from "./UseCases/aditionalData/AddSubscriberAditionalData.js"
import GetSubscriberAditionalData from "./UseCases/aditionalData/GetSubscriberAditionalData.js"
import UpdateSubscriberAditionalData from "./UseCases/aditionalData/UpdateSubscriberAditionalData.js"

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is the root query",
    fields: () => {
        return {
            users: GetUsers,
            authenticatedUser: GetAuthenticatedUser,
            subscribers: GetSubscribers,
            validateSubscriber: ValidateSubscription,
            subscriberSocioEconomicData: GetSubscriberSocioEconomicData,
            subscriberAditionalData: GetSubscriberAditionalData,
            authenticate: Authenticate
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Creating",
    fields(){
        return {
            addUser: AddUser,
            activate: Activate,
            changePassword: ChangePassword,
            updateUser: UpdateUser,
            addSubscriber: AddSubscriber,
            updateSubscriber: UpdateSubscriber,
            addSocioEconomicData: AddSubscriberSocioEconomicData,
            updateSubscriberSocioEconomicData: UpdateSubscriberSocioEconomicData,
            addAditionalData: AddSubscriberAditionalData,
            updateSubscriberAditionalData: UpdateSubscriberAditionalData,
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;