let mongoose = require("mongoose");

let behavioralReportSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    studentName: String,
    grade: Number,
    date: { type: Date, default: Date.now() },
    fault: String
});

let behavioralReportModel = new mongoose.model("behavioralReport", behavioralReportSchema);

module.exports = behavioralReportModel;