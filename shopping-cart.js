const prodEl = document.querySelector("#produse")
const total_price = document.querySelector("#total_price")
const complete_order_button = document.querySelector("#complete_order_button")
var total_price_var = 0;




getProducts(localStorage.getItem("loggedInUserUsername"));
displayProduse();

function displayProduse(){

const produseString = localStorage.getItem("produse_cart");
var produseObj = JSON.parse(produseString)
var produseArray = [];

function completeOrder(){
  console.log(`INSERT INTO public.order_details(user_id, total) VALUES (${localStorage.getItem("loggedInUserID")}, ${total_price_var});`);
  let order_id = 1;
  produseObj.forEach(produs => {
    console.log(`INSERT INTO public.order_items(...) VALUES (${order_id}, ${produs.product_id}, ${produs.quantity});`);
  })
}

complete_order_button.addEventListener('click',completeOrder)


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
  console.log("luam produsele " + id);

fetch(`http://127.0.0.1:8080/cart?username=${id}`, {
        method: 'GET',
    }).then(res => res.json()).then(data => {
       localStorage.setItem("produse_cart", JSON.stringify(data));
    });
}
