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

function CargarMaterilizeYcontacto(){

    
    $(document).ready(function () {

        $("#plataforma").click(function () {
            $("#seccionproyectos").load("explicaplataforma.html");
        });
        $("#paneldecontrol").click(function () {
            $("#seccionproyectos").load("explicapanel.html");
        });

        function ira() {
            var posproyectosweb = $("#seccionproyectos").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
        }
        $("#plataforma").on('click', function (e) {
            ira();
        });
        $("#paneldecontrol").on('click', function (e) {
            ira();
        });


    });
}

addEvent(window, 'load', function () {

    CargarMaterilizeYcontacto();
    // loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',function () {        });
});