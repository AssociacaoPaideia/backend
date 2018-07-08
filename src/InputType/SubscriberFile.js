import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";

const SubscriberFile = new GraphQLObjectType({
    name: "SubscriberFile", 
    description: "This representes a file",
    fields: () => {
        return {
            type: {
                type: GraphQLString,
                resolve(file){
                    return file.type;
                }
            },
            file: {
                type: GraphQLString,
                resolve(file){
                    return file.file;
                }
            },
        }
    }
});

export default SubscriberFile;