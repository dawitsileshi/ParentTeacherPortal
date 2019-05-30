let mongoose = require("mongoose");

let attendanceSchema = new mongoose.Schema({
   courseName: String,
   period: String,
   date: Date,
   students: [ {
       id: mongoose.Schema.Types.ObjectId,
       name: String,
       numberOfTimes: Number,
       excuse: String
   }]
});

let attendanceModel = new mongoose.model("attendance", attendanceSchema);

module.exports = attendanceModel;