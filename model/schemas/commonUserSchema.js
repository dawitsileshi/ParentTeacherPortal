let mongoose = require("mongoose");

let commonUserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    gender: String,
    uname: String,
    password: String
});

let nurseModel=  mongoose.model("commonUser", commonUserSchema);

module.exports = nurseModel;