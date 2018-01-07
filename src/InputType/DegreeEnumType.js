import {GraphQLEnumType}  from "graphql";

const DegreeEnumType = new GraphQLEnumType({
    name: "DegreeEnum",
    values: {
        FUNDAMENTAL_INCOMPLETE:{}, 
        FUNDAMENTAL_COMPLETE:{},
        HIGHSCHOOL_INCOMPLETE:{},
        SUPERIOR_INCOMPLETE:{},
        SUPERIOR_COMPLETE:{}
    }
})

export default DegreeEnumType; 