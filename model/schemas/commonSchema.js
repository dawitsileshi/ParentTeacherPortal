let mongoose = require("mongoose");

let commonSchema = new mongoose.Schema({
	semester: Number,
	// currentId: String
});

let commonModel = new mongoose.model("common", commonSchema);

module.exports = commonModel;
