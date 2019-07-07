let searchButton = document.getElementById("searchScheduleId");

let period = 1;

let program, scheduleId;

let addScheduleButton = document.getElementById("addNewScheduleId");
let editScheduleButton = document.getElementById("editScheduleId");
let deleteScheduleButton = document.getElementById("deleteScheduleId");

let yearInput = document.getElementById("yearInputId");
let dayInput = document.getElementById("dayInputId");
let gradeInput = document.getElementById("gradeInputId");
let sectionInput = document.getElementById("sectionInputId");
let semesterInput = document.getElementById("semesterInputId");

addScheduleButton.onclick = () => {

    window.location.href = "http://localhost:3000/api/addSchedule"

}
searchingForSpecificSchedule();

// appending the card into the card deck
function formTheView(endIndex) {

    let container = document.getElementById("container");

    let row = document.createElement("div");
    row.setAttribute("class", "row");
    let col = document.createElement("div");
    col.setAttribute("class", "col");

    let cardDeck = document.createElement("div");
    cardDeck.setAttribute("class", "card-deck");

    for (let i = 0; i < endIndex; i++) {

        cardDeck.appendChild(createViews(i));
        period++;
        col.appendChild(cardDeck);
        row.appendChild(col);
        container.appendChild(row);

    }

}

// creating the cards and returning it
function createViews(i) {

    let card = document.createElement("div");
    card.setAttribute("class", "card border-dark mb-3");
    card.setAttribute("style", "width: 38rem");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.setAttribute("name", "cardBody");

    card.appendChild(cardBody);

    let periodLabel = document.createElement("label");
    periodLabel.innerText = "Period: ";

    cardBody.appendChild(periodLabel);
    cardBody.appendChild(document.createElement("br"));

    let periodInput = document.createElement("input");
    periodInput.setAttribute("name", "period");
    periodInput.setAttribute("class", "form-control period");
    periodInput.setAttribute("type", "number");
    periodInput.setAttribute("value", period);
    periodInput.setAttribute('readonly', true);

    cardBody.appendChild(periodInput);

    let courseNameLabel = document.createElement("label");
    courseNameLabel.innerText = "Course Name: ";

    cardBody.appendChild(courseNameLabel);

    let courseNameInput = document.createElement("input");
    courseNameInput.setAttribute("name", "courseName");
    courseNameInput.setAttribute("type", "text");
    courseNameInput.setAttribute("required", "true");
    courseNameInput.disabled = true;
    courseNameInput.required = true;
    courseNameInput.setAttribute("class", "form-control courseName");
    courseNameInput.setAttribute("value", program[period-1].courseName);

    cardBody.appendChild(courseNameInput);
    cardBody.appendChild(document.createElement("br"));

    let teacherNameLabel = document.createElement("label");
    teacherNameLabel.innerText = "Teacher Name: ";

    cardBody.appendChild(teacherNameLabel);

    // period.appendChild(teacherNameLabel);

    let teacherNameInput = document.createElement("input");
    teacherNameInput.setAttribute("name", "teacherName");
    teacherNameInput.required = true;
    teacherNameInput.disabled = true;
    teacherNameInput.setAttribute("id", period-1)
    teacherNameInput.setAttribute("value", program[period-1].teacherName);
    teacherNameInput.setAttribute("class", "form-control teacherName");

    cardBody.appendChild(teacherNameInput);

    return card;
}

// searching for schedule using the day, section, semester and grade attributes
function searchingForSpecificSchedule() {

    searchButton.onclick = function () {

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/specificSchedule";
        http.open("post", url, true);
        http.setRequestHeader("Content-Type", "application/json")

        let year = yearInput.value;
        let day = dayInput.value;
        let grade = gradeInput.value;
        let section = sectionInput.value;
        let semester = semesterInput.value;

        http.send(JSON.stringify({
            year: year,
            day: day,
            grade: grade,
            section: section,
            semester: semester
        }));

        http.onreadystatechange = function () {

            if (http.readyState === 4 && http.status === 200) {

                let receivedData = JSON.parse(http.responseText, (key, value) => {
                    return value;
                });
                console.log("The response is", http.responseText);
                if (receivedData === null) {
                    alert("There is no schedule saved with that property")
                } else {

                    console.log(receivedData);
                    scheduleId = receivedData._id;
                    program = receivedData.program;
                    formTheView(4);
                    formTheView(3);
                    period = 1;
                }

                registerEvents();

            }

        }
    };
}

// registering the edit, add and delete schedules button events
function registerEvents() {

    editScheduleButton.onclick = function () {

        if(editScheduleButton.innerText === "Edit The Schedule") {
            let cardBody = document.getElementsByName("cardBody");

            let courseInput = document.getElementsByName("courseName");

            let teacherSelect = document.createElement("select");
            teacherSelect.setAttribute("class", "form-control");

            for (let i = 0; i < cardBody.length; i++) {
                cardBody[i].removeChild(cardBody[i].lastChild);
                let select = document.createElement("select");
                select.setAttribute("class", "form-control teacherName");
                select.setAttribute("name", "teacherName");
                cardBody[i].insertBefore(button(), cardBody[i].childNodes[5])
                cardBody[i].appendChild(select);
                courseInput[i].disabled = false;
            }

            editScheduleButton.innerText = "Update Schedule"

        } else {

            let http = new XMLHttpRequest();
            let url = "http://localhost:3000/api/schedule";
            http.open("put", url, true);
            http.setRequestHeader("Content-Type", "application/json")
            let data = prepareTheData();
            console.log(data);
            http.send(JSON.stringify(data));

            editScheduleButton.innerText = "Edit The Schedule"
        }

        let courseNameInputs = document.getElementsByClassName("courseName");
        let searchTeacherButtons = document.getElementsByClassName("searchTeacherButton");
        for (let i = 0; i < searchTeacherButtons.length; i++) {

            searchTeacherButtons[i].onclick = function () {
                let singleCourseName = courseNameInputs[i].value;
                console.log(singleCourseName);
                receiveData(singleCourseName, i)
            }

        }

    }

    // addScheduleButton.onclick = function() {
    //
    //     window.location.href = "http://localhost:3000/api/addSchedule"
    //
    // };

    deleteScheduleButton.onclick = function() {

        let confirmation = confirm("Are you sure you want to delete the schedule?");
        if(confirmation) {
            let http = new XMLHttpRequest();
            let url = "http://localhost:3000/api/schedule/" + scheduleId;
            http.open("delete", url, true)
            http.setRequestHeader("Content-Type", "application/json")
            http.send()
        } else {
            alert("Thank you")
        }

    }
    console.log(deleteScheduleButton)
}

// organize the schedule data, so that it will be sent to the server
function prepareTheData() {

    let periods = document.getElementsByClassName("period");
    let courses = document.getElementsByClassName("courseName");
    let teachers = document.getElementsByClassName("teacherName");
    let data = [];
    let selectedTeachers = {};

    for (let i = 0; i < 7; i++) {
        let singleTeacher = teachers[i].getElementsByTagName("option");
        for (let j = 0; j < singleTeacher.length; j++) {
            if(singleTeacher[j].selected) {
                selectedTeachers = {id: singleTeacher[j].value,
                    name: singleTeacher[j].innerText};
            }
        }
        console.log(singleTeacher);

        let singleData = {
            period: periods[i].value,
            courseName: courses[i].value,
            teacherId: selectedTeachers.id,
            teacherName: selectedTeachers.name};

        data.push(singleData)
    }

    return {
        id: scheduleId,
        day: dayInput.value,
        section: sectionInput.value,
        semester: semesterInput.value,
        grade: gradeInput.value,
        program: data
    };
}

//creating the search teacher button
let button = () => {
    let searchTeacherButton = document.createElement("button");
    searchTeacherButton.setAttribute("name", "searchTeacherButton");
    searchTeacherButton.setAttribute("type", "button");
    searchTeacherButton.setAttribute("class", "btn btn-secondary searchTeacherButton");
    searchTeacherButton.setAttribute("id", "searchTeacherButton");
    searchTeacherButton.innerText = "Search Teacher";

    return searchTeacherButton;
}

// searching for specific teacher using the course value
function receiveData(courseName, i) {
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/teachers/" + courseName;
    http.open("get", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send();

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            let teachers = JSON.parse(http.responseText);
            addToDropDown(teachers, i);
            console.log(teachers)
        } else {
            console.log(http.status);
        }
    }
}

// adding the list of teachers in the dropdown menu
function addToDropDown(teachers, index) {

    let teachersDropDown = document.getElementsByClassName("teacherName");

    for (let i = 0; i < teachers.length; i++) {
        let option = document.createElement("option");
        option.text = teachers[i].fname + " " + teachers[i].lname;
        option.value = teachers[i]._id;
        teachersDropDown[index].options.add(option);
        console.log(option.text + " " + option.value)
    }

}