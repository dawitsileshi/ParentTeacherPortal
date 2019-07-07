// let homeLink = document.getElementById("homeId")
let attendanceLink = document.getElementById("attendanceId");
let scheduleLink = document.getElementById("scheduleId");
let gradeLink = document.getElementById("gradeId");

// homeLink.onclick = function() {
//
//     window.location.href = "http://localhost:3000/teacher_home"
    // return false;
// };

attendanceLink.onclick = function() {

    let currentUrl = window.location.pathname;

    let id = currentUrl.split("/");

    window.location.href = "http://localhost:3000/api/attendance/" + id[id.length - 1];

    return false;

};

scheduleLink.onclick = function () {

    let currentUrl = window.location.pathname;

    let id = currentUrl.split("/");

    window.location.href = "http://localhost:3000/api/teacher/mySchedule/" + id[id.length - 1];

    return false

};

gradeLink.onclick = function () {

    let currentUrl = window.location.pathname;

    let id = currentUrl.split("/");

    window.location.href = "http://localhost:3000/api/grade/" + id[id.length - 1];

    return false

};