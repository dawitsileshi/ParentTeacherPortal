let studentModel = require("./schemas/studentSchema");
let scheduleModel = require("./schemas/scheduleSchema");

let gradeModel = require("./schemas/gradeSchema");

let commonModel = require("./schemas/commonSchema");

let attendanceModel = require("./schemas/attendanceSchema");

let currentSemester;

commonModel.find({}, (err, foundCommon) => {
    console.log(foundCommon);
    if(err) {

    } else {
        if(foundCommon.length !== 0) {
            let currentCommon = foundCommon[foundCommon.length - 1];
            currentSemester = currentCommon.semester;
        }
    }
});

exports.registerStudent = student => {

  return new Promise((resolve, reject) => {
      // scheduleModel.findOne({section: student.section, grade: student.grade}, (err, foundSchedule) => {
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

exports.listBygrade = grade => {

    return new Promise((resolve, reject) => {

        studentModel.find({grade: grade}, (err, foundStudent) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundStudent)
            }

        })

    })

};

exports.listBySectiongrade = (grade, section) => {

    return new Promise((resolve, reject) => {

        studentModel.find({grade: grade, section: section}, (err, foundStudent) => {

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

exports.showGrade = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {

            console.log("the found stduent", foundStudent);
            if(err) {
                reject(err)
            } else {
                let grade = foundStudent.grade;
                let section = foundStudent.section;

                console.log(grade + " " + section)
                gradeModel.find({grade: grade, studentId: foundStudent._id}, (err, foundGrade) => {

                    console.log("The found schedule", foundGrade)
                    if(err) {
                        reject(err)
                    } else {
                        resolve(foundGrade)
                    }

                })
            }
        })
        // gradeModel.find({})

    })

};

exports.getStudentAttendance = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {
            if(err) {
                reject(err)
            } else {
                if(foundStudent === null) {
                    reject("There is no student")
                } else {
                    let grade = foundStudent.grade;
                    let section = foundStudent.section;
                    console.log(grade, section)
                    attendanceModel.find({"dailyAttendance.grade": grade, "dailyAttendance.section": section}, (err, foundAttendances) => {

                        if(err) {
                            reject(err)
                        } else {
                            console.log(foundAttendances)
                            resolve(foundAttendances)
                        }

                    })
                }
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

exports.updateStudentInfo = (student, id) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({idNumber: id}, (err, foundStudent) => {

            if(err) {
                reject(err)
            } else {
                foundStudent.fname = student.fname;
                foundStudent.lname = student.lname;
                foundStudent.age = student.age;
                foundStudent.gender = student.gender;
                foundStudent.grade = student.grade;
                foundStudent.section = student.section;
                foundStudent.familyContact[0].email= student.familyEmail;
                foundStudent.familyContact[0].tel= student.tel;
                foundStudent.save();
                resolve(foundStudent)

            }

        })

    })

};

exports.listByIdNumber = id => {

  return new Promise((resolve, reject) => {

      studentModel.findOne({idNumber: id}, (err, foundStudent) => {
      console.log("passedData", foundStudent);

          if(err) {
              reject(err)
          } else {
              resolve(foundStudent)
          }

      })

  })

};


exports.listById = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {
            console.log("passedData", foundStudent);

            if(err) {
                reject(err)
            } else {
                resolve(foundStudent)
            }

        })

    })

};
exports.promoteStudent = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {
            if(err) {
                reject(err)
            } else {

                if(foundStudent.grade < 12) {
                    foundStudent.grade = foundStudent.grade + 1;
                }
                foundStudent.schedules.clear();
                foundStudent.save();
                resolve(foundStudent)

            }
        })

    })

};

exports.removeSchedule = (grade, section, semester, dayNumber) => {

    return new Promise((resolve, reject) => {

        studentModel.find({section: section, grade: grade, semester: semester}, (err, foundStudent) => {

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

