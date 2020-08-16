function enviarFormulario(evento){ //funcion a ejecutar cuando se haga submit
    evento.preventDefault(); //evita que se haga la peticio al servidor enviando los datos
    console.log(evento);
    sessionStorage.setItem('logueado', 'true');
    location.href='index.html';
    return true;
  };


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});