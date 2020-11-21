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

addEvent(window, 'load',
    function () {
        loadScript('https://code.jquery.com/jquery-3.3.1.min.js', function () {
            CargarMaterilize();
        })
    }
);

function CargarMaterilize() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js');


    function ira(velocidad) {
        var posproyectosweb = $("#contenedorcontactoacercade").offset().top;
        $("HTML, BODY").animate({ scrollTop: posproyectosweb }, velocidad);
        setTimeout(function () {
            $(".iconoarriba").css("visibility", "visible");

        }, 550);
        
    }

    function iraacercade(velocidad) {
        var posproyectosweb = $("#contenedoracercade").offset().top;
        $("HTML, BODY").animate({ scrollTop: posproyectosweb }, velocidad);
        setTimeout(function () {
            $(".iconoarriba").css("visibility", "visible");

        }, 550);

    }
    function iracapacitar(velocidad) {
        var posproyectosweb = $("#divcapacitacion").offset().top;
        $("HTML, BODY").animate({ scrollTop: posproyectosweb }, velocidad);
        setTimeout(function () {
            $(".iconoarriba").css("visibility", "visible");

        }, 550);
        
    }

    function irarriba() {
        var posproyectosweb = $(".listamenu").offset().top;
        $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
        
        contactooacerca = false;
    }

    function cargarformulario() {
        $("#contenedorcontactoacercade").load("capacitacion.html");
    }

    function colapsar() {
        if (screen.width <= 991) {
            setTimeout(function () {
                $('.collapse').collapse('toggle');
            }, 650);
        }
    }
    $(document).ready(function () {

        $("#contenedoracercade").load("acercade.html?1");

        $(".footer").load("footer.html");

        var contactooacerca = false;
        $("#contactar").on('click', function (e) {
            colapsar();

            $("#contenedorcontactoacercade").load("contacto.html?1");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
        });
        $("#acercade").on('click', function (e) {
            colapsar();
            contactooacerca = true;
            setTimeout(function () {
                iraacercade(600);
            }, 550);
        });
        $("#contactaro").on('click', function (e) {
            colapsar();

            $("#contenedorcontactoacercade").load("contacto.html");
            contactooacerca = true;
            setTimeout(function () {
                ira(600);
            }, 550);
        });


        $("#acercadeo").on('click', function (e) {
            colapsar();

            contactooacerca = true;
            setTimeout(function () {
                iraacercade(600);
            }, 550);
        });

        $("#capacitar").on('click', function (e) {
            colapsar();

            cargarformulario();
            iracapacitar(1200);
        });

        $("#capacitaro").on('click', function (e) {
            colapsar();

            cargarformulario();
            iracapacitar(1200);
        });

        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });


        $("#cursos").on("click", function () {

            cargarformulario();
        });

        $("#divcursos").load("cursos.html?2");
        setTimeout(function () { $('.sidenav').sidenav(); }, 500);

        
    });
}



