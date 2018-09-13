const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../handlers/auth");

// if there is any kind of POST request to the /signup route
// run the signUp function
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;