let productInfo = [];
let productReview = [];
let productArray = [];

let urlObject = new URL(location);
let name = urlObject.searchParams.get('name');

let starCantidad = undefined;

function infoAppend(){
    let htmlAppend =` `; 
    let imgAppend = ``; 
    productInfo = productInfo.filter(function(item){return item.name == name;});
    if (productInfo == '') {
        htmlAppend += `<p class="text-center h1" id="notFound">Articulo no encontrado</p>`
        document.getElementById('globalContainer').innerHTML = htmlAppend;
    } else {
        let product = productInfo[0];
            htmlAppend += `<div class="d-flex flex-row list-group-item" id="description-container"><div><h2><strong>` + product.name + `</strong></h2>
        <p>Descripcion: ` + product.description + `</p>
        <p>Precio: ` + product.cost + ` ` + product.currency + `</p>
        <p>Vendidos: ` + product.soldCount + `</p></div>
        </div>`
        for (let i = 0; i < product.images.length; i++) {
            let productImg = product.images;
                imgAppend += `<div class="carousel-item" id="img`+ i +`"><img src="`+ productImg[i] + `" class="pb-2 pl-3 pt-2"></div>`
            }
        let carouselAppend = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            `+ imgAppend +`
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>`
        document.getElementById('itemDescription').innerHTML = htmlAppend;
        document.getElementById("description-container").innerHTML += carouselAppend;
        document.getElementById(`img0`).setAttribute("class", "carousel-item active")
    }
};

function reviewAppend(){
    let htmlAppend=``;  
    for (let i = 0; i < productReview.length; i++) {
        let review = productReview[i];
        let stars = ``;
        for(let t = 0; t < review.score; t++){
            stars += `<span class="fa fa-star checked"></span>`
        };
        for(let i = 5; i > review.score; i--){
            stars += `<span class="fa fa-star"></span>`
        };
        htmlAppend += `<div class="d-flex flex-row list-group-item"><div><h2><strong>` + review.user + `</strong></h2>
        <p>Fecha: ` + review.dateTime + `</p>
        <p>Comentario: ` + review.description + `</p>
        <p>Puntuacion: ` + stars + `</p></div>
        </div>`
    }
    document.getElementById('itemReview').innerHTML += htmlAppend;
}

function appendRelated(){
    let htmlAppend = ``;
    let relatedNumber = productInfo[0].relatedProducts;
    for(let i = 0; i < relatedNumber.length; i++){
        let relatedItem = productArray[relatedNumber[i]];
        htmlAppend += `<div class="d-flex flex-row list-group-item"><div><h4>` + relatedItem.name + `</h4>
        <div><img src="`+ relatedItem.imgSrc + `" width="50%" height="auto"></div></div>
        </div>`
    };
    document.getElementById('relatedProducts').innerHTML += htmlAppend;
}


function fecha(){
    var hoy = new Date();
    var ss = hoy.getSeconds();
    var min = hoy.getMinutes();
    var hh = hoy.getHours();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    
    function addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    dd = addZero(dd);
    mm = addZero(mm);
    ss = addZero(ss);
    min = addZero(min);
    hh = addZero(hh);
    
    return yyyy+'-'+mm+'-'+ dd + ' ' + hh + ':' + min + ':' + ss;
    };

    function addNewReview(){
        let htmlAppend = '';
        stars = '';
        for(let i = 0; i < starCantidad; i++){
            stars += `<span class="fa fa-star checked"></span>`
        }
        for(let i = 5; i > starCantidad; i--){
            stars += `<span class="fa fa-star"></span>`
        };
        htmlAppend += `<div class="d-flex flex-row list-group-item"><div><h2><strong>` + localStorage.getItem("nombre") + `</strong></h2>
        <p>Fecha: ` + fecha() + `</p>
        <p>Comentario: ` + document.getElementById("userComment").value + `</p>
        <p>Puntuacion: ` + stars + `</p></div>
        </div>`;
        document.getElementById('itemReview').innerHTML += htmlAppend;
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL)
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo.push(resultObj.data);
            infoAppend();
        }
        getJSONData(PRODUCTS_URL)
        .then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productArray = resultObj.data;
                appendRelated();

            }
        });
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL)
    .then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productReview = resultObj.data;
            reviewAppend();
        }
    });
    
    document.getElementById("addComment").addEventListener("click", function(){
        if(document.getElementById('userComment').value && starCantidad){
            addNewReview();
        } else{
            alert('Debe ingresar un comentario y una puntuacion');
        }
    });
    for(let i = 0; i < 5; i++){
        let starNo = `star`+ (i+1) +``;
        document.getElementById(starNo).addEventListener("mouseover", function(){
            for(let i = 0; i < document.getElementById(starNo).value; i++){
                document.getElementById(`star`+ (i+1) +``).setAttribute("class", "fa fa-star checked");
            };
            for(let i = 5; i > document.getElementById(starNo).value; i--){
                document.getElementById(`star`+ (i) +``).setAttribute("class", "fa fa-star");
            };
        })
        document.getElementById(starNo).addEventListener("click", function(){
            starCantidad = document.getElementById(starNo).value;
        })
    };
    document.getElementById('starContainer').addEventListener("mouseout", function(){
        if(starCantidad){
            for(let i = 0; i < starCantidad; i++){
                document.getElementById(`star`+ (i+1) +``).setAttribute("class", "fa fa-star checked");
            };
            for(let i = 5; i > starCantidad; i--){
                document.getElementById(`star`+ (i) +``).setAttribute("class", "fa fa-star");
            };
        }
        else{
        for(let i = 0; i < 5; i++){
            document.getElementById(`star`+ (i+1) +``).setAttribute("class", "fa fa-star");
        };
    }
    })
});