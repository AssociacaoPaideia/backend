import Sequelize from "sequelize";
import _ from "lodash";

//Entities
const Conn = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.DBPWD,
    {
        dialect: "mysql",
        host: process.env.DBHOST,
        operatorsAliases: false 
    }
);


const User = Conn.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    isActivated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isSubscribed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


const Subscriber = Conn.define("subscriber", {
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    birthPlace: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    rg: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    }
});

const docType = [["RG","CPF", "PARENT_RG", "PARENT_CPF", "TERM_RESP", "HISTORY","SCHOLARSHIP", "EJA", "MEDICAL", "ADDRESS", "PHOTO", "CITIZEN CARD", "HIGHSCHOOL"]];
const SubscriberFiles = Conn.define("subscriberFiles", {
    type: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
        validate: {
            isIn: {
               args:  docType,
               msg: "Values must be: " + docType
            }
        }
    },
});

//Relationships
Subscriber.belongsTo(User);
SubscriberFiles.belongsTo(Subscriber);

Conn.sync({force: true});

export default Conn;