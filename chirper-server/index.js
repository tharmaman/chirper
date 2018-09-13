// load all of our environment variables
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;

// requiring other dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

// initialize processes
app.use(cors());
app.use(bodyParser.json());

// ROUTES START HERE

// if there is any request that uses...
// go and use these authRoutes
app.use("/api/auth", authRoutes);

// first validate with middleware 
// go and use these messagesRoutes
app.use(
    "/api/users/:id/messages", 
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
);

// add in login required middleware
app.get("/api/messages", loginRequired, async function(req, res, next){
    try {
        let messages = await debug.Message.find()
        .sort({
            createdAt: "desc"
        })
        // populate is default id
        .populate("user", {
            username: true,
            profileImageURL: true
        })
        return res.status(200).json(messages);
    } catch(err) {
        return next(err)
    }
})

// tell application to run a function for error handling
// for 404 error
app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    // next => is the next function to be ran or CALLBACK
    next(err);
});

// no matter what error sent run the errorHandler middleware 
// take in any incoming middleware with an error, and print out a nicer display
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});
