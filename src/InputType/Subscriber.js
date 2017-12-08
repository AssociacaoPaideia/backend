import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import User from "./User.js"

//Tenho que apenas exportar o schema
const Subscriber = new GraphQLObjectType({
    name: "Subscriber",
    description: "This representes a User that subscribed to the course.",
    fields: () => {
        return {
            birthDate: {
                type: GraphQLString,
                resolve(subscriber){
                    return subscriber.birthDate
                }
            },
            birthPlace: {
                type: GraphQLString,
                resolve(subscriber){
                    return subscriber.birthPlace
                }
            },
            phone: {
                type: GraphQLString,
                resolve(subscriber){
                    return subscriber.phone
                }
            },
            citizenCard: {
                type: GraphQLString,
                resolve(subscriber){
                    return subscriber.citizenCard
                }
            }, 
            cpf: {
                type: GraphQLInt,
                resolve(subscriber){
                    return subscriber.cpf
                }
            },
            rg: {
                type: GraphQLInt,
                resolve(subscriber){
                    return subscriber.rg
                }
            },
            photo: {
                type: GraphQLString,
                resolve(subscriber){
                    return subscriber.photo
                }
            },
            user: {
                type: User,
                resolve(subscriber){
                    return subscriber.getUser();
                }
            }
        }
    }
});

export default Subscriber