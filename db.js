import Sequelize from "sequelize";
import _ from "lodash";
import Faker from "Faker";

var config = require("./config.js")
console.log(config)


//Entities
const Conn = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.DBPWD,
    {
        dialect: "mysql",
        host: process.end.DBHOST,
        operatorsAliases: false 
    }
);


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
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    isActivated: {
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
    citizenCard: {
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
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


const schoolTypeArgs = [["PUBLIC","PRIVATE"]];
const schoolCompletion = [["COMPLETE", "INCOMPLETE", "SUPERIOR"]];
const SubscriberAditionalData = Conn.define("subscriber_aditional_data",{
    scholarDegree: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: {
               args:  schoolCompletion,
               msg: "Values must be: " + schoolCompletion
            }
        }
    },
    highSchoolYear: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    schoolType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: {
               args:  schoolTypeArgs,
               msg: "Values must be: " + schoolTypeArgs
            }
        }
    },
    scholarship: {
        type: Sequelize.BOOLEAN,
        allowNull: true        
    },
    intendedCourse: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    intendedInstitution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    enemGrade: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            isInt: true,
            isValid(value) {
                if (!(parseInt(value) <= 1000 && parseInt(value) > 0)) {
                    throw new Error("Nota do enem inválida!")
                }
            }
        }
    }
});

const degreeType = [["FUNDAMENTAL_INCOMPLETE", "FUNDAMENTAL_COMPLETE", 
"HIGHSCHOOL_INCOMPLETE", "HIGHSCHOOL_COMPLETE", "SUPERIOR_INCOMPLETE", "SUPERIOR_COMPLETE"]];
const SubscriberSocioEconomic = Conn.define("subscriber_socio_economic", {
    bruteFamilyIncome: {
        type: Sequelize.STRING,
        allowNull:  false
    },
    isWorking: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    workingHours: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    helpsFinanciallyAtHome: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    motherDegree: {
        type: Sequelize.STRING,
        validate: {
            isIn: {
                args: degreeType,
                msg: "Value must be in: "  + degreeType.length
            } 
        },
        allowNull: true
    },
    fatherDegree: {
        type: Sequelize.STRING,
        validate: {
            isIn: {
                args: degreeType,
                msg: "Value must be in: "  + degreeType.length
            } 
        },
        allowNull: true
    }
});

//Relationships
Subscriber.belongsTo(User);
SubscriberSocioEconomic.belongsTo(Subscriber);
Subscriber.hasOne(SubscriberSocioEconomic);
SubscriberAditionalData.belongsTo(Subscriber);
Subscriber.hasOne(SubscriberAditionalData);

Conn.sync({force: true}).then(()=> {
    _.times(10, ()=>{
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            password: "bla"
        });
    });
});

export default Conn;