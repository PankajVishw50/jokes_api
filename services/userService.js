
const userModel = require("../database/models/userModel");
const bcrypt = require("bcrypt")
const config = require("../config");

class UserServices {
    constructor(sequelize){
        userModel(sequelize);

        this.client = sequelize;
        this.models = sequelize.models;
        this.model = sequelize.models.User;
    };

    createUser(data){
        console.log("data is");
        console.log(data);
        const user = this.model.create(data);
        return user;
    };

    getUserDetailed(username){
        const user = this.model.findOne({
            where: {
                username: username
            }        
        })

        return user;
    };

    getUser(username){
        const user = this.model.findOne({
            where: {
                username: username
            },
            attributes: {
                exclude: ["refresh_token", "password"]
            }
        })

        return user;
    };

    async updateRefresh(userId, refresh_token){
        const user = await this.model.findByPk(userId);
        user.refresh_token = refresh_token;
        await user.save();
        return 
    }

    async deleteRefresh(userId){
        console.log("Inside delete refresh")
        console.log(userId);
        const user = await this.model.findByPk(userId);
        user.refresh_token = null;
        await user.save();
        return true;
    }
}

module.exports = UserServices;