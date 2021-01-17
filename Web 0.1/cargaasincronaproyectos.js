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

        $('.sidenav').sidenav();
        $(".footer").load("footer.html");
        $("#contenedorcontactoacercade").load("contacto.html?3");
        $("#nuestrosclientes").load("nuestrosclientes.html?n=3");

        function ira() {
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function () {
                $(".iconoarriba").css("visibility", "visible");

            }, 550);
        }
        
        function irarriba() {
            var posproyectosweb = $(".listamenu").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            
        }
        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });

    });

}

addEvent(window, 'load', function () {
    loadScript("https://code.jquery.com/jquery-3.5.1.js",function () { 
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js', function () { 
            CargarMaterilizeYcontacto();
        });
    });
    
});