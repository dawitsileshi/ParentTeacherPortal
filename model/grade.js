let studentModel = require("./schemas/studentSchema");
let gradeModel = require("./schemas/gradeSchema");
let commonModel = require("./schemas/commonSchema");

let gradeTotalAvgModel = require("./schemas/gradeTotalAvgSchema");
let currentSemester;

commonModel.find({}, (err, foundCommon) => {
    if(err) {

    } else {
        if(foundCommon.length !== 0) {
            let currentCommon = foundCommon[foundCommon.length - 1];
            currentSemester = currentCommon.semester;
        }
    }
});

exports.sumParticularCourseResults = (courseName, studentId, year, semester) => {

    // return new Promise((resolve, reject) => {
    //     studentModel.find({id: studentId, "grade": {$all: [{"$elemMatch": {year: {$eq: year},
    //                     "semester": {$all: [{"$elemMatch": {semester: {$eq: semester}}}]}}}]}}, (err, foundStudent) => {
    //         // let grade = foundStudent.
    //         if(err) {
    //             reject(err)
    //         } else {
    //             resolve(foundStudent)
    //         }
    //         // console.log()
    //
    //     })
    // })

    //or another way to find the right document will be
    return new Promise((resolve, reject) => {

        studentModel.find({_id: studentId}, (err, foundStudent) => {

            if(err) {
                reject(err);
            }

            let grade = foundStudent.grade;

            let results = grade.year[year - 1].semester[semester - 1];

            for (let i = 0; i < results.length; i++) {
                if(results[i].courseName === courseName) {
                    let thatSpecificCourseResult = results[i];
                    let quiz = thatSpecificCourseResult.quiz;
                    let mid = thatSpecificCourseResult.midExam;
                    let assignment = thatSpecificCourseResult.assignment;
                    let finalExam = thatSpecificCourseResult.finalExam;
                    let total = quiz + mid + assignment + finalExam;
                    results[i].total = total;
                    foundStudent.markModified("result");
                    // foundStudent.save();
                    resolve(foundStudent)

                }
            }

        })

    })

};

// this method needs to accept an argument of year
exports.sumDivideAllCourseResults = (studentId, year, semester) => {

    return new Promise((resolve, reject) => {

        studentModel.find({_id: studentId}, (err, foundStudent) => {

            if(err) {
                reject(err);
            }

            let sum = 0;
            let avg = 0;
            let numberOfCourse = 0;
            let gradeArray = foundStudent.grade;
            for (let i = 0; i < gradeArray.length; i++) {
                if(gradeArray[i].year === year) {
                    let semesterArray = gradeArray[i].semester;
                    for (let j = 0; j < semesterArray.length; j++) {
                        if(semesterArray[j].semester === semester) {
                            let resultsArray = semesterArray[j].results;
                            for (let k = 0; k < resultsArray.length; k++) {
                                let specificCourse = result[k];
                                let quiz = specificCourse.quiz;
                                let mid = specificCourse.midExam;
                                let assignment = specificCourse.assignment;
                                let finalExam = specificCourse.finalExam;
                                sum = sum + quiz + mid + assignment + finalExam;
                                specificCourse.total = sum;
                                foundStudent.markModified("result");
                                numberOfCourse++;
                            }
                            semesterArray[j].total = sum;
                            avg = sum / numberOfCourse;
                            semesterArray[j].average = avg;
                            foundStudent.markModified("semester");
                            resolve(foundStudent)
                        }
                    }
                }
            }
            // for (let i = 0; i < grade.length; i++) {
            //     let semester = grade[i].semester;
            //     for (let j = 0; j < semester.length; j++) {
            //         let result = semester[j].results;
            //         for (let k = 0; k < result.length; k++) {
            //             let specificCourse = result[k];
            //             let quiz = specificCourse.quiz;
            //             let mid = specificCourse.midExam;
            //             let assignment = specificCourse.assignment;
            //             let finalExam = specificCourse.finalExam;
            //             sum = sum + quiz + mid + assignment + finalExam;
            //             numberOfCourse++;
            //             // results[i].total = total;
            //         }
            //         result.total = sum;
            //         avg = sum / numberOfCourse;
            //         result.average = avg;
            //         foundStudent.markModified("semester");
            //         resolve(foundStudent)
            //     }
            // }

    })

        // let grade = foundStudent.grade;

        // let results = grade.year[year - 1].semester[semester - 1];

//         for (let i = 0; i < results.length; i++) {
//             // if(results[i].courseName === courseName) {
//                 let thatSpecificCourseResult = results[i];
//                 let quiz = thatSpecificCourseResult.quiz;
//                 let mid = thatSpecificCourseResult.midExam;
//                 let assignment = thatSpecificCourseResult.assignment;
//                 let finalExam = thatSpecificCourseResult.finalExam;
//                 let total = quiz + mid + assignment + finalExam;
//                 results[i].total = total;
//                 foundStudent.save();
//                 resolve(foundStudent)
//
//             // }
//         }
//
//     })
//
    })

};

