let mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    title: String,
    createdDate: {
        type: Date,
        default: Date.now()
    },
    description: String,
    destination: [{
        year: Number,
        semester: Number,
        section: String
    }]

});

let eventModel = new mongoose.model("event", eventSchema);

module.exports = eventModel;