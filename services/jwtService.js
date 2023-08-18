
const jwt = require("jsonwebtoken");
const config = require("../config");

class JwtService{
    static async createAccessToken(payload){
        const token = await jwt.sign(payload, config.SECRET, {expiresIn: config.ACCESS_TOKEN_VALIDITY})
        return token;
    }

    static async createRefreshToken(payload){
        const token = await jwt.sign(payload, config.SECRET, {expiresIn: config.REFRESH_TOKEN_VALIDITY})
        return token;
    }

    static async decodeToken(token){
        try{
            const result = await jwt.decode(token);
            console.log("inside decodetoken")
            console.log(result);

            if (result && await jwt.verify(token, config.SECRET)){
                return result;
            }
        }catch(err){
            console.log(err)
            return false;
        }
        return false;
    }

}

module.exports = JwtService;