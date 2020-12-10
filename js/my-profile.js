let input = document.getElementById('profile-image-upload');
let image64 = undefined;

function saveUserInfo(e){
    e.preventDefault();
    let infoStorage = {
        fullName: document.getElementById('user-cname').value,
        age: document.getElementById('user-age').value,
        email: document.getElementById('user-email').value,
        phone: document.getElementById('user-phone').value
    }
    localStorage.setItem('userInfo', JSON.stringify(infoStorage));
    localStorage['profileImg'] = image64;
    let dataImage = localStorage.getItem('profileImg');
    let bannerImg = document.getElementById('profile-picture');
    bannerImg.src = dataImage;
    reload('profile-picture');
    document.getElementById('image-confirm').innerHTML = ``;
}

function reload(element){
    let container = document.getElementById(element);
    let content = container.innerHTML;
    container.innerHTML= content; 
}

input.onchange = function(event){
    let tgt = event.target || window.event.srcElement, 
        files = tgt.files;

    if (FileReader && files && files.length) {
        let fr = new FileReader();
        fr.onload = function () {
            image64 = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
    document.getElementById('image-confirm').innerHTML = `<p style="color: limegreen;">Presione "Guardar Cambios" para guardar y mostrar la imagen.</p>`
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if(localStorage.getItem('profileImg')){
        let dataImage = localStorage.getItem('profileImg');
        let bannerImg = document.getElementById('profile-picture');
        bannerImg.src = dataImage;
    }

    if(localStorage.getItem('userInfo')){
        let infoToShow = JSON.parse(localStorage.getItem('userInfo'));
        if(infoToShow.fullName){
            document.getElementById('user-cname').setAttribute('value', infoToShow.fullName)
        }
        if(infoToShow.age){
            document.getElementById('user-age').setAttribute('value', infoToShow.age);
        }
        if(infoToShow.email){
            document.getElementById('user-email').setAttribute('value', infoToShow.email);
        }
        if(infoToShow.phone){
            document.getElementById('user-phone').setAttribute('value', infoToShow.phone);
        }
    }
});