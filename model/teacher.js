let teacherModel = require("./schemas/teacherSchema");
let studentModel = require("./schemas/studentSchema");
let scheduleModel = require("./schemas/scheduleSchema");
let attendanceModel = require("./schemas/attendanceSchema");
let lessonPlanModel = require("./schemas/lessonPlanSchema");

let nodemail = require("nodemailer");
exports.registerTeacher = teacher => {

    return new Promise((resolve, reject) => {
        teacherModel(teacher).save((err, savedTeacher) => {
            if(err) {
                reject(err)
            }else {
                resolve(savedTeacher);
                sendEmail(teacher.email, "Here is your link to create your account", "http://localhost:3000/teacher/createAccount/").then(info => {
                    console.log("successfully sent to the email")
                }).catch(err => {
                    console.log(err)
                })
            ;
            }
        })
    })

};

function sendEmail(email, text, html) {

    return new Promise((resolve, reject) => {

        let transporter = nodemail.createTransport({
            service: "gmail",
            auth: {
                user: "mussie2000mt@gmail.com",
                pass: ""
            }
        });
        transporter.sendMail({
            from: "Student Portal",
            to: "dawitsileshi45@gmail.com",
            subject: "Token for Creating Account",
            text: text,
            html: html
        }, (err, info) => {
            if (err) {
                reject(err);
                console.log("The error is", err);
            } else {
                resolve(info);
                console.log("The info ", info);
                // return info;
            }
        });
    })
}
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

exports.teacherById = id => {

    return new Promise((resolve, reject) => {

        teacherModel.findOne({_id: id}, (err, foundTeacher) => {

            if(err) {

                reject(err)

            } else {

                resolve(foundTeacher)

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

exports.fillAttendance = (date, newAttendance, updateAttendance) => {

    return new Promise((resolve, reject) => {

        attendanceModel.findOne({date: date}, (err, foundAttendance) => {

            if(err) {

                reject(err);

            } else {

                if(foundAttendance !== null) {

                    let attendance = foundAttendance.dailyAttendance.attendance;
                    attendance.push(updateAttendance);
                    foundAttendance.save();


                } else {

                    attendanceModel(attendance).save((err, savedAttendance) => {

                        if(err) {

                            reject(err);

                        } else {
                            resolve(savedAttendance);
                        }

                    })

                }

            }

        })

    })

};

exports.addAttendance = attendance => {

    return new Promise((resolve, reject) => {

        attendanceModel(attendance).save((err, savedAttendance) => {

            if(err) {
                reject(err)
            } else {
                resolve(savedAttendance)
            }

        })

    })

};

exports.showAttendance = id => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: id}, (err, foundStudent) => {

            let grade = foundStudent.grade;
            let section = foundStudent.section;
            attendanceModel.find({"dailyAttendance.grade": grade, "dailyAttendance.section": section}, (err, foundAttendances) => {

                if(err){
                    reject(err)
                } else {
                    for (let i = 0; i < foundAttendances.length; i++) {
                        let singleAttendance = foundAttendances[i];
                        let students = singleAttendance.dailyAttendance.students;
                        for (let j = 0; j < students.length; j++) {
                            let singleStudent = students[j];
                            if(String(id) === String(singleStudent.studentId)) {
                                resolve({courseName: singleAttendance.dailyAttendance.courseName,
                                        period: singleAttendance.dailyAttendance.period,
                                        value: singleStudent.value,
                                        excused: singleStudent.excused})
                            }
                        }
                    }
                }

            })



            })
        });

}

exports.listAttendanceByDayAndTeacher = (teacherId, date) => {

    return new Promise((resolve, reject) => {

        attendanceModel.find({"dailyAttendance.date": date,
                "dailyAttendance.attendance": {"$all": [{"$elemMatch": {teacherId: {$eq: teacherId}}}]}}, (err, foundAttendance) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundAttendance);
            }

        })

    })

};

exports.listAttendanceByDayAndStudent = (studentId, date) => {

    return new Promise((resolve, reject) => {

        let attendanceToSend = {date: date,
                                attendance: []};
        attendanceModel.findOne({"dailyAttendance.date": date}, (err, foundAttendance) => {

            if(err) {
                reject(err)
            } else {
                let attendance = foundAttendance.dailyAttendance.attendance;
                for (let i = 0; i < attendance.length; i++) {

                    let students = attendance[i].students;
                    for (let j = 0; j < students.length; j++) {
                        if(students[j].studentId === studentId) {

                            attendanceToSend.attendance.push({courseName: attendance[i].courseName,
                                                            teacherId: attendance[i].teacherId,
                                                            period: attendance[i].period});

                        }
                    }

                }

                resolve(attendanceToSend)
            }

        })

    })

};

function gather(schedule) {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({_id: schedule.scheduleId}, (err, foundSchedule) => {

            if(err) {
                reject(err)
            } else {
                // console.log("The found schedules", foundSchedule);
                // if(foundSchedule !== null) {
                    resolve(foundSchedule)
                // }
            }

        })
    })
}

exports.findScheduleInfo = (id) => {

    return new Promise((resolve, reject) => {

        teacherModel.findOne({_id: id}, (err, foundTeacher) => {

            if(err) {

                reject(err)

            } else {

                let promises = [];
                let schedules = foundTeacher.schedules;
                for (let i = 0; i < schedules.length; i++) {
                    promises.push(gather(schedules[i]));
                }

                // Promise.all()

                console.log("the length of the promises", promises.length)
                resolve(promises);
            }
        })


    })

};

exports.loginTeacher = (username, email, password) => {

    return new Promise((resolve, reject) => {

        teacherModel.findOne({uname: username, email: email, password: password}, (err, foundTeacher) => {

            if(err) {
                reject(err)
            } else {
                if(foundTeacher === null) {
                    resolve("Wrong username or password")
                } else {
                    // console.log(foundTeacher);
                    resolve(foundTeacher);
                }
            }


        })

    })

};

exports.createAccount = (email, username, password) => {

    return new Promise((resolve, reject) => {

        teacherModel.findOne({email: email}, (err, foundTeacher) => {

            if(err) {

                reject(err)

            } else {

                if(foundTeacher === null) {

                    resolve("Wrong Email")

                } else {

                    console.log("user name is", foundTeacher.uname);
                    if(foundTeacher.uname !== undefined) {

                        resolve("Already Have an account")

                    } else {

                        foundTeacher.uname = username;
                        foundTeacher.password = password;
                        foundTeacher.save();
                        resolve(foundTeacher)

                    }

                }

            }

        })

    })

};

exports.listByCourse = courseName => {

    return new Promise((resolve, reject) => {

        teacherModel.find({course: courseName}, (err, foundTeachers) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundTeachers);
            }

        })

    })

};

exports.createLessonPlan = (teacherId) => {

    return new Promise((resolve, reject) => {

        let lessonPlan = {teacherId: teacherId};
        lessonPlanModel(lessonPlan).save((err, savedLessonPlan) => {

            if(err) {
                reject(err)
            } else {
                resolve(savedLessonPlan)
            }

        })

    })

};
// exports.removeStudents = id => {
//
//     return new Promise((resolve, reject) => {
//
//         teacherModel.findOne({_id: id}, (err, foundTeacher) => {
//
//             if(err) {
//
//                 reject(err);
//
//             } else {
//
//                 let students = foundTeacher.students;
//
//                 for (let i = 0; i < students.length; i++) {
//
//                     if(students[i].studentId )
//
//                 }
//
//             }
//
//         })
//
//     })
//
// }
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

exports.listMySchedule = id => {

    return new Promise((resolve, reject) => {

        // teacherModel

    })

}