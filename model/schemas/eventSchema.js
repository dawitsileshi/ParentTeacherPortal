let mongoose = require("mongoose");

let eventSchema = new mongoose.Schema({
    title: String,
    createdDate: {
        type: Date,
        default: Date.now()
    },
    description: String,
    when: Date,
});

let eventModel = new mongoose.model("event", eventSchema);

module.exports = eventModel;