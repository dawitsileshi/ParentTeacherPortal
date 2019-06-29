let homeId = document.getElementById("homeId");
let scheduleId = document.getElementById("scheduleId");
let eventId = document.getElementById("eventsId");
let studentId = document.getElementById("studentsId");
let registrarId = document.getElementById("registrarsId");

homeId.onclick = function () {
  window.location.href = "http://localhost:3000/api/director/home"
};

scheduleId.onclick = function () {
    window.location.href = "http://localhost:3000/api/listSchedules";
    return false;
};

eventId.onclick = function () {
    window.location.href = "http://localhost:3000/api/listEvents"
    return false;
};

homeId.onclick = function () {
    window.location.href = "http://localhost:3000/api/director/manageStudents"
    return false;
};

registrarId.onclick = function () {
    window.location.href = "http://localhost:3000/registrar/register"
    return false;
};