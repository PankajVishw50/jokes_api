
const {DataTypes} = require("sequelize");

const modelValidators = require("../../validators/modelValidators");

module.exports = (sequelize) => {
    sequelize.define("Joke", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                minRequiredLength: modelValidators.minRequiredLength(10)
            }
        }
    }, {
        timestamps: false, tableName: "jokes"
    })
}