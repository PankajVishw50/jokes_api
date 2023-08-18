
const jokeModel = require("../database/models/jokeModel");

class JokeServices{
    constructor(sequelize){
        jokeModel(sequelize);

        this.client = sequelize;
        this.models = sequelize.models;
        this.model = sequelize.models.Joke;
    }

    async randomJoke(){
        const joke = await this.model.findAll();
        console.log("operation");
        const random = Math.round(Math.random() * joke.length);

        return joke[random].toJSON();
    }

    createJoke(content){
        const joke = this.model.create({content});
        return joke;
    }

    async getAllJokes(userId){
        const jokes = await this.model.findAll({where:{user_id:userId}})
        return jokes;
    }
}

module.exports = JokeServices;