let mongoose = require("mongoose");

let attendanceSchema = new mongoose.Schema({
    dailyAttendance: {
        year: Number,
        section: String,
        date: Date,
        attendance:[{
            courseName: String,
            teacherId: mongoose.Schema.Types.ObjectId,
            period: String,
            students: [{
                studentId: mongoose.Schema.Types.ObjectId,
                value: String,
                excused: Boolean
            }]
        }],
   },
   criticalStage: [{
        studentId: mongoose.Schema.Types.ObjectId
            // studentId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: "student"
            // }
   }]
});

let attendanceModel = new mongoose.model("attendance", attendanceSchema);

module.exports = attendanceModel;