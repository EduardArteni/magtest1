const paybutton = document.querySelector("#paybutton")
let params = new URLSearchParams(location.search);
var id = params.get('id');

paybutton.addEventListener('click',pay)

fetch(`http://127.0.0.1:8080/api/v1/order/status/${id}`, {method: 'GET'})
  .then(res => res.json()).then(data => {
    if(data == "CREATED"){
      
    }
  });



function pay(){
  console.log(`http://127.0.0.1:8080/api/v1/order/pay/${id}`);
  fetch(`http://127.0.0.1:8080/api/v1/order/pay/${id}`, {method: 'PUT'})
  .then(res => res.json()).then(data => {
    console.log(data);
    if(data == true){
      console.log("GOOD");
      location.href = "http://127.0.0.1:5500/thankyou.html";
    }else{
      console.log("BAD");
    }
 });
}
