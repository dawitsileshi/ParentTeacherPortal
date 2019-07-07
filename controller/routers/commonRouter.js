let commonRouter = require("express").Router();

let teacherModel = require("../../model/teacher");
let nurseModel = require("../../model/nurse");
let directorModel = require("../../model/director");
let registrarModel = require("../../model/registrar");
let commonModel = require("../../model/schemas/commonSchema");

commonRouter.get("/aboutUs", (req, res, next) => {

    res.render("about-us")

});

commonRouter.get("/contactUs", (req, res, next) => {

    res.render("contact-us")

});

commonRouter.get("/home", (req, res, next)=> {

    res.render("index")

});

commonRouter.post("/common", (req, res, next) => {

    let passedData = req.body;

    commonModel(passedData).save((err, savedCommon) => {

        if(err) {
            console.log("The error is", err)
        } else {
            res.render("director/index")
        }

    })

});

commonRouter.post("/login", (req, res, next) => {

    console.log("into login")
    let passedData = req.body;

    let userName = passedData.uname;
    let password = passedData.password;
    let email = passedData.email;

    if(userName.substring(0, 4) === "tea/") {

        teacherModel.loginTeacher(userName, email, password).then((message) => {

            if(typeof message === "string") {
                res.render("login", {message: message})
            } else {
                res.render("teacher/index", {teacher: message});
            }
            // console.log(foundTeacher);
            // res.render("teacher/index", {teacher: foundTeacher})
        }).catch((err) => {

            console.log("unsuccessful");
            // res.render("login", {message: "invalid info"})

        })

    } else if(userName.substring(0, 4) === "nur/") {

        nurseModel.loginNurse(userName, password).then((message) => {

            if(typeof message === "string") {
                res.render("login", {message: message})
            } else {
                res.render("registrar/index");
            }
            // res.render("nurse/index", message);

        }).catch((err) => {

            // res.render("login", message)

        })

    }else if(userName.substring(0, 4) === "dir/") {

        directorModel.loginDirector(userName, email, password).then((message) => {
            console.log("the director");
            if(typeof message === "string") {
                res.render("login", {message: message})
            } else {
                res.render("director/index");
            }
            res.render("director/index");
        }).catch(err => {
            console.log(err)
        })

    }else if(userName.substring(0, 4) === "reg/") {

        console.log("into registrar");
        // if(userName.length === 0 || email.length === 0 || password === 0) {
        //     res.render("login", {message: "Please "})
        // }
        registrarModel.loginRegistrar(userName, email, password).then((message) => {

            if(typeof message === "string") {
                res.render("login", {message: message})
            } else {
                res.render("registrar/index");
            }

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