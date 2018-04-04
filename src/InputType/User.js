import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";

const User = new GraphQLObjectType({
    name: "User", 
    description: "This representes a user who is able to login to the system.",
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
            isSubscribed: {
                type: GraphQLBoolean,
                resolve(person){
                    return person.isSubscribed
                }
            }
        }
    }
});

export default User;