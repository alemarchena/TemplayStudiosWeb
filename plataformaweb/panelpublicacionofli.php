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


    <script>r = Math.random();version=23;</script>


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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.6/xlsx.full.min.js"></script>
    
    <script src="configuracion.js?" + r></script>
    <script type="text/javascript">
   
    versionts = 180;
    tablaanuncios           = "";
    tablarubros             = "";
    tablaventas             = "";
    tablaclientes           = "";
    tablaproveedores        = "";
    tablabonus              = "";
    tablacompras            = "";
    tablaajustes            = "";
    tablaproveedoresanuncios= "";
    tablaunidadesgranel     = "";
    tablabloqueos           = "";
    conexionbdd             = "";
    tablatiposdepago        = "";
    tablatiposdemovimientos = "";
    tablafiltros            = "";
    tablacajas              = "";
    rutaimagenes            = "";
    idencontrado            = -1;
    emailingreso            = "";
    jerarquia               = ""
    idplataformaactual      = "";
        /**
         * INGRESO AL SISTEMA.
         */
        function toggleSignIn() {
           verificarusuario();

            // if (firebase.auth().currentUser) {
            //     // [START signout]
            //     firebase.auth().signOut();

            //     // [END signout]
            // } else {
            //     var email = document.getElementById('email').value;
            //     var password = document.getElementById('password').value;
            //     if (email.length < 4) {
            //         swal("Atención", "Ingrese una dirección de email!");
            //         return;
            //     }
            //     if (password.length < 4) {
            //         swal("Atención", "Ingrese una clave!");

            //         return;
            //     }

            //     firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //         if (errorCode === 'auth/wrong-password') {
            //             swal("Contraseña", "La clave es incorrecta.");
            //         } else {
            //             swal("Error", "No existe un usuario con este email");
            //         }
            //         console.log(error);
            //         document.getElementById('quickstart-sign-in').disabled = false;
            //     });
            // }
            // document.getElementById('quickstart-sign-in').disabled = true;
        }

        /**
         * REGISTRO NUEVO EN EL SISTEMA.
         */

         function consultarusuario() {

            var email = document.getElementById('email').value;


            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "consultar";
            objeto.id = 0;
            objeto.idplataformaagregada = "";

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

            if (email.length < 4) {
                swal("Email", "Por favor ingrese una dirección de correo.");
                return;
            }
           

            
            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "alta";
            objeto.idplataformaagregada = "";
            objeto.id = 0;
            var objetojson = JSON.stringify(objeto);

            M.toast({ html: 'Trabajando...' });

            $.ajax({

                url:"controladores/usuariostemplay.php?1",
                data: {objetojson: objetojson},
                type: "post",

                success: function(data)
                {
                   if(data=="nobdd")
                    {
                        console.log("No se conecto a la base de  datos");
                   
                    }else if (data == "1"){
                        console.log("Usuario creado");
                        // handleSignUp();
                        //swal("Usuario Creado!", "Presione 'Verificar cuenta' para continuar!");
                        M.toast({ html: 'Usuario Creado', displayLength: '1000', classes: 'rounded' });


                    }else{
                        console.log("Otro error " + data);
                    }
                },
                error:function(e){
                    console.log("Error:" + e);
                }
            });
            
        }
        
        function eliminarusuario() {

            var email = document.getElementById('email').value;

            objeto = new Object();
            objeto.email = email.trim();
            objeto.tipo = "baja";
            objeto.idplataformaagregada = "";
            objeto.id = 0;
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

                url: "controladores/usuariostemplay.php?1",
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
                            tablafiltros = dd[key].tablafiltros;
                            tablacajas = dd[key].tablacajas;
                            rutaimagenes = dd[key].rutaimagenes;
                            dominio = dd[key].dominio;
                           

                        });
                        
                        console.log(empresa);
    
                        $("#plataforma").load("panel.html?"+ versionts);
                    }    
                },error: function(e){
                    swal("Atención", "Si aún no ha verificado la cuenta, presione el botón verificar!");

                    console.log("Error " + e );
                }
            });
        } 

        function initOffline(){
            document.getElementById('quickstart-sign-in').disabled = false;
            document.getElementById('quickstart-sign-up').disabled = false;
            document.getElementById('quickstart-sign-up').addEventListener('click', consultarusuario, false);
        }
        
        window.onload = function () {
            initOffline();
        };


    </script>
</head>

<!-- ---------------------------------------------- BODY ------------------------------------------------------ -->

<body>
    <div id="panelcolor" class="fixed-top" style="background-color: #2E9AFE; height: 300px;z-index: -1"></div>

    <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

 
  
    <div id="plataforma"class="mt-5">
            <div  class="col-sm-4 offset-sm-4">
                    <div id="tarjeta" class="card text-center">
                        <div class="card-header">
                            Autenticación
                        </div>
                        <div class="">
                            <h5 class="card-title">Panel de control</h5>
                            
                            
                            <hr>
                            <div class="d-flex justify-content-center mt-4 row">
                                <input class="mdl-textfield__input center"  onKeyUp="return verificaenter(event)" style="display:inline;width:65%;" type="text" id="email" name="email"
                                placeholder="Email: info@templaystudios.com" value=""/>
                                &nbsp;&nbsp;&nbsp;
                            </div>
                           



                            <div class="d-flex justify-content-center mt-4 row">
                                <button disabled class="mdl-button mdl-js-button mdl-button--raised amber" id="quickstart-sign-in" name="signin">Ingresar</button>
                                &nbsp;&nbsp;&nbsp;
                                <button disabled class="mdl-button mdl-js-button mdl-button--raised amber" id="quickstart-sign-up" name="signin">Registrarse</button>
                                &nbsp;&nbsp;&nbsp;
                            
                               
                            </div>

                        
                            
                        </div>
                       
                    </div>
            </div>

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
        idplataformaactual = idplataforma;

        traerplataforma(idusuario,idplataforma);

    }

    function verificarusuario() 
    {
        var email = document.getElementById('email').value;

        objeto = new Object();
        objeto.email = email.trim();
        objeto.tipo = "verificar";
        objeto.idplataformaagregada = "";
        objeto.id = 0;
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
                        jerarquia=dd[key].jerarquia;

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

 
            
    $("#quickstart-sign-in").click(function(){verificarusuario();});
    
</script>