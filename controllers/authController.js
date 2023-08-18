
const {CustomError} = require("../middlewares/errorMiddleware");
const {userServices} = require("../database");
const JwtService = require("../services/jwtService");
const bcrpt = require("bcrypt");


const authController = {
    async createMe(req, res, next){
        const {username, password} = req.body;

        if (!username || !password){
            return next(CustomError.createError(400, "Provide all fields. (username, password)"))
        }

        const password_hash = await bcrpt.hash(password, 10);
        let user;
        let access_token;
        let refresh_token;
        try{
            user = await userServices.createUser({username: username, password:password_hash});

            if (!user){
                throw new Error("invalid userid");
            }

            const _data = {id: user.id, username};
            access_token = await JwtService.createAccessToken(_data) ;
            refresh_token = await JwtService.createRefreshToken(_data);
            userServices.updateRefresh(user.id, refresh_token);

        }catch(err){
            return next(404, err);
        }

        res.send({
            access_token: access_token,
            refresh_token: refresh_token
        });

    },

    async login(req, res, next){
        const {username, password} = req.body;

        if (!username || !password){
            return next(CustomError.createError(400, "Provide all fields. (username, password)"))
        }

        let user;
        const _hash = bcrpt.hash(password, 10);
        let access_token;
        let refresh_token;
        try{
            user = await userServices.getUserDetailed(username);
            console.log(user.toJSON());
            const compare = await bcrpt.compare(password, user.password);
            console.log(compare);


            if (!user || !compare){
                throw new Error("Invalid credentaials");
            }

            const _data = {id: user.id, username};
            access_token = await JwtService.createAccessToken(_data) ;
            refresh_token = await JwtService.createRefreshToken(_data);
            userServices.updateRefresh(user.id, refresh_token);

        }catch(err){
            return next(CustomError.createError(404, err))
        }

        res.send({
            access_token: access_token,
            refresh_token: refresh_token
        });

    },

    async getRefresh(req, res, next){
        console.log("\n\nStart::\n")
        const refresh_token_user = req.body.refresh_token;

        if (!refresh_token_user){
            return next(CustomError.createError(400, "Provide refresh_token"));
        }

        try{
            const user = await JwtService.decodeToken(refresh_token_user);
            console.log(user);

            if (!user){
                return next(CustomError.createError(400, "Invalid refresh token"));
            }

            const access_token = await JwtService.createAccessToken({id:user.id, username:user.username});
            const refresh_token = await JwtService.createRefreshToken({id:user.id, username:user.username});

            return res.send({
                access_token:access_token,
                refresh_token:refresh_token
            })
        }catch(err){
            console.log(err)
            return next(err);
        }

    }
}



module.exports = authController;