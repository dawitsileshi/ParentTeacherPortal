let scheduleModel = require("../../model/schedule");
let scheduleRouter = require("express").Router();

scheduleRouter.get("/schedules", (req, res, next) => {

    scheduleModel.listAllSchedules().then((foundSchedules) => {
        res.json(foundSchedules)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })

});

scheduleRouter.get("schedules/year", (req, res, next) => {

    let year = req.body.year;

    scheduleModel.listByYear(year).then(foundSchedules => {

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

    let year = passedData.year;
    let semester = passedData.semester;
    let day = passedData.day;
    let dayNumber = retrieveNumber(day);
    let section = passedData.section;
    let period = passedData.period;
    // let program = passedData.program;
    let courseName = passedData.courseName;
    let teacherName = passedData.teacherName;

    let program = [];
    for (let i = 0; i < period.length; i++) {
        let singleProgram = {period: period[i],
                        courseName: courseName[i],
                        teacherName: teacherName[i]};
        program.push(singleProgram);
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
    // let yearArray = [{year: [{year: year,
    //     semester: semester,
    //     day: dayArray}]}];

    // let schedule = {year: year,
    //                 semester: semester,
    //                 day: day,
    //                 dayNumber: dayNumber,
    //                 section: section,
    //                 program: [{
    //                     period: period,
    //                     courseName: courseName,
    //                     teacherName: teacherName
    //                 }]};

    let schedule = {year: year,
        semester: semester,
        day: day,
        dayNumber: dayNumber,
        section: section,
        program: program,
        students: []};

    res.json(passedData);
    console.log(passedData);
    // let schedule = {schedule: [{year: [{year: year,
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

    scheduleModel.addSchedule(schedule, year, section, scheduleForStudent).then(savedSchedule => {
        res.json(savedSchedule)
    }).catch(err => {
        console.log(err);
        res.json(err);
    })

});

scheduleRouter.put("/schedule/period", (req, res, next) => {

    let passedData = req.body;

    let year = passedData.year;
    let section = passedData.section;
    let semester = passedData.semester;
    let day = passedData.day;

    let period = {period: passedData.period,
                courseName: passedData.courseName,
                teacherName: passedData.teacherName};

    scheduleModel.addPeriod(period, year, section, semester, day).then(updatedSchedule => {
        res.json(updatedSchedule)
    }).catch(err => {
        res.json(err)
    })

});

scheduleRouter.delete("/schedule/period", (req, res, next) => {

    let passedData = req.query;
    let year = passedData.year;
    let section = passedData.section;
    let semester = passedData.semester;
    let period = passedData.period;

    console.log(passedData);
    scheduleModel.removePeriod(period, semester, year, section).then(updatedSchedule => {
        res.json(updatedSchedule);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })

});

scheduleRouter.delete("/schedule/:id", (req, res, next) => {

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
    let year = passedData.year;
    let semester = passedData.semester;

    scheduleModel.removeSchedule(section, year, semester, 0).then(deletedSchedule => {
        res.json(deletedSchedule)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })

});

module.exports = scheduleRouter;