let scheduleModel = require("./schemas/scheduleSchema");
let studentModel = require("./schemas/studentSchema");

exports.addSchedule = (schedule, year, section, scheduleForTheStudent) => {

    console.log(JSON.stringify(scheduleForTheStudent), section + " " + year);
    return new Promise((resolve, reject) => {

        // let students = [];
        // studentModel.find({section: section, year: year}, (err, foundStudents) => {
        //     for (let i = 0; i < foundStudents.length; i++) {
        //         let student = foundStudents[i];
        //         let studentId = {student: student._id};
        //         students.push(studentId)
        //     }
        // });

        schedule.students = students;
        scheduleModel(schedule).save((err, savedSchedule) => {

            if(err) {
                reject(err)
            } else {

                studentModel.find({section: section, year: year}, (err, foundStudents) => {

                    if (foundStudents.length !== 0) {

                        for (let i = 0; i < foundStudents.length; i++) {

                            let student = foundStudents[i];

                            console.log("The length is", student.year + " " + year);

                            // if (student.year === Number(year) && student.section === section) {

                                // console.log("Arrived Here");

                                student.schedule.push(scheduleForTheStudent);

                                student.save();

                            // }

                        }

                    }

                });

                resolve(savedSchedule)

            }

        })

    })

};

exports.addPeriod = (period, year, section, semester, day) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({year: year, section: section, semester: semester, day: day}, (err, foundSchedule) => {

            console.log("found schedule", foundSchedule);

            if(err) {

                reject(err)

            } else {

                foundSchedule.program.push(period);

                foundSchedule.save();

                studentModel.find({year: year, semester: semester, section: section}, (err, foundStudent) => {

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

exports.addDay = (period, year, section, semester) => {

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

exports.listByYear = (year) => {

    return new Promise((resolve, reject) => {

        scheduleModel.find({"schedule": {$all: [{"$elemMatch": {year: {$eq: year}}}]}}, (err, foundSchedules) => {

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

exports.removeSchedule = (section, year, semester, dayNumber) => {

    return new Promise((resolve, reject) => {

        scheduleModel.remove({section: section, year: Number(year), semester: Number(semester)}, (err, foundSchedule) => {

            console.log(section + " " + semester + " " + year);
            // foundSchedule.length
            if(err) {
                reject(err)
            } else {
                studentModel.find({section: section, year: year, semester: semester}, (err, foundStudents) => {

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

exports.removeScheduleById = id => {

    return new Promise((resolve, reject) => {

        scheduleModel.findByIdAndRemove(id).exec((err, foundSchedule) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundSchedule)
            }

        })

    })

};

exports.removePeriod = (period, semester, year, section, day) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({semester: semester, year: year, section: section, day}, (err, foundSchedule) => {

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

                        studentModel.find({year: year, semester: semester, section: section}, (err, foundStudent) => {

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

exports.editSchedule = (schedule, id, year, semester, section) => {

    return new Promise((resolve, reject) => {

      scheduleModel.findOneAndUpdate({_id: id}, schedule, {new: true}, (err, updatedSchedule) => {

        if(err) {
            reject(err)
        } else {
            studentModel.findOneAndUpdate({year: year, semester: semester, section: section}, scheduleForTheStudent(schedule), {new: true}, (err, updatedStudent) => {

                console.log("found students", updatedStudent);

            });
        }
          resolve(updatedSchedule);
      })

    })

};

// TODO: not finished yet, just tired of it
exports.editProgram = (program, section, year, semester, day, period) => {

    return new Promise((resolve, reject) => {

        scheduleModel.update({section: section, year: year, semester: semester, day: day, program: {$all: [{"$elemMatch": {period: {$eq: period}}}]}},
            {$set: {program: program}}, {new: true}, (err, updatedProgram) => {

            if(err) {
                reject(err)
            } else {
                studentModel.update({})
            }

            });

    })

};

exports.updateStudent = (section, year) => {

    return new Promise((resolve, reject) => {

        scheduleModel.findOne({section: section, year}, (err, foundSchedule) => {

            if(err) {
                reject(err)
            } else {
                if (foundSchedule.length > 0) {
                    studentModel.find({section: section, year: year}, (err, foundStudent) => {
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
