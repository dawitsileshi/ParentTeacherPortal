let mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    idNumber: String,
    fname: String,
    lname: String,
    pic: {
        data: Buffer,
        contentType: String
    },
    grade: Number,
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
    // another total and average variables must be added to get the value of the whole grade assessment, the current one only handles semester values
    result: [{year: Number,
        semester: [{semester: Number,
                    results: [{courseName: String,
                                classWork: Number,
                                homeWork: Number,
                                groupWork: Number,
                                individual: Number,
                                quiz1: Number,
                                quiz2: Number,
                                quiz3: Number,
                                final: Number}],
                    total: Number,
                    average: Number
                    }]
            }],
    schedules: [{
        scheduleId: mongoose.Schema.Types.ObjectId
    }],
});

let studentModel = new mongoose.model("student", studentSchema);

module.exports = studentModel;