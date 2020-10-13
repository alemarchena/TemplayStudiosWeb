<!DOCTYPE html>

<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- fuentes de google -->
    <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap&family=Dosis:wght@200" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.11/css/mdb.min.css" rel="stylesheet">
    
    
    <!-- datatable -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.css">


    <script>r = Math.random();version=2;</script>


    <!-- estilos -->
    <link rel="stylesheet" type="text/css" href="css/estilo.css?" + r>
    <link rel="stylesheet" type="text/css" href="cover.css?" + r>

    <link rel="icon" type="image/png" href="img/favicon.png">
    <link rel="icon" href="/img/logoempresa.png" type="image/png">


    <!-- autenticacion -->
    <script src="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.js"></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css" />
    
    <title>Autenticación de usuario</title>
    
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
  
     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

    <!-- Material Design Theming -->
    <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css">
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> -->
    <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>

    <!-- Materialize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.7/cpexcel.js" 
            integrity="sha512-fuC1ZevbOQvIjtxAMz1ub4kpB+AXk0HloymFN8AVJFwIzEfYKCDdNqiU7SHoS0iCQcktegYfp9vqjwKsmV+m2Q==" 
            crossorigin="anonymous">
    </script> -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.6/xlsx.full.min.js"></script>
    
    <script src="configuracion.js?" + r></script>
    <script type="text/javascript">
   

    var tablaanuncios           = "";
    var tablarubros             = "";
    var tablaventas             = "";
    var tablaclientes           = "";
    var tablaproveedores        = "";
    var tablabonus              = "";
    var tablacompras            = "";
    var tablaajustes            = "";
    var tablaproveedoresanuncios= "";
    var tablaunidadesgranel     = "";
    var tablabloqueos           = "";
    var conexionbdd             = "";
    var tablatiposdepago        = "";
    var tablatiposdemovimientos = "";
    var rutaimagenes            = "";
    idencontrado=-1;
      
        /**
         * INGRESO AL SISTEMA.
         */
        function toggleSignIn() {
            if (firebase.auth().currentUser) {
                // [START signout]
                firebase.auth().signOut();

                // [END signout]
            } else {
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;
                if (email.length < 4) {
                    swal("Atención", "Ingrese una dirección de email!");
                    return;
                }
                if (password.length < 4) {
                    swal("Atención", "Ingrese una clave!");

                    return;
                }

                firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        swal("Contraseña", "La clave es incorrecta.");
                    } else {
                        swal("Error", "No existe un usuario con este email");
                    }
                    console.log(error);
                    document.getElementById('quickstart-sign-in').disabled = false;
                });
            }
            document.getElementById('quickstart-sign-in').disabled = true;
        }

        /**
         * REGISTRO NUEVO EN EL SISTEMA.
         */

         function consultarusuario() {

            var email = document.getElementById('email').value;


            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "consultar";
            var objetojson = JSON.stringify(objeto);


            $.ajax({

                url: "controladores/usuariostemplay.php",
                data: { objetojson: objetojson },
                type: "post",

                success: function (data) {
                    
                    if (data == '[]') {
                        crearusuario();
                        console.log("Intento de crear usuario");
                    } else if (data == "nobdd") {
                        console.log("No se conecto a la base de  datos");

                    } else if (data >= "1") {

                       
                        swal("Usuario!", "Ya existe alguien con este email!");
                        
                    } else {
                        console.log("Otro error " + data);
                    }


                },
                error: function (e) {
                    console.log("Error:" + e);
                }
            });
        }
        
         function crearusuario(){
            
            
             var email = document.getElementById('email').value;
             var password = document.getElementById('password').value;

            if (email.length < 4) {
                swal("Email", "Por favor ingrese una dirección de correo.");
                return;
            }
            if (password.length < 4) {
                swal("Contraseña", "Ingrese una clave de al menos 4 digitos");
                return;
            }

            
            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "alta";
            var objetojson = JSON.stringify(objeto);

            M.toast({ html: 'Trabajando...' });

            $.ajax({

                url:"controladores/usuariostemplay.php",
                data: {objetojson: objetojson},
                type: "post",

                success: function(data)
                {
                   if(data=="nobdd")
                    {
                        console.log("No se conecto a la base de  datos");
                   
                    }else if (data == "1"){
                        console.log("Usuario creado");
                        handleSignUp();
                        //swal("Usuario Creado!", "Presione 'Verificar cuenta' para continuar!");
                       

                    }else{
                        console.log("Otro error " + data);
                    }
                },
                error:function(e){
                    console.log("Error:" + e);
                }
            });
            
        }

        

       
     
        function handleSignUp() {
            
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            document.getElementById('textoexplicacion').style.visibility = "visible";
        

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    document.getElementById('textoexplicacion').style.visibility = "hidden";

                    eliminarusuario();
                    swal("Contraseña", "La clave es demasiado débil.");

                } else {
                    document.getElementById('textoexplicacion').style.visibility = "hidden";

                    eliminarusuario();
                    swal("Error", errorMessage);
                }
                console.log("Resultado:" + error);
            });

            mensajeok();
        }

        function mensajeok(){
             
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-danger'
                            },
                            buttonsStyling: false
                        })

                        swalWithBootstrapButtons.fire({
                            title: 'Usuario Creado!',
                            text: "Está a un solo paso, enviaremos un email para verificar que es el propietario de la cuenta!",
                            icon: 'warning',
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'No, cancelar!',
                            reverseButtons: true
                        }).then((result) => {
                            if (result.value) {
                                sendEmailVerification();
                                MandaEmail(email);

                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                swalWithBootstrapButtons.fire(
                                    'Perfecto',
                                    'Si cambias de opinión presiona el botón verificar :)'
                                )
                            }
                        })
                        
        }
        function eliminarusuario() {

            var email = document.getElementById('email').value;

            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "baja";
            var objetojson = JSON.stringify(objeto);

            $.ajax({

                url: "controladores/usuariostemplay.php",
                data: { objetojson: objetojson },
                type: "post",

                success: function (data) {
                    if (data == "nobdd") {
                        console.log("No se conecto a la base de  datos");

                    } else if (data == "1") {
                        console.log("Usuario eliminado");
                    } else {
                        console.log("Otro error " + data);
                    }
                },
                error: function (e) {
                    console.log("Error:" + e);
                }
            });
        }
        
        arregloplataforma = [];

        function traerplataforma(id,idplataforma) {
            
            var adondeentra = "";
            if(idplataforma == -1)
                adondeentra = "plataforma";
            else
                adondeentra = "plataformaadmin";
            
            objeto = new Object();
            objeto.email = "";
            objeto.id = id;
            objeto.idplataformaagregada = idplataforma;
            objeto.tipo =  adondeentra;
            var objetojson = JSON.stringify(objeto);

            $.ajax({

                url: "controladores/usuariostemplay.php",
                data: { objetojson: objetojson },
                type: "post",

                success: function (data) 
                {
                     

                    if (data != "[]")
                    {
                        dd = JSON.parse(data);
                        $.each(dd,function(key){

                            conexionbdd = dd[key].bdd;
                            tablaajustes = dd[key].tablaajustes;
                            tablaanuncios = dd[key].tablaanuncios;
                            tablabonus = dd[key].tablabonus;
                            tablaclientes = dd[key].tablaclientes;
                            tablacompras = dd[key].tablacompras;
                            tablaproveedores = dd[key].tablaproveedores;
                            tablaunidadesgranel = dd[key].tablaunidadesgranel;
                            tablabloqueos   = dd[key].tablabloqueos
                            tablaproveedoresanuncios = dd[key].tablaproveedoresanuncios;
                            tablarubros = dd[key].tablarubros;
                            tablaventas = dd[key].tablaventas;
                            tablatiposdepago = dd[key].tablatiposdepago;
                            tablatiposdemovimientos = dd[key].tablatiposdemovimientos;
                            rutaimagenes = dd[key].rutaimagenes;
                            dominio = dd[key].dominio;
                           
                        });
                        
    
                        $("#plataforma").load("panel.html");
                    }    
                },error: function(e){
                    swal("Atención", "Si aún no ha verificado la cuenta, presione el botón verificar!");

                    console.log("Error " + e );
                }
            });
        } 

      
        /**
         * Sends an email verification to the user.
         */
        function sendEmailVerification() {
            firebase.auth().currentUser.sendEmailVerification().then(function () {
                swal("Genial!", "Estamos felices que quieras estar con nosotros! ya tienes un enlace en tu email");

            });
            document.getElementById('quickstart-verify-email').style.visibility = "hidden";
            firebase.auth().signOut();
        }

        function sendPasswordReset() {
            var email = document.getElementById('email').value;
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                swal("Enviado!", "Abra su email y resetee su clave!");
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/invalid-email') {
                    swal("Error", errorMessage);
                } else if (errorCode == 'auth/user-not-found') {
                    swal("Error", errorMessage);
                }
                console.log(error);
            });
        }

        function MandaEmail(email) {

            var emailnuevo = new FormData();
            var xhrnuevo = new XMLHttpRequest();
            
            // CONFIGURACION INICIO
            xhrnuevo.open('POST', dominioruta + 'controladores/emailnuevousuario.php');
            //CONFIGURACION FIN
            
            xhrnuevo.withCredentials = true;

            emailnuevo.append('email', email);
            xhrnuevo.send(emailnuevo);

        }

        function initApp() {
            // Listening for auth state changes.
            firebase.auth().onAuthStateChanged(function (user) {
                document.getElementById('quickstart-verify-email').disabled = true;
                
            
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;

                    document.getElementById('quickstart-sign-in-status').textContent = 'Conectado';
                    document.getElementById('quickstart-sign-in').textContent = 'Salir';
                    
                    // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
                    
                    if (!emailVerified) {
                        document.getElementById('quickstart-verify-email').disabled = false;
                    
                        document.getElementById('quickstart-verify-email').style.visibility = "visible";
                        document.getElementById('quickstart-password-reset').style.visibility = "hidden";
                    }else{
                        document.getElementById('quickstart-password-reset').style.visibility = "visible";
                        document.getElementById('quickstart-verify-email').style.visibility = "hidden";
                        document.getElementById('textoexplicacion').style.visibility = "hidden";
                        
                        verificarusuario();
                    }
                } else {
                    document.getElementById('quickstart-sign-in-status').textContent = 'Desconectado';
                    document.getElementById('quickstart-sign-in').textContent = 'Ingresar';
                    document.getElementById('quickstart-account-details').textContent = '';
                }
                document.getElementById('quickstart-sign-in').disabled = false;
            });

            document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
            document.getElementById('quickstart-sign-up').addEventListener('click', consultarusuario, false);
            document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
            document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
        
        }

        window.onload = function () {
            initApp();
        };
    </script>
</head>

<!-- ---------------------------------------------- BODY ------------------------------------------------------ -->

<body>
    <div id="panelcolor" class="fixed-top" style="background-color: #2E9AFE; height: 300px;z-index: -1"></div>

    <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

    <!-- <div class="d-flex justify-content-center mt-2">
        <img src="img/logoempresa.png" class="img-fluid" alt="Responsive image" width="10%" height="auto">
    </div> -->
  
    <div id="plataforma"class="mt-5">
        <!-- <form method=post action=""> -->
            <div  class="col-sm-4 offset-sm-4">
                    <div id="tarjeta" class="card text-center">
                        <div class="card-header">
                            Autenticación
                        </div>
                        <div class="">
                            <h5 class="card-title">Panel de control</h5>
                            
                            <!-- ----------------------- plataforma de prueba ----------------- -->
                            
                            <!-- <br>
                            <p style="color:green">Siéntete libre de realizar acciones, esto no perjudica al sitio.</p>
                            <p style="color:green">Es importante para nosotros que nos hagas una devolución de tu experiencia.</p>
                            Puedes ponerte en <a href="https:\\www.templaystudios.com" target="_blank">contacto</a> con nosotros.
                            <p style="color:black">Ingresa con esta cuenta de prueba.</p>
                            -->
                            <!-- ------------------------------------------------------------------------ -->
                            
                            <hr>
                            <div class="d-flex justify-content-center mt-4 row">
                                <input class="mdl-textfield__input center"  onKeyUp="return verificaenter(event)" style="display:inline;width:65%;" type="text" id="email" name="email"
                                placeholder="Email: info@templaystudios.com" value=""/>
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            <div class="d-flex justify-content-center mt-4 row">
                                <input class="mdl-textfield__input center" onKeyUp="return verificaenter(event)" style="display:inline;width:65%;" type="password" id="password" name="password"
                                    placeholder="Password 12345678" value=""/>
                                <br /><br />
                                <div class="col-sm-2" style="padding: 0em!important;">
                                    <button class="btn icon fa fa-eye" type="button" id="button-addon2"></button>
                                </div>
                            </div>




                            <div class="d-flex justify-content-center mt-4 row">
                                <button disabled class="mdl-button mdl-js-button mdl-button--raised amber" id="quickstart-sign-in" name="signin">Ingresar</button>
                                &nbsp;&nbsp;&nbsp;
                            
                                <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup">Registrarse</button>
                                &nbsp;&nbsp;&nbsp;
                            </div>

                        
                            <div class="d-flex justify-content-center row">
                                <button class="mdl-button mdl-js-button mdl-button--raised" disabled id="quickstart-verify-email"
                                name="verify-email" style="visibility: hidden;">Verificar cuenta</button>
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            <div class="d-flex justify-content-center mt-1 row">
                                <!-- <a class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email">¿Has olvidado tu contraseña?</a> -->
                                <a class="btn-link blue-text text-darken-2" id="quickstart-password-reset" name="verify-email">¿Has olvidado tu contraseña?</a>
                                
                            </div>
                            
                        </div>
                        <div class="card-footer text-muted">
                            <div class="d-flex justify-content-center row">
                                <p id="textoexplicacion" style="visibility: hidden;">Por seguridad te enviamos un correo para que verifiquemos que es tuya la cuenta.</p>
                            </div>
                            <!-- Container where we'll display the user details -->
                            <div class="quickstart-user-details-container">
                                Estado de conexión: <span id="quickstart-sign-in-status">Desconocido</span>
                                
                                <pre><code id="quickstart-account-details"> </code></pre>
                            </div>
                            
                        </div>
                    </div>
            </div>
        <!-- </form> -->

        <div id="opcionesadministracion" style="visibility:hidden;">

            <div class="d-flex justify-content-center row">
                <h5>Relación de Usuarios con Plataformas</h5>
                
            </div>
            <div class="justify-content-center row">
                <button id="seleccionarpaneladmin" class="btn btn-primary">Entrar como Admin</button> 
            </div>
            <div class="table-responsive">
                <table id="tablarelacion" class="display table table-striped">
                    <thead>
                        <tr>
                            <th>Id plataforma</th>
                            <th>nombre</th>
                            <th>Ingreso</th>
                            <th>Id usuario</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- ---------------------------------- Script externos ---------------------------------------------- -->
    
   
    
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js"></script>
    
    <script>
       var firebaseConfig = {
            apiKey: "AIzaSyAwy17hths5YGknlot758vbfJmdvUYxlhM",
            authDomain: "templay-studios.firebaseapp.com",
            databaseURL: "https://templay-studios.firebaseio.com",
            projectId: "templay-studios",
            storageBucket: "templay-studios.appspot.com",
            messagingSenderId: "794779272524",
            appId: "1:794779272524:web:81a2242dc1484162223be9",
            measurementId: "G-CYXV1DX5QB"
        };
        firebase.initializeApp(firebaseConfig);
    </script>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script> 
    
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    

</body>

</html>

<script>

function verificaenter(e){

    var key = window.event ? e.which : e.keyCode;
    
    if (key == 13){
         toggleSignIn();
    }
    
}
    $('#tablarelacion').DataTable(
    {
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA LO QUE DESEA BUSCAR:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay rubros para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            }
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "pageLength": 10,
        "dom": '<"top"p>rt<"clear">',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }   );



    function veropcionesadministrador(){
        document.getElementById("opcionesadministracion").style.visibility = "visible";
        // consultausuarioplataformas();
    }

    function vermasopciones(){
        veropcionesadministrador();
        document.getElementById("seleccionarpaneladmin").style.visibility = "hidden";
    }
    
    $("#seleccionarpaneladmin").click(function(){
        $("#plataforma").load("paneladmin.html");
    });
    
   
    function seleccionarplataforma(idusuario,idplataforma){
        traerplataforma(idusuario,idplataforma);
    }

    function verificarusuario() 
    {
        var email = document.getElementById('email').value;

        objeto = new Object();
        objeto.email = email.trim();
        objeto.tipo = "verificar";
        var objetojson = JSON.stringify(objeto);
        M.toast({ html: 'Autenticando...', displayLength: '1000', classes: 'rounded' });

        if ($.fn.dataTable.isDataTable('#tablarelacion')) {
            var tr = $('#tablarelacion').DataTable();
        }
        
        tr.clear().draw(true);

        $.ajax({

            url: "controladores/usuariostemplay.php",
            data: { objetojson: objetojson },
            type: "post",

            success: function (data) 
            {

                if (data == "nobdd") {
                    console.log("No se conecto a la base de  datos");

                } else if (data != "[]") {

                    var cuenta = 0;
                    var esad = -1;
                    // var idencontrado=-1;

                    var dd = JSON.parse(data);
                    $.each(dd,function(key){
                        cuenta = cuenta + 1;
                        if(dd[key].esadmin == "1"){
                            esad = 1;
                        }
                        idencontrado=dd[key].idusuario;

                        tr.row.add([
                            dd[key].idplataforma,
                            dd[key].nombre,
                            "<a onclick='seleccionarplataforma(\"" + dd[key].idusuario + "\",\"" + dd[key].idplataforma + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2" + "\"><i class=" + "\"material-icons\"" + ">open_in_browser</i>",
                            dd[key].idusuario,
                            dd[key].email

                        ]).draw(false);
                    });

                    if(esad == "1"){

                        veropcionesadministrador();
                    }else
                    if(cuenta > 1)
                    {
                        vermasopciones();
                    }else{
                        traerplataforma(idencontrado,-1);
                    }
                

                    firebase.auth().signOut();
                    
                } else {
                    console.log("Otro error " + data);
                }

                
            },
            error: function (e) {
                console.log("Error:" + e);
            }
        });
    }

    function mostrarPassword() { 
        var cambio = document.getElementById("password"); 
        if (cambio.type == "password") { 
            cambio.type = "text"; 
            $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        } else { 
            cambio.type = "password"; 
            $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash'); 
        } 
    } 

    $("#button-addon2").click(function () {mostrarPassword();});

 

    
</script>