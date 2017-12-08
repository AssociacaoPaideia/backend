import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import Db from "../../../db.js";
import Subscriber from "../../InputType/Subscriber.js"

const GetSubscribers = {
    type: new GraphQLList(Subscriber),
    description: "Retorna a lista de inscritos.",
    args: {
        id: {
            type: GraphQLInt
        },
        cpf: {
            type: GraphQLInt
        }                    
    },
    resolve(root, args){
        return Db.models.subscriber.findAll({where: args});
    }
}

export default GetSubscribers;