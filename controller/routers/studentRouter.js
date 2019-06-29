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

// studentRouter.param("grade", (req, res, next, grade) => {
//
//     studentModel.listByYear(grade).then(foundStudents => {
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

studentRouter.get("/director/manageStudents", (req, res, next) => {

    res.render("director/manageStudents");

});

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

});

studentRouter.get("/students/grade/:grade", (req, res, next) => {

    let grade = req.params.grade;
    studentModel.listByYear(grade).then(foundStudents => {

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

studentRouter.post("/student/id", (req, res, next) => {

  let passedData = req.body;
  console.log(passedData);

    studentModel.listById(passedData.id).then(foundStudent => {

        res.json(foundStudent)

    }).catch(err => {

        console.log(err);
        next(err)

    })

});

studentRouter.post("/students/secgrade", (req, res, next) => {

    let passedData = req.body;

    let grade = passedData.grade;
    let section = passedData.section;

    console.log(grade + " " + section)

    // let periods = [1, 2, 3];

    studentModel.listBySectionYear(grade, section).then(foundStudents => {

        console.log(foundStudents);
        res.json(foundStudents)
        // res.render("teacher/attendance", {students: foundStudents, periods: periods})

    }).catch(err => {

        next(err);

    });
    console.log(req.body)

});
studentRouter.post("/student", (req, res, next) => {

    let passedData = req.body;
    console.log(passedData);
    res.json(passedData);

    let token = cryptoo.randomBytes(2).toString("hex");
    let idNumber = cryptoo.randomBytes(2).toString("hex");

    let twoLetters = passedData.fname[0] + passedData.fname[1];
    // let imageBuff = new Buffer(passedData.pic.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    // let imageBuff = new Buffer(passedData.pic, 'base64');

    let result = {grade: passedData.grade};

    let student = {
        // id: passedData.id,
        idNumber: twoLetters + "/" + idNumber + "/" + new Date().getFullYear(),
        fname: passedData.fname,
        lname: passedData.lname,
        pic: {
                data: passedData.pic,
            contentType: "image/jpg"
        },
        grade: passedData.grade,
        age: passedData.age,
        gender: passedData.gender,
        section: passedData.section,
        inSchool: true,
        // semester: passedData.semester,
        familyContact: [{
            email: passedData.familyEmail,
            token: token,
            tel: passedData.familyTel,
        }],
        schedule:[],
        result: result

    };

    studentModel.registerStudent(student).then(savedStudent => {
        //
        res.render("registrar/index");

    }).catch(err => {
        //
        console.log(err);
        next(err)
    //
    })

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

studentRouter.put("/student/:id", (req, res, next) => {

    let passedData = req.body;

    let id = req.params.id;

    studentModel.updateStudentInfo(passedData, id).then(updatedStudent => {



    }).catch(err => {



    })

});

studentRouter.put("/student/promote/:id", (req, res, next) => {

    let id = req.params.id;

    studentModel.promoteStudent(id).then(promotedStudent => {

        res.json(promotedStudent)

    }).catch(err => {



    })

})


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
    let grade = req.query.grade;

    console.log(req.query);

    studentModel.removeSchedule(grade, section, Number(semester), Number(dayNumber)).then(foundStudent => {
        res.json(foundStudent)
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

module.exports = studentRouter;