const express = require("express");
const router = express.Router({
    mergeParams: true  // allows us to get access to the ID inside of router
});

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");

// prefix - /api/user/:id/messages
router.route("/").post(createMessage);

// prefix - /api/user/:id/messages/message_id
router 
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;