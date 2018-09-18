require("dotenv").load();

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MLAB_URI || "mongodb://localhost/chirper", {
    keepAlive: true,
    useNewUrlParser: true
});

// bundle models
module.exports.User = require("./user");
module.exports.Message = require("./message");