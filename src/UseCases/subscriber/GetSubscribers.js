import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLOutputType
} from "graphql";
import Db from "../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

export default {
    type: new GraphQLList(Subscriber),
    name: "GetSubscribers",
    description: "Retorna a lista de inscritos.",
    args: {
        userId: {
            type: GraphQLInt
        },
        id: {
            type: GraphQLInt
        },
        cpf: {
            type: GraphQLString
        },
        rg: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    },
    resolve(root, args, context){
        if(context.user && (context.user.id === args.userId || context.user.isAdmin)) {
            return Db.models.user.findAll({
                raw:true,
                attributes: ['id'],
                where: {
                    isSubscribed: 1
                }
            }).then(result => {
                console.log(result)
                var ids = []
                for (var i = 0; i < result.length; i++) {
                    var obj = result[i]
                    console.log(obj)
                    ids.push(obj.id)
                }
                console.log(ids)
                var whereClause = args.id ?
                    {
                        id: args.id,
                        userId: {
                            [Db.Op.in]: ids
                        }
                    } : {
                        userId: {
                            [Db.Op.in]: ids
                        }
                    }
                return Db.models.subscriber.findAll({
                    where: whereClause 
                })
            });
        }
        throw new Error("Não autorizado.");
    }
};