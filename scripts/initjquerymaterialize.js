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
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',function(){
        CargarFuncionalidad();
    })
}

function CargarFuncionalidad(){

    $.getScript('scripts/scrollwindow.js');

    function ira(velocidad, lugar) {
        var posicion = $("#" + lugar).offset().top;
        $("HTML, BODY").animate({ scrollTop: posicion }, velocidad);
        setTimeout(function () {
            $(".iconoarriba").css("visibility", "visible");
        }, 550);
    }

    function colapsar() {
        if (screen.width <= 991) {
            setTimeout(function () {
                $('.collapse').collapse('toggle');
            }, 650);
        }
    }

    $(document).ready(function () {

        $('.sidenav').sidenav();
        M.updateTextFields();
        $('.fixed-action-btn').floatingActionButton();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems, {
            direction: 'left'
            });
        });
        
        $("#bloque1").load("mediabloc1.html?n=18");
        
        setTimeout(() => {
            $("#bloque2").load("mediabloc2.html?n=4");
            $("#bloque3").load("mediabloc3.html?n=6");
            $("#bloque4").load("mediabloc4.html?n=7");
            $("#bloque5").load("mediabloc5.html?n=7");

            $("#divcontacto").load("contacto.html?n=6");
            $("#nuestrosclientes").load("nuestrosclientes.html?n=4");
            $(".footer").load("footer.html?n=1");



            $("#contacto").on('click', function (e) {
                colapsar();
                ira(1200, "divcontacto");
            });
            
            $(".iconoarriba").on('click', function (e) {
                ira(1200, "bm");
            });

            //Menu
            $("#mgratis").on('click', function (e) {
                ira(1200, "");
            });
            $("#mgestion").on('click', function (e) {
                ira(1200, "bloque1");
            });
            $("#mweb").on('click', function (e) {
                ira(1200, "bloque2");
            });
            $("#masesoramiento").on('click', function (e) {
                ira(1200, "bloque3");
            });
            $("#mcapacitacion").on('click', function (e) {
                ira(1200, "bloque4");
            });
            $("#mcontacto").on('click', function (e) {
                ira(1200, "divcontacto");
            });
            $("#mnosotros").on('click', function (e) {
                ira(1200, "bloque5");
            });
            
            //botones mobile
            $("#cgratis").on('click', function (e) {
                ira(1200, "");
            });
            $("#cgestion").on('click', function (e) {
                ira(1200, "bloque1");
            });
            $("#cweb").on('click', function (e) {
                ira(1200, "bloque2");
            });
            $("#casesoramiento").on('click', function (e) {
                ira(1200, "bloque3");
            });
            $("#ccapacitacion").on('click', function (e) {
                ira(1200, "bloque4");
            });
            $("#ccontacto").on('click', function (e) {
                ira(800, "divcontacto");
            });
            $("#cnosotros").on('click', function (e) {
                ira(1200, "bloque5");
            });
            //Botones flotantes
            $("#bfirarriba").on('click', function (e) {
                ira(600, "nav");
            });

            $('.collapsible').collapsible();

        }, 500);
        
    });
}

