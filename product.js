const ceva = document.getElementById('produse');
let params = new URLSearchParams(location.search);

var product_id = params.get('productID');
var product_name;
var product_description;
var product_SKU;
var product_category;
var product_price;
var product_created_at;

fetch(`http://localhost:8080/productDetails?id=${product_id}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            localStorage.setItem("product", JSON.stringify(data));
        });
        var produseObj = JSON.parse(localStorage.getItem("product"));
        product_name = produseObj.name;
        product_description = produseObj.description;
        product_SKU = produseObj.SKU;
        product_category = produseObj.category;
        product_price = produseObj.price;
        product_created_at = produseObj.created_at;