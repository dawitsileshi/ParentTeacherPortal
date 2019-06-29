let directorRouter = require("express").Router();

let directorModel = require("../../model/director");

directorRouter.get("/director/home", (req, res, next) => {

    res.render("director/index", {teacher: {}});

});

directorRouter.get("/manageSchedules", (req, res, next) => {

    console.log("manageSchedules arrived");
    res.render("director/manageSchedules");

});

directorRouter.get("/manageEvents", (req, res, next) => {

    console.log("manageEvents arrived");

    res.render("director/manageEvents");

});

directorRouter.get("/manageStudents", (req, res, next) => {

    console.log("manageStudents arrived");
    res.render("director/manageStudents");

});

directorRouter.get("/schedules", (req, res, next) => {



});

directorRouter.get("/schedule", (req, res, next) => {

    res.render("director/newSchedule");

});

directorRouter.post("/schedule", (req, res, next) => {



})

module.exports = directorRouter;