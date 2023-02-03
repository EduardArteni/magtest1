const prodEl = document.querySelector("#produse")
const total_price = document.querySelector("#total_price")
const complete_order_button = document.querySelector("#complete_order_button")
var total_price_var = 0;
const clear_cart_button = document.querySelector("#clear_cart_button")




getProducts(localStorage.getItem("loggedInUserUsername"));
displayProduse();



clear_cart_button.addEventListener('click',clearCart)
complete_order_button.addEventListener('click',completeOrder)


function clearCart(){
  fetch(`http://127.0.0.1:8080/cart/clear?user_id=${localStorage.getItem("loggedInUserID")}`, {method: 'DELETE'})
  console.log("cleared cart")
}

function completeOrder(){
  if(total_price_var > 0){
  const produseString = localStorage.getItem("produse_cart");
  var produseObj = JSON.parse(produseString)

  const body = {
    "user_id": localStorage.getItem("loggedInUserID"),
    "total": total_price_var,
    "items": produseObj
  };

  const stringBody = JSON.stringify(body);
  console.log(stringBody);
  fetch('http://127.0.0.1:8080/api/v1/order', {method: 'POST',headers: {'Content-Type': 'application/json',},body: stringBody})
  .then(res => res.json()).then(data => {
    console.log("Done")
    clearCart();
    location.href=`http://127.0.0.1:5500/confirm-order.html?id=${data.id}`;
 });
}
}

function displayProduse(){

const produseString = localStorage.getItem("produse_cart");
var produseObj = JSON.parse(produseString)

produseObj.forEach(produs => {
  productCard(produs)
  total_price_var += produs.total;
  total_price.innerHTML = "TOTAL: " + total_price_var; 
})
localStorage.setItem("produse_cart",null);
}

function productCard(produs) {

  
  const div = document.createElement("div")
  div.setAttribute("id","produsDiv")
  const span = document.createElement("span")
  const a = document.createElement("a")
  const h1 = document.createElement("h1")
  const removeButton = document.createElement("button")
  a.setAttribute("href",`product.html?productID=${produs.product_id}`)

  h1.innerHTML = "product id = " + `${produs.product_id}`
  span.innerHTML = "quantity = " + `${produs.quantity }`
  removeButton.innerHTML = "REMOVE"

  div.append(a)
  a.append(h1)
  div.append(span)
  div.append(removeButton)
  prodEl.append(div)
  
}

function removeProducts(){
  let produsDiv = document.getElementById("produsDiv");
  while (produsDiv != null){
  produsDiv.remove();
  produsDiv = document.getElementById("produsDiv");
  }
}

function getProducts(id) {
fetch(`http://127.0.0.1:8080/cart?username=${id}`, {
        method: 'GET',
    }).then(res => res.json()).then(data => {
       localStorage.setItem("produse_cart", JSON.stringify(data));
    });
}
