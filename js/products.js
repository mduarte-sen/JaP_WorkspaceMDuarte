//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProductsList(array){
    let htmlAppend=``;
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlAppend += `<div class="d-flex flex-row"><div><h2><strong>` + product.name + `</strong></h2>
        <p>Descripcion: ` + product.description + `</p>
        <p>Precio: ` +product.cost + ` ` + product.currency + `</p>
        <p>Vendidos: ` + product.soldCount + `</p></div>
        <div><img src="`+ product.imgSrc +`" class="pb-2 pl-3 pt-2"></div></div><hr>`
        document.getElementById('product-container').innerHTML = htmlAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/product/all.json')
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            showProductsList(productArray);
        }
    })
});