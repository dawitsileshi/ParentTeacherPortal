let homeId = document.getElementById("homeId");
let manageStudentId = document.getElementById("manageStudentId");
let manageTeacherId = document.getElementById("manageTeacherId");

homeId.onclick = () => {

    window.location.href = "http://localhost:3000/api/registrarHome";

};

manageStudentId.onclick = () => {

  window.location.href = "http://localhost:3000/api/manageStudents";

};

manageTeacherId.onclick = () => {

  window.location.href = "http://localhost:3000/api/manageTeachers";

};