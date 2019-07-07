let mongoose = require("mongoose");

let gradeSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    // name: String,
    grade: Number,
    semester: Number,
    courseName: String,
    classWork: {
        value: Number, max: Number
    },
    homeWork: {
        value: Number, max: Number
    },
    groupWork: {
        value: Number, max: Number
    },
    individual: {
        value: Number, max: Number
    },
    quiz1: {
        value: Number, max: Number
    },
    quiz2: {
        value: Number, max: Number
    },
    quiz3: {
        value: Number, max: Number
    },
    final: {
        value: Number, max: Number
    },
    score: Number,
    total: Number
    // grade: [{year: String,
    //         semester: [{semester: String,
    //                     results: [{courseName: String,
    //                                 quiz: Number,
    //                                 MidExam: Number,
    //                                 assignment: Number,
    //                                 finalExam: Number,
    //                                 total: Number}],
    //                     total: Number,
    //                     average: Number}]}]

});

let gradeModel = new mongoose.model("grade", gradeSchema);

module.exports = gradeModel;