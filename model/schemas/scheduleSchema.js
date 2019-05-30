let mongoose = require("mongoose");

let scheduleSchema = new mongoose.Schema({
    year: Number,
    semester: Number,
    day: String,
    dayNumber: Number,
    section: String,
    program: [{
            period: Number,
            courseName: String,
            teacherName: String
        }],
    // students: [{
    //     student: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "student"
    //     }
    // }]

    // schedule: [{year: [{year: Number,
    //                     semester: Number,
    //                     day: [{
    //                         day: Number,
    //                         name: String,
    //                         schedule: [{
    //                                 section: String,
    //                                 period: [{
    //                                         period: Number,
    //                                         courseName: String,
    //                                         teacherName: String
    //                                        }]
    //                                 }]
    //                         }]
    //                     }]
    //             }]

    // year: String,
    // section: String,
    // day: Date,
    // program: [
    //     {
    //         course: String,
    //         period: String,
    //     }
    // ]
});

let scheduleModel = mongoose.model("schedule", scheduleSchema);

module.exports = scheduleModel;