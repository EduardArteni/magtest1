//const welcome_tag = document.getElementById('welcome-tag');
const welcome_tag = document.querySelector('#welcome-tag');
const go_to_products = document.querySelector('#go_to_products')

var loggedInUserUsername = localStorage.getItem("loggedInUserUsername");
welcome_tag.innerHTML = "WELCOME " + loggedInUserUsername + "!";


