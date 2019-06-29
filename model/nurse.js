let nurseModel = require("./schemas/commonUserSchema");

exports.loginNurse = (uname, email, password) => {

	return new Promise((resolve, reject) => {

        nurseModel.findOne({uname: uname, email: email, password: password}, (err, foundNurse) => {

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