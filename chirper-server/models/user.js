const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // need to password hash 
    password: {
        type: String,
        required: true
    },
    // not required!
    profileImageURL: {
        type: String
    },
    messages: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
        }
    ]
});

// add user hook before save
// use async keyword
// next means move on
userSchema.pre("save", async function(next){
    try {
        // if password has not been changed at all
        // then don't mess with it AKA hash
        if(!this.isModified("password")){
            return next();
        }
        // use salts so that the hashes are different for the same passwords
        let hashedPassword = await bcrypt.hash(this.password, 10);
        // once hash is finished set password to hash
        this.password = hashedPassword;
        // next is saving the user 
        return next();
    } catch (err) {
        // if something foes wrong, go to error handler
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        // once comparison is done return true or false
        return isMatch;
        // goes all the way to the error handler at index.js
    } catch(err) {
        return next(err)
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;