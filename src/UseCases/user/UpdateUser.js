import {
    GraphQLNonNull,
    GraphQLString,
    
} from "graphql";

import Db from "../../db.js";
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
        if(context.user || context.user.id === args.id || context.user.isAdmin ) {
            return Db.models.user.update(args, {where: {id: args.id}});
        }
        throw new Error("Não autorizado.");
          
    }
};


export default UpdateUser;