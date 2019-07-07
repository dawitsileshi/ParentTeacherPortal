let homeId = document.getElementById("homeId");
let contactUsId= document.getElementById("contactUsId");
let aboutUsId = document.getElementById("aboutUsId");

homeId.onclick = () => {

    window.location.href = "http://localhost:3000/api/home";
    return false;


};

aboutUsId.onclick = () => {

    window.location.href = "http://localhost:3000/api/aboutUs";
    return false;

};

contactUsId.onclick = () => {

    window.location.href = "http://localhost:3000/api/contactUs";
    return false;

};