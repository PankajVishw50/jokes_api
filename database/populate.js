
const {readFileSync} = require("fs");
const db = require("./index");
const {Sequelize} = require("sequelize");
const UserServices = require("../services/userService");
const JokeServices = require("../services/jokeService");
const config = require("../config");

const file = readFileSync("D:/Dev/webdev/Practice/nodejs_app/08-jokes-api-website/res/santabanta.txt",
 "utf-8");

function parseJokes(text) {
    const jokeStartTag = 'JOKE_START';
    const jokeEndTag = 'JOKE_END';
    const jokes = [];
    
    let currentJoke = [];
    let parsingJoke = false;

    const lines = text.split('\n');
    for (const line of lines) {
        if (line.trim() === jokeStartTag) {
            parsingJoke = true;
            currentJoke = [];
        } else if (line.trim() === jokeEndTag) {
            parsingJoke = false;
            if (currentJoke.length > 0) {
                jokes.push(currentJoke.join('\n'));
                currentJoke = [];
            }
        } else if (parsingJoke) {
            currentJoke.push(line.trim());
        }
    }

    return jokes;
}

function populate(sequelize) {
    const result = parseJokes(file);

    result.forEach(data => {
        sequelize.models.Joke.create({
            content: data
        })
    })
    console.log("Done");
}

async function main(){
    const sequelize_2 = new Sequelize(config.DB_URL);

    const userServices = new UserServices(sequelize_2);
    const jokeServices = new JokeServices(sequelize_2);

    // Create relationship
    userServices.model.hasMany(jokeServices.model, {foreignKey: "user_id"});
    jokeServices.model.belongsTo(userServices.model, {foreignKey: "user_id"});

    await sequelize_2.sync();

    populate(sequelize_2);

}

main();

