let searchStudentButton = document.getElementById("searchStudent");
let studentIdInput = document.getElementById("studentId");

let warningDivId = document.getElementById("warningDivId");

let addStudentButton = document.getElementById("addStudent");

addStudentButton.onclick = () => {

    window.location.href = "http://localhost:3000/api/addStudents";

};

searchStudentButton.onclick = () => {

    if(studentIdInput.value.trim().length === 0) {
        alert("Please insert the student Id")
    } else {

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/student/id/";

        http.open("post", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({id: studentIdInput.value.trim()}));

        http.onreadystatechange = () => {

            if(http.readyState === 4 && http.status === 200) {
                if(http.responseText == null) {
                    warningDivId.innerText = "Sorry, there is no student with that id";
                } else if(http.responseText !== null){

                    let cardRow = document.getElementById("cardRow");
                    let singleResponse = JSON.parse(http.responseText, (key, value) => {
                        return value;
                    });
                    let col = document.createElement("div");
                    col.setAttribute("class", "col cardCol mb-4");

                    let card = document.createElement("div");
                    card.setAttribute("class", "card bg-light");
                    card.setAttribute("style", "width: 18rem;");

                    let cardHeader = document.createElement("div");
                    cardHeader.setAttribute("class", "card-header");
                    cardHeader.innerText = "Student Information";

                    let cardBody = document.createElement("div");
                    cardBody.setAttribute("class", "card-body");

                    let id = document.createElement("h5");
                    id.setAttribute("class", "card-title text-center");
                    id.innerText = "ID: " + singleResponse.idNumber;

                    let name = document.createElement("h5");
                    name.setAttribute("class", "card-title text-center");
                    name.innerText = "Name: " + singleResponse.fname + " " + singleResponse.lname;

                    let gradeGenderP = document.createElement("p");
                    gradeGenderP.setAttribute("class", "card-text text-center");
                    gradeGenderP.innerText = "Grade: " + singleResponse.grade + "   |   " + "Gender: " + singleResponse.gender;

                    let ageInSchool = document.createElement("h6");
                    ageInSchool.setAttribute("class", "card-text text-center");
                    ageInSchool.innerText = "Age: " + singleResponse.age + " | InSchool: " + singleResponse.inSchool;

                    let buttonsRow = document.createElement("div");
                    buttonsRow.setAttribute("class", "row");

                    let editButtonCol = document.createElement("div");
                    editButtonCol.setAttribute("class", "col");
                    let editButton = document.createElement("a");
                    editButton.setAttribute("id", "editButtonId");
                    editButton.setAttribute("class", "btn btn-secondary mb-4");
                    editButton.innerText = "Edit";
                    editButton.setAttribute("href", "/api/singleStudent");

                    let deleteButtonCol = document.createElement("div");
                    deleteButtonCol.setAttribute("class", "col");

                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("class", "btn btn-secondary");
                    deleteButton.setAttribute("href", "/api/student");
                    deleteButton.setAttribute("id", "deleteButtonId");
                    deleteButton.innerText = "Delete";

                    editButtonCol.appendChild(editButton);
                    deleteButtonCol.appendChild(deleteButton);

                    cardBody.appendChild(id);
                    cardBody.appendChild(name);
                    cardBody.appendChild(gradeGenderP);
                    cardBody.appendChild(ageInSchool);
                    cardBody.appendChild(editButtonCol);
                    cardBody.appendChild(deleteButtonCol);

                    card.appendChild(cardHeader);
                    card.appendChild(cardBody);

                    col.appendChild(card);

                    cardRow.appendChild(col);
                    registerEvents(singleResponse._id);
                    // createCard(http.responseText)
                }

            }

        }
    }
};

function registerEvents(id) {

    let editButton = document.getElementById("editButtonId");
    let deleteButton = document.getElementById("deleteButtonId");

    editButton.onclick = () => {

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/singleStudent";
        http.open("post", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        console.log(id)
        // http.send(JSON.stringify({id: id}));
        window.location.href = "http://localhost:3000/api/singleStudent/" + id;
        return false;
    };

    deleteButton.onclick = () => {

        let retValue = confirm("Are you sure you want to delete the student?");
        if(retValue) {

            let http = new XMLHttpRequest();
            let url = "http://localhost:3000/api/student";
            http.open("delete", url, true);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify({id: id}));

            http.onreadystatechange = () => {



            }
        } else {
            alert("Deletion Dismissed")
        }

        return false;

    }

}