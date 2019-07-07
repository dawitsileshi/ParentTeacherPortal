let directorRouter = require("express").Router();

let directorModel = require("../../model/director");
let studentModel = require("../../model/student");

directorRouter.get("/director/home", (req, res, next) => {

    res.render("director/index", {teacher: {}});

});

directorRouter.get("/manageSchedules", (req, res, next) => {

    console.log("manageSchedules arrived");
    res.render("director/manageSchedules");

});

directorRouter.get("/manageEvents", (req, res, next) => {

    console.log("manageEvents arrived");

    res.render("director/manageEvents", {event: {title: "",
                                                description: ""}});

});

directorRouter.get("/director/manageStudents", (req, res, next) => {

    console.log("manageStudents arrived");
    res.render("director/manage");

});

directorRouter.get("/schedules", (req, res, next) => {



});

directorRouter.get("/schedule", (req, res, next) => {

    res.render("director/newSchedule");

});

directorRouter.post("/schedule", (req, res, next) => {



});

directorRouter.get("/behavioralReport/:id", (req, res, next) => {

    let id = req.params.id;

    studentModel.listById(id).then(foundStudent => {
        // console.log("The stduetn", foundStudent)
        res.render("director/behavioralReport", {message: "hey"})
    }).catch(err => {

    })
    res.render("director/behavioralReport")

})

directorRouter.post("/behaviorReport", (req ,res, next) => {

    let passedData = req.body;

    let idNumber = passedData.idNumber;

    studentModel.listByIdNumber(idNumber).then(foundStudent => {

        let id = foundStudent._id;
        let name = foundStudent.name;
        let grade = foundStudent.grade;

        let behavioralReport = {studentId: id,
                                studentName: name,
                                grade: grade,
                                fault: passedData.fault};

        directorModel.createBehavioralReport(behavioralReport).then(createBehavioralReport => {

            res.render("director/manageStudents")

        }).catch(err => {

            console.log(err)

        })
    })

});

directorRouter.get("/listBehavioralReports/:id", (req, res, next) => {

    let id = req.params.id;
    console.log("Teh passed id is ", id)

    directorModel.listBehavioralReports(id).then(behavioralReports => {
        studentModel.listById(id).then(foundStudent => {
            res.render("director/listBehavioralReport", {
                reports: behavioralReports,
                student: foundStudent
            })
        }).catch(err => {
            console.log(err)
        }).catch(err => {
            console.log(err)
        })
    })
})
module.exports = directorRouter;