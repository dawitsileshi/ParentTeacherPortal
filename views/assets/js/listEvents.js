let addEventButton = document.getElementById("addEventButtonId");
let editEventButton = document.getElementsByName("editEventButton");
let deleteEventButton = document.getElementsByClassName("deleteEventButton");

let cardRow = document.getElementById("cardRow");
let cardCol = document.getElementsByClassName("cardCol");

registerEvents();

function registerEvents() {

    for (let i = 0; i < deleteEventButton.length; i++) {

        editEventButton[i].onclick = () => {

            // console.log("cliceked")
            editEvent(deleteEventButton[i].name);


        };

        deleteEventButton[i].onclick = () => {

            deleteEvent(deleteEventButton[i].name, i);
            // console.log(deleteEventButton[i].name)

        };

    }

}
addEventButton.onclick = () => {

    console.log("clicked")
    window.location.href = "http://localhost:3000/api/addEvents";

};

function deleteEvent(eventId, index) {

    let deleteVal = confirm("Are you sure you want to delete this event?");

    if(deleteVal) {

        let http = new XMLHttpRequest();
        let url = "http://localhost:3000/api/event/" + eventId;
        http.open("delete", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send();

        http.onreadystatechange = () => {

            if(http.readyState === 4 && http.status === 200) {

                cardRow.removeChild(cardCol[index])
                alert("Successfully deleted");
                cardCol = document.getElementsByClassName("cardCol");
                cardRow = document.getElementById("cardRow");
                editEventButton = document.getElementsByName("editEventButton");
                deleteEventButton = document.getElementsByClassName("deleteEventButton");
            }

        }

    }

}

function editEvent(eventId) {

    // let http = new XMLHttpRequest();
    let url = "http://localhost:3000/api/editEvent/" + eventId;
    window.location.href = url;
    // http.open("get", url, true);
    // http.send();

}
// deleteEventButton.onclick = () => {
//
//     let eventId = deleteEventButton.name;
//     console.log(eventId);
//
//     let deleteVal = confirm("Are you sure to delete this event?");
//
//     if(deleteVal) {
//
//         let http = new XMLHttpRequest();
//         let url = "http://localhost:3000/api/event" + eventId;
//
//     } else {
//
//     }
//
// }