function addEvent(element, event, fn) {
    if (element.addEventListener) {
        element.addEventListener(event, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, fn);
    }
}

//Carga una función de forma asíncrona
function loadScript(src, callback) {
    var s,
        r,
        t,
        write;

    write = src.split("/");
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;

    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            if (callback !== undefined) {
                callback();
            }
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

function reemplazar() {
    var imagen = document.getElementById('flecha').src = "images/icoarriba_a.png";
}


function iniciar() {

    var imagen = document.getElementById('flecha');

    imagen.addEventListener('mouseover', reemplazar, false);
    imagen.addEventListener('mouseout', restaurar, false);
}

function restaurar() {
    var imagen = document.getElementById('flecha').src = "images/icoarriba_0.png";
}

function CargarMaterilizeYcontacto(){
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js');

    $(document).ready(function () {
       
        var contactooacerca = false;
        $("#contactar").on('click', function (e) {
            $("#contenedorcontactoacercade").load("contacto.html");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
        });
        $("#acercade").on('click', function (e) {
            $("#contenedorcontactoacercade").load("acercade.html");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
           
        });
        $("#contactaro").on('click', function (e) {
            $("#contenedorcontactoacercade").load("contacto.html");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
        });

        $("#acercadeo").on('click', function (e) {
            $("#contenedorcontactoacercade").load("acercade.html");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
        });

        function ira(velocidad) {
            var posproyectosweb = $("#contenedorcontactoacercade").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, velocidad);
            setTimeout(function () {
                $(".iconoarriba").css("visibility", "visible");

            }, 550);
            $("#contenedorcontactoacercade").css("opacity", 1);

            
        }
        function iracapacitar(velocidad) {
            var posproyectosweb = $("#divcapacitacion").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, velocidad);
            setTimeout(function () {
                $(".iconoarriba").css("visibility", "visible");

            }, 550);
            $("#divcapacitacion").css("opacity", 1);


        }
        function irarriba() {
            var posproyectosweb = $(".listamenu").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function(){
                $("#contenedorcontactoacercade").empty();
            },550);
            contactooacerca = false;

        }

      
        $("#capacitar").on('click', function (e) {
            cargarformulario();
            iracapacitar(1200);
        });

       
       
        $("#capacitaro").on('click', function (e) {
            cargarformulario();
            iracapacitar(1200);
        });

        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });

        setTimeout(function () {

            //Carga el archivo con las particulas
            loadScript('js/dat.gui.min.js', function () { loadScript('particulas.js?1') });
            setTimeout(function(){desaparececontrol()},1000);
        }, 1200);

        function desaparececontrol(){
            var elem = document.getElementsByClassName("close-button");
            elem[0].style.visibility = "hidden";
        }

        window.addEventListener("scroll", Esfumar);

        function Esfumar() {

            var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

            if (scrollpercent < 10)
            {
                $("#contenedorcontactoacercade").css("opacity", scrollpercent);
                $(".claseesfumada").css("opacity",scrollpercent/3);
            }
            else
            {
                $("#contenedorcontactoacercade").css("opacity", "1");
                $(".claseesfumada").css("opacity", 1);
            }
        }

       
        iniciar();

        function cargarformulario(){

            $("#contenedorcontactoacercade").load("capacitacion.html");
        }
        $("#cursos").on("click",function(){

            cargarformulario();
        });
        $("#divcursos").load("cursos.html");
        setTimeout(function () { $('.sidenav').sidenav(); }, 500);


    });

}

    addEvent(window, 'load', function () { loadScript('https://code.jquery.com/jquery-3.3.1.min.js',
        function(){ 

        CargarMaterilizeYcontacto();   
    });

    
});