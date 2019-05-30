let mongoose = require("mongoose");

let teacherSchema = new mongoose.Schema({

    fname: String,
    lname: String,
    gender: String,
    email: String,
	course: [{
        name: String,
    }]
    // schedules: [{ year: Number,
    // 			sections: [{ section: String,
    // 						programs: [{ day: String,
   	// 									periods: [{ period: Number,
  		// 											courseName: String
 			// 									}]
 			// 						}]
   			// 			}]
				// }]

    // course: [{
        // name: String,
        // year: Number,
        // period: Number
    // }]

});

let teacherModel = new mongoose.model("teacher", teacherSchema);

module.exports = teacherModel;