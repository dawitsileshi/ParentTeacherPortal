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

window.onload = () => {

    let gradeInput = document.getElementById("gradeInput");
    let sectionInput = document.getElementById("sectionInput");
    let periodInput = document.getElementById("periodInput");
    let dayInput = document.getElementById("dateInput");

    retrieveSecGrade();

    function retrieveSecGrade() {

        let http = new XMLHttpRequest();
        let currentUrl = window.location.pathname.split("/");
        let id = currentUrl[currentUrl.length - 1];
        let url = "http://localhost:3000/api/attendance/teacherInfo/" + id;
        http.open("get", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send();

        console.log("arrived")
        http.onreadystatechange = () => {

            if(http.readyState === 4 && http.status === 200) {

                // console.log("Before parse", http.responseText);
                parseTheResponse(http.responseText)

            }

        }

    }

    function parseTheResponse(response) {
    //
        let parsedResponse = JSON.parse(response, (key, value) => {
            return value;
        });

        let courseInput = document.getElementById("courseInput");
        courseInput.value = parsedResponse[0].course;
    //
    //     console.log("After parse", parsedResponse)
    //     // let data = [{grade: grade,
    //     //             sections: [{sections: section,
    //     //                         periods: [period]}]}]
    //     //
    //     let data = [];
    //     let sections = [];
    //     // for (let i = 0; i < parsedResponse.length; i++) {
    //     //     let singleParsedResponse = parsedResponse[i];
    //     //     let grade = singleParsedResponse.grade;
    //     //     let section = singleParsedResponse.section;
    //     //     for (let j = i + 1; j < parsedResponse.length; j++) {
    //     //         let nextSingleParsedResponse = parsedResponse[j];
    //     //         if(nextSingleParsedResponse.grade === grade) {
    //     //             let grade = {grade: grade};
    //                 // let sections
    //                 // let period = nextSingleParsedResponse.periods;
    //                 // for (let k = 0; k < period.length; k++) {
    //                 //     singleParsedResponse.periods.push(period[k])
    //                 // }
    //                 // parsedResponse.splice(j, 1);
    //             // }
    //         // }
    //     // }
    //
    //     // console.log("After parsed", parsedResponse)
    //
    //     let courseInput = document.getElementById("courseInput");
    //     // let periodSelect = document.getElementById("period");
    //     // let sectionSelect = document.getElementById("section");
    //     // let gradeSelect = document.getElementById("grade");
    //
    //     // console.log("After parse", parsedResponse)
    //     courseInput.value = parsedResponse[0].course;
    //     for (let i = 0; i < parsedResponse.length; i++) {
    //         let gradeOptions = document.createElement("option");
    //         let sectionOptions = document.createElement("option");
    //         let periodOptions = document.createElement("option");
    //
    //         let grade = parsedResponse[i].grade;
    //         gradeOptions.text = grade;
    //         gradeOptions.value = grade;
    //         gradeSelect.options.add(gradeOptions);
    //
    //         let section = parsedResponse[i].section;
    //         sectionOptions.text = section;
    //         sectionOptions.value = section;
    //         sectionSelect.options.add(sectionOptions);
    //
    //         let period = parsedResponse[i].periods;
    //         periodOptions.text = period[0];
    //         periodOptions.value= period[0];
    //         periodSelect.options.add(periodOptions)
    //         // console.log()
    //         // for (let j = 0; j < grade.length; j++) {
    //         //     gradeOptions.text = grade[j]
    //         //     gradeOptions.value = grade[j]
    //         //     gradeSelect.options.add(gradeOptions);
    //         // }
    //         // let grade = parsedResponse[i].grade;
    //     }
    //
    }
    // let gradeSelect = document.getElementById("grade");
    // let periodSelect = document.getElementById("period");
    // let sectionSelect = document.getElementById("section");

    let section, period, grade;

    let tableBody = document.getElementById("tableBody");

    let dayString = day => {

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        for (let i = 0; i < days.length; i++) {

            if (i === day) {

                return days[i];

            }

        }

    };
    let attendance = [];

    let courseNameInput = document.getElementById("courseInput");
    let dateInput = document.getElementById("dateInput");
// let sectionInput = document.getElementById("sectionInput");
// let gradeInput = document.getElementById("gradeInput");

    let date = new Date();
    let d = dayString(date.getDay());
    dateInput.value = d;

    function countIt() {
        let table = document.getElementsByTagName("table");

        let tableRow = table[0].getElementsByTagName("tr");

        // for (let i = 0; i < tableRow.length; i++) {
        //
        //     let tableData = tableRow[i];
        //     let radio = tableData.getElementsByTagName("div");
        let absent = document.getElementsByClassName("absent");
        let present = document.getElementsByClassName("present");
        // let execuse = tableData.getElementsByName("excused");
        // console.log(radio);
        for (let j = 0; j < absent.length; j++) {
            // if(radio[j].checked) {
            // let input = radio[j].getElementsByTagName("input");
            let excuse = document.getElementsByName("excused");
            let excused;
            let value;
            let id;

            if (excuse[j].checked) {
                excused = true
            } else {
                excused = false
            }
            if (absent[j].checked) {
                value = absent[j].value;
                id = absent[j].name
            } else {
                value = present[j].value;
                id = present[j].name
            }
            attendance.push({
                id: id,
                value: value,
                excused: excused
            })
        }

    }

    let button = document.getElementById("submitButton");
// console.log(button)
    button.onclick = function () {
        countIt();
        //
        // let grade;
        // for (let i = 0; i < gradeSelect.options; i++) {
        //     if(gradeSelect.options[i].selected) {
        //         grade = gradeSelect.options[i].value;
        //     }
        // }

        grade = gradeInput.value.trim()
        section = sectionInput.value.trim()
        period = periodInput.value.trim()

        let path = window.location.pathname.split("/");
        let teacherId = path[path.length - 1];
        let data = {
            teacherId: teacherId,
            section: section,
            period: period,
            grade: grade,
            date: dateInput.value,
            courseName: courseNameInput.value,
            // period: period,
            attendance: attendance
        };

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/teacher/attendance";
        http.open("post", url, true);
        http.setRequestHeader('Content-Type', 'application/json');

        http.send(JSON.stringify(data));
        attendance = [];
        console.log(data);

        http.onreadystatechange = () => {

            if (http.readyState === 4 && http.status === 200) {

                let child = tableBody.lastElementChild;
                console.log(child)
                while(child) {
                    tableBody.removeChild(child)
                    child = tableBody.lastElementChild;
                }
                // let tr = document.getElementsByName("tableRow");
                // for (let i = 0; i < tr.length; i++) {
                //     tableBody.removeChild(tr[i]);
                // }
                alert("Attendance is successfully filled");

            }

        };
        return false;
    };

    let searchButton = document.getElementById("searchButton");

    searchButton.onclick = function () {

        let grade = gradeInput.value.trim();
        let section = sectionInput.value.trim();
        let period = periodInput.value.trim();
        if (grade.length === "" || section.length === "" || period.length === "") {

            alert("Please fill all the data")

        } else {

            console.log("clicked");
            let http = new XMLHttpRequest();
            let url = "http://localhost:3000/api/students/secgradeday";
            http.open("post", url, true);
            http.setRequestHeader('Content-Type', 'application/json');

            let currentUrl = window.location.pathname.split("/");
            console.log(currentUrl)
            let teacherId = currentUrl[currentUrl.length - 1];
            let data = {
                teacherId: teacherId,
                day: dayInput.value,
                grade: grade,
                section: section,
                period: period
            };

            console.log(data)

            http.send(JSON.stringify(data));

            http.onreadystatechange = function () {

                if ((http.readyState === 4) && (http.status === 200)) {

                    let response = http.responseText;
                    console.log(typeof response)
                    if(response.length === 1 && Number(response) === 1) {
                        alert("Sorry, there are no students available")
                    } else if(response.length === 1 && Number(response) ===2) {
                        alert("Sorry, this is not the right schedule. Please, refer to your schedule in the schedule section, incase you missed it.")
                    } else if(response.length === 1 && Number(response) === 3) {
                        alert("Sorry, there is no such schedule in the data store")
                    } else {
                        parseIt(http.responseText)
                    }
                    // if(typeof response === "string") {
                    //     alert(response)
                    // } else {
                    //     parse(http.responseText)
                    // }
                    // console.log("The responseText", http.responseText)
                    // if(http.responseText.length === 0) {
                    //     alert("No students found with that schedule")
                    //     return;
                    // } else {
                    //     parseIt(http.responseText)
                    // }

                }

            }
        }
    }

    };

    function parseIt(jsonData) {
        let data = JSON.parse(jsonData, (key, value) => {
            return value;
        });

        let tbody = document.getElementById("tableBody");

        let child = tbody.lastElementChild;
        console.log(child)
        while(child) {
            tbody.removeChild(child)
            child = tbody.lastElementChild;
        }
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
            tr.setAttribute("name", "tableRow");
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