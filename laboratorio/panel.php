<div >

    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top menu mt-2">
        <img id="logojt" src="img/logoempresa.png" alt="Empresa" class="ml-3 mr-3">
        <button class="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="my-nav" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-bullhorn"></i>Web</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a id="botpublicar" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-address-card"></i>Publicar</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-globe"></i>Vista Web</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a id="bottarjeta" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-file-invoice"></i>Anuncios web</a>
                        <a id="bottarjetaconprecio" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-file-invoice-dollar"></i>Anuncio web</a>
                        <a id="botlista" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-list-alt"></i>Lista de precios</a>
                        <a id="botbuscador" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-search"></i>Buscador</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-database"></i>Datos</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a id="botrubro" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-layer-group"></i>Rubros</a>
                        <a id="botproveedores" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-address-book"></i>Proveedores</a>
                        <a id="botclientes" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-address-book"></i>Clientes</a>
                    </div>
                </li>
                
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-store"></i>Negocio</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a id="botvender" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-shopping-cart"></i>Vender</a>
                        <a id="botcaja" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-money-bill-alt"></i>Caja</a>
                        <a id="botmovimientos" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-cubes"></i>Compra/Ajuste</a>
                        <a id="botlistastock" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-align-justify"></i>Precios y Stock</a>
                    
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-lightbulb"></i>Marketing</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a id="botbonus" class="nav-link" href="#" tabindex="-1" aria-disabled="true"><i class="fas fa-gift"></i>Bonus</a>
                        <!-- CONFIGURACION -->
                        <a class="nav-link" href="http://www.onewaybebidas.com/catalogopapel.html"  target="_BLANK" tabindex="-1" aria-disabled="true"><i class="fas fa-newspaper"></i>Catálogo papel</a>
                        <!-- CONFIGURACION FIN -->

                    </div>
                </li>

            </ul>
        </div>
    </nav>

    <div id="contenido" class="contenido center" style="padding-top: 5em;">
        <h3>Panel de Control</h3>
        <img src="img/logoempresa.png" alt="Empresa">
    </div>
 
    <p id="res"></p>
    <footer class="page-footer">
        <div class="footer-copyright">
            <div class="container">
                © 2020 Copyright
                <a class="grey-text text-lighten-4 right" href="http://www.templaystudios.com" target="_BLANK">Creado por
                    Templay Studios</a>
            </div>
        </div>
    </footer>
    


    <script src=js/scrollmenu.js></script>
    <script src=js/funciones.js></script>
    <script src=js/convertidorfecha.js></script>
</div>

<script>

$(document).ready(function ()
{
      
        $("#botpublicar").click(function(e){
            e.preventDefault();
            $("#contenido").load("publicaranuncios.html");
        });

        $("#botlista").click(function (e) {
            e.preventDefault();
            $("#contenido").load("anuncios_lista.html");
        });

        $("#botbuscador").click(function (e) {
            e.preventDefault();
            $("#contenido").load("anuncios_buscador.html");
        });

        $("#bottarjeta").click(function (e) {
            e.preventDefault();
            $("#contenido").load("anuncios_tarjeta.html");
        });

        $("#bottarjetaconprecio").click(function (e) {
            e.preventDefault();
            $("#contenido").load("anuncios_tarjeta_conprecio.html");
        });

        $("#botlistastock").click(function (e) {
            e.preventDefault();
            $("#contenido").load("anuncios_lista_stock.html");
        });

        $("#botrubro").click(function (e) {
            e.preventDefault();
            $("#contenido").load("rubros.html");
        });

        $("#botproveedores").click(function (e) {
            e.preventDefault();
            $("#contenido").load("proveedores.html");
        });

        $("#botclientes").click(function (e) {
            e.preventDefault();
            $("#contenido").load("clientes.html");
        });
        $("#botvender").click(function (e) {
            e.preventDefault();
            $("#contenido").load("vender.html");
        });

        $("#botcaja").click(function (e) {
            e.preventDefault();
            $("#contenido").load("caja.html");
        });

        $("#botmovimientos").click(function (e) {
            e.preventDefault();
            $("#contenido").load("comprasyajustes.html");
        });

        $("#botbonus").click(function (e) {
            e.preventDefault();
            $("#contenido").load("bonus.html");
        });
    });
</script>