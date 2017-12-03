import Sequelize from "sequelize";
import _ from "lodash";

var config = require("./config.js")
console.log(config)


//Entities
const Conn = new Sequelize(
    "paideia",
    config.db_user,
    config.db_pwd,
    {
        dialect: "mysql",
        host: config.db_host
    }
);


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
    citizenCard: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    rg: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const User = Conn.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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
    }
});

//Relationships
Subscriber.belongsTo(User);

Conn.sync({force: true}).then(()=> {

});

export default Conn;