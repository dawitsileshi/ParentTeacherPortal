let mongoose = require("mongoose");

let gradeSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    grade: [{year: String,
            semester: [{semester: String,
                        results: [{courseName: String,
                                    quiz: Number,
                                    MidExam: Number,
                                    assignment: Number,
                                    finalExam: Number,
                                    total: Number}],
                        total: Number,
                        average: Number}]}]
    // result: [{
    //     course: [{
    //         year: String,
    //         semester: String,
    //
    //     }]
    // }]
});

let gradeModel = new mongoose.model("grade", gradeSchema);

module.exports = gradeModel;