let eventRouter = require("express").Router();

let eventModel = require("../../model/events");

eventRouter.get("/addEvents", (req, res, next) => {

    res.render("director/manageEvents", {event: {}});

});

eventRouter.get("/listEvents", (req, res, next) => {
    eventModel.listAllEvents().then(allEvents => {
        // res.json(allEvents)
        res.render("director/listEvents", {events: allEvents});

    }).catch(err => {

        console.log(err);
        next(err)

    })

});

eventRouter.get("/events", (req, res, next) => {

    eventModel.listAllEvents().then(allEvents => {

        res.json(allEvents)

    }).catch(err => {

        console.log(err);
        next(err)

    })

});

eventRouter.get("/editEvent/:id", (req, res, next) => {

    eventModel.findEvent(req.params.id).then(foundEvent => {
        res.render("director/manageEvents", {event: foundEvent})
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

eventRouter.post("/event", (req, res, next) => {

    let event = req.body;

    console.log(event);

    eventModel.createEvent(event).then(savedEvent => {
        res.render("director/index");
    }).catch(err => {
        console.log(err);
        next(err)
    })

});

eventRouter.put("/event/:id", (req, res, next) => {



});

eventRouter.delete("/event/:id", (req, res, next) => {

    eventModel.deleteEvent(req.params.id).then(deletedEvent => {
        res.json(deletedEvent);
    }).catch(err => {
        console.log(err)
        next(err)
    })

})
module.exports = eventRouter;