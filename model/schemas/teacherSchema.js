let mongoose = require("mongoose");

let teacherSchema = new mongoose.Schema({

    fname: String,
    lname: String,
    uname: String,
    password: String,
    gender: String,
    email: String,
    course: String,
    schedules: [{
        scheduleId: mongoose.Schema.Types.ObjectId
    }],
    students: [{
        studentId: mongoose.Schema.Types.ObjectId
    }]

});

let teacherModel = new mongoose.model("teacher", teacherSchema);

module.exports = teacherModel;