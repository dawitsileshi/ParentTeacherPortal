let studentModel = require("./schemas/studentSchema");
let scheduleModel = require("./schemas/scheduleSchema");

exports.registerStudent = student => {

  return new Promise((resolve, reject) => {
      // scheduleModel.findOne({section: student.section, year: student.year}, (err, foundSchedule) => {
      //     if(err) {
      //         reject(err)
      //     } else {
      //         if(foundSchedule !== null) {
      //
      //             let scheduleForStudent = {day: foundSchedule.day,
      //                 dayNumber: foundSchedule.dayNumber,
      //                 program: foundSchedule.program};
      //             student.schedule.push(scheduleForStudent);
                  studentModel(student).save((err, savedStudent) => {
                      if(err) {
                          reject(err)
                      }else {
                          console.log(savedStudent);
                          resolve(savedStudent);
                      }
                  })
              // }
          // }
      // });
  })

};

exports.deleteStudent = id => {

    return new Promise((resolve, reject) => {
        studentModel.remove({_id: id}, (err, deletedStudent) => {

            if(err) {
                reject(err)
            } else {
                resolve(deletedStudent)
            }

            })
        })

};

exports.listAllStudents = () => {

    return new Promise((resolve, reject) => {

        studentModel.find({}, (err, foundStudents) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudents)
            }

        })

    })

};

exports.listSpecificStudent = id => {

    return new Promise((resolve, reject) => {

        studentModel.findById(id).exec((err, foundStudent) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudent)
            }

        })

    })

};

exports.listByFamContact = email => {

    return new Promise((resolve, reject) => {

        studentModel.find({familyContact: {"$all": [{"$elemMatch": {email: {$eq: email}}}]}}, (err, foundStudent) => {

            if(err) {
                reject(err);
            } else {
                console.log("The students are ", foundStudent);
                resolve(foundStudent)
            }

        });

    })

};

exports.listBySection = section => {

    return new Promise((resolve, reject) => {

        studentModel.find({section: section}, (err, foundStudent) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudent)
            }

        })

    })

};

exports.listByYear = year => {

    return new Promise((resolve, reject) => {

        studentModel.find({year: year}, (err, foundStudent) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudent)
            }

        })

    })

};

exports.enterMedicalRecord = (id, medicalRecord) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {

            if(err) {
                reject(err)
            }else {
                foundStudent.medicalRecord.push(medicalRecord);
                foundStudent.save();
                resolve("The data is updated successfully")
            }

        })

    })

};

exports.showStudentSchedule = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, "schedule -_id", (err, foundSchedule) => {
            if(err) {
                reject(err)
            } else {
                resolve(foundSchedule)
            }
        })

    })

};

exports.showStudentMedicalRecord = id => {

    return new Promise((resolve, reject) => {

        studentModel.findById(id).select("medicalRecord").exec((err, foundMedicalRecord) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundMedicalRecord)
            }

        })

    })

};

exports.showStudentGrade = id => {

    return new Promise((resolve, reject) => {

        studentModel.findById(id).select("grade").exec((err, foundGrade) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundGrade)
            }

        })

    })

};

exports.removeSchedule = (year, section, semester, dayNumber) => {

    return new Promise((resolve, reject) => {

        studentModel.find({section: section, year: year, semester: semester}, (err, foundStudent) => {

            console.log(foundStudent[0].schedule[0]);
            if(err) {
                reject(err)
            } else {
                for (let i = 0; i < foundStudent.length; i++) {

                    let student = foundStudent[i];
                    let scheduleArray = student.schedule;
                    // scheduleArray.splice(0, 1);
                    // student.save();
                    // console.log(student.schedule)
                    for (let j = 0; j < scheduleArray.length; j++) {

                        let singleSchedule = scheduleArray[j];
                        console.log("singleSchedule.dayNumber" + " " + singleSchedule.dayNumber === dayNumber + " " + dayNumber);
                        if (singleSchedule.dayNumber === dayNumber) {

                            scheduleArray.splice(j, 1);
                            foundStudent[i].save();
                            console.log(singleSchedule);
                            resolve(foundStudent);
                            break;
                        }

                    }
                    // resolve(foundStudent)

                }
            }

        })

    })

};

// exports.listBySection = section => {
//
//     return new Promise((resolve, reject) => {
//
//         studentModel.find({section: section}, (err, foundStudent) => {
//
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(foundStudent)
//             }
//
//         })
//
//     })
//
// };

