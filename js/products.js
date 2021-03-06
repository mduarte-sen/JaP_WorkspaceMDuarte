let defaultArray = [];
let orderedArray = [];
let setOrder = undefined;
let setPrice = undefined;
let visualMode = "list";
let priceRanges = [10000, 12500, 15000, 17500, 20000];

let productURL = ""

function sortBy(order){
    showSpinner();
    setOrder = order;

    if(order === 'porDefec') {
        orderedArray = [];
        orderedArray = orderedArray.concat(defaultArray);
        filterPrice(setPrice);
    } else if (order === 'relev'){
        orderedArray.sort(function(a, b) {
            return parseFloat(b.soldCount) - parseFloat(a.soldCount);
        });
    } else if(order === 'ascen') {
        orderedArray.sort(function(a, b) {
                    return parseFloat(a.cost) - parseFloat(b.cost);
                });
    } else if(order === 'desc') {
        orderedArray.sort(function(a, b) {
                    return parseFloat(b.cost) - parseFloat(a.cost);
                });
    } 
    hideSpinner();
}

function filterPrice(x){
    showSpinner();
    setPrice = x;
    if(x === 'a'){
        orderedArray = defaultArray.filter(function(y){return y.cost >= priceRanges[0] && y.cost <= priceRanges[1];});
    } else if(x === 'b'){
        orderedArray = defaultArray.filter(function(y){return y.cost >= priceRanges[1] && y.cost <= priceRanges[2];});
    } else if(x === 'c'){
        orderedArray = defaultArray.filter(function(y){return y.cost >= priceRanges[2] && y.cost <= priceRanges[3];});
    } else if(x === 'd') {
        orderedArray = defaultArray.filter(function(y){return y.cost >= priceRanges[3] && y.cost <= priceRanges[4];});
    } else {
        orderedArray = [];
        orderedArray = orderedArray.concat(defaultArray);
    };

    if(setOrder !== 'porDefec') {
        sortBy(setOrder);
    };
    hideSpinner();
}


function appendProduct(){
    let htmlAppend=``;   
    if (orderedArray == '') {
        htmlAppend += `<p class='text-center h1'>Articulos no encontrados</p>`
        document.getElementById('product-container').innerHTML = htmlAppend;
    } else {
        if(visualMode === "list") {
            for (let i = 0; i < orderedArray.length; i++) {
                let product = orderedArray[i];
                htmlAppend += `<div class="d-flex flex-row list-group-item list-group-item-action"><div><a class="h2" href="product-info.html?name=`+product.name+`"><strong>` + product.name + `</strong></a>
                <p>Descripcion: ` + product.description + `</p>
                <p>Precio: ` + product.cost + ` ` + product.currency + `</p>
                <p>Vendidos: ` + product.soldCount + `</p></div>
                <div><img src="`+ product.imgSrc + `" class="pb-2 pl-3 pt-2" width="500"></div></div>`
            }
            document.getElementById('product-container').innerHTML = htmlAppend;
        } else {
            for (let i = 0; i < orderedArray.length; i++) {
                let product = orderedArray[i];
                htmlAppend += `<div class="col-sm-4 my-4">
                <div class="card h-100">
                <a href="product-info.html?name=`+product.name+`">
                        <img src="`+product.imgSrc+`"class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">`+ product.name +`</h5>
                            <p class="card-text">` + product.description + `</p>
                            <div class="d-flex justify-content-between">
                                <p>Precio: ` + product.cost + ` ` + product.currency + `</p>
                                <small>Vendidos: ` + product.soldCount + `</small>
                            </div>
                        </div>
                    </a>
                </div>
                </div>`
            }
            document.getElementById('product-container').innerHTML = `<div id="fila" class="row">`+htmlAppend+`</div>`;
        }
    }
}

function searchItem (search){
    let searchBy = String(search);
    sortBy(setOrder);
    filterPrice(setPrice);
    if (searchBy.length >= 1) {
        names = orderedArray;
        letters = searchBy.toLowerCase();
        var filteredNames = names.filter(function(word) {
            return word.name.toLowerCase().includes(letters);
        })
        orderedArray = filteredNames;
    }
    appendProduct();
}



document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL)
    .then(function(resultObj){
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            defaultArray = resultObj.data;
            sortBy('porDefec');
            appendProduct();
        }
    })
    document.getElementById('hamburger-menu').addEventListener("click", function(){
        visualMode = "list";
        appendProduct();
    })
    document.getElementById('square-menu').addEventListener("click", function(){
        visualMode = "cells";
        appendProduct();
    })
});
