let sectionSelect = document.getElementById("section");
let gradeSelect = document.getElementById("grade");

let quizCheck = document.getElementById("quizCheck");
let midCheck = document.getElementById("midCheck");
let assignmentCheck = document.getElementById("assignmentCheck");
let finalCheck = document.getElementById("finalCheck");

let grade, section;
let searchButton = document.getElementById("searchButton");

let lastCheckedNodeName;

let addButton = document.getElementById("addButton");
let submitButton = document.getElementById("submitButton");

let names = ["quiz", "assignment", "mid", "final"];
console.log(window.location.pathname);
quizCheck.addEventListener("change", function() {

    if(this.checked) {
        lastCheckedNodeName = this.name;
        for (let i = 0; i < names.length; i++) {
            if(names[i] === this.name) {
                switchAbility(false, names[i]);
            } else {
                switchAbility(true, names[i]);

            }
        }
        // switchAbility(true, "assignment");
        // switchAbility(true, "mid");
        // switchAbility(true, "final");
    } else {
        lastCheckedNodeName = null;
        switchAbility(true, "quiz");
    }

});

assignmentCheck.addEventListener("change", function() {

    if(this.checked) {
        lastCheckedNodeName = this.name;
        for (let i = 0; i < names.length; i++) {
            if(names[i] === this.name) {
                switchAbility(false, names[i]);
            } else {
                switchAbility(true, names[i]);

            }
        }
        // switchAbility(false, "assignment");
    } else {
        lastCheckedNodeName = null;
        switchAbility(true, "assignment");
    }

});

midCheck.addEventListener("change", function() {

    if(this.checked) {
        lastCheckedNodeName = this.name;
        for (let i = 0; i < names.length; i++) {
            if(names[i] === this.name) {
                switchAbility(false, names[i]);
            } else {
                switchAbility(true, names[i]);

            }
        }
        // switchAbility(false, "mid");
    } else {
        lastCheckedNodeName = null;
        switchAbility(true, "mid");
    }

});

finalCheck.addEventListener("change", function() {

    if(this.checked) {
        for (let i = 0; i < names.length; i++) {
            if(names[i] === this.name) {
                switchAbility(false, names[i]);
            } else {
                switchAbility(true, names[i]);

            }
        }
        // switchAbility(false, "final");
    } else {
        switchAbility(true, "final");
    }

});
function switchAbility(able, name) {

    let input = document.getElementsByClassName(name);
    console.log(input);

    for (let i = 0; i < input.length; i++) {

        if(able) {

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
    let data = {
        grade: grade,
        section: section
    };
    http.send(JSON.stringify(data));

    http.onreadystatechange = function () {

        if((http.readyState === 4) && (http.status === 200)) {

            console.log("Teh data sent", http.responseText)
            parseIt(http.responseText)

        }

    }

};

function parseIt(jsonData) {
    let data = JSON.parse(jsonData, (key, value) => {
        return value;
    });

    let tbody = document.getElementById("tableBody");
    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = i + 1;

        let nameTd = document.createElement("td");
        nameTd.innerText = data[i].fname + " " + data[i].lname;
        nameTd.setAttribute("name", data[i]._id);
        tr.appendChild(th);
        tr.appendChild(nameTd);
        let quizTd = document.createElement("td");
        let midTd = document.createElement("td");
        let assignmentTd = document.createElement("td");
        let finalTd = document.createElement("td");
        let totalTd = document.createElement("td");
        quizTd.appendChild(markColumns(10, "quiz", true, "quizInput"));
        midTd.appendChild(markColumns(25, "mid", true, "midInput"));
        assignmentTd.appendChild(markColumns(15, "assignment", true, "assignmentInput"));
        finalTd.appendChild(markColumns(50, "final", true, "finalInput"));
        totalTd.appendChild(markColumns(100, "total", true, "totalInput"));
        tr.appendChild(quizTd);
        tr.appendChild(midTd);
        tr.appendChild(assignmentTd);
        tr.appendChild(finalTd);
        tr.appendChild(totalTd);
        tbody.appendChild(tr)
    }
    // tbody.removeChild()
    // createTable(data);
    console.log("The length", data.length)
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

addButton.onclick = () => {

    let total = 0;
    if(lastCheckedNodeName !== null) {

        let inputs = document.getElementsByClassName(lastCheckedNodeName);

        for (let i = 0; i < inputs.length; i++) {

            let input = inputs[i].value.trim();

            if(input.length === 0) {

                alert("Please, fill all the data")

            } else {

                total = total + input;

            }

        }
    } else {
        alert("There is nothing checked")
    }

}
