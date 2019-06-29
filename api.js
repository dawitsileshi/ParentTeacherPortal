let express = require("express");
let engine = require("ejs-locals");

let bodyParser = require("body-parser");
let morgan = require("morgan");

let studentRouter = require("./controller/routers/studentRouter");
let gradeRouter = require("./controller/routers/gradeRouter");
let scheduleRouter = require("./controller/routers/scheduleRouter");
let parentRouter = require("./controller/routers/parentRouter");
let teacherRouter = require("./controller/routers/teacherRouter");
let commonRouter = require("./controller/routers/commonRouter");
let registrarRouter = require("./controller/routers/registrarRouter");
let directorRouter = require("./controller/routers/directorRouter");
let eventRouter = require("./controller/routers/eventRouter");

let student = require("./model/schemas/studentSchema");
//let noticeRouter = require("./routers/noticeRouter");

global.cryptoo = require("crypto");
let app = express();

app.engine("ejs", engine);
app.use(morgan('dev'));
app.use(express.static("./views/assets"));
// app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentPortal", {useNewUrlParser: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(() => {
    console.log("Error connecting to the database");

});
app.use("/api", studentRouter);
app.use("/api", gradeRouter);
app.use("/api", scheduleRouter);
app.use("/api", parentRouter);
app.use("/api", teacherRouter);
app.use("/api", commonRouter);
app.use("/api", registrarRouter);
app.use("/api", directorRouter);
app.use("/api", eventRouter);

app.use("/home", (req, res, next) => {

    console.log("Arrived home");
    res.render("index");

});

app.use("/new_student", (req, res, next) => {

    // console.log("Arrived");
    res.render("registrar/studentRegister");

});
// app.use("/api", noticeRouter);

app.use("/schedules", (req, res, next) => {
//
    console.log("here at schedules")
    let teacher = [{name: "Kebede"},
        {name: "Abebe"},
        {name: "Alemayehu"}];
    // res.json(teacher)
    res.render("director/newSchedule", {teacher: teacher});
//
});

app.use("/new_teacher", (req, res, next) => {

    res.render("teacher/teacherRegister", {message: ""});

});

app.use("/teacher_home", (req, res, next) => {

    res.render("pages/teacher/home");

});

app.use("/teacher/attendance/:id", (req, res, next) => {

    // let students = [];
    // res.render("teacher/attendance", {students: students, periods: [1, 2, 3]})
    // let id = req.params.id;
    // console.log(id);
    // student.find({}, (err, foundStudents) => {
    //     if(err) {
    //         next(err);
    //     } else {
    //         res.render("teacher/attendance", {students: foundStudents});
    //     }
    // })
    // res.render("teacher/attendance");

});
// TODO: back authentication
// app.use("grade", )
app.use("/teacher/grade/", (req, res, next) => {

    student.find({}, (err, foundStudents) => {
        if(err) {
            next(err);
        } else {
            res.render("teacher/grade", {students: foundStudents});
        }
    })
    // res.render("teacher/attendance");

});

app.use("/login", (req, res, next) => {

    res.render("login", {message: ""})

});

app.use("/registerStudent", (req, res, next) => {

    res.render("registrar/studentRegister")

});

app.use("/medical", (req, res, next) => {

    res.render("nurse/enter_medical")

});

app.use("/teacher/enterinfo", (req, res, next) => {

    res.render("registrar/enterTeacherInfo");

});

app.use("/forgotPassword", (req, res, next) => {


    res.render("forgotpassword");
});

app.use("/teacher/createAccount", (req, res, next) => {

    res.render("teacher/teacherRegister", {message: ""});

});

app.use("/registrar/register", (req, res, next) => {

    res.render("register", {message: "please start your username with <b>'reg/</b>"})

});


app.use("/director/register", (req, res, next) => {

    res.render("register", {message: "please, start your username with <b> dir/ </b>"})

});
// app.post("/login", (req, res, next) => {
//
//     res.json("Hello")
//     console.log("login");
//
// })

module.exports = app;