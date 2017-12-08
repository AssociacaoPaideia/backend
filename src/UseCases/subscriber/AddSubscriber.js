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

//Tenho que apenas exportar o schema
const AddSubscriber = {
    name: "",
    description: "",
    type: Subscriber,
    args: {

    },
    resolver(args){
        return Db.models.subscriber.findAll({where:args})
    }
}

export default AddSubscriber