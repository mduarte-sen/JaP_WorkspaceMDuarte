var cartArticles = undefined;

function showCart(items){
    let htmlContentToAppend = ``;
    let article = items.articles;
    for(i=0;i<article.length;i++){
        htmlContentToAppend += `<tr><td class="p-0"><img class="p-1 border-right" src="`+article[i].src+`" alt="" width="150"><strong class="ml-2">`+article[i].name+`</strong></td>
        <td class="h5">`+article[i].count+`</td>
        <td class="h5">`+article[i].unitCost+` `+article[i].currency+`</td>
        <td class="h5">`+article[i].unitCost*article[i].count+` `+article[i].currency+`</td></tr>`;
    }
    document.getElementById('item-data').innerHTML = htmlContentToAppend;
}

function showTotal(items){
    let htmlContentToAppend = ``;
    let article = items.articles;
    let subtotal = 0;
    let total = 0;
    for(i=0;i<article.length;i++){
        subtotal += article[i].unitCost*article[i].count;
    }
    let costoEnvio = (subtotal/100)*document.getElementById('tipo-envio').envio.value;
    total = subtotal+costoEnvio;
    htmlContentToAppend = `<p>Subtotal: `+subtotal+`</p>
    <p>Costo de envio: `+costoEnvio+`</p>
    <p>Total: `+total+`</p>`;
    document.getElementById('price-container').innerHTML = htmlContentToAppend;
}

function cambiarEnvio(e){
    e.preventDefault();
    showTotal(cartArticles);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartArticles = resultObj.data;
            showCart(cartArticles);
            showTotal(cartArticles);
        }
    })
});