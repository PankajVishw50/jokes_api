
require("dotenv").config();

module.exports = {
    SECRET,
    APP_PORT,
    DB_URL,
    HASH_SALT,
    STATIC_FOLDER,
    ACCESS_TOKEN_VALIDITY,
    REFRESH_TOKEN_VALIDITY
} = process.env;
