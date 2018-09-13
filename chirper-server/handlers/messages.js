const db = require("../models");

// /api/users/:id/messages
exports.createMessage = async function(req, res, next){
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        // ? populate means instead of just grabbing the user id, we can grab other properties like username and profile photo
        let foundMessage = await db.Message.findById(message._id).populate("user",{
            username: true,
            profileImageURL: true
        });
        return res.status(200).json(foundMessage);
    } catch(err) {
        return next(err);
    }
}

// GET - /api/users/:id/messages/:messages_id
exports.getMessage = async function(req, res, next){
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch (err) {
        return next(err);
    }
}

// GET - /api/users/:id/messages/:messages_id
exports.deleteMessage = async function(req, res, next){
    try {
        // we have a pre message remove hook
        // so findByIdAndRemove won't work
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
}