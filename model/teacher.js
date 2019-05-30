let teacherModel = require("./schemas/teacherSchema");
let studentModel = require("./schemas/studentSchema");

exports.registerTeacher = teacher => {

    return new Promise((resolve, reject) => {
        teacherModel(teacher).save((err, savedTeacher) => {
            if(err) {
                reject(err)
            }else {
                resolve(savedTeacher);
            }
        })
    })

};

exports.deleteTeacher = id => {

    return new Promise((resolve, reject) => {
        teacherModel.remove({_id: id}, (err, deletedTeacher) => {

            if(err) {
                reject(err)
            } else {
                resolve(deletedTeacher)
            }

        })
    })

};

exports.listAllTeachers = () => {

    return new Promise((resolve, reject) => {

        teacherModel.find({}, (err, foundTeachers) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundTeachers)
            }

        })

    })

};

exports.listBySection = section => {

    return new Promise((resolve, reject) => {

        teacherModel.find({section: section}, (err, foundTeacher) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundTeacher)
            }

        })

    })

};

exports.listByYear = year => {

    return new Promise((resolve, reject) => {

        teacherModel.find({year: year}, (err, foundTeacher) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundTeacher)
            }

        })

    })

};

exports.listStudents = (year, section) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({year: year, section: section}, (err, foundStudents) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudents)
            }

        })

    })

};

// exports.listBySection = section => {
//
//     return new Promise((resolve, reject) => {
//
//         teacherModel.find({section: section}, (err, foundTeacher) => {
//
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(foundTeacher)
//             }
//
//         })
//
//     })
//
// };
