let studentModel = require("../schemas/studentSchema");
let mongoose = require("mongoose");
// studentModel.find({"schedule": {$all: [{"$elemMatch": {dayName: {$eq: "Monday"}}}]}}, (err, data) => {
//     if(err) {
//         throw err;
//     } else {
//         let schedule = data.schedule;
//
//         console.log(data);
//     }
// });

// studentModel.find({familyContact: {"$all": [{"$elemMatch": {email: {$eq: "stujji@yahoo.com"}}}]}}).select("familyContact -_id").exec((err, foundStudent) => {
//     if(err) {
//         console.log(err)
//     } else {
//         for (let i = 0; i < foundStudent.length; i++) {
//             let familyContact = foundStudent[i].familyContact;
//             // console.log(familyContact.familyContact);
//             for (let j = 0; j < familyContact.length; j++) {
//                 console.log(familyContact[j]._id);
//             }
//         }
//     }
// });

studentModel.find({familyContact: {"$all": [{"$elemMatch": {email: {$eq: "stujji@yahoo.com"}}}]}}).exec((err, foundStudent) => {
    if(err) {
        console.log(err)
    } else {
        for(let i = 0; i < foundStudent.length; i++) {

            let familyContact = foundStudent[i].familyContact;
            for (let j = 0; j < familyContact.length; j++) {
                console.log(familyContact[j]._id);
            }
        }
        // for (let i = 0; i < foundStudent.length; i++) {
        //     let familyContact = foundStudent[i].familyContact;
        //     // console.log(familyContact.familyContact);
        //     for (let j = 0; j < familyContact.length; j++) {
        //         console.log(familyContact[j]._id);
        //     }
        // }
    }
});

mongoose.connect("mongodb://localhost:27017/studentPortal", {useNewUrlParser: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(() => {
    console.log("Error connecting to the database");
});