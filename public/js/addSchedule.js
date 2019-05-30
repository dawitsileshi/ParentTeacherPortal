function createViews(i) {

    // let teacher = <%-teacher[0].name %>;
    // console.log("teacher");
    // let card = document.getElementsByClassName("card");
    // console.log(<%- teacher[0].name %>);

    // let cardDeck = document.createElement("div");
    // cardDeck.setAttribute("class", "card-deck");
    let card = document.createElement("div");
    card.setAttribute("class", "card border-dark mb-3");
    card.setAttribute("style", "width: 18rem");
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
    periodInput.setAttribute("class", "form-control-md");
    periodInput.setAttribute("type", "number");
    periodInput.setAttribute("value", i+1);
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
    courseNameInput.setAttribute("class", "form-control-md");
    cardBody.appendChild(courseNameInput);

    // period.appendChild(courseNameInput);
    // period.appendChild(document.createElement("br"));

    let teacherNameLabel = document.createElement("label");
    teacherNameLabel.innerText = "Teacher Name: ";
    cardBody.appendChild(teacherNameLabel);

    // period.appendChild(teacherNameLabel);

    let teacherNameInput = document.createElement("input");
    teacherNameInput.setAttribute("name", "teacherName");
    teacherNameInput.setAttribute("type", "text");
    teacherNameInput.setAttribute("class", "form-control-md");
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

    // // console.log(document.getElementsByTagName("input")[0].nodeType)
    // let card = document.getElementsByClassName("card");
    // let program = document.getElementById("programs");
    let cardDeck = document.getElementById("card-deck");
    // period.innerText = "Hey";
    // console.log(period);
    for (let i = 0; i < 7; i++) {
        // card[i].appendChild(createViews(i));
        // program.appendChild(createViews(i));
        cardDeck.appendChild(createViews(i))
        // program.appendChild(document.createElement("br"));

    }

};