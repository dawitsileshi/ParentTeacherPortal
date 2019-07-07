let scheduleModel = require("../../model/schedule");
let teacherModel = require("../../model/teacher");

let scheduleRouter = require("express").Router();

scheduleRouter.get("/schedules", (req, res, next) => {

    console.log("called here");
    scheduleModel.listAllSchedules().then((foundSchedules) => {
        res.json(foundSchedules)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })

});

scheduleRouter.post("/specificSchedule", (req, res, next) => {

    let passedData = req.body;
    console.log(passedData);
    scheduleModel.findSchedule(passedData.year, passedData.day, passedData.grade, passedData.section, passedData.semester).then(foundSchedule => {

        console.log(foundSchedule)
        res.json(foundSchedule)

    }).catch(err => {

        console.log(err);
        next(err)

    })

});
scheduleRouter.get("/addSchedule", (req, res, next) => {

    console.log("addSchedule arrived");

    res.render("director/newSchedule")

});

scheduleRouter.get("/listSchedules", (req, res, next) => {

    res.render("director/listSchedules");
    console.log("listSchedules arrived")

});

scheduleRouter.get("/schedule/:id", (req, res, next) => {

    let id = req.params.id;
    console.log(id);

    scheduleModel.scheduleById(id).then(foundSchedule => {

        console.log(foundSchedule);
        res.json(foundSchedule)

    }).catch(err => {

        next(err);

    })

});

scheduleRouter.get("schedules/grade", (req, res, next) => {

    let grade = req.body.grade;

    scheduleModel.listByYear(grade).then(foundSchedules => {

        res.json(foundSchedules)

    }).catch(err => {

        console.log(err);
        res.json(err)

    })


});

scheduleRouter.get("schedules/semester", (req, res, next) => {

    let semester = req.body.semester;

    scheduleModel.listBySemester(semester).then(foundSchedules => {

        res.json(foundSchedules)

    }).catch(err => {

        console.log(err);
        res.json(err)

    })

});

function retrieveNumber(day) {

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    for (let i = 0; i < days.length; i++) {

        if(days[i] === day) {

            return i;

        }

    }
}

scheduleRouter.post("/schedule", (req, res, next) => {

    let passedData = req.body;

    console.log(passedData);
    let year = new Date().getFullYear();
    let grade = passedData.grade;
    let semester = passedData.semester;
    let section = passedData.section;
    let day = passedData.day;
    let dayNumber = retrieveNumber(day);
    let programs = passedData.program;
    // let period = passedData.period;
    // // let program = passedData.program;
    // let courseName = passedData.courseName;
    // let teacherName = passedData.teacherName;
    //
    // let planIds = [];
    // for (let i = 0; i < programs.length; i++) {
    //     teacherModel.createLessonPlan(programs[i].teachers.id).then(createdPlan => {
    //         console.log(createdPlan)
    //         // planIds.push(createdPlan._id)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // console.log("The plan ids", planIds)
    //
    let program = [];
    for (let i = 0; i < programs.length; i++) {
        // let lessonPlanId;
        // teacherModel.createLessonPlan(programs[i].teachers.id).then(savedLessonPlan => {
        //
        //     lessonPlanId = savedLessonPlan._id;

            let singleProgram = {period: programs[i].period,
                            courseName: programs[i].course,
                            teacherId: programs[i].teachers.id,
                            teacherName: programs[i].teachers.name };
            program.push(singleProgram);

        // }).catch(err => {
        //     console.log(err)
        // });
    }
    // console.log("arrived here");
    // res.json(passedData);
    // console.log(passedData);
    // let periodArray = [{periodNumber: period,
    //     courseName: courseName,
    //     teacherName: teacherName}];
    // let scheduleArray = [{section: section,
    //     period: periodArray}];
    // let dayArray = [{dayNumber: dayNumber,
    //                 name: day,
    //                 schedule: scheduleArray}];
    // let gradeArray = [{grade: [{grade: grade,
    //     semester: semester,
    //     day: dayArray}]}];

    // let schedule = {grade: grade,
    //                 semester: semester,
    //                 day: day,
    //                 dayNumber: dayNumber,
    //                 section: section,
    //                 program: [{
    //                     period: period,
    //                     courseName: courseName,
    //                     teacherName: teacherName
    //                 }]};

    let schedule = {
        year: year,
        grade: grade,
        semester: semester,
        day: day,
        dayNumber: dayNumber,
        section: section,
        program: program,
        students: []};

    // res.json(passedData);
    // console.log(passedData);
    // let schedule = {schedule: [{grade: [{grade: grade,
    //                         semester: semester,
    //                         day: [{
    //                             day: dayNumber,
    //                             name: day,
    //                             schedule: [{
    //                                 section: section,
    //                                 period: [{
    //                                     period: period,
    //                                     courseName: courseName,
    //                                     teacherName: teacherName
    //                                     }]
    //                                 }]
    //                             }]
    //                         }]
    //                 }]};

    // console.log("Before it is passed", JSON.stringify(schedule));
    let scheduleForStudent = {day: day,
        dayNumber: dayNumber,
        program: program};

    // console.log("The main schedule", schedule)
    scheduleModel.addSchedule(schedule, grade, section, scheduleForStudent).then(savedSchedule => {
        if(typeof savedSchedule === "string") {

            res.json(0);
            // res.render("director/newSchedule", {message: savedSchedule})
            console.log(1)

        } else {
            res.json(1)
        }
    }).catch(err => {
        console.log(err);
        res.json(err);
    })

});

scheduleRouter.post("/schedules", (req, res, next) => {

    console.log("came here")

});

scheduleRouter.put("/schedule", (req, res, next) => {

    let schedule = req.body;
    console.log(schedule)
    scheduleModel.editScheduleById(req.body.id, schedule).then(foundSchedule => {
        console.log(foundSchedule)
    }).catch(err => {
        console.log(err)
    });
    // console.log(req.body);

})
scheduleRouter.put("/schedule/period", (req, res, next) => {

    let passedData = req.body;

    let grade = passedData.grade;
    let section = passedData.section;
    let semester = passedData.semester;
    let day = passedData.day;

    let period = {period: passedData.period,
                courseName: passedData.courseName,
                teacherName: passedData.teacherName};

    scheduleModel.addPeriod(period, grade, section, semester, day).then(updatedSchedule => {
        res.json(updatedSchedule)
    }).catch(err => {
        res.json(err)
    })

});

scheduleRouter.delete("/schedule/period", (req, res, next) => {

    let passedData = req.query;
    let grade = passedData.grade;
    let section = passedData.section;
    let semester = passedData.semester;
    let period = passedData.period;

    console.log(passedData);
    scheduleModel.removePeriod(period, semester, grade, section).then(updatedSchedule => {
        res.json(updatedSchedule);
    }).catch(err => {
        console.log("The error", err);
        res.json(err);
    })

});

scheduleRouter.delete("/schedule/:id", (req, res, next) => {

    console.log("deleting")
    let id = req.params.id;

    scheduleModel.removeScheduleById(id).then(foundSchedule => {
        res.json(foundSchedule)
    }).catch(err => {
        console.log(err)
        next(err)
    })

});

scheduleRouter.delete("/schedule", (req, res, next) => {

    let passedData = req.query;

    let section = passedData.section;
    let grade = passedData.grade;
    let semester = passedData.semester;

    scheduleModel.removeSchedule(section, grade, semester, 0).then(deletedSchedule => {
        res.json(deletedSchedule)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })

});

module.exports = scheduleRouter;