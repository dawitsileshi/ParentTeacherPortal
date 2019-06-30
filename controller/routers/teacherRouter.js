let teacherRouter = require("express").Router();

let studentModel = require("../../model/student");

let teacherModel = require("../../model/teacher");

teacherRouter.get("/teachers", (req, res, next) => {

    teacherModel.listAllTeachers().then(foundTeachers => {

        res.json(foundTeachers);

    }).catch(err => {

        next(err);
        console.log(err)

    })

});

teacherRouter.get("/teacher/:id", (req, res, next) => {

    let id = req.params.id;

    teacherModel.teacherById(id).then(foundTeachers => {

        res.json(foundTeachers)

    }).catch(err => {

        next(err);

    })

});

teacherRouter.get("/teacher/attendance/:teacherId", (req, res, next) => {

    let teacherId = req.params.teacherId;
    let date = req.body.date;

    teacherModel.listAttendanceByDayAndTeacher(teacherId, date).then(foundAttendance => {

        res.json(foundAttendance)

    }).catch(err => {

        console.log(err);
        next(err);

    })

});

// returns the appropriate period, section, year and course name for the teacher
function extractInfo(id, foundSchedules) {
    let periods = [];
    let course;
    let grades = [];
    let sections = [];

    let data = [];

    // data = [{grade: number,
    //         sections: [section],
    //         periods: [period]}]

    for (let i = 0; i < foundSchedules.length; i++) {
        if (foundSchedules[i]) {
            let program = foundSchedules[i].program;
            let section = foundSchedules[i].section;
            let grade = foundSchedules[i].grade;
            // if(!grades.includes(foundSchedules[i].grade)){
            //     grades.push(foundSchedules[i].grade);
            // }
            // if(!sections.includes(foundSchedules[i].section)) {
            //     sections.push(foundSchedules[i].section);
            // }
            for (let j = 0; j < program.length; j++) {
                let teacherId = program[j].teacherId;
                if (String(teacherId) === String(id)) {
                    // if()
                    // if(!periods.includes(program[j].period)) {
                    periods.push(program[j].period);
                    // }
                    course = program[j].courseName;
                }
            }

            data.push({
                course: course,
                grade: grade,
                section: section,
                periods: periods
            })
            section = null
            grade = null
            course = null
            periods = []
        }
    }
    console.log("The data", data);
    return data;
    // return({periods: periods,
    //         grades: grades,
    //         sections: sections,
    //         course: course})
}

teacherRouter.get("/attendance/teacherInfo/:id", (req, res, next) => {

    let id = req.params.id;

    // console.log("came here")
    teacherModel.findScheduleInfo(id, "Monday").then(foundInfo => {
        Promise.all(foundInfo).then(foundSchedules => {
            console.log("resolved")
            // console.log("The teacher info", foundSchedules);
            // res.json(foundSchedules)
            // console.log("The extracted info", extractInfo(id, foundSchedules));
            res.json(extractInfo(id, foundSchedules))
            // res.render("teacher/attendance", {info: extractInfo(id, foundSchedules)})
        }).catch(err => {
            console.log(err)
        })
        // res.render("teacher/attendance", {info: foundInfo})

    }).catch(err => {

        next(err);
        console.log(err);

    })

})
teacherRouter.get("/attendance/:id", (req, res, next) => {


    console.log("arrived at attendance");

    res.render("teacher/attendance");


});

teacherRouter.get("/grade/:id", (req, res, next) => {

    let id = req.params.id;

    teacherModel.findScheduleInfo(id).then(foundInfo => {
        console.log("The first", foundInfo);
        Promise.all(foundInfo).then(foundSchedules => {
           res.render("teacher/grade", {info: extractInfo(id, foundSchedules),  teacher: {id: id}})
        })
    }).catch(err => {

        next(err);
        console.log(err);

    });

});

teacherRouter.get("/teachers/:courseName", (req, res, next) => {

   let courseName = req.params.courseName;

   teacherModel.listByCourse(courseName).then(foundTeachers => {

       res.json(foundTeachers)

   }).catch(err => {

        next(err);

    })

});

teacherRouter.get("/teacher/enterGrade/:id", (req, res, next) => {

    let id = req.params.id;

    let teacher = {id: id};
    res.render("teacher/grade", {teacher: teacher});
    console.log("arrived at grade", id);

});

teacherRouter.get("/showAttendance", (req, res, next) => {

    let passedData = req.body;
    teacherModel.showAttendance(passedData.id).then(foundAttendance => {

        res.json(foundAttendance)

    }).catch(err => {

        console.log(err);
        next(err)

    })

})
teacherRouter.post("/teacher", (req, res, next) => {

    // return res.redirect("www.google.com");
    // res.render("index")
    let passedData = req.body;

    // let courses = [];
    // for (let i = 0; i < passedData.course; i++) {
    //     let course = {name: passedData.course[0]};
    //     courses.push(course)
    // }
    let teacher = {fname: passedData.fname,
                    lname: passedData.lname,
                    uname: passedData.uname,
                    email: passedData.email,
                    password: passedData.password,
                    course: passedData.course};
    teacherModel.registerTeacher(teacher).then(savedTeacher => {
        res.render("registrar/index");
        // res.render("teacher/index", savedTeacher)
        // res.json(savedTeacher);
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

teacherRouter.post("/teacher/attendance", (req, res, next) => {

    let passedData = req.body;
    let currentYear = new Date().getFullYear();

    let students = [];

    let passedAttendance = passedData.attendance;
    for (let i = 0; i < passedAttendance.length; i++) {
        let singleAttendance = passedAttendance[i];
        students.push({studentId: singleAttendance.id,
                        value: singleAttendance.value,
                        excused: singleAttendance.excused});
    }
    // console.log(students);
    let attendance = {year: currentYear,
                    dailyAttendance: {grade: passedData.grade,
                                    section: passedData.section,
                                    date: new Date(),
                                    courseName: passedData.courseName,
                                    teacherId: passedData.teacherId,
                                    period: passedData.period,
                                    students: students
                    }
    };

    teacherModel.addAttendance(attendance).then(savedAttendance => {
        console.log(savedAttendance);
        res.json(savedAttendance)
        // res.render("teacher/index", {teacher: {id: passedData.teacherId,
        //         fname: "Assefa"}});
    }).catch(err => {
        console.log(err);
        next(err);
    })
    // console.log(req.body)

})

teacherRouter.post("/attendance/:teacherId", (req, res, next) => {

    let passedData = req.body;
    let teacherId = req.params.teacherId;

    let students = [];
    let date = passedData.date;

    for (let i = 0; i < passedData.attendance.length; i++) {
        let singleStudent = passedData.attendance[i];
        students.push({studentId: singleStudent.id,
                        value: singleStudent.value})
    }

    //TODO: how to parse url in client side js
    let newAttendance = {dailyAttendance: {
        courseName: passedData.courseName,
            teacherId: teacherId,
            period: passedData.period,
            date: date,
            students: students
        }};

    let updateAttendance = {courseName: passedData.courseName,
                            teacherId: teacherId,
                            period: passedData.period,
                            students: students};

    teacherModel.fillAttendance(date, newAttendance, updateAttendance).then(savedAttendance => {
        console.log(savedAttendance)
    }).catch(err => {
        console.log("The error is ", err)
    });

    console.log("The file is ", attendance);

});

teacherRouter.post("/teacher/register", (req, res, next) => {

    let passedData = req.body;

    let email = passedData.email;
    let uname = passedData.uname;
    let password = passedData.password;

    teacherModel.createAccount(email, uname, password).then(message => {

        if(typeof message !== "string") {

            console.log("email found");
            res.render("login", {message: ""});

        } else {

            console.log(message);

            res.render("teacher/teacherRegister", {message: message})

        }

    }).catch(err => {

        console.log(err);
        next(err);

    })

});

teacherRouter.post("teacher/mySchedule/:id", (req, res, next) => {

    let id = req.params.id;

    teacherModel.listMySchedule(id).then(foundSchedules => {

        res.json(foundSchedules)

    }).catch(err => {

        next(err)
        console.log(err)

    })

})

teacherRouter.put("/teacher", (req, res, next) => {

    console.log("arrived to put")

});

teacherRouter.delete("/teacher/:id", (req, res, next) => {

    teacherModel.deleteTeacher(req.params.id).then(deletedTeacher => {

        res.json(deletedTeacher)

    }).catch(err => {

        next(err)
        console.log(err);

    })

})

module.exports = teacherRouter;