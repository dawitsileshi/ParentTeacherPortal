let scheduleModel = require("../schemas/scheduleSchema");
let mongoose = require("mongoose");

// scheduleModel.findOne({_id: "5d0252ff2fc9e548f050fac7"}).populate("teacher").exec((err, foundSchedule) => {
//
//     console.log(foundSchedule);
//
// });
scheduleModel.findOne({"students": {"$all": [{"$elemMatch": {studentId: {$eq: "5d033e6dd251d86e3ce197b4"}}}]}}, (err, foundStudent) => {
    console.log(foundStudent);
});

// scheduleModel.findOne({"program"})
mongoose.connect("mongodb://localhost:27017/studentPortal", {useNewUrlParser: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(() => {
    console.log("Error connecting to the database");
});