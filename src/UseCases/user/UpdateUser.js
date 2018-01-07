import {
    GraphQLNonNull,
    GraphQLString,
    
} from "graphql";

import Db from "../../../db";
import User from "../../InputType/User.js"
import Subscriber from "../../InputType/Subscriber.js"
import SubscriberAditionalData from "../../InputType/SubscriberAditionalData.js"
import SubscriberSocioEconomicData from "../../InputType/SubscriberSocioEconomicData.js"


const UpdateUser = {
    name: "addUser",
    description: "Adiciona um usuario",
    type: User,
    args: { 
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    },
    resolver(_, args){
        return Db.models.user.update(args, {where: {id: args.id}});        
    }
};


export default UpdateUser;