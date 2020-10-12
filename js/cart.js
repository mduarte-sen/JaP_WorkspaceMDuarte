var cartArticles = undefined;
var firsttime = true;
var cantidad = [];
var costoUnidad = [];
var currentCurrency = "USD";


function showCart(){
    let htmlContentToAppend = ``;
    let article = cartArticles;
    if(firsttime == true){
        firsttime = false;
        for(i=0;i<article.length;i++){
            cantidad[i] = article[i].count;
        }
    }
    for(i=0;i<article.length;i++){
        if(article[i].currency != currentCurrency){
            if(currentCurrency == "USD"){
                costoUnidad[i] = article[i].unitCost/40;
            }
            else {
                costoUnidad[i] = article[i].unitCost*40;
            }
        }
        else {
            costoUnidad[i] = article[i].unitCost;
        }
        htmlContentToAppend += `<tr ><td class="p-0"><img class="p-1 border-right" src="`+article[i].src+`" alt="" width="150"><strong class="ml-2">`+article[i].name+`</strong></td>
        <td class="h5 align-middle centered-td"><button class="btn btn-light" onclick="addSubstract(-1, `+i+`)">-</button><input type="number" name="" class="canti-input" id="cantidad`+i+`" value="`+cantidad[i]+`" min="1" onchange="changeCount()"><button class="btn btn-light" onclick="addSubstract(1, `+i+`)">+</button></td>
        <td class="h5 align-middle centered-td">`+costoUnidad[i]+` `+currentCurrency+`</td>
        <td class="h5 align-middle centered-td">`+costoUnidad[i]*cantidad[i]+` `+currentCurrency+`</td></tr>`;
    }
    document.getElementById('item-data').innerHTML = htmlContentToAppend;
    showTotal();
}

function showTotal(){
    let htmlContentToAppend = ``;
    let article = cartArticles;
    let subtotal = 0;
    let total = 0;
    for(i=0;i<article.length;i++){
        subtotal += costoUnidad[i]*cantidad[i];
    }
    let costoEnvio = (subtotal/100)*document.getElementById('tipo-envio').envio.value; 
    total = subtotal+costoEnvio;
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
    </tr></table>`
    ;
    document.getElementById('price-container').innerHTML = htmlContentToAppend;
}

function changeCount(){
    for(i=0;i<cantidad.length;i++){
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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