exports.insertQuizResult = (studentId, courseName, quizResult, year, semester) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: studentId}, (err, foundStudent) => {

            if(err) {
                reject(err)
            }
            let gradeArray = foundStudent.grade;

            let semesterArray = gradeArray[year - 1].semester;
            let resultsArray = semesterArray[semester - 1].results;

            for (let i = 0; i < resultsArray.length; i++) {
                if(resultsArray[i].courseName === courseName) {
                    resultsArray[i].quiz = quizResult;
                    foundStudent.markModified("results");
                }
            }

        })

    })

};

exports.insertMidResult = (studentId, courseName, midResult, year, semester) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: studentId}, (err, foundStudent) => {

            if(err) {
                reject(err)
            }
            let gradeArray = foundStudent.grade;

            let semesterArray = gradeArray[year - 1].semester;
            let resultsArray = semesterArray[semester - 1].results;

            for (let i = 0; i < resultsArray.length; i++) {
                if(resultsArray[i].courseName === courseName) {
                    resultsArray[i].midExam = midResult;
                    foundStudent.markModified("results");
                }
            }

        })

    })

};

exports.insertAssignmentResult = (studentId, courseName, assignmentResult, year, semester) => {

    return new Promise((resolve, reject) => {

        studentModel.findOne({_id: studentId}, (err, foundStudent) => {

            if(err) {
                reject(err)
            }
            let gradeArray = foundStudent.grade;

            let semesterArray = gradeArray[year - 1].semester;
            let resultsArray = semesterArray[semester - 1].results;

            for (let i = 0; i < resultsArray.length; i++) {
                if(resultsArray[i].courseName === courseName) {
                    resultsArray[i].assignment = assignmentResult;
                    foundStudent.markModified("results");
                }
            }

        })

    })

};

exports.insertFinalResult = (studentId, courseName, finalResult) => {



};

exports.editQuizResult = (studentId, courseName, quizResult) => {

    //if all results had already been found, make sure to add the results again to sync it with the new result

};

exports.editMidResult = (studentId, courseName, MidResult) => {

    //if all results had already been found, make sure to add the results again to sync it with the new result

};

exports.editAssignmentResult = (studentId, courseName, assignmentResult) => {

    //if all results had already been found, make sure to add the results again to sync it with the new result

};

exports.editFinalResult = (studentId, courseName, finalResult) => {

    //if all results had already been found, make sure to add the results again to sync it with the new result

};

