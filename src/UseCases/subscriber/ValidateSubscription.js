import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} from "graphql";
import Db from "../../db.js";
import Subscriber from "../../InputType/Subscriber.js"
import SheetsApi from "../../Application/SheetAPI.js"
import MailSender from "../../Application/MailSender.js"


const formResponseSheet = "1idFPaw1KsDGi3aYf5bHzM0RuNNL57gdx-Nv6J8qVRxg";
const formResponseRange = "a!B:B";

//Tenho que apenas exportar o schema
export default {
    name: "validateSubscription",
    description: "Validate user subscription",
    type: GraphQLBoolean,
    args: {
        userId: {
            type: GraphQLInt
        }
    },
    resolve(_, args, context){
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return SheetsApi.getSocioEconomicEmails()
                .then(sheetsResult => {
                    return Db.models.user.findOne({
                        where: {
                            id: args.userId
                        }
                    }).then(result => {
                        var user = result.get({plain: true});
                        if(user.isSubscribed) {
                            return true
                        }
                        if(sheetsResult.toString().includes(user.email)){
                            return Db.models.user.update({isSubscribed : true}, {where: {id: args.userId}}).spread((affectedCount, affectedRow) => {
                                var updated = affectedCount == 1;
                                if(updated) {
                                    return  Db.models.user.count({where: {'isSubscribed': 1}}).then((result) => {
                                        if(result > 80) {
                                            Db.models.user.update({waitList : true}, {where: {id: args.userId}})
                                        }
                                        MailSender.sendConfirmationMail(user.email, user.name, (user.id + 1697), result > 80)
                                        return true
                                    })
                                   
                                }
                            });
                        } else {
                            return false;
                        }
                    });
                })
                .catch(reason => {                    
                    throw new Error(reason);
                }); 
        }
        throw new Error("Não autorizado.");
    }
};
