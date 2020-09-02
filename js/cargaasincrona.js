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
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js');

    $(document).ready(function () {
       
        var contactooacerca = false;
        $("#contactar").click(function () {
            $("#contenedorcontactoacercade").load("contacto.html");
            contactooacerca = true;
        });
        $("#acercade").click(function () {
            $("#contenedorcontactoacercade").load("acercade.html");
            contactooacerca = true;
        });

        function ira() {
            var posproyectosweb = $("#contenedorcontactoacercade").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function () {
                $(".iconoarriba").css("visibility", "visible");

            }, 550);
            
        }
        function irarriba() {
            var posproyectosweb = $(".listamenu").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function(){
                $("#contenedorcontactoacercade").empty();
                $(".iconoarriba").css("visibility", "hidden");

            },550);
        }

        $("#contactar").on('click', function (e) {
            ira();
        });
        $("#acercade").on('click', function (e) {
            ira();
        });
     
        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });

        setTimeout(function () {

            //Carga el archivo con las particulas
            loadScript('js/dat.gui.min.js', function () { loadScript('js/particulas.js') });

        }, 1200);

        

        window.addEventListener("scroll", Esfumar);

        function Esfumar() {

            var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            if (scrollpercent < 20)
                $("#contenedorcontactoacercade").css("opacity",scrollpercent);
            else
                $("#contenedorcontactoacercade").css("opacity", "1");
        }

    });
}

addEvent(window, 'load', function () { loadScript('https://code.jquery.com/jquery-3.3.1.min.js',
    function(){ 
        //console.log("Jquery cargado");
        CargarMaterilizeYcontacto();   
});



});