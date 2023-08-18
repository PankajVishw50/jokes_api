
const express = require("express");
const config = require("../config");
const path = require("path");
const { userServices } = require("../database");
const { CustomError } = require("../middlewares/errorMiddleware");

module.exports = {
    getIndexPage(req, res){
        const _path = path.join(config.TEMPLATE_FOLDER_PATH, "index.html")
        res.render("index");
    },

    getLoginPage(req, res){
        res.render("login");
    },

    getSignUpPage(req, res){
        res.render("signup");
    },

    async getLogout(req, res, next){
        try{
            const result = await userServices.deleteRefresh(req.user.id);
            console.log("It's also fine");

            if (result){
                return res.status(200).send({
                    msg: "Logged out",
                    status: 200
                });
            }
        }catch(err){
            console.log(err);
            return next(CustomError.createError(400, err.message))
        }
    },

    async createPost(req, res, next){
        res.render("post");
    },

    getJokes(req, res, next){
        res.render("my-posts")
    }
}