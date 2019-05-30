let teacherRouter = require("express").Router();

let studentModel = require("../../model/student");

let teacherModel = require("../../model/teacher");

teacherRouter.get("/teachers", (req, res, next) => {



})

teacherRouter.post("/teacher", (req, res, next) => {

    let passedData = req.body;

    let courses = [];
    for (let i = 0; i < passedData.course; i++) {
        let course = {name: passedData.course[0]};
        courses.push(course)
    }
    let teacher = {fname: passedData.fname,
                    lname: passedData.lname,
                    gender: passedData.gender,
                    email: passedData.email,
                    course: courses};
    teacherModel.registerTeacher(teacher).then(savedTeacher => {
        res.json(savedTeacher)
    }).catch(err => {
        console.log(err);
        next(err)
    })

});
