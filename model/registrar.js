let commonUserSchema = require("./schemas/commonUserSchema");
// let registrarModel = require("../");
// let studentModel = require("./schemas/studentSchema");
// let student = require("./student");
// let mongoose = require("mongoose");

exports.registerParent = (registrar) => {

    return new Promise((resolve, reject) => {

        commonUserSchema(registrar).save((err, savedRegistrar) => {
            if (err) {
                reject(err)
            } else {
                resolve(savedRegistrar);
            }
        })

    })
};

exports.loginRegistrar = (uname, email, password) => {

    console.log(uname, email + " " + password);
    return new Promise((resolve, reject) => {

        commonUserSchema.findOne({uname: uname, email: email, password: password}, (err, foundRegistrar) => {

            if(err) {
                reject(err)
            } else {
                if(foundRegistrar === null) {
                    resolve("Wrong username or password")
                } else {
                    // console.log(foundTeacher);
                    resolve(foundRegistrar);
                }
            }


        })

    })

}