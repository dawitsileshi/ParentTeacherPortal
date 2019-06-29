let registrarRouter = require("express").Router();

let registrarModel = require("../../model/registrar");

registrarRouter.get("/manageStudents", (req, res, next) => {

    res.render("registrar/manageStudents");

});

registrarRouter.get("/manageTeachers", (req, res, next) => {

    res.render("registrar/enterTeacherInfo");

});

registrarRouter.get("/registrarHome", (req, res, next) => {

    res.render("registrar/index");

});


registrarRouter.post("/registrar", (req, res, next) => {

    let passedData = req.body;

    let registrar = {fname: passedData.fname,
                    lname: passedData.lname,
                    email: passedData.email,
                    gender: passedData.gender,
                    uname: passedData.uname,
                    password: passedData.password};

    registrarModel.registerParent(registrar).then(savedRegistrar => {

        res.render("login", {message: ""})

    }).catch(err => {

        next(err)

    })

});

module.exports = registrarRouter;