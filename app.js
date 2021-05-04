var btn = document.getElementById("btn");
var btn1 = document.getElementById("btn1");

btn.addEventListener('click', enviarMensaje)
function enviarMensaje() {
    var email = document.getElementById("email").value;
    var clave = document.getElementById("clave").value;

    firebase.auth().createUserWithEmailAndPassword(email, clave)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById("email").value = "";
            document.getElementById("clave").value = "";
            M.toast({ html: "Te hemos enviado un correo de verificacion!" })
            verificar();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}
btn1.addEventListener('click', ingreso)
function ingreso() {
    var email1 = document.getElementById("email1").value;
    var clave1 = document.getElementById("clave1").value;

    firebase.auth().signInWithEmailAndPassword(email1, clave1)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById("email1").value = "";
            document.getElementById("clave1").value = "";
            M.toast({ html: "Haz iniciado sesion con exito!" })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

function comprobar() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            mostrar(user);
            console.log("****************");
            console.log(user.emailVerified);
            console.log("****************");
            var uid = user.uid;
            var emailVerified = user.emailVerified;

        } else {
            console.log("no existe un usuario activo");

        }
    });

}
comprobar();
function mostrar(user) {
    var user = user;
    var dropdown = document.getElementById("dropdown"); 
    var contenedor = document.getElementById("contenedor"); 
    var campo = document.getElementById("campo");
   

    if (user.emailVerified) {
        dropdown.innerHTML = `
        <li><a href="#!" onclick="check()"><i class="material-icons">account_circle</i>Perfil</a></li>
        <li><a href="#!" onclick="cerrarSesion()"><i class="material-icons">close</i>Cerrar Sesion</a></li>
        `;
        campo.innerHTML = `
        <div class="col l14 offset-l3">
            <div class="card-panel center transparent" style="border-radius: 200px;">
                Hola te damos la bienvenida, <a href="#" class="alert-link">${user.email}</a>. Te invitamos a que puedas ver nuestro catalogo!
            </div>
        </div>
        
        `;
        contenedor.innerHTML = `
            <h2 class = "center" >Catalogo de Productos</h2>
            <div class="row">
                <div class="col l3">
                    <div class="card-panel white center" style="background: url(img/brick-wall.png);">
                        <h4>iPhone 7</h4>
                        <img src="img/iphone-7.png" class="responsive-img">
                        <br>
                        <h4><a>Precio: 160.000</a></h4>
                    </div>
                </div>
                <div class="col l3">
                    <div class="card-panel white center" style="background: url(img/brick-wall.png);">
                        <h4>iPhone X</h4>
                        <img src="img/iphone-x.png" class="responsive-img">
                        <br>
                        <h4><a>Precio: 320.000</a></h4>
                    </div>
                </div>
                <div class="col l3">
                    <div class="card-panel white center" style="background: url(img/brick-wall.png);">
                        <h4>iPhone 11</h4>
                        <img src="img/iphone-11.png" class="responsive-img">
                        <br>
                        <h4><a>Precio: 390.000</a></h4>
                    </div>
                </div>
                <div class="col l3">
                    <div class="card-panel white center" style="background: url(img/brick-wall.png);">
                        <h4>iPhone 12</h4>
                        <img src="img/iphone-12.png" class="responsive-img">
                        <br>
                        <h4><a>Precio: 460.000</a></h4>
                    </div>
                </div>
                
            </div>
            <br>
            <div class="row">
                <div class="col l10 offset-l1">
                    
                    <div class="card-panel white center" style="background: url(img/brick-wall.png);">
                        <h4>iPhone 8</h4>
                        <img src="img/iphone 8.png" class="responsive-img">
                        <br>
                        <h4><a>Precio: 220.000</a></h4>
                    </div>

                </div>
                
            </div>
    
        `;
        
    }

    
}

function cerrarSesion() {
    firebase.auth().signOut()
        .then(function () {
            console.log("Saliendo...");
            location.reload();

        })
        .catch(function (error) {
            console.log(error);
        })

}
function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log("Enviando...")
    }).catch(function (error) {
        console.log(error);
    });
}
function check(){
    swal({
        title: "Lo sentimos!",
        text: "Esta seccion aun esta en desarrollo!",
        icon: "error",
        button: "OK",
    });
}



