function enviarFormulario(evento){
  evento.preventDefault();
  let nombreUsuario = document.getElementById('login-username').value;   
  if(document.getElementById('remember-login').checked) {
      localStorage.setItem('nombre', nombreUsuario);
      localStorage.setItem('logueado', 'true');
    }
  else {
      sessionStorage.setItem('nombre', nombreUsuario);
      sessionStorage.setItem('logueado', 'true');
    }
  location.href='index.html';
  return true;
};

function onGoogleSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  let infoStorage = {
    fullName: profile.getName(),
    email: profile.getEmail()
}
  localStorage.setItem('userInfo', JSON.stringify(infoStorage));
  localStorage.setItem('nombre', profile.getName());
  localStorage.setItem('logueado', 'true');
  location.href='index.html';
  googleUser.disconnect();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});