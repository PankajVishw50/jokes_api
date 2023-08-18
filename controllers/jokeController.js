
const {userServices, jokeServices} = require("../database");
const config = require("../config");
const jwt = require("jsonwebtoken");
const {CustomError} = require("../middlewares/errorMiddleware");
const JokeServices = require("../services/jokeService");

const JokeController = {
    async getJokeRandom(req, res, next){
        try{
            const joke = await jokeServices.randomJoke();
            res.send(joke);
        }catch(err){
            console.log("error happeend");
            return next(CustomError.createError(500, err.message))
        }
    },

    async createJoke(req, res, next){
        console.log(req.user);

        const content = req.body.content;
        
        if (!content){
            return next(CustomError.createError(400, "content field is needed"))
        }

        let user;
        let joke;
        try{
            user = await userServices.getUser(req.user.username);
            joke = await jokeServices.createJoke(content);
            console.log(user.toJSON());

            if (!user){
                throw new Error("Invalid credentaials");
            }

            console.log(user);
            const result = await user.addJoke(joke, {include: jokeServices.model});      
            await joke.reload();

            res.send(joke);

        }catch(err){
            return next(CustomError.createError(404, err))
        }


    },

    async getAllJokes(req, res, next){
        console.log("\n\nOperation\n")
        console.log(req.user.id);
        try{
            const jokes = await jokeServices.getAllJokes(req.user.id);

            if (!jokes){
                return next(CustomError.createError(404, "no data found"))
            }
            res.send(jokes);
        }catch(err){
            console.log(err);
            return next(CustomError.createError(404, "Something went wrong"));
        }
    }
}

module.exports = JokeController;