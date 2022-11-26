const prodEl = document.querySelector("#search")
const searchbutton = document.getElementById('searchbutton');
const searchbar = document.getElementById('searchbar');


searchbutton.addEventListener('click', test);





function test(){
  getProducts(searchbar.value);
  removeProducts();
  displayProduse();
}

function displayProduse(){

const produseString = localStorage.getItem("produse");
var produseObj = JSON.parse(produseString)
var produseArray = [];


produseObj.forEach(produs => {
  productCard(produs)
})

localStorage.setItem("produse",null);
}

function productCard(produs) {

  
  const div = document.createElement("div")
  div.setAttribute("id","produsDiv")
  const span = document.createElement("span")
  const a = document.createElement("a")
  const h1 = document.createElement("h1")
  a.setAttribute("href",`product.html?productID=${produs.id}`)

  //a.innerText = `${produs.name}`
  h1.innerHTML = `${produs.name}`
  span.innerHTML = `${produs.price}`

  div.append(a)
  a.append(h1)
  div.append(span)
  prodEl.append(div)
  
}

function removeProducts(){
  let produsDiv = document.getElementById("produsDiv");
  while (produsDiv != null){
  produsDiv.remove();
  produsDiv = document.getElementById("produsDiv");
  }
}

function getProducts(name) {
  console.log("luam produsele " + name);

fetch(`http://localhost:8080/product?name=${name}`, {
        method: 'GET',
    }).then(res => res.json()).then(data => {
       localStorage.setItem("produse", JSON.stringify(data));
    });
}
