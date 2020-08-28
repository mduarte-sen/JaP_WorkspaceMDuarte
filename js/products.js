//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProductsList(array,order){
    let htmlAppend=``;
    let orderedArray = [];
    if(order === 'relev') {
        orderedArray = array;
       
    } else if(order === 'ascen') {
        orderedArray = array.sort(function(a, b) {
                    return parseFloat(a.cost) - parseFloat(b.cost);
                });
    } else if(order === 'desc') {
        orderedArray = array.sort(function(a, b) {
                    return parseFloat(b.cost) - parseFloat(a.cost);
                });
    } 
    
    for (let i = 0; i < orderedArray.length; i++) {
        let product = orderedArray[i];
        htmlAppend += `<div class="d-flex flex-row"><div><h2><strong>` + product.name + `</strong></h2>
        <p>Descripcion: ` + product.description + `</p>
        <p>Precio: ` + product.cost + ` ` + product.currency + `</p>
        <p>Vendidos: ` + product.soldCount + `</p></div>
        <div><img src="`+ product.imgSrc +`" class="pb-2 pl-3 pt-2"></div></div><hr>`
        document.getElementById('product-container').innerHTML = htmlAppend;
    }
}

function showList(orderValue) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/product/all.json')
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            showProductsList(productArray,orderValue);
        }
    })
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/product/all.json')
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            showProductsList(productArray, 'relev');
        }
    })
});


function valuetest(evento) {
    evento.preventDefault();
    console.log(document.getElementById('minPrice').value)
}