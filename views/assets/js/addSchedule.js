let period = 1;


function createViews(i) {

    // let teacher = <%-teacher[0].name %>;
    // console.log("teacher");
    // let card = document.getElementsByClassName("card");
    // console.log(<%- teacher[0].name %>);

    // let cardDeck = document.createElement("div");
    // cardDeck.setAttribute("class", "card-deck");
    // let row =  document.createElement("div");
    // row.setAttribute("class", "row");


    let card = document.createElement("div");
    card.setAttribute("class", "card border-dark mb-3");
    card.setAttribute("style", "width: 38rem");
    // card.setAttribute()

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.appendChild(cardBody);

    // let period = document.getElementById("program");
    // // period.setAttribute("class", "col");
    //
    let periodLabel = document.createElement("label");
    periodLabel.innerText = "Period: ";
    cardBody.appendChild(periodLabel);
    cardBody.appendChild(document.createElement("br"));

    // period.appendChild(periodLabel);

    let periodInput = document.createElement("input");
    periodInput.setAttribute("name", "period");
    periodInput.setAttribute("class", "form-control period");
    periodInput.setAttribute("type", "number");
    periodInput.setAttribute("value", period);
    periodInput.setAttribute('readonly', true);
    cardBody.appendChild(periodInput);

    // period.appendChild(periodInput);
    // period.appendChild(document.createElement("br"));
    //

    let courseNameLabel = document.createElement("label");
    courseNameLabel.innerText = "Course Name: ";
    cardBody.appendChild(courseNameLabel);

    // period.appendChild(courseNameLabel);

    let courseNameInput = document.createElement("input");
    courseNameInput.setAttribute("name", "courseName");
    courseNameInput.setAttribute("type", "text");
    courseNameInput.setAttribute("required", "true");
    // courseNameInput.setAttribute("id", "courseName");
    courseNameInput.setAttribute("class", "form-control courseName");
    cardBody.appendChild(courseNameInput);
    cardBody.appendChild(document.createElement("br"));

    // period.appendChild(courseNameInput);
    // period.appendChild(document.createElement("br"));

    let searchTeacherButton = document.createElement("button");
    searchTeacherButton.setAttribute("name", "searchTeacherButton");
    searchTeacherButton.setAttribute("type", "button");
    searchTeacherButton.setAttribute("class", "btn btn-primary searchTeacherButton");
    // searchTeacherButton.setAttribute("id", "searchTeacherButton");
    searchTeacherButton.innerText = "Search Teacher";
    cardBody.appendChild(searchTeacherButton);
    // cardBody.appendChild(document.createElement("br"));

    let teacherNameLabel = document.createElement("label");
    teacherNameLabel.innerText = "Teacher Name: ";
    cardBody.appendChild(teacherNameLabel);

    // period.appendChild(teacherNameLabel);

    let teacherNameInput = document.createElement("select");
    teacherNameInput.setAttribute("name", "teacherName");
    teacherNameInput.required = true;
    // teacherNameInput.setAttribute("required", "true");
    teacherNameInput.setAttribute("class", "form-control teacherName");
    cardBody.appendChild(teacherNameInput);

    // period.appendChild(teacherNameInput);
    // period.appendChild(document.createElement("br"));
    // period.appendChild(document.createElement("br"));
    //
    // cardBody[0].appendChild(period);
    // return cardBody[0];

    return card;
}

window.onload = function() {

    let year = document.getElementById("year");
    console.log(year)
    year.value = new Date().getFullYear();

    // receiveData();

    // let cardDeck = document.getElementById("card-deck");
    // col.appendChild(cardDeck);

        formTheView(4);
        formTheView(3);

    let submitButton = document.getElementById("addScheduleButton");

    submitButton.onclick = function() {

        let data = prepareTheData();

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/schedule";
        http.open("post", url, true);
        http.setRequestHeader('Content-Type', 'application/json');

        http.send(JSON.stringify(data));

        http.onreadystatechange = () => {

            if(http.readyState === 4 && http.status === 200) {

                if(Number(http.responseText) === 0) {
                    alert("The schedule already exists")
                } else {
                    alert("The schedule is saved successfully")

                }

            }

        }
        return false;

    };

    let courseNameInputs = document.getElementsByClassName("courseName");
    let searchTeacherButtons = document.getElementsByClassName("searchTeacherButton");
    for (let i = 0; i < searchTeacherButtons.length; i++) {

        searchTeacherButtons[i].onclick = function () {
            let singleCourseName = courseNameInputs[i].value;
            if(singleCourseName.trim() === "") {
                alert("Please insert a course name")
            } else {

                console.log(singleCourseName);
                receiveData(singleCourseName, i)
            }
        }

    }
    // searchTeacherButton.onclick = function () {
    //
    //     let courseName = document.getElementById("courseName").value;
    //     receiveData(courseName)
    //
    // }

};

function prepareTheData() {

    let day = document.getElementById("day");
    let section = document.getElementById("section");
    let semester = document.getElementById("semester");
    let grade = document.getElementById("grade");

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
                        course: courses[i].value,
                        teachers: selectedTeachers};

        data.push(singleData)
    }

    return {
        day: day.value,
        section: section.value,
        semester: semester.value,
        grade: grade.value,
        program: data
    };
}
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

function receiveData(courseName, i) {
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/teachers/" + courseName;
    http.open("get", url, true);
    // http.setRequestHeader("Access-Control", "Allow_Origin");
    http.setRequestHeader('Content-Type', 'application/json');
    http.send();

    http.onreadystatechange = function() {
        // console.log("arrived here")
        if(http.readyState === 4 && http.status === 200) {
            let response = http.responseText;
            let teachers = JSON.parse(response);
            if(teachers.length === 0) {
                alert("There is no teacher assigned for that course, make sure you spelled the course name correctly.")
            } else {
                addToDropDown(teachers, i);
                console.log(teachers)
            }
        } else {
            console.log(http.status);
        }
    }
}

function addToDropDown(teachers, index) {

    let teachersDropDown = document.getElementsByClassName("teacherName");

    for (let i = 0; i < teachers.length; i++) {
        let option = document.createElement("option");
        // option.setAttribute("placeholder", "teachers")
        option.text = teachers[i].fname + " " + teachers[i].lname;
        option.value = teachers[i]._id;
        teachersDropDown[index].options.add(option);
        console.log(option.text + " " + option.value)
    }

}