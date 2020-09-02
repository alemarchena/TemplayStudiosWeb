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

    var link0 = "https://www.templaystudios.com/";
    var link1 = "https://www.templaystudios.com/plataformawebdemo/";
    var link2 = "https://www.templaystudios.com/plataformawebdemo/panelpublicacion.php";

    $(document).ready(function () {

        $('.sidenav').sidenav();

        $("#plataforma").click(function () {
            $("#seccionproyectos").load("explicaplataforma.html");
        });
        $("#paneldecontrol").click(function () {
            $("#seccionproyectos").load("explicapanel.html");
        });

        function ira() {
            var posproyectosweb = $("#seccionproyectos").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function () {
                $(".iconoarriba").css("visibility", "visible");

            }, 550);
        }
        
        $("#plataforma").on('click', function (e) {
            ira();
        });
        $("#paneldecontrol").on('click', function (e) {
            ira();
        });

        function irarriba() {
            var posproyectosweb = $(".listamenu").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
            setTimeout(function () {
                $("#contenedorcontactoacercade").empty();
            }, 550);
        }
        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });

        function asignarrutas() {

            document.getElementById("home").href = link0;
            document.getElementById("link5").href = link0;
            document.getElementById("link1").href = link1;
            document.getElementById("link2").href = link2;
            document.getElementById("link3").href = link1;
            document.getElementById("link4").href = link2;
        }
        
        asignarrutas();
        window.addEventListener("scroll", Esfumar);

        function Esfumar() {

            var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            if (scrollpercent < 80)
                $("#seccionproyectos").css("opacity", scrollpercent);
            else
                $("#seccionproyectos").css("opacity", "1");
        }
    });

}

addEvent(window, 'load', function () {
    loadScript("https://code.jquery.com/jquery-3.5.1.js",function () { 
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js', function () { 
            CargarMaterilizeYcontacto();
        });
    });
    
});