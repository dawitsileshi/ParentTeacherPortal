let studentModel = require("./schemas/studentSchema");
let teacherModel = require("./schemas/teacherSchema");
let scheduleModel = require("./schemas/scheduleSchema");

exports.assignCourseToTeachers = (day, period, course) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find()

    })

};