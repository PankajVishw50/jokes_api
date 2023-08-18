
const {DataTypes} = require("sequelize");
const modelValidators = require("../../validators/modelValidators");
const bcrpt = require("bcrypt");
const config = require("../../config");

/* 
User table should have follow details
    username: string
    password: string,
    refresh_token: string  
*/

module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
            validate: {
                haveSpace: modelValidators.haveSpace
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            // set(value){
            //     const _hashed = await bcrpt.hash(value, 10);
            //     console.log("hash is ", _hashed);
            //     this.setDataValue("password", _hashed);
            // }
        },
        refresh_token: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: false, tableName: "users"
    })
}
