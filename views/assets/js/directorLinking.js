let homeId = document.getElementById("homeId")
let eventId = document.getElementById("eventsId");
let studentId = document.getElementById("studentsId");
let registrarId = document.getElementById("registrarsId");
let commonId = document.getElementById("commonId");
let directorScheduleId = document.getElementById("directorScheduleId");
console.log(directorScheduleId)
console.log(eventId)
console.log(studentId)
console.log(registrarId)
console.log(commonId)
homeId.onclick = function () {
  window.location.href = "http://localhost:3000/api/director/home"
};
//
directorScheduleId.onclick = function () {
    window.location.href = "http://localhost:3000/api/listSchedules";
    return false;
};

eventId.onclick = function () {
    window.location.href = "http://localhost:3000/api/listEvents"
    return false;
};

studentId.onclick = function () {
    window.location.href = "http://localhost:3000/api/director/manageStudents"
    return false;
};

registrarId.onclick = function () {
    window.location.href = "http://localhost:3000/registrar/register"
    return false;
};

commonId.onclick = function() {
    window.location.href = "http://localhost:3000/common"
    return false;
}