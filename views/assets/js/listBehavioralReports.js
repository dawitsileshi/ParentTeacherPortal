let addReportButton = document.getElementById("addReportButtonId");
let editReportButton = document.getElementsByName("editReportButton");
let deleteReportButton = document.getElementsByClassName("deleteReportButton");

let studentIdNumber = document.getElementById("studentId");

console.log(studentIdNumber.id)

addReportButton.onclick = () => {

    // let http = new XMLHttpRequest();
    // let url = "http://localhost:3000/api/behaviorReport/"
    window.location.href = "http://localhost:3000/api/behavioralReport/" + studentIdNumber.innerText

};