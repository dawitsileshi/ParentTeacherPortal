let mongoose = require("mongoose");

let parentSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    relation: String,
    // uname: String,
    email: String,
    tel: String,
    password: String,
    students: [{
        student: mongoose.Schema.Types.ObjectId
        // studentId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "student"
        // }
    }]
});

let parentModel = new mongoose.model("parent", parentSchema);

module.exports = parentModel;