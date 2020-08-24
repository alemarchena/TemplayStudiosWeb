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
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js', 
    function () { 
        // console.log("Listo materialize js");

        $(document).ready(function () {
            // console.log("Materialize cargado");

            
            $('.scrollspy').scrollSpy();
            
            $('input.autocomplete').autocomplete({
                data: {
                    "Apple": null,
                    "Microsoft": null,
                    "Google": 'https://placehold.it/250x250'
                },
            });

            $("#contactar").click(function () {
                $("#contenedorcontactoacercade").load("contacto.html");
            });
            $("#acercade").click(function () {
                $("#contenedorcontactoacercade").load("acercade.html");
            });

            function ira(){
                var posproyectosweb = $("#contenedorcontactoacercade").offset().top;
                $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600); 
            }
            $("#contactar").on('click', function (e) { 
                ira();
            });
            $("#acercade").on('click', function (e) {
                ira();
            });

            
        });
    });
}

addEvent(window, 'load', function () { loadScript('https://code.jquery.com/jquery-3.3.1.min.js',
    function(){ 
        //console.log("Jquery cargado");
        CargarMaterilizeYcontacto();
});

//Carga el archivo con las particulas
loadScript('js/dat.gui.min.js',function () { loadScript('js/particulas.js') });

});