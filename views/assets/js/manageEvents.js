// let addYearButtonId = document.getElementById("addYearButtonId");

let tmp = new Date(Date.now());

// tmp now like: "2018-08-21T11:54:50.580Z"

let dateInputFormatted = tmp.toISOString().split('T')[0];

let todayInput = document.getElementById("todayInputId");
let whenInput = document.getElementById("whenInputId");
let titleInput = document.getElementById("titleInputId");
let descriptionInput = document.getElementById("descriptionInputId");
let submitEventButtonId = document.getElementById("submitEventButtonId");

todayInput.value = dateInputFormatted;

submitEventButtonId.onclick = () => {

    submitData();

    return false;

}

// addYearButtonId.onclick = () => {
//
//     console.log("clicked")
//     addView();
//
// };

function addView() {

    let buttonRowId = document.getElementById("buttonRowId");
    let eventSectionId = document.getElementById("eventSectionId");

    let row = document.createElement("div");
    row.setAttribute("class", "row text-center");

    let gradeCol = document.createElement("div");
    gradeCol.setAttribute("class", "col");

    let sectionCol = document.createElement("div");
    sectionCol.setAttribute("class", "col");

    let gradeLabel = document.createElement("label");
    gradeLabel.innerText = "Year:";

    let sectionLabel = document.createElement("label");
    sectionLabel.innerText = "Section:";

    let gradeInput = document.createElement("input");
    gradeInput.setAttribute("class", "form-control");
    gradeInput.setAttribute("type", "number");
    gradeInput.setAttribute("name", "grade");
    gradeInput.max = 12;
    gradeInput.min = 1;

    // let sectionSelect = document.createElement("select");
    // sectionSelect.setAttribute("name", "section");
    // sectionSelect.setAttribute("class", "form-control");
    // sectionSelect.multiple = true;

    let sections = ["A", "B", "C", "D"];

    let sectionRow = document.createElement("div");
    sectionRow.setAttribute("class", "row");

    for (let i = 0; i < 4; i++) {
        let sectionCol = document.createElement("label");
        sectionCol.setAttribute("class", "col");
        sectionCol.innerText = sections[i];

        let sectionInput = document.createElement("input");
        sectionInput.setAttribute("type", "checkbox");
        sectionInput.setAttribute("name", "section");
        sectionInput.setAttribute("value", sections[i]);

        sectionCol.appendChild(sectionInput);

        sectionRow.appendChild(sectionCol);
    }
    // for (let i = 0; i < sections.length; i++) {
    //     let sectionOption = document.createElement("option");
    //     sectionOption.text = sections[i];
    //     sectionOption.value = sections[i];
    //     sectionSelect.options.add(sectionOption);
    //
    // }
    // let sectionOption = document
    gradeLabel.appendChild(gradeInput);
    gradeCol.appendChild(gradeLabel);

    sectionLabel.appendChild(sectionRow);
    sectionCol.appendChild(sectionLabel);

    row.appendChild(gradeCol);
    row.appendChild(sectionCol);

    eventSectionId.insertBefore(row, buttonRowId)

}

function submitData() {

    let gradeInput = document.getElementsByName("grade");
    // let sectionSelect = document.getElementsByName("section");
    let sectionInputs = document.getElementsByName("section");
    let todayInput = document.getElementById("todayInputId");
    let whenInput = document.getElementById("whenInputId");
    let titleInput = document.getElementById("titleInputId");
    let descriptionInput = document.getElementById("descriptionInputId");

    let destination = [];

    console.log(gradeInput);
    console.log(sectionInputs);


    // submitEventButtonId.onclick = () => {
        for (let i = 0; i < gradeInput.length; i++) {
            let grade = gradeInput[i].value;
            // console.log(grade);
            // let sections = sectionSelect[i].options;
            for (let j = 0; j < sectionInputs.length; j++) {
                    console.log(sectionInputs[j])
                if(sectionInputs[j].checked) {
                    destination.push({grade: grade,
                                section: sectionInputs[j].value})
                }
            }
            // for (let j = 0; j < sections.length; j++) {
            //     if(sections[j].selected) {
            //         data.push({grade: grade,
            //                     section: sections[j].text})
            //     }
            // }
        }
        console.log(data);
        // return false
    // }

    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/event";
    http.open("post", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(data));
}