let gradeRouter = require("express").Router();

let gradeModel = require("../../model/grade");

gradeRouter.get("/", (req, res, next) => {

});

gradeRouter.get("/:year/:semester/total", (req, res, next) => {

    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;

    gradeModel.sumDivideAllCourseResults(studentId, year, semester)
        .then(foundStudent => {

        }).catch(err => {

    })

});
gradeRouter.get("/:course/:year/:semester/total", (req, res, next) => {

    let courseName = req.params.course;
    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;

    gradeModel.sumParticularCourseResults(courseName, studentId, year, semester)
        .then(foundStudent => {
            res.json(foundStudent)
        }).catch(err => {
            console.log(err);
            res.json(err)
    })

});

gradeRouter.post("/grade", (req, res, next) => {


    let passedData = req.body;

    let section = passedData.section;
    let grade = passedData.grade;
    let students = passedData.students;

    let assessmentType = passedData.assessment;
    console.log("the passed data", assessmentType);
    if(assessmentType === "Class Work") {
        console.log("here");
        gradeModel.addClassWork(passedData).then(savedGrade => {
            console.log(savedGrade)
            res.json("Successfully Inserted")
            // res.json()
        }).catch(err => {

        })
    } else if(assessmentType === "Home Work") {
        gradeModel.addHomeWork(passedData).then(savedGrade => {
            console.log(savedGrade)
            res.json("Successfully Inserted")
        }).catch(err => {
            console.log("The error", err)
        })
    } else if(assessmentType === "Group Work") {
        gradeModel.addGroupWork(passedData).then(savedGrade => {
            res.json("Successfully Inserted")
        }).catch(err => {

        })
    } else if(assessmentType === "Individual Work") {
        gradeModel.addIndividualWork(passedData).then(savedGrade => {
            res.json("Successfully Inserted")

        }).catch(err => {

        })
    } else if(assessmentType === "Quiz 1") {
        gradeModel.addQuiz1(passedData).then(savedGrade => {
            res.json("Successfully Inserted")

        }).catch(err => {

        })
    } else if(assessmentType === "Quiz 2") {
        gradeModel.addQuiz2(passedData).then(savedGrade => {
            res.json("Successfully Inserted")

        }).catch(err => {

        })
    } else if(assessmentType === "Quiz 3") {
        gradeModel.addQuiz3(passedData).then(savedGrade => {
            res.json("Successfully Inserted")

        }).catch(err => {

        })
    } else if(assessmentType === "Final") {
        gradeModel.addFinal(passedData).then(savedGrade => {
            res.json("Successfully Inserted")

        }).catch(err => {

        })
    }


});
gradeRouter.post("/:course/:year/:semester/mid", (req, res, next) => {

    let courseName = req.params.course;
    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;
    let midResult = req.body.midResult;

    gradeModel.insertMidResult(studentId, courseName, midResult, year, semester)
        .then(foundStudent => {
            res.json(foundStudent)
        }).catch(err => {
            console.log(err);
            res.json(err)
    })

});

gradeRouter.post("/:course/:year/:semester/quiz", (req, res, next) => {

    let courseName = req.params.course;
    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;
    let quizResult = req.body.quizResult;

    gradeModel.insertQuizResult(studentId, courseName, quizResult, year, semester)
        .then(foundStudent => {
            res.json(foundStudent)
        }).catch(err => {
        console.log(err)
        res.json(err)
    })
});

gradeRouter.post("/:course/:year/:semester/assignment", (req, res, next) => {
    let courseName = req.params.course;
    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;
    let assignmentResult = req.body.assignmentResult;

    gradeModel.insertAssignmentResult(studentId, courseName, assignmentResult, year, semester)
        .then(foundStudent => {
            res.json(foundStudent)
        }).catch(err => {
        console.log(err);
        res.json(err)
    })
});

gradeRouter.post("/:course/:year/:semester/final", (req, res, next) => {
    let courseName = req.params.course;
    let year = req.params.year;
    let semester = req.params.semester;
    let studentId = req.body.id;
    let finalResult = req.body.finalResult;

    gradeModel.insertFinalResult(studentId, courseName, finalResult, year, semester)
        .then(foundStudent => {
            res.json(foundStudent)
        }).catch(err => {
        console.log(err)
        res.json(err)
    })
});

module.exports = gradeRouter;

