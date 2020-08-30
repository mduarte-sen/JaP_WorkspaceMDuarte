const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


if (
  window.location.href.endsWith('index.html') &&
  !(sessionStorage.getItem('logueado') === 'true' || localStorage.getItem('logueado') === 'true')) { 
    window.location.href = 'login.html';//si el usuario no esta logueado redirigir a 'login.html'
};


function cerrarSesion(){
  if(localStorage.getItem('nombre')) {
    localStorage.removeItem('nombre');
    localStorage.removeItem('logueado');
  }
  if(sessionStorage.getItem('nombre')) {
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('logueado');
  }
  location.reload();
}


if(localStorage.getItem('nombre') || sessionStorage.getItem('nombre')) { 
  document.querySelectorAll('.site-header div')[0].innerHTML += `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle border-0 py-2" id="profile-name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color:rgb(214, 28, 108);">Bienvenido, </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" >
    <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
    <button class="dropdown-item" id="botonSesion" onclick="cerrarSesion()">Cerrar Sesion</button>
  </div>
</div>`;
  if(localStorage.getItem('nombre')) {
    document.getElementById('profile-name').innerHTML += localStorage.getItem('nombre');
  } else {
    document.getElementById('profile-name').innerHTML += sessionStorage.getItem('nombre');
  }
} else {
  document.querySelectorAll('.site-header div')[0].innerHTML += `<a class="btn py-2" style="background-color: rgb(214, 28, 108);" href="login.html">Iniciar Sesion</a>`;
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});