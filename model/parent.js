let parentModel = require("./schemas/parentSchema");
let studentModel = require("./schemas/studentSchema");
let student = require("./student");
let mongoose = require("mongoose");

let nodemail = require("nodemailer");

exports.registerParent = (passedData, email, tokens) => {

    return new Promise((resolve, reject) => {

        // for (let i = 0; i < tokens.length; i++) {

            // studentModel.find({familyContact: {"$all": [{"$elemMatch": {email: {$eq: "stujji@yahoo.com"}}}]}}).select("familyContact -_id").exec((err, foundStudent) => {
            //     if(err) {
            //         console.log(err)
            //     } else if(foundStudent.length === 0) {
            //     } else {
            //         for (let i = 0; i < foundStudent.length; i++) {
            //             let familyContact = foundStudent[i].familyContact;
            //             for (let j = 0; j < familyContact.length; j++) {
            //                 if(familyContact[j]._id !== tokens[j]) {
            //                     reject(_id + " is not correct");
            //                     break;
            //                 } else {
            //
            //                 }
            //             }
            //         }
            //     }
            // });
        //

        studentModel.find({familyContact: {"$all": [{"$elemMatch": {email: {$eq: email}}}]}}, (err, foundStudent) => {

            let newTokens = [];
            // console.log("The found students " + foundStudent);

            if (err) {
                reject()
            } else if (foundStudent.length === 0) {
                reject({message: "No students found with that email"})
            } else {

                if((typeof tokens === "string" && foundStudent.length > 1) ||
                    (typeof tokens === "object" && (tokens.length !== foundStudent.length))) {
                    reject({message: "Please insert all tokens sent to you by email"})

                }
                // if (typeof tokens === "string") {
                //
                //     if (foundStudent.length > 1) {
                //
                //         reject({message: "Please insert all tokens sent to you by email"})
                //
                //     }
                //
                // } else if(typeof tokens === "object") {
                //
                //     if (tokens.length !== foundStudent.length) {
                //         console.log(tokens.length + " " + foundStudent.length);
                //         reject({message: "Please insert all tokens sent to you by email"})
                //
                //     }
                //
                // }

                // if(typeof tokens === "string" && foundStudent.length > 1) {
                //     reject({message: "Please insert all tokens sent to you by email"})
                //
                // } else
                // if (foundStudent.length !== tokens.length || (foundStudent.length > 1 && typeof tokens === "string")) {
                //     reject({message: "Please insert all tokens sent to you by email"})
                // }

                else {
                    // let ids = [];
                    console.log("arrived here");
                    for (let i = 0; i < foundStudent.length; i++) {
                        let familyContact = foundStudent[i].familyContact;
                        for (let j = 0; j < familyContact.length; j++) {
                            // console.log("The id", familyContact[j]._id);
                            // let _id = String(familyContact[j]._id).valueOf();
                            // let _id = "" + familyContact[j].id;
                            let token = familyContact[j].token;
                            newTokens.push(token);
                            // if(typeof tokens === "string") {
                            //     let contain = ids.includes(tokens);
                            //     console.log(ids.length + " includes " + contain);
                            //     if(!contain) {
                            //         reject({message: tokens + " is not found"})
                            //     }
                            //     // if(tokens === _id) {
                            //     //     resolve({message: "Found"});
                            //     //     break;
                            //         // console.log(typeof _id + " " + typeof tokens);
                            //         // console.log(tokens === _id);
                            //         // reject({message:tokens + " is not found"})
                            //     // } else {
                            //     //     console.log("correct");
                            //     // }
                            // } else {

                            // for (let k = 0; k < tokens.length; k++) {
                            //     let contain = ids.includes(tokens[k]);
                            //     console.log(tokens[k] + " included " + contain + " " + ids)
                            //     if(!contain) {
                            //         reject({message: tokens[k] + " is not found"});
                            //     } else {
                            //
                            //     }
                            //     // console.log(typeof _id + " " + typeof tokens[k]);
                            //     // console.log(_id === tokens[k]);
                            //     // if(String(_id) === String(tokens[k])) {
                            //     //     continue;
                            //     // }
                            //     // if(String(_id) !== String(tokens[k])) {
                            //     //
                            //     //     reject({message:tokens[k] + " is not found"});
                            //         // break;
                            //     // }
                            // }

                        }
                        // }
                        // console.log("The ids" + _id);
                        // if(familyContact[j]._id !== tokens[j]) {
                        //     reject(_id + " is not correct");
                        //     break;
                    }


                    if (typeof tokens === "string") {
                        let contain = newTokens.includes(tokens);
                        if (!contain) {
                            reject({message: tokens + " is not found"})
                        }
                        console.log(contain);
                    } else {
                        for (let i = 0; i < tokens.length; i++) {
                            let contain = newTokens.includes(tokens[i]);
                            if (!contain) {
                                reject({message: tokens[i] + " is not found"})
                            }
                        }
                    }

                console.log("The id", tokens.length);

                // let token = '';
                // for (let i = 0; i < tokens.length; i++) {
                //     token = token + tokens[i];
                // }
                // for (let i = 0; i < ids.length; i++) {
                //     let objectId = mongoose.Types.ObjectId(String(token).valueOf().trim());
                // ObjectId(tokens);
                // console.log(typeof objectId +  " " + tokens)
                // if(ids[i] === toke)
                // if(tokens.match(ids[i]) == null) {
                //     console.log("Null is out")
                // }
                // let token = new String(tokens);
                // let id = new Object(ids[i]);
                // if(id.equals(token)) {
                //     console.log(true);
                // } else {
                //     console.log(false)
                // }
                // console.log(ids[i] + " " + tokens);
                // let match = String(ids[i]).valueOf().match(tokens);
                // console.log(match)
                // console.log(String(ids[i]).valueOf().match() == tokens);
                //     let id = "" + ids[i];
                //     console.log(typeof ids[i] + " " + typeof tokens);
                // if(String(tokens).valueOf() === String(ids[i]).valueOf()) {
                //     console.log("true");
                // }
                // }
                // let contain = ids.includes(tokens.trim());
                // console.log(contain);
                // }

                // resolve("Everything good")
                let studentIds = [];
                for (let i = 0; i < foundStudent.length; i++) {

                    let familyContact = foundStudent[i].familyContact;
                    for (let j = 0; j < familyContact.length; j++) {

                    }
                    let id = {studentId: foundStudent[i]._id};
                    studentIds.push(id)

                }

                let fname = passedData.fname;
                let lname = passedData.lname;
                let tel = passedData.tel;
                let email = passedData.email;
                let relation = passedData.relation;
                let password = passedData.password;
                // let uname = passedData.uname;
                // let address = passedData.address;
                // let token = passedData.token;

                let parent = {
                    fname: fname,
                    lname: lname,
                    relation: relation,
                    // uname: uname,
                    email: email,
                    tel: tel,
                    password: password,
                    students: studentIds
                };

                parentModel(parent).save((err, savedStudent) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(savedStudent);
                    }
                })

            }
            }
            //
            // }
        });


    })

};

exports.addParent = (email, tel, ids) => {

    let newIds = [];

    if(typeof ids === "string") {
        newIds.push(ids)
    } else {
        newIds = ids;
    }

    return new Promise((resolve, reject) => {

        console.log(ids)
        for (let i = 0; i < newIds.length; i++) {

        studentModel.findOne({_id: newIds[i]}, (err, foundStudent) => {
        console.log(foundStudent);

            if(err) {
                reject(err)
            } else {

                let familyContact = foundStudent.familyContact;

                let token = familyContact[0].token;

                let newFamilyContact = {email: email,
                                        token: token,
                                        tel: tel};

                console.log(newFamilyContact)
                familyContact.push(newFamilyContact);
                foundStudent.save();
            }

        });
            resolve("successful");
        }

    })

};

exports.listAllParents = () => {

    return new Promise((resolve, reject) => {

        parentModel.find({}, (err, foundParents) => {
            if(err) {
                reject(err)
            }else {
                resolve(foundParents)
            }
        })

    })

};

exports.loginParent = (email, password) => {

    return new Promise((resolve, reject) => {

        parentModel.findOne({email: email, password: password}, (err, foundParent) => {

            if(err) {
                reject(err)
            } else {

                resolve(foundParent)
                // if(foundParent !== null) {
                //     resolve(foundParent)
                // }
                // if(foundParent.length > 0) {
                //     resolve(foundParent);
                // } else {
                //     resolve(0)
                // }
            }

        })

    })

};

exports.sendEmail = () => {

    return new Promise((resolve, reject) => {

        studentModel.find({}, (err, foundStudents) => {

            if(err) {
                reject(err)
            } else {
                for (let i = 0; i < foundStudents.length; i++) {
                    let student = foundStudents[i];
                    let familyContact = student.familyContact;
                    for (let j = 0; j < familyContact.length; j++) {
                        sendEmail(familyContact[j].email, familyContact[j].token, student.name).then(info => {
                            resolve("Successfully Sent to " + familyContact[j].email);
                        }).catch(err => {
                            reject(err)
                        });
                    }
                }
            }

        })

    })

};

function sendEmail(email, token, name) {

    return new Promise((resolve, reject) => {

        let transporter = nodemail.createTransport({
            service: "gmail",
            auth: {
                user: "mussie2000mt@gmail.com",
                pass: ""
            }
        });
        transporter.sendMail({
            from: "Student Portal",
            to: "dawitsileshi45@gmail.com",
            subject: "Token for Creating Account",
            text: "Here is the token for " + name + ": " + token,
            html: "<p>Hello, here is the token for" + token + "</p>"
        }, (err, info) => {
            if(err) {
                reject(err);
                console.log("The error is", err);
            } else{
                resolve(info);
                console.log("The info ", info);
                // return info;
            }
        });
    })

}
