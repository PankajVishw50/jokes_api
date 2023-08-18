

const {Sequelize} = require("sequelize");
const config = require("../config");
const logger = require("../services/loggerService");
const UserServices = require("../services/userService");
const JokeServices = require("../services/jokeService");


function connectToDatabase(){
    const sequelize = new Sequelize(config.DB_URL, {
        logging: logger
    })

    sequelize.authenticate().then(() => console.log("Successfully conntected to database"))
    .catch((err) => console.log("Error generated: ", err.message));

    return sequelize;
}

let sequelize = connectToDatabase();

const userServices = new UserServices(sequelize);
const jokeServices = new JokeServices(sequelize);

// Create relationship
userServices.model.hasMany(jokeServices.model, {foreignKey: "user_id"});
jokeServices.model.belongsTo(userServices.model, {foreignKey: "user_id"});

sequelize.sync();

// It's used to populate jokes table with jokes
// require("./populate")(sequelize);

module.exports = {
    sequelize,
    userServices,
    jokeServices
}