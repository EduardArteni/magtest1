const nume_produs = document.getElementById('nume_produs');
const pret_produs = document.getElementById('pret_produs');
const descriere_produs = document.getElementById('descriere_produs');
const add_to_cart_button = document.getElementById('add_to_cart_button');

let params = new URLSearchParams(location.search);

var product_id = params.get('productID');
var product_name;
var product_description;
var product_SKU;
var product_category;
var product_price;
var product_created_at;

add_to_cart_button.addEventListener('click', add_to_cart);

fetch(`http://localhost:8080/productDetails?id=${product_id}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            product_name = data.name;
            product_description = data.description;
            product_SKU = data.SKU;
            product_category = data.category;
            product_price = data.price;
            product_created_at = data.created_at;


            nume_produs.innerHTML = product_name;
            pret_produs.innerHTML = product_price;
            descriere_produs.innerHTML = product_description;
        });
function add_to_cart(){
    fetch(`http://127.0.0.1:8080/cart?username=${localStorage.getItem("loggedInUserUsername")}&product_id=${product_id}&quantity=1`, {
            method: 'POST',
        });
    console.log("Added to cart?");
}

