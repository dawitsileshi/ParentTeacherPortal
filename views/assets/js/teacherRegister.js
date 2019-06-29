
let fname = document.getElementById("fname");
let lname =  document.getElementById("lname");
let uname =  document.getElementById("uname");
let password = document.getElementById("password");
let email = document.getElementById("email");

let button = document.getElementById("submit");

// button.onclick = function () {

//     if(uname.value.substring(0, 4) === "tea/") {
//         // console.log("correct user name")

//         let data = {fname: fname.value,
//             lname: lname.value,
//             uname: uname.value,
//             email: email.value,
//             password: password.value};

//         let http = new XMLHttpRequest();
//         let url = "http://localhost:3000/api/teacher";
//         http.open("post", url, true);
//         http.setRequestHeader('Content-Type', 'application/json');

//         http.send(JSON.stringify(data));

//         return true;
//     } else {
//         alert("Incorrect user name")
//         // console.log("incorrect user name")
//     }
//     };


