
const jwt = require("jsonwebtoken");
const config = require("../config");
const {CustomError} = require("./errorMiddleware");

class AuthMiddleware{

    static async guard(req, res, next){
        let token;
        try{
           token = req.headers.authorization.split(" ")[1] 
        }catch{
            return next(CustomError.createError(400, "Invalid header"))
        }

        let result;
        try{
            result = await jwt.verify(token, config.SECRET);
        }catch{
            return next(CustomError.createError(404, "authentication failed"));
        }

        req.user = result;
        next();
    }
}

module.exports = AuthMiddleware;