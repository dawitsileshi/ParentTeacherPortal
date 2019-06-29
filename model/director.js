let studentModel = require("./schemas/studentSchema");
let teacherModel = require("./schemas/teacherSchema");
let scheduleModel = require("./schemas/scheduleSchema");
let commonUserModel = require("./schemas/commonUserSchema");
// TODO: registerStudent should only be accessed through the registrar authentication
// TODO: 
exports.assignCourseToTeachers = (day, period, course) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find()

    })

};

exports.registerDirector = director => {

    return new Promise((resolve, reject) => {

        commonUserModel(director).save((err, savedDirector) => {
            if(err) {
                reject(err)
            }else {
                console.log(savedDirector);
                resolve(savedDirector);
            }
        })

    })

};

exports.loginDirector = (username, email, password) => {

    return new Promise((resolve, reject) => {

        commonUserModel.findOne({uname: username, email: email, password: password}, (err, foundDirector) => {

            if(err) {
                reject(err)
            } else {
                if(foundDirector === null) {
                    reject("Wrong username or password")
                } else {
                    // console.log(foundTeacher);
                    resolve(foundDirector);
                }
            }


        })

    })

};

exports.updateSemester = () => {

  return new Promise((resolve, reject) => {



  })

};