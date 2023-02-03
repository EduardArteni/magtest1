const table = document.getElementById("table");
let params = new URLSearchParams(location.search);
var id = params.get('id');



function clickedBuy(){
    location.href = `http://127.0.0.1:5500/payment-page.html?id=${id}`;
}

function clickedCancel(){
    console.log(`http://127.0.0.1:8080/api/v1/order/cancel/${id}`);
  fetch(`http://127.0.0.1:8080/api/v1/order/cancel/${id}`, {method: 'PUT'})
  .then(res => res.json()).then(data => {
    console.log(data);
    if(data == true){
      console.log("GOOD");
    }else{
      console.log("BAD");
    }
 });
}
fetch(`http://127.0.0.1:8080/api/v1/order/status/${id}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if(data == "NONEXISTENT"){
                const textBox = document.createElement("h1");
                textBox.innerHTML = "THIS ORDER DOES NOT EXIST";
                total.append(textBox);
            }else{
            displayProduse();
            if(data == "CREATED"){
                const buy = document.createElement("button");
                const cancel = document.createElement("button");

                buy.setAttribute("id","buy");
                buy.innerHTML = "BUY NOW";
                cancel.setAttribute("id","cancel");
                cancel.innerHTML = "CANCEL";

                total.append(buy);
                total.append(cancel);

                buy.addEventListener('click',clickedBuy);
                cancel.addEventListener('click',clickedCancel);            
            }else if(data == "PAYED"){
                const textBox = document.createElement("h1");
                textBox.innerHTML = "THIS ORDER HAS BEEN PAYED AND COMPLETED";
                total.append(textBox);
            }else if(data == "CANCELLED"){
                const textBox = document.createElement("h1");
                textBox.innerHTML = "THIS ORDER HAS BEEN CANCELLED";
                console.log("Hello")
                total.append(textBox);
            }
        }
        });





function displayProduse(){
    fetch(`http://127.0.0.1:8080/api/v1/order/${id}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            var row = table.insertRow(0);
            var totalCell = row.insertCell(0);
            row.insertCell(1);
            row.insertCell(2);
            row.insertCell(3);

            
            totalCell.innerHTML = "<b>TOTAL: " + data.total + "<b>";
            data.items.forEach(item => {
                productCard(item);
            });
            var headRow = table.insertRow(0);
            var productCell = headRow.insertCell(0);
            var priceCell = headRow.insertCell(1);
            var quantityCell = headRow.insertCell(2);
            var totalCell = headRow.insertCell(3);

            productCell.innerHTML = "<b>Product<b>";
            priceCell.innerHTML = "<b>Price<b>";
            quantityCell.innerHTML = "<b>Quantity<b>";
            totalCell.innerHTML = "<b>Total<b>";
            
        
            
        });



    
    
  }

  function productCard(produs) {
    console.log("+1");
    var row = table.insertRow(0);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = produs.productName;
    cell2.innerHTML = produs.total/produs.quantity;
    cell3.innerHTML = produs.quantity;
    cell4.innerHTML = produs.total;
  }


