let commonRouter = require("express").Router();

let teacherModel = require("../../model/teacher");
let nurseModel = require("../../model/nurse");
let directorModel = require("../../model/director");
let registrarModel = require("../../model/registrar");

commonRouter.post("/login", (req, res, next) => {

    let passedData = req.body;

    let userName = passedData.uname;
    let password = passedData.password;
    let email = passedData.email;

    if(userName.substring(0, 4) === "tea/") {

        teacherModel.loginTeacher(userName, email, password).then((foundTeacher) => {

            // console.log(foundTeacher);
            res.render("teacher/index", {teacher: foundTeacher})
        }).catch((message) => {

            console.log("unsuccessful");
            res.render("login", {message: "invalid info"})

        })

    } else if(userName.substring(0, 4) === "nur/") {

        nurseModel.loginNurse(userName, password).then((message, foundNurse) => {

            res.render("nurse/index", foundNurse);

        }).catch((message, err) => {

            res.render("login", message)

        })

    }else if(userName.substring(0, 4) === "dir/") {

        directorModel.loginDirector(userName, email, password).then((foundDirector) => {
            console.log("the director");

            res.render("director/index");
        }).catch(err => {
            console.log(err)
        })

    }else if(userName.substring(0, 4) === "reg/") {

        registrarModel.loginRegistrar(userName, email, password).then((foundDirector, message) => {

            res.render("registrar/index");

        }).catch(err => {

        })
    }
    // console.log("login");

});

commonRouter.post("/director", (req, res, next) => {


});

commonRouter.post("/register", (req, res, next) => {

    let passedData = req.body;

    let director = {fname: passedData.fname,
        lname: passedData.lname,
        email: passedData.email,
        gender: passedData.gender,
        uname: passedData.uname,
        password: passedData.password};

    directorModel.registerDirector(director).then(registeredDirector => {

        res.render("login", {message: ""});

    }).catch(err => {

        next(err)
        console.log(err)

    })


})

module.exports = commonRouter;