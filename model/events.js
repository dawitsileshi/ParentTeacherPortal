let eventModel = require("./schemas/eventSchema");

exports.createEvent = event => {

    return new Promise((resolve, reject) => {

        eventModel(event).save((err, savedEvent) => {

            if(err) {

                reject(err)

            } else {

                resolve(savedEvent)

            }

        })

    })

};
exports.listAllEvents = () => {

    return new Promise((resolve, reject) => {

        eventModel.find({}, (err, foundEvents) => {

            if(err) {

                reject(err)

            } else {

                resolve(foundEvents)

            }

        })

    })

};

exports.findEvent = id => {

    return new Promise((resolve, reject) => {

        eventModel.findOne({_id: id}, (err, foundEvent) => {

            if(err) {
                reject(err)
            } else {
                resolve(foundEvent);
            }

        })

    })

}
exports.updateEvent = (id, event) => {

    return new Promise((resolve, reject) => {

        eventModel.findOneAndUpdate({_id: id}, event, {new: true}, (err, updatedEvent) => {

            if(err) {

                reject(err)

            } else {

                resolve(updatedEvent)

            }

        })

    })

};

exports.deleteEvent = id => {

    return new Promise((resolve, reject) => {

        eventModel.findOneAndDelete({_id: id}, (err, deletedEvent) => {

            if(err) {

                reject(err)

            } else {

                resolve(deletedEvent)

            }

        })

    })

};