let mongoose = require("mongoose");

let scheduleSchema = new mongoose.Schema({
    year: Number,
    grade: Number,
    semester: Number,
    day: String,
    dayNumber: Number,
    section: String,
    program: [{
            period: Number,
            courseName: String,
            teacherId: mongoose.Schema.Types.ObjectId,
            teacherName: String,
            lessonPlanId: mongoose.Schema.Types.ObjectId
        }],
    students: [{
        studentId: mongoose.Schema.Types.ObjectId
    }]
});

let scheduleModel = mongoose.model("schedule", scheduleSchema);

module.exports = scheduleModel;