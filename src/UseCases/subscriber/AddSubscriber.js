import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBigInt
} from "graphql";
import Db from "../../db.js";
import Subscriber from "../../InputType/Subscriber.js"
import { rejects } from "assert";

//Tenho que apenas exportar o schema
export default {
    name: "addSubscriber",
    description: "Adds a subscriber",
    type: Subscriber,
    args: {
        birthDate: {
            type: new GraphQLNonNull(GraphQLString)
        },
        birthPlace: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString)
        },
        cpf: {
            type: new GraphQLNonNull(GraphQLString)
        },
        rg: {
            type: new GraphQLNonNull(GraphQLString)
        },
        cartaoCidadao: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve(_, args, context){
        console.log(context.user.id === args.userId);
        
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.subscriber.findOne({
                where: { [Db.Op.or] : {
                        rg: args.rg, cpf: args.cpf, cartaoCidadao: args.cartaoCidadao
                    }
                }
            }).then( (result) => {
                var subscriber = result.get({plain: true})
                console.log("#############Achou subscriber: " + subscriber)
                if(result) {
                    return Db.models.user.findOne({where: {id: subscriber.userId}}).then((result) => {
                        
                        var user = result.get({plain: true})
                        console.log("##########Achou usuário: " + user)
                        if(user && !user.isBlackListed){
                            return Db.models.subscriber.findOne({where: {userId: context.user.id}}).then((result) => {
                                if(result){
                                    return result.destroy();
                                }
                            }).then(() => {
                                return Db.models.subscriber.create(args)
                            })
                        } else {
                           throw new Error("Usuário bloqueado para cadastro.");
                        }
                    })
                } else {
                    return Db.models.subscriber.findOne({where: {userId: context.user.id}}).then((result) => {
                        if(result){
                            return result.destroy();
                        }
                    }).then(() => {
                        return Db.models.subscriber.create(args)
                    })
                }
                
            })
           
        }
        throw new Error("Não autorizado.");
    }
};