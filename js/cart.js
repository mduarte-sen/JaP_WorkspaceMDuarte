var cartArticles = undefined;
var firsttime = true;
var cantidad = [];
var costoUnidad = [];
var currentCurrency = "USD";
var USDToUYU = 40;
var paymentChosen = undefined;

function showCart(){
    let htmlContentToAppend = ``;
    let article = cartArticles;
    if(firsttime == true){
        firsttime = false;
        for(let i=0;i<article.length;i++){
            cantidad[i] = article[i].count;
        }
    }
    for(let i=0;i<article.length;i++){
        if(article[i].currency != currentCurrency){
            if(currentCurrency == "USD"){
                costoUnidad[i] = article[i].unitCost/USDToUYU;
            } else {
                costoUnidad[i] = article[i].unitCost*USDToUYU;
            }
        } else {
            costoUnidad[i] = article[i].unitCost;
        }
        if (cantidad[i]!==0){
            htmlContentToAppend += `<tr id="row`+i+`"><td class="p-0"><img class="p-1 border-right" src="`+article[i].src+`" alt="" width="150"><strong class="ml-2">`+article[i].name+`</strong></td>
            <td class="h5 align-middle centered-td">
            <button class="btn btn-light" onclick="addSubstract(-1, `+i+`)">-</button>
            <input type="number" name="itemQty`+i+`" class="canti-input" id="cantidad`+i+`" value="`+cantidad[i]+`" onchange="changeCount()" form="purchaseForm">
            <button class="btn btn-light" onclick="addSubstract(1, `+i+`)">+</button><br>
            <p class="h6 delete-item-button" onclick="deleteCartItem(`+i+`)">Eliminar</p>        
            </td>
            <td class="h5 align-middle centered-td">`+costoUnidad[i]+` `+currentCurrency+`</td>
            <td class="h5 align-middle centered-td">`+costoUnidad[i]*cantidad[i]+` `+currentCurrency+`</td></tr>`;
        }
    }
    document.getElementById('item-data').innerHTML = htmlContentToAppend;
    showTotal();
}

function showTotal(){
    let htmlContentToAppend = ``;
    let article = cartArticles;
    let subtotal = 0;
    for(let i=0;i<article.length;i++){
        subtotal += costoUnidad[i]*cantidad[i];
    }
    let costoEnvio = (subtotal/100)*document.getElementById('purchaseForm').envio.value; 
    let total = subtotal+costoEnvio;
    htmlContentToAppend = `<table class="table table-bordered" ><tr>
    <th scope="row">Subtotal</th>
    <td class="h5 align-middle">`+subtotal+` `+currentCurrency+`</td>
    </tr>
    <tr>
    <th scope="row">Costo de Envio</th>
    <td class="h5 align-middle">`+costoEnvio+` `+currentCurrency+`</td>
    </tr>
    <tr>
    <th scope="row">Total</th>
    <td class="h5 align-middle">`+total+` `+currentCurrency+`</td>
    </tr></table><br>
    <button type="submit" class="btn pink-button" form="purchaseForm">Finalizar comprar</button>`
    ;
    document.getElementById('price-container').innerHTML = htmlContentToAppend;
}

function changeCount(){
    for(let i=0;i<cantidad.length;i++){
        cantidad[i] = document.getElementById("cantidad"+i).value;
    }
    showCart();
}

function cambiarEnvio(e){
    e.preventDefault();
    showTotal();
}

function addSubstract(buttonValue, number){
    let oldValue = parseInt(document.getElementById("cantidad"+number).value)
    let newValue = oldValue + buttonValue;
    if(newValue > 0){
        document.getElementById("cantidad"+number).setAttribute("value", newValue)
        changeCount();
    }
}

function validatePay(e){
    e.preventDefault();
    let creditInput = document.getElementById("cardNum").value;
    let creditExpress = /^\d{16}$/
    let cvvInput = document.getElementById("cardVerify").value;
    let cvvExpress = /^\d{3}$/
    let monthInput = document.getElementById("cardExpMonth").value;
    let monthExpress = /^(0[1-9])|(1[0-2])$/
    let yearInput = document.getElementById("cardExpYear").value;
    let yearExpress = /^\d{4}$/
    let mensajeError = ``;

    if(paymentChosen == "creditDebit"){
        let error = false
        if(!creditExpress.test(creditInput)){
            error = true;
            mensajeError += `<p>*Numero de Tarjeta Invalido. Ingresar 16 digitos, sin incluir guion o espacios.</p>`
            document.getElementById("cardNumCheck").innerHTML = "❌";
        } else {
            document.getElementById("cardNumCheck").innerHTML = "✔";
        }
        if(!cvvExpress.test(cvvInput)){
            error = true;
            mensajeError += `<p>*Digito Verificador de Tarjeta Invalido. Ingresar un numero de 3 digitos.</p>`
            document.getElementById("cardVerCheck").innerHTML = "❌";
        } else {
            document.getElementById("cardVerCheck").innerHTML = "✔";
        }
        if (!monthExpress.test(monthInput)){
            error = true;
            mensajeError += `<p>*Mes de expiracion de Tarjeta Invalido. Debe ser un mes entre 01 y 12.</p>`
            document.getElementById("monthExpCheck").innerHTML = "❌";
        } else {
            document.getElementById("monthExpCheck").innerHTML = "✔";
        }
        if(!yearExpress.test(yearInput)){
            error = true;
            mensajeError += `<p>*Año de expiracion de Tarjeta Invalido. Ingresar un numero de 4 digitos.</p>`
            document.getElementById("yearExpCheck").innerHTML = "❌";
        } else {
            document.getElementById("yearExpCheck").innerHTML = "✔";
        }
        if(creditInput === '' && cvvInput === '' && monthInput === '' && yearInput === ''){
            error = true;
            mensajeError = `<p>*Debe ingresar la informacion de su metodo de pago.</p>`
        } else if(creditInput === '' || cvvInput === '' || monthInput === ''|| yearInput === ''){
            error = true;
            mensajeError += `<p>*Debe rellenar todos los campos del metodo de pago.</p>`
        }
        if(!error){
            document.getElementById('purchaseForm').submit();
        }

    }
    document.getElementById("paymenterror-container").innerHTML = mensajeError;
}

function deleteCartItem(idNumber){
    document.getElementById("row"+idNumber).remove();
    cantidad[idNumber] = 0;
    showTotal();
}

function paymentRequirement(paymentType){
    if(paymentType=="card"){
        paymentChosen = "creditDebit";
    } else if(paymentType=="bank"){
        paymentChosen = "bankAccount";
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            cartArticles = resultObj.data.articles;
            showCart();
        }
    })
    document.getElementById('UYU').addEventListener("click", function(){
        currentCurrency = "USD";
        showCart();
    })
    document.getElementById('USD').addEventListener("click", function(){
        currentCurrency = "UYU";
        showCart();
    })
});
