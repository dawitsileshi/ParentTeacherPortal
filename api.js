let express = require("express");
let engine = require("ejs-locals");

let bodyParser = require("body-parser");
let morgan = require("morgan");

let studentRouter = require("./controller/routers/studentRouter");
let gradeRouter = require("./controller/routers/gradeRouter");
let scheduleRouter = require("./controller/routers/scheduleRouter");
let parentRouter = require("./controller/routers/parentRouter");
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
    let teacher = [{name: "Kebede"},
        {name: "Abebe"},
        {name: "Alemayehu"}];
    res.render("pages/director/new_schedule", {teacher: teacher});
//
});

app.use("/new_teacher", (req, res, next) => {

    res.render("pages/account/teacherRegister");

});

app.use("/teacher_home", (req, res, next) => {

    res.render("pages/teacher/home");

});

app.use("/attendance", (req, res, next) => {

    student.find({}, (err, foundStudents) => {
        if(err) {
            next(err);
        } else {
            res.render("teacher/attendance", {students: foundStudents});
        }
    })
    // res.render("teacher/attendance");

});

app.use("/login", (req, res, next) => {

    res.render("login")

});

app.use("/registerStudent", (req, res, next) => {

    res.render("registrar/studentRegister")

});

app.use("/medical", (req, res, next) => {

    res.render("nurse/enter_medical")

});

module.exports = app;