let mongoose = require("mongoose");
let lessonPlanSchema = new mongoose.Schema({
    teacherId: mongoose.Schema.Types.ObjectId,
    plan: String
});

let lessonPlanModel = new mongoose.model("lessonPlan", lessonPlanSchema);

module.exports = lessonPlanModel;