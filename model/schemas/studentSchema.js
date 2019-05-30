let mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    // id: String,
    fname: String,
    lname: String,
    pic: {
        data: Buffer,
        contentType: String
    },
    year: Number,
    age: Number,
    gender: String,
    section: String,
    inSchool: Boolean,
    // semester: Number,
    familyContact: [{
        email: String,
        token: String,
        tel: String,
    }],
    medicalRecord: [{
        diseaseName: String,
        description: String,
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    // another total and average variables must be added to get the value of the whole year assessment, the current one only handles semester values
    grade: [{year: Number,
        semester: [{semester: Number,
                    results: [{courseName: String,
                                quiz: Number,
                                midExam: Number,
                                assignment: Number,
                                finalExam: Number,
                                total: Number}],
                    total: Number,
                    average: Number
                    }]
            }],
    schedule: [{day: String,
                dayNumber: Number,
                program: [{
                    period: Number,
                    courseName: String,
                    teacherName: String
                }]
            }]
});

let studentModel = new mongoose.model("student", studentSchema);

module.exports = studentModel;