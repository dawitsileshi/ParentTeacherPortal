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