exports.addClassWork = passedData => {

    return new Promise((resolve, reject) => {

        let students = passedData.students;

                console.log("here too", currentSemester);
        for (let i = 0; i < students.length; i++) {

            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {

                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist", foundGrade);
                        let grade = {studentId: students[i].student,
                                    grade: passedData.grade,
                                    semester: currentSemester,
                                    courseName: passedData.course,
                                    classWork:{
                                        value: students[i].result,
                                        max: students[i].max
                                        }
                                    };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let allEntered = false;
                        let classWork = students[i].result;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(students[i].max)
                        } else {
                            allEntered = false;
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max)
                        } else {
                            allEntered = false;
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(foundGrade.groupWork.max)
                        } else {
                            allEntered = false
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(foundGrade.individual.max)
                        } else {
                            allEntered = false
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(foundGrade.quiz1.max)
                        } else {
                            allEntered = false

                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max)
                        } else {
                            allEntered = false
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(foundGrade.quiz3.max)
                        } else {
                            allEntered = false
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max)
                        } else {
                            allEntered = false
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);

                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.classWork.value = students[i].result;
                        foundGrade.classWork.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)

                    }
                }
            })
        }

    })
};

exports.addHomeWork = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        console.log("The students", students)
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist", foundGrade);
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            homeWork:{
                                value: students[i].result,
                                max: students[i].max
                                }
                            };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let homeWork = students[i].result;
                        if(homeWork !== undefined) {
                            results.push(students[i].result);
                            console.log("total in homework", total);
                            total = total + Number(students[i].max)
                        }
                        let classWork = foundGrade.classWork.value;
                        console.log("The home work", classWork);
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max)
                            console.log("total in classwork", total)
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(foundGrade.groupWork.max)
                            console.log("total in group", total)
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(foundGrade.individual.max)
                            console.log("total in individual", total)
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(foundGrade.quiz1.max)
                            console.log("total in quiz1", total)
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max)
                            console.log("total in quiz2", total)
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(foundGrade.quiz3.max)
                            console.log("total in quiz3", total)
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max)
                            console.log("total in final", total)
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.homeWork.value = students[i].result;
                        foundGrade.homeWork.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};

exports.addGroupWork = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist");
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            groupWork:{
                                value: students[i].result,
                                max: students[i].max
                                }
                            };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max)
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max)
                        }
                        let groupWork = students[i].result;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(students[i].max)
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(foundGrade.individual.max)
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(foundGrade.quiz1.max)
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max)
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(foundGrade.quiz3.max);
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max)
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.groupWork.value = students[i].result;
                        foundGrade.groupWork.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)

                    }
                }
            })
        }

    })
};

exports.addIndividualWork = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist");
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            individual:{
                                value: students[i].result,
                                max: students[i].max
                                }
                            };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let allEntered = true;
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max);
                        } else {
                            allEntered = false
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max)
                        } else {
                            allEntered = false
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(foundGrade.groupWork.max)
                        } else {
                            allEntered = false
                        }
                        let individual = students[i].result;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(students[i].max)
                        } else {
                            allEntered = false
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(foundGrade.quiz1.max)
                        } else {
                            allEntered = false
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max)
                        } else {
                            allEntered = false
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(foundGrade.quiz3.max)
                        } else {
                            allEntered = false
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max);
                        } else {
                            allEntered = false
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.individual.value = students[i].result;
                        foundGrade.individual.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};

exports.addQuiz1= passedData => {
    return new Promise((resolve, reject) => {

        console.log("Sent for quiz1", passedData)
        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist");
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            quiz1:{
                                value: students[i].result,
                                max: students[i].max
                            } };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max);
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max);
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(foundGrade.groupWork.max);
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(foundGrade.individual.max);
                        }
                        let quiz1 = students[i].result;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(students[i].max);
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max);
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(foundGrade.quiz3.max);
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max);
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.quiz1.value = students[i].result;
                        foundGrade.quiz1.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};
exports.addQuiz2 = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist")
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            quiz2:{
                                value: students[i].result,
                                max: students[i].max
                            } };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists")
                        let results = [];
                        let total = 0;
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork)
                            total = total + Number(foundGrade.classWork.max);
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork)
                            total = total + Number(foundGrade.homeWork.max);
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork)
                            total = total + Number(foundGrade.groupWork.max);
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual)
                            total = total + Number(foundGrade.individual.max);
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1)
                            total = total + Number(foundGrade.quiz1.max);
                        }
                        let quiz2 = students[i].result;
                        if(quiz2 !== undefined) {
                            results.push(quiz2)
                            total = total + Number(students[i].max)
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3)
                            total = total + Number(foundGrade.quiz3.max);
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final)
                            total = total + Number(foundGrade.final.max);
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.quiz2.value = students[i].result;
                        foundGrade.quiz2.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};

exports.addQuiz3 = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist")
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            quiz3:{
                                value: students[i].result,
                                max: students[i].max
                            } };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let results = [];
                        let total = 0;
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max);

                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max);
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork);
                            total = total + Number(foundGrade.groupWork.max);
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual);
                            total = total + Number(foundGrade.individual.max);
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1);
                            total = total + Number(foundGrade.quiz1.max);
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2);
                            total = total + Number(foundGrade.quiz2.max);
                        }
                        let quiz3 = students[i].result;
                        if(quiz3 !== undefined) {
                            results.push(quiz3);
                            total = total + Number(students[i].max);
                        }
                        let final = foundGrade.final.value;
                        if(final !== undefined) {
                            results.push(final);
                            total = total + Number(foundGrade.final.max);
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score);
                        foundGrade.quiz3.value = students[i].result;
                        foundGrade.quiz3.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};

exports.addFinal = passedData => {
    return new Promise((resolve, reject) => {

        let students = passedData.students;
        for (let i = 0; i < students.length; i++) {
            gradeModel.findOne({studentId: students[i].student, semester: currentSemester, courseName: passedData.course, grade: passedData.grade}, (err, foundGrade) => {
                if(err) {
                    reject(err)
                } else {
                    if(foundGrade === null) {
                        console.log("The grade doesn't exist");
                        let grade = {studentId: students[i].student,
                            grade: passedData.grade,
                            semester: currentSemester,
                            courseName: passedData.course,
                            final:{
                                value: students[i].result,
                                max: students[i].max
                            } };
                        gradeModel(grade).save((err, savedGrade) => {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(savedGrade)
                            }
                        })
                    } else {
                        console.log("The grade exists");
                        let total = 0;
                        let results = [];
                        let classWork = foundGrade.classWork.value;
                        if(classWork !== undefined) {
                            results.push(classWork);
                            total = total + Number(foundGrade.classWork.max)
                        }
                        let homeWork = foundGrade.homeWork.value;
                        if(homeWork !== undefined) {
                            results.push(homeWork);
                            total = total + Number(foundGrade.homeWork.max)
                        }
                        let groupWork = foundGrade.groupWork.value;
                        if(groupWork !== undefined) {
                            results.push(groupWork)
                            total = total + Number(foundGrade.groupWork.max)
                        }
                        let individual = foundGrade.individual.value;
                        if(individual !== undefined) {
                            results.push(individual)
                            total = total + Number(foundGrade.individual.max)
                        }
                        let quiz1 = foundGrade.quiz1.value;
                        if(quiz1 !== undefined) {
                            results.push(quiz1)
                            total = total + Number(foundGrade.quiz1.max)
                        }
                        let quiz2 = foundGrade.quiz2.value;
                        if(quiz2 !== undefined) {
                            results.push(quiz2)
                            total = total + Number(foundGrade.quiz2.max)
                        }
                        let quiz3 = foundGrade.quiz3.value;
                        if(quiz3 !== undefined) {
                            results.push(quiz3)
                            total = total + Number(foundGrade.quiz3.max)
                        }
                        let final = students[i].result;
                        if(final !== undefined) {
                            results.push(final)
                            total = total + Number(students[i].max)
                        }

                        let score = 0;
                        for (let j = 0; j < results.length; j++) {
                            score = score + Number(results[j]);
                        }
                        console.log("The score is ", score + " out of " + total);
                        foundGrade.final.value = students[i].result;
                        foundGrade.final.max = students[i].max;
                        foundGrade.total = total;
                        foundGrade.score = score;
                        foundGrade.save();
                        resolve(foundGrade)
                    }
                }
            })
        }

    })
};

