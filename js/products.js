//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let defaultArray = [];
let orderedArray = [];
let setOrder = 0;
let setPrice = 0;

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
        orderedArray = defaultArray.filter(function(y){return y.cost >= 10000 && y.cost <= 12500;});
    } else if(x === 'b'){
        orderedArray = defaultArray.filter(function(y){return y.cost >= 12500 && y.cost <= 15000;});
    } else if(x === 'c'){
        orderedArray = defaultArray.filter(function(y){return y.cost >= 15000 && y.cost <= 17500;});
    } else if(x === 'd') {
        orderedArray = defaultArray.filter(function(y){return y.cost >= 17500 && y.cost <= 20000;});
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
        for (let i = 0; i < orderedArray.length; i++) {
            let product = orderedArray[i];
            htmlAppend += `<hr><div class="d-flex flex-row"><div><h2><strong>` + product.name + `</strong></h2>
        <p>Descripcion: ` + product.description + `</p>
        <p>Precio: ` + product.cost + ` ` + product.currency + `</p>
        <p>Vendidos: ` + product.soldCount + `</p></div>
        <div><img src="`+ product.imgSrc + `" class="pb-2 pl-3 pt-2"></div></div>`
            document.getElementById('product-container').innerHTML = htmlAppend;
        }
    }
}


function searchItem (search){
    let searchBy = String(search);
    sortBy(setOrder);
    filterPrice(setPrice);
    if (searchBy.length >= 1) {
    for(let i = 0; i < searchBy.length; i++) {
        index = i;
        names = orderedArray;
        letter = searchBy.toLowerCase().charAt(i);
            var filteredNames = names.filter(function(word) {
               return word.name.toLowerCase().charAt(index) === letter;
            })
            orderedArray = filteredNames;
            appendProduct();
            }
    } else {
        orderedArray = orderedArray.concat(defaultArray);
        appendProduct();
    }
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/product/all.json')
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            defaultArray = resultObj.data;
            sortBy('porDefec');
            appendProduct();
        }
    })
});
