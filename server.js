
const express = require("express");
const path = require("path");
const ejs = require("ejs");

const config = require("./config");
const mainRouter = require("./routers/mainRouter");
const apiRouter = require("./routers/apiRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const AuthMiddleware = require("./middlewares/authenticationMiddleware");

const app = express();
const {sequelize} = require("./database");

const multer = require("multer")();

config.TEMPLATE_FOLDER_PATH = path.join(__dirname, "templates");
config.STATIC_FOLDER_PATH = path.join(__dirname, "static");
console.log(config.TEMPLATE_FOLDER_PATH);


// app.set('views', config.TEMPLATE_FOLDER_PATH);
app.set("view engine", "ejs");

// Middlewares
app.use(express.static(config.STATIC_FOLDER_PATH));

app.use(multer.none());
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", apiRouter);
app.use(mainRouter);

app.use(errorMiddleware.handleError);

app.listen(config.APP_PORT, () => {
    console.log(`Listening on port ${config.APP_PORT} ::>`);
})