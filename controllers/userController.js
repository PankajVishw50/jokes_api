const {CustomError} = require("../middlewares/errorMiddleware");
const {userServices} = require("../database");
const JwtService = require("../services/jwtService");
const bcrpt = require("bcrypt");

const userController = {
    async getMe(req, res, next){
        try{
            const user = await userServices.getUser(req.user.username);

            if (!user){
                throw new Error("Invalid credentails");
            }
            return res.send(user);
        }catch(err){
            return next(err);
        }
    }
}

module.exports = userController;