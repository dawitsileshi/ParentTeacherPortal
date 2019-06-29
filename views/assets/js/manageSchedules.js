let addSchedulesButton = document.getElementById("addSchedules");
let listSchedulesButton = document.getElementById("listSchedules");
let editSchedulesButton = document.getElementById("editSchedules");
let deleteSchedulesButton = document.getElementById("deleteSchedules");

addSchedulesButton.onclick = function () {
    console.log(addSchedulesButton)

    let http = new XMLHttpRequest();

    let url = "http://localhost:3000/schedules";
    http.open("get", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();

    http.onreadystatechange = function() {

        if(http.readyState === 4 && http.status === 200) {

            window.location.href = "http://localhost:3000/schedules";
            // console.log("successful")

        }

    }
    return true;
}