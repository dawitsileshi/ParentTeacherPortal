// // window.onload = function() {
// //
// //     countIt()
// // };
// //
//
// // let data = {date: date.value,
// //             period: period.value,
// //             subject: subject.value,
// //             attendance: [{
// //                 id: rb.name,
// //                 value: rb.value
// //             }]
// //     };
//
// import * as ejs from "ejs";
// let ejs = ("ejs");
// import ejs from "ejs/ejs";

let gradeSelect = document.getElementById("grade");
let periodSelect = document.getElementById("period");
let sectionSelect = document.getElementById("section");

let section, period, grade;

let dayString = day => {

    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < days.length; i++) {

        if(i === day) {

            return days[i];

        }

    }

};
let attendance = [];

let courseNameInput = document.getElementById("courseInput");
// let periodInput = document.getElementById("periodInput");
let dateInput = document.getElementById("dateInput");
// let sectionInput = document.getElementById("sectionInput");
// let gradeInput = document.getElementById("gradeInput");

let date = new Date();
let d = dayString(date.getDay());
dateInput.value = d;

function countIt() {
    let table = document.getElementsByTagName("table");

    let tableRow = table[0].getElementsByTagName("tr");

    for (let i = 0; i < tableRow.length; i++) {

        let tableData = tableRow[i];
        let radio = tableData.getElementsByTagName("div");
        // console.log(radio);
        for (let j = 0; j < radio.length; j++) {
            // if(radio[j].checked) {
            let input = radio[j].getElementsByTagName("input");
            if(input[0].checked) {
                attendance.push({id: input[0].name,
                                value: input[0].value });
                // console.clear();
                // console.log(input[0].getAttribute("value") + " " + input[0].getAttribute("name"));
            }
                // console.log(input[0].getAttribute("value"));
                // console.log(input[0].checked);
            // }
        }
        // console.log(tableData.innerHTML);
        for (let j = 0; j < tableData.length; j++) {

            console.log(tableData[j]);

        }

    }

}

let button = document.getElementById("submitButton");
// console.log(button)
button.onclick = function() {
    countIt();
    let data = {date: dateInput.value,
            courseName: courseNameInput.value,
            period: period,
            attendance: attendance};

    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/teacher/attendance";
    http.open("post", url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.send(JSON.stringify(data));
    attendance = [];
    console.log(data);
    // console.log(dateInput.value);
    return false;
    // console.log("clicked");
};

let searchButton = document.getElementById("searchButton");

searchButton.onclick = function () {

    console.log("clicked");
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/students/secgrade";
    http.open("post", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    //
    for (let i = 0; i < sectionSelect.length; i++) {

        if(sectionSelect.options[i].selected) {

            section = sectionSelect.options[i].text;
            // console.log(sectionSelect.options[i].text);

        }

    }

    for (let i = 0; i < gradeSelect.length; i++) {

        if(gradeSelect.options[i].selected) {

            grade = gradeSelect.options[i].text;

            // console.log(gradeSelect.options[i].text);

        }

    }

    for (let i = 0; i < periodSelect.length; i++) {

        if(periodSelect.options[i].selected) {

            period = periodSelect.options[i].text;

            // console.log(gradeSelect.options[i].text);

        }

    }
    let data = {
        grade: grade,
        section: section,
        period: period
    };

    http.send(JSON.stringify(data));

    http.onreadystatechange = function () {

        if((http.readyState === 4) && (http.status === 200)) {

            parseIt(http.responseText)

        }

    }

};



function parseIt(jsonData) {
    let data = JSON.parse(jsonData, (key, value) => {
        return value;
    });

    let tbody = document.getElementById("tableBody");
    // tbody.removeChild()
    createTable(data);
    console.log("The length", data.length);

    registerEvents();

}

function registerEvents() {

    let presentCheck = document.getElementsByClassName("present");
    let absentCheck = document.getElementsByClassName("absent");
    let execuseCheck = document.getElementsByName("excused");

    console.log(presentCheck);

    for (let i = 0; i < presentCheck.length; i++) {

        presentCheck[i].addEventListener("change", function () {

            if (this.checked) {
                console.log(i, "checked");
                execuseCheck[i].disabled = true;
            }
        });

        absentCheck[i].addEventListener("change", function () {

            if (this.checked) {
                console.log(i, "checked");
                execuseCheck[i].disabled = false;
            }

        });
    }

}
function createTable(data) {

    let tableBody = document.getElementById("tableBody");

    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let nameTd = document.createElement("td");
        let absentTd = document.createElement("td");
        let presentTd = document.createElement("td");
        let excuseTd = document.createElement("td");

        let absentDiv = document.createElement("div");
        absentDiv.setAttribute("class", "form-check text-center");
        let absentCheck = document.createElement("input");
        absentCheck.setAttribute("class", "form-check-input absent");
        absentCheck.setAttribute("type", "radio");
        absentCheck.setAttribute("value", "absent");
        absentCheck.setAttribute("name", data[i]._id);
        absentCheck.setAttribute("required", true);

        let presentDiv = document.createElement("div");
        presentDiv.setAttribute("class", "form-check text-center");
        let presentCheck = document.createElement("input");
        presentCheck.setAttribute("class", "form-check-input present");
        presentCheck.setAttribute("type", "radio");
        presentCheck.setAttribute("value", "present");
        presentCheck.setAttribute("name", data[i]._id);
        presentCheck.setAttribute("required", true);

        let excusedDiv = document.createElement("div");
        excusedDiv.setAttribute("class", "text-center form check");
        let excuseCheck = document.createElement("input");
        excuseCheck.setAttribute("class", "form-check-input");
        excuseCheck.setAttribute("type", "checkbox");
        excuseCheck.setAttribute("name", "excused");

        th.innerText = i + 1;
        nameTd.innerText = data[i].fname + " " + data[i].lname;

        absentDiv.appendChild(absentCheck);
        presentDiv.appendChild(presentCheck);
        excusedDiv.appendChild(excuseCheck);

        absentTd.appendChild(absentDiv);
        presentTd.appendChild(presentDiv);
        excuseTd.appendChild(excusedDiv);

        tr.appendChild(th);
        tr.appendChild(nameTd);
        tr.appendChild(absentTd);
        tr.appendChild(presentTd);
        tr.appendChild(excuseTd);

        tableBody.appendChild(tr);
    }


}

