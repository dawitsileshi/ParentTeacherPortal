let searchButton = document.getElementById("searchScheduleId");

let sectionInputId = document.getElementById("sectionInputId");
let gradeInputId = document.getElementById("gradeInputId");

searchButton.onclick = function () {

    console.log("clicked");
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/students/secgrade";
    http.open("post", url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.send(JSON.stringify({
        section: sectionInputId.value,
        grade: gradeInputId.value
    }));

    http.onreadystatechange = () => {

        if(http.readyState === 4 && http.status === 200) {

            createCards(http.responseText);

        }

    }
};

function createCards(response) {

    let parsedResponse = JSON.parse(response, (key, value) => {
        return value;
    })

    let cardRow = document.getElementById("cardRow");

    for (let i = 0; i < parsedResponse.length; i++) {

        let singleResponse = parsedResponse[i];

        let col = document.createElement("div");
        col.setAttribute("class", "col cardCol mb-4");

        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 18rem;");

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title text-center");
        h5.innerText = "Name: " + singleResponse.fname + " " + singleResponse.lname;

        let gradeGenderP = document.createElement("p");
        gradeGenderP.setAttribute("class", "card-text text-center");
        gradeGenderP.innerText = "Year: " + singleResponse.grade + "   |   " + "Gender: " + singleResponse.gender;

        let buttonsRow = document.createElement("div");
        buttonsRow.setAttribute("class", "row");

        let editButtonCol = document.createElement("div");
        editButtonCol.setAttribute("class", "col");
        let editButton = document.createElement("a");
        editButton.setAttribute("class", "btn btn-primary mb-4");
        editButton.innerText = "Edit";
        editButton.setAttribute("href", "#");

        let deleteButtonCol = document.createElement("div");
        deleteButtonCol.setAttribute("class", "col");

        let deleteButton = document.createElement("a");
        deleteButton.setAttribute("class", "btn btn-primary");
        deleteButton.setAttribute("href", "#");
        deleteButton.innerText = "Delete";

        editButtonCol.appendChild(editButton);
        deleteButtonCol.appendChild(deleteButton);

        cardBody.appendChild(h5);
        cardBody.appendChild(gradeGenderP);
        cardBody.appendChild(editButtonCol);
        cardBody.appendChild(deleteButtonCol);

        card.appendChild(cardBody);

        col.appendChild(card);

        cardRow.appendChild(col);
    }

}