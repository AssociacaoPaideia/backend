import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from "graphql";

import Db from "../../db.js";
import MailSender from "../../Application/MailSender"

const SendPassword = {
    type: GraphQLBoolean,
    name: "Email",
    description: "Envia email de recuperação de senha",
    args: {
        email: {
            type: GraphQLString
        }
    },
    resolve(root, args, context) {
        return Db.models.user.findOne({where: args}).then((result) => {
            if (result) {
                var user = result.get({plain: true});
                console.log(user)
                MailSender.sendPasswordRecoveryMail(user.firstName, user.email, user.password);
            }
        });
    }
}

export default SendPassword