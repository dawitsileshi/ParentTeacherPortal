let studentModel = require("./schemas/studentSchema");

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

