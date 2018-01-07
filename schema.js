import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";

import Db from "./db";

import AddUser from "./src/UseCases/user/AddUser"
import GetUsers from "./src/UseCases/user/GetUsers.js"
import Authenticate from "./src/UseCases/user/Authenticate.js"
import Activate from "./src/UseCases/user/Activate.js"
import ChangePassword from "./src/UseCases/user/ChangePassword.js"
import UpdateUser from "./src/UseCases/user/UpdateUser.js"

import AddSubscriber from "./src/UseCases/subscriber/AddSubscriber.js"
import GetSubscribers from "./src/UseCases/subscriber/GetSubscribers.js"
import UpdateSubscriber from "./src/UseCases/subscriber/UpdateSubscriber.js"

import AddSubscriberSocioEconomicData from "./src/UseCases/socioEconomicData/AddSubscriberSocioEconomicData.js"
import GetSubscriberSocioEconomicData from "./src/UseCases/socioEconomicData/GetSubscriberSocioEconomicData.js"
import UpdateSubscriberSocioEconomicData from "./src/UseCases/socioEconomicData/UpdateSubscriberSocioEconomicData.js"

import AddSubscriberAditionalData from "./src/UseCases/aditionalData/AddSubscriberAditionalData.js"
import GetSubscriberAditionalData from "./src/UseCases/aditionalData/GetSubscriberAditionalData.js"
import UpdateSubscriberAditionalData from "./src/UseCases/aditionalData/UpdateSubscriberAditionalData.js"

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is the root query",
    fields: () => {
        return {
            users: GetUsers,
            subscribers: GetSubscribers,
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
            updateSubscriberAditionalData: UpdateSubscriberAditionalData
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;