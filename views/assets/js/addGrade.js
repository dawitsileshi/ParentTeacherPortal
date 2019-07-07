// let sectionSelect = document.getElementById("section");
// let gradeSelect = document.getElementById("grade");
//
// let quizCheck = document.getElementById("quizCheck");
// let midCheck = document.getElementById("midCheck");
// let assignmentCheck = document.getElementById("assignmentCheck");
// let finalCheck = document.getElementById("finalCheck");
//
// let classCheck = document.getElementById("classWorkCheck");
// let homeCheck = document.getElementById("homeWorkCheck");
// let groupCheck = document.getElementById("groupWorkCheck");
// let individualCheck = document.getElementById("individualCheck");
// let quiz1Check = document.getElementById("quiz1Check");
// let quiz2Check = document.getElementById("quiz2Check");
// let quiz3Check = document.getElementById("quiz3Check");
// let grade, section;
// let searchButton = document.getElementById("searchButton");
//
let lastCheckedNodeName = null;
let lastCheckedNodeID;
let selectedAssessment;
let selectedIndex;

let section;
let grade;
let assessmentInfo = [{name: "class work", max: "5"},
                    {name: "home work", max: "5"},
                    {name: "group work", max: "10"},
                    {name: "individual", max: "10"},
                    {name: "quiz1", max: "10"},
                    {name: "quiz2", max: "10"},
                    {name: "quiz3", max: "10"},
                    {name: "final", max: "40"}];


// let addButton = document.getElementById("addButton");

let names = ["classWork", "homeWork", "groupWork", "individual", "quiz1", "quiz2", "quiz3", "final"];
let ids = ["classWorkCheck", "homeWorkCheck", "groupWorkCheck", "individualCheck", "quiz1Check", "quiz2Check", "quiz3Check", "finalCheck"];
console.log(window.location.pathname);

// classCheck.addEventListener("change", function() {
//
//     // console.log("class work checked")
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "classWork");
//     }
//
// });

// homeCheck.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "homeWork");
//     }
//
//
// });

// groupCheck.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "groupWork");
//     }
//
// });

// individualCheck.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "individual");
//     }
//
//
// });

// quiz1Check.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "quiz1");
//     }
//
//
// });

// quiz2Check.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "quiz2");
//     }
//
//
// });

// quiz3Check.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "quiz3");
//     }
//
//
// });

// finalCheck.addEventListener("change", function() {
//
//     if(this.checked) {
//         lastCheckedNodeName = this.name;
//         for (let i = 0; i < names.length; i++) {
//             if(names[i] === this.name) {
//                 switchAbility(false, names[i]);
//             } else {
//                 switchAbility(true, names[i]);
//
//             }
//         }
//         lastCheckedNodeID = this.id
//         // switchAbility(false, "final");
//     } else {
//         switchAbility(true, "final");
//     }
//
// });

function switchAbility(able, name) {

    console.log("the name", name)
    let input = document.getElementsByClassName(name);
    console.log("The node with that name", input);

    for (let i = 0; i < input.length; i++) {

        if(able) {

            // let node = document.getElementById(lastCheckedNodeID);
            // node.checked = false;
            input[i].disabled = true
            // input[i].setAttribute("disabled", true);
        } else {
            input[i].disabled = false
            // input[i].setAttribute("enabled", true);

        }

    }

}

searchButton.onclick = function () {

    console.log("clicked");
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/students/secgrade";
    http.open("post", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    //

    let sectionInput = document.getElementById("section");
    let gradeInput = document.getElementById("grade");
    let grade = gradeInput.value.trim();
    let section= sectionInput.value.trim();
    let assessmentSelect = document.getElementById("assessment");
    let assessmentOptions = assessmentSelect.getElementsByTagName("option");
    console.log("The options are", assessmentOptions)
    for (let i = 0; i < assessmentOptions.length; i++) {
        if(assessmentOptions[i].selected) {
            selectedAssessment = assessmentOptions[i].text;
            selectedIndex = i;
        }
    }

    console.log("the selected assessment", selectedAssessment)
    let currentUrl = window.location.pathname.split("/");
    console.log(currentUrl)
    let teacherId = currentUrl[currentUrl.length - 1];

    if(grade.length === 0 || section.length === 0) {
        alert("Please fill all the data");
    } else {
        let data = {
            teacherId: teacherId,
            grade: grade,
            section: section
        };
        http.send(JSON.stringify(data));

        http.onreadystatechange = function () {

            if ((http.readyState === 4) && (http.status === 200)) {

                let response = http.responseText;
                console.log(typeof response);
                if (response.length === 1 && Number(response) === 1) {
                    alert("Sorry, there are no students available")
                } else if (response.length === 1 && Number(response) === 2) {
                    alert("Sorry, this is not the right schedule")
                } else if (response.length === 1 && Number(response) === 3) {
                    alert("Sorry, there is no such schedule in the data store")
                } else {
                    parseIt(http.responseText)
                }
                // console.log("Teh data sent", http.responseText)
                // parseIt(http.responseText)

            }

        }

    }
};

function parseIt(jsonData) {
    let data = JSON.parse(jsonData, (key, value) => {
        return value;
    });

    let assessmentTitle = document.getElementById("assessmentTitle");
    assessmentTitle.innerText = selectedAssessment;
    let tbody = document.getElementById("tableBody");
    let child = tbody.lastElementChild;
    console.log(child)
    while(child) {
        tbody.removeChild(child)
        child = tbody.lastElementChild;
    }
    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = i + 1;

        let nameTd = document.createElement("td");
        nameTd.innerText = data[i].fname + " " + data[i].lname;
        nameTd.setAttribute("id", data[i]._id);
        nameTd.setAttribute("class", "student");

        let assessmentTd = document.createElement("td");
        let max = assessmentInfo[selectedIndex].max;

        assessmentTd.appendChild(markColumns(max, "assessment", false, "assessmentValue"));

        tr.appendChild(th);
        tr.appendChild(nameTd);

        tr.appendChild(assessmentTd)
        // let classTd = document.createElement("td");
        // let homeTd = document.createElement("td");
        // let groupTd= document.createElement("td");
        // let individualTd = document.createElement("td");
        // let quiz1Td = document.createElement("td");
        // let quiz2Td = document.createElement("td");
        // let quiz3Td = document.createElement("td");
        // let scoreTd = document.createElement("td");
        // let finalTd = document.createElement("td");
        // let totalTd = document.createElement("td");
        //
        // classTd.appendChild(markColumns(5, "classWork", true, "classWork"));
        // homeTd.appendChild(markColumns(5, "homeWork", true, "homeWork"));
        // groupTd.appendChild(markColumns(10, "groupWork", true, "groupWork"));
        // individualTd.appendChild(markColumns(10, "individual", true, "individual"));
        // quiz1Td.appendChild(markColumns(10, "quiz1", true, "quiz1"));
        // quiz2Td.appendChild(markColumns(10, "quiz2", true, "quiz2"));
        // quiz3Td.appendChild(markColumns(10, "quiz3", true, "quiz3"));
        // finalTd.appendChild(markColumns(40, "final", true, "final"));
        // scoreTd.appendChild(markColumns(0, "score", true, "score"));
        // totalTd.appendChild(markColumns(100, "total", true, "total"));
        //
        // tr.appendChild(classTd);
        // tr.appendChild(homeTd);
        // tr.appendChild(groupTd);
        // tr.appendChild(individualTd);
        // tr.appendChild(quiz1Td);
        // tr.appendChild(quiz2Td);
        // tr.appendChild(quiz3Td);
        // tr.appendChild(finalTd);
        // tr.appendChild(scoreTd);
        // tr.appendChild(totalTd);
        //
        tbody.appendChild(tr)

        registerEvents();
    }
    // let classButtonTd = document.createElement("td");
    // let homeButtonTd = document.createElement("td");
    // let groupButtonTd = document.createElement("td");
    // let individualButtonTd = document.createElement("td");
    // let quiz1ButtonTd = document.createElement("td");
    // let quiz2ButtonTd = document.createElement("td");
    // let quiz3ButtonTd = document.createElement("td");
    // let finalButtonTd = document.createElement("td");
    //
    // classButtonTd.appendChild(makeButtons("classInsertButtonId"));
    // homeButtonTd.appendChild(makeButtons("homeInsertButtonId"));
    // groupButtonTd.appendChild(makeButtons("groupInsertButtonId"));
    // individualButtonTd.appendChild(makeButtons("individualInsertButtonId"));
    // quiz1ButtonTd.appendChild(makeButtons("quiz1InsertButtonId"));
    // quiz2ButtonTd.appendChild(makeButtons("quiz2InsertButtonId"));
    // quiz3ButtonTd.appendChild(makeButtons("quiz3InsertButtonId"));
    // finalButtonTd.appendChild(makeButtons("finalInsertButtonId"));
    //
    // let tr = document.createElement("tr");
    // tr.appendChild(document.createElement("td"))
    // tr.appendChild(document.createElement("td"))
    // tr.appendChild(classButtonTd);
    // tr.appendChild(homeButtonTd);
    // tr.appendChild(groupButtonTd);
    // tr.appendChild(individualButtonTd);
    // tr.appendChild(quiz1ButtonTd);
    // tr.appendChild(quiz2ButtonTd);
    // tr.appendChild(quiz3ButtonTd);
    // tr.appendChild(finalButtonTd);
    //
    // console.log("The table body is", tbody)
    // tbody.appendChild(tr)
    // tbody.removeChild()
    // createTable(data);
    // console.log("The length", data.length)
}

function checkExceededValue(results, selectedMax) {
    let exceeded = false;
    for (let i = 0; i < results.length; i++) {
        if(Number(results[i].value) > Number(selectedMax)) {
            exceeded = true;
            break
        }
    }
    return exceeded;
}

function registerEvents() {

    let submitButton = document.getElementById("submitButton");

    submitButton.onclick = () => {

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/grade";
        http.open("post", url, true);
        http.setRequestHeader("Content-Type", "application/json");

        let results = document.getElementsByName("assessmentValue");
        let selectedMax = assessmentInfo[selectedIndex].max;

        if(checkExceededValue(results, selectedMax)){
            alert("Values must not exceed " + selectedMax);
        } else {
            http.send(JSON.stringify(organizeTheData(results, selectedMax)))
        }

        // http.send(JSON.stringify(organizeTheData()));

        http.onreadystatechange = () => {

            if(http.readyState === 4 && http.status === 200) {

                alert(http.responseText)

            }

        }

    }

}

function organizeTheData(results, selectedMax) {

    let students = document.getElementsByClassName("student");

    let gradeInput = document.getElementById("grade");
    let courseInput = document.getElementById("courseInput");
    let sectionInput = document.getElementById("section");
    let studentsArray = [];

    // let assessmentResults = document.getElementsByName("assessmentValue");
    // let selectedMax = assessmentInfo[selectedIndex].max;
    // let results = document.getElementsByName("assessmentValue");

    // for (let i = 0; i < assessmentResults.length; i++) {
    //     if(Number(results[i].value) > Number(selectedMax)) {
    //         alert("Values must not exceed " + selectedMax);
    //         break
    //     }
    // }

        for (let i = 0; i < students.length; i++) {
            studentsArray.push({
                // assessment: selectedAssessment
                student: students[i].id,
                                // assessment: selectedAssessment,
                result: results[i].value,
                max: selectedMax
            })

        }


        let data = {grade: gradeInput.value,
            course: courseInput.value,
            section: sectionInput.value,
            assessment: selectedAssessment,
            students: studentsArray};

        return data;


    // console.log("The students", studentsArray)

}
function makeButtons(id) {

    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", id);
    button.innerText = "Insert"

    return button;

}
function markColumns(max, className, disabled, name) {

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("max", max);
    input.setAttribute("min", 0);
    input.setAttribute("class", className);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", max);
    if(disabled) {
        input.setAttribute("disabled", disabled);
    }
    // input.setAttribute("required", true);
    input.required = true;
    return input;
// <input type="number" placeholder="15" name="quizInput" max="15" min="0">

}

// addButton.onclick = () => {
//
//     let total = 0;
//     if(lastCheckedNodeName !== null) {
//
//         let inputs = document.getElementsByClassName(lastCheckedNodeName);
//
//         for (let i = 0; i < inputs.length; i++) {
//
//             let input = inputs[i].value.trim();
//
//             if(input.length === 0) {
//
//                 alert("Please, fill all the data")
//                 break
//
//             } else {
//
//                 total = total + Number(input);
//
//             }
//
//         }
//     } else {
//         alert("There is nothing checked")
//     }
//
//     console.log(total)
//
// }
