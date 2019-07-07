let todayId = document.getElementById("todayId");

let today = new Date();
let tmp = new Date(Date.now());

// tmp now like: "2018-08-21T11:54:50.580Z"

let dateInputFormatted = tmp.toISOString().split('T')[0];

// 0, as split produces: ["2018-08-21", "11:54:50.580Z"]
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDay();

// todayId.value = year + "-" + month + "-" + day;
todayId.value = dateInputFormatted;
console.log(dateInputFormatted)
