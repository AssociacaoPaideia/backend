import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from "graphql";
import Db from "./db";


const User = new GraphQLObjectType({
    name: "User", 
    description: "This representes a subscribed user.",
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person){
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person){
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person){
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(person){
                    return person.email;
                }
            },
        }
    }
});

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is the root query",
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.user.findAll({where: args});
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;