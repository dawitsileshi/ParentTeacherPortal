let scheduleModel = require("./schemas/scheduleSchema");
let studentModel = require("./schemas/studentSchema");
let teacherModel = require("./schemas/teacherSchema");

exports.addSchedule = (schedule, grade, section, scheduleForTheStudent) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({day: schedule.day, grade: grade, section: section}, (err, foundSchedule) => {

            if(err) {

                reject(err)

            } else {

                if(foundSchedule !== null) {

                    resolve("Schedule already exists")

                } else {

                    let students = [];
                    let teacherIds = [];
                    studentModel.find({section: section, grade: grade}, (err, foundStudents) => {
                        if (err) {
                            reject(err)
                        } else {
                            for (let i = 0; i < foundStudents.length; i++) {
                                let student = foundStudents[i];
                                let studentId = {studentId: student._id};
                                schedule.students.push(studentId);
                                students.push(student._id);
                            }

                            for (let i = 0; i < schedule.program.length; i++) {
                                let singleProgram = schedule.program[i];
                                let teacherId = singleProgram.teacherId;
                                teacherIds.push(teacherId)
                            }
                            //     teacherModel.findOne({_id: teacherId}, (err, foundTeacher) => {
                            //
                            //         if (err) {
                            //             reject(err);
                            //         } else {
                            //
                            //             console.log(foundTeacher);
                            //             // let students = [];
                            //             for (let j = 0; j < students.length; j++) {
                            //                 foundTeacher.students.push({studentId: students[j]});
                            //             }
                            //             foundTeacher.save();
                            //
                            //             console.log("Teh found teacher is " + foundTeacher);
                            //         }
                            //
                            //     })
                            //
                            // }

                            scheduleModel(schedule).save((err, savedSchedule) => {

                                if (err) {
                                    reject(err)
                                } else {
                                    // if(foundStudents.length !== 0) {

                                    for (let i = 0; i < foundStudents.length; i++) {

                                        let student = foundStudents[i];

                                        student.schedules.push({scheduleId: savedSchedule._id});

                                        student.save();

                                    }

                                    // for (let i = 0; i < students.length; i++) {

                                    for (let i = 0; i < teacherIds.length; i++) {

                                        teacherModel.findOne({_id: teacherIds[i]}, (err, foundTeacher) => {

                                            if (err) {
                                                reject(err);
                                            } else {

                                                foundTeacher.schedules.push({scheduleId: savedSchedule._id});

                                                let alreadyExistingStudents = foundTeacher.students;

                                                for (let j = 0; j < alreadyExistingStudents.length; j++) {

                                                    let studentId = alreadyExistingStudents[j].studentId;

                                                    for (let j = 0; j < students.length; j++) {

                                                        if (String(studentId) !== String(students[j])) {
                                                            foundTeacher.students.push({studentId: students[j]})
                                                        }

                                                    }
                                                }

                                                foundTeacher.save();

                                            }
                                        })
                                    }
                                    // }

                                    // }
                                    // studentModel.find({section: section, year: year}, (err, foundStudents) => {
                                    //
                                    //     if (foundStudents.length !== 0) {
                                    //
                                    //         for (let i = 0; i < foundStudents.length; i++) {
                                    //
                                    //             let student = foundStudents[i];
                                    //
                                    //             console.log("The length is", student.year + " " + year);
                                    //
                                    //             // if (student.year === Number(year) && student.section === section) {
                                    //
                                    //             // console.log("Arrived Here");
                                    //
                                    //             student.schedule.push(scheduleForTheStudent);
                                    //
                                    //             student.save();
                                    //
                                    //             // }
                                    //
                                    //         }
                                    //
                                    //     }
                                    //
                                    // });

                                    resolve(savedSchedule)

                                }

                            })
                        }
                    })
                }
            }
        });
    });

// console.log(JSON.stringify(scheduleForTheStudent), section + " " + year);
        // console.log("the main schedule", schedule);
        // console.log("the student schedule", scheduleForTheStudent)

        // schedule.students = students;



};

exports.findSchedule = (year, day, grade, section, semester) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({year: year, day: day, grade: grade, section: section, semester: semester}, (err, foundSchedule) => {

            if(err) {

                reject(err)

            } else {
                resolve(foundSchedule)
            }

        })

    })

};

exports.findByGradeSectionDay = (grade, section, day) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({grade: grade, section: section, day: day}, (err, foundSchedule) => {

            if(err) {

                reject(err)

            } else {

                resolve(foundSchedule)

            }

        })

    })

}

exports.findByGradeSection = (grade, section) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find({grade: grade, section: section}, (err, foundSchedule) => {

            if(err) {

                reject(err)

            } else {

                resolve(foundSchedule)

            }

        })

    })

}

exports.addPeriod = (period, grade, section, semester, day) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({grade: grade, section: section, semester: semester, day: day}, (err, foundSchedule) => {

            console.log("found schedule", foundSchedule);

            if(err) {

                reject(err)

            } else {

                foundSchedule.program.push(period);

                foundSchedule.save();

                studentModel.find({grade: grade, semester: semester, section: section}, (err, foundStudent) => {

                    console.log("found students", foundStudent);

                    for (let i = 0; i < foundStudent.length; i++) {

                        let student = foundStudent[i];

                        let schedule = student.schedule;

                        console.log("found student", student);

                        for (let j = 0; j < schedule.length; j++) {

                            if(schedule[i].day === day) {

                                let programArray = schedule[i].program;

                                programArray.push(period);

                                student.save();

                            }

                        }

                    }

                });

                resolve(foundSchedule)

            }

        })

    })

};

exports.addDay = (period, grade, section, semester) => {

};

exports.listAllSchedules = () => {

    return new Promise((resolve, reject) => {

        scheduleModel.find({}, (err, foundSchedules) => {

            if(err) {
                reject(err)
            }else {
                resolve(foundSchedules)
            }

        })

    })


};

exports.scheduleById = id => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({_id: id}, (err, foundSchedule) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundSchedule)
            }

        })

    })

};

exports.listByYear = (grade) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find({"schedule": {$all: [{"$elemMatch": {grade: {$eq: grade}}}]}}, (err, foundSchedules) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundSchedules)
            }

        })

    })

};

exports.listBySemester = (semester) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find({"schedule": {$all: [{"$elemMatch": {semester: {$eq: semester}}}]}}, (err, foundSchedules) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundSchedules)
            }

        })

    })

};

exports.removeSchedule = (section, grade, semester, dayNumber) => {

    return new Promise((resolve, reject) => {

        scheduleModel.remove({section: section, grade: Number(grade), semester: Number(semester)}, (err, foundSchedule) => {

            console.log(section + " " + semester + " " + grade);
            // foundSchedule.length
            if(err) {
                reject(err)
            } else {
                studentModel.find({section: section, grade: grade, semester: semester}, (err, foundStudents) => {

                    if(err) {
                        reject(err);
                    } else {

                        for (let i = 0; i < foundStudents.length; i++) {
                            let student = foundStudents[i];
                            student.schedule.splice(0, student.schedule.length-1);
                            student.save();
                        }
                    }
                });
                resolve(foundSchedule);
            }
        })


    })

};

function deleteFromStudents(deletedSchedule) {

    studentModel.find({grade: deletedSchedule.grade, section: deletedSchedule.section}, (err, foundStudent) => {

        if(err) {

        } else {
            for (let i = 0; i < foundStudent.length; i++) {

                let schedules = foundStudent[i].schedules;
                for (let j = 0; j < schedules.length; j++) {
                    let scheduleId = schedules[j].scheduleId;
                    if(String(scheduleId) === String(deletedSchedule._id)) {
                        schedules.splice(j, 1);
                    }

                }
                foundStudent[i].save()
            }
            console.log("The found students", foundStudent)
        }

    })

}

exports.removeScheduleById = id => {

    return new Promise((resolve, reject) => {

        scheduleModel.findByIdAndRemove(id).exec((err, deletedSchedule) => {

            if(err) {
                reject(err)
            } else {
                deleteFromStudents(deletedSchedule);
                console.log("The deleted schedule", deletedSchedule);
                let program = deletedSchedule.program;
                for (let i = 0; i < program.length; i++) {

                    let teacherId = program[i].teacherId;
                    teacherModel.findOne({_id: teacherId}, (err, foundTeacher) => {
                        if(err) {
                            reject(err)
                        } else {
                            let schedules = foundTeacher.schedules;
                            for (let j = 0; j < schedules.length; j++) {
                                let scheduleId = schedules[j].scheduleId;
                                if(String(scheduleId) === String(id)) {
                                    schedules.splice(j, 1);
                                }

                            }
                            foundTeacher.save();
                            console.log("The found teacher", foundTeacher)
                        }
                    });

                }

                resolve(deletedSchedule)
            }

        })

    })

};

exports.removePeriod = (period, semester, grade, section, day) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({semester: semester, grade: grade, section: section, day}, (err, foundSchedule) => {

            if(err) {

                reject(err)

            } else {

                let program = foundSchedule.program;

                for (let i = 0; i < program.length; i++) {

                    console.log(program[i].period);

                    console.log();

                    if (program[i].period === Number(period)) {

                        program.splice(i, 1);

                        foundSchedule.save();

                        studentModel.find({grade: grade, semester: semester, section: section}, (err, foundStudent) => {

                            console.log("found students", foundStudent);

                            for (let i = 0; i < foundStudent.length; i++) {

                                let student = foundStudent[i];

                                let schedule = student.schedule;

                                console.log("found student", student);

                                for (let j = 0; j < schedule.length; j++) {

                                    if(schedule[i].day === day) {

                                        let programArray = schedule[i].program;

                                        for (let k = 0; k < programArray.length; k++) {

                                            if(programArray[i].period === period) {

                                                programArray.splice(i, 1);

                                                student.save();

                                            }

                                        }

                                    }

                                }

                            }

                        });

                        resolve(foundSchedule)

                    }

                }

            }

        })

    })

};

function scheduleForTheStudent(schedule) {

    let programForTheStudent = [];

    let scheduleForTheStudent;

    let program = schedule.program;

    let day = schedule.day;
    let dayNumber = schedule.dayNumber;

    for (let i = 0; i < program.length; i++) {

        let singleProgram = {period: program[i].period,
                            courseName: program[i].courseName,
                            teacherName: program[i].teacherName};

        programForTheStudent.push(singleProgram);

    }

    scheduleForTheStudent = {day: day,
                            dayNumber: dayNumber,
                            program: programForTheStudent};

    return scheduleForTheStudent;
}

exports.editScheduleById = (id, schedule) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOneAndUpdate({_id: id}, schedule, {new: true}, (err, updatedSchedule) => {

            if(err) {

                reject(err)

            } else {

                resolve(updatedSchedule)

            }

        })

    })

}
exports.editSchedule = (schedule, id, grade, semester, section) => {

    return new Promise((resolve, reject) => {

      scheduleModel.findOneAndUpdate({_id: id}, schedule, {new: true}, (err, updatedSchedule) => {

        if(err) {
            reject(err)
        } else {
            studentModel.findOneAndUpdate({grade: grade, semester: semester, section: section}, scheduleForTheStudent(schedule), {new: true}, (err, updatedStudent) => {

                console.log("found students", updatedStudent);

            });
        }
          resolve(updatedSchedule);
      })

    })

};

// TODO: not finished yet, just tired of it
exports.editProgram = (program, section, grade, semester, day, period) => {

    return new Promise((resolve, reject) => {

        scheduleModel.update({section: section, grade: grade, semester: semester, day: day, program: {$all: [{"$elemMatch": {period: {$eq: period}}}]}},
            {$set: {program: program}}, {new: true}, (err, updatedProgram) => {

            if(err) {
                reject(err)
            } else {
                studentModel.update({})
            }

            });

    })

};

exports.updateStudent = (section, grade) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({section: section, grade: grade}, (err, foundSchedule) => {

            if(err) {
                reject(err)
            } else {
                if (foundSchedule !== null) {
                    // if(foundSchedule.length > 0) {
                    studentModel.find({section: section, grade: grade}, (err, foundStudent) => {
                        if (err) {
                            reject(err)
                        } else {
                            for (let i = 0; i < foundStudent.length; i++) {
                                let schedule = {
                                    day: foundSchedule.day,
                                    dayNumber: foundSchedule.dayNumber,
                                    period: foundSchedule.period
                                };
                                foundStudent[i].push(schedule);
                                foundStudent[i].save();
                            }
                        }
                    })
                }
            }

        })

    })

};
