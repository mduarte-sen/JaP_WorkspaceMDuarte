function saveUserInfo(e){
    e.preventDefault();
    let userFullName = document.getElementById('user-cname').value;
    let userAge = document.getElementById('user-age').value;
    let userEmail = document.getElementById('user-email').value;
    let userPhone = document.getElementById('user-phone').value;
    let infoStorage = {
        fullName: userFullName,
        age: userAge,
        email: userEmail,
        phone: userPhone
    }
    localStorage.setItem('userInfo', JSON.stringify(infoStorage));
}

// var profileImage = document.getElementById("profile-image-upload");

// // Take action when the image has loaded
// profileImage.addEventListener("change", function () {
//     var imgCanvas = document.createElement("canvas");
//     var imgContext = imgCanvas.getContext("2d");

//     // Make sure canvas is as big as the picture
//     imgCanvas.width = profileImage.width;
//     imgCanvas.height = profileImage.height;

//     // Draw image into canvas element
//     imgContext.drawImage(profileImage, 0, 0);

//     // Get canvas contents as a data URL
//     var imgAsDataURL = imgCanvas.toDataURL("image/png");

//     // Save image into localStorage
//     try {
//         localStorage.setItem("profileImage", imgAsDataURL);
//     }
//     catch (e) {
//         console.log("Storage failed: " + e);
//     }
//     console.log(localStorage.getItem('profileImage'))
// }, false); 

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

let bannerImage = document.getElementById('profile-image-upload');


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("profile-image-upload").addEventListener('change',function () { 
        let imgData = getBase64Image(bannerImage);
        localStorage.setItem("imgData", imgData);
        console.log(localStorage.getItem('imgData'))
    })
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