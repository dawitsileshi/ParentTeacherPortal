let searchStudentButton = document.getElementById("searchStudent");
let studentIdInput = document.getElementById("studentId");

let warningDivId = document.getElementById("warningDivId");


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

                    let h5 = document.createElement("h5");
                    h5.setAttribute("class", "card-title text-center");
                    h5.innerText = "Name: " + singleResponse.fname + " " + singleResponse.lname;

                    let gradeGenderP = document.createElement("p");
                    gradeGenderP.setAttribute("class", "card-text text-center");
                    gradeGenderP.innerText = "Grade: " + singleResponse.grade + "   |   " + "Gender: " + singleResponse.gender;

                    let buttonsRow = document.createElement("div");
                    buttonsRow.setAttribute("class", "row");

                    let editButtonCol = document.createElement("div");
                    editButtonCol.setAttribute("class", "col");
                    let editButton = document.createElement("a");
                    editButton.setAttribute("class", "btn btn-secondary mb-4");
                    editButton.innerText = "Edit";
                    editButton.setAttribute("href", "#");

                    let deleteButtonCol = document.createElement("div");
                    deleteButtonCol.setAttribute("class", "col");

                    let deleteButton = document.createElement("a");
                    deleteButton.setAttribute("class", "btn btn-secondary");
                    deleteButton.setAttribute("href", "#");
                    deleteButton.innerText = "Delete";

                    editButtonCol.appendChild(editButton);
                    deleteButtonCol.appendChild(deleteButton);

                    cardBody.appendChild(h5);
                    cardBody.appendChild(gradeGenderP);
                    cardBody.appendChild(editButtonCol);
                    cardBody.appendChild(deleteButtonCol);

                    card.appendChild(cardHeader);
                    card.appendChild(cardBody);

                    col.appendChild(card);

                    cardRow.appendChild(col);
                    // createCard(http.responseText)
                }

            }

        }
    }
};

function createCard(responseText) {



}

