let mongoose = require("mongoose");

let gradeTotalAvgSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    grade: Number,
    firstSemTotal: Number,
    secondSemTotal: Number,
    firstSemAvg: Number,
    secondSemAvg: Number,
    average: Number,
    passFail: Boolean
});

let gradeTotalAvgModel = new mongoose.model("gradeTotalAvg", gradeTotalAvgSchema);

module.exports = gradeTotalAvgModel;