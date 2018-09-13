// go to models/index.js
const db = require("../models");
// to mark users as logged in
const jwt = require("jsonwebtoken");

// checking if their password matches what was sent to the server
// if it all matches
// log them in
exports.signIn = async function(req, res, next){
    // finding a user
    try {
        let user = await db.User.findOne({
            username: req.body.username
        });
        let { id, username, profileImageURL } = user
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageURL
            },
            process.env.SECRET_KEY
            );
            // 200 means OK
            return res.status(200).json({
                id,
                username,
                profileImageURL,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}

exports.signUp = async function(req, res, next){
    // create a user
    // create a token (signing a token)
    // * consists of header, payload and secret
        // process.env.SECRET_KEY
    try {
        let user = await db.User.create(req.body);
        let { id, username, profileImageURL } = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageURL
            }, 
            process.env.SECRET_KEY
        );
        // 200 means OK
        return res.status(200).json({
            id,
            username,
            profileImageURL,
            token
        })

    } catch(err) { 
        // see what kind of error
        // if certain error
        // respond with username/email already taken
        // otherwise send back a BAD REQUEST ERROR 400
        // error 11000 is a validation email
        if (err.code === 11000){
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}