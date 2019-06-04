let studentRouter = require("express").Router();

let studentModel = require("../../model/student");
let scheduleModel = require("../../model/schedule");

// studentRouter.param("section", (req, res, next, section) => {

    // studentModel.listBySection(section).then(foundStudents => {
    //
    //     req.students = foundStudents;
    //
    // }).catch(err => {
    //
    //     console.log(err);
    //     next(err)
    //
    // })

// });

// studentRouter.param("year", (req, res, next, year) => {
//
//     studentModel.listByYear(year).then(foundStudents => {
//
//         req.students = foundStudents;
//
//     }).catch(err => {
//
//         console.log(err);
//         next(err)
//
//     })
//
// });
studentRouter.get("/students", (req, res, next) => {

    studentModel.listAllStudents().then(foundStudents => {

        res.json(foundStudents)

    }).catch(err => {

        console.log(err);
        next(err);

    })

});

studentRouter.get("/student/:id", (req, res, next) => {

    let id = req.params.id;
    console.log("arrived");

    studentModel.listSpecificStudent(id).then(foundStudent => {

        console.log(foundStudent);
        res.json(foundStudent)

    }).catch(err => {

        console.log(err);
        next(err)

    })

});

studentRouter.get("/student/email/:email", (req, res, next) => {

    let email = req.params.email;
    console.log("arrived");

    studentModel.listByFamContact(email).then(foundStudent => {

        // console.log(foundStudent);
        res.json(foundStudent)

    }).catch(err => {

        console.log(err);
        next(err)

    })

});


studentRouter.get("/students/section/:section", (req, res, next) => {

    let section = req.params.section;

    studentModel.listBySection(section).then(foundStudents => {

        res.json(foundStudents)

    }).catch(err => {

        console.log(err);
        next(err)

    })
    // let students = req.students;
    //
    // res.json(students);

});

studentRouter.get("/students/year/:year", (req, res, next) => {

    let year = req.params.year;
    studentModel.listByYear(year).then(foundStudents => {

        res.json(foundStudents)

    }).catch(err => {

        console.log(err);
        next(err)

    });

    // let students = req.students;
    //
    // res.json(students);

});

studentRouter.get("/student/schedule/:id", (req, res, next) => {

    let id = req.params.id;

    studentModel.showStudentSchedule(id).then(foundSchedule => {
        console.log(JSON.stringify(foundSchedule));
        res.json(foundSchedule);
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

studentRouter.get("/student/medical/:id", (req, res, next) => {

    let id = req.params.id;

    studentModel.showStudentMedicalRecord(id).then(foundSchedule => {
        res.json(foundSchedule);
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

studentRouter.get("/student/grade/:id", (req, res, next) => {

    let id = req.params.id;

    studentModel.showStudentGrade(id).then(foundSchedule => {
        res.json(foundSchedule);
    }).catch(err => {
        console.log(err);
        next(err)
    })

});
studentRouter.post("/student", (req, res, next) => {

    let passedData = req.body;
    console.log(passedData);
    res.json(passedData)

    // let token = cryptoo.randomBytes(8).toString("hex");

    // let imageBuff = new Buffer(passedData.pic.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    // let imageBuff = new Buffer(passedData.pic, 'base64');
    // let student = {
        // id: passedData.id,
        // fname: passedData.fname,
        // lname: passedData.lname,
        // pic: {
        //     data: imageBuff,
        //     contentType: "image/jpg"
        // },
        // year: passedData.year,
        // age: passedData.age,
        // gender: passedData.gender,
        // section: passedData.section,
        // inSchool: true,
        // semester: passedData.semester,
        // familyContact: [{
        //     email: passedData.familyEmail,
        //     token: token,
        //     tel: passedData.familyTel,
        // }],
        // schedule:[]
    //
    // };

    // console.log(passedData.pic);
    // res.json(passedData.pic.data);

    // studentModel.registerStudent(student).then(savedStudent => {

        // scheduleModel.updateStudent(passedData.section, passedData.year)
        // res.json(savedStudent)

    // }).catch(err => {

        // console.log(err);
        // next(err)

    // })

});

studentRouter.post("/student/medical", (req, res, next) => {

    let passedData = req.body;
    let id = passedData.id;

    let medicalRecord = {

        diseaseName: passedData.diseaseName,
        description: passedData.description

    };

    console.log(id);

    studentModel.enterMedicalRecord(passedData.id, medicalRecord).then(message => {

        res.json(message)

    }).catch(err => {
        console.log(err);
        next(err)
    })

});

// studentRouter.post("student/grade")

studentRouter.delete("/student", (req, res, next) => {

    let id = req.query.id;

    studentModel.deleteStudent(id).then(deletedStudent => {
        res.json(deletedStudent);
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

studentRouter.delete("/student/schedule", (req, res, next) => {

    let dayNumber = req.query.dayNumber;
    let section = req.query.section;
    let semester = req.query.semester;
    let year = req.query.year;

    console.log(req.query);

    studentModel.removeSchedule(year, section, Number(semester), Number(dayNumber)).then(foundStudent => {
        res.json(foundStudent)
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

module.exports = studentRouter;