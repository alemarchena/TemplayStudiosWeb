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
       
        $("#contenedorcontacto").load("contacto.html?1");
        $(".footer").load("footer.html");

        setTimeout(function () {

            //Carga el archivo con las particulas
            loadScript('js/dat.gui.min.js', function () { loadScript('particulas.js?2') });
            setTimeout(function(){desaparececontrol()},1000);
        }, 1200);

        function desaparececontrol(){
            var elem = document.getElementsByClassName("close-button");
            elem[0].style.visibility = "hidden";
        }


        window.addEventListener("scroll", Esfumar);

        function Esfumar() {

            var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            if (scrollpercent < 0.2)
            {
                $("#contenedorcontacto").css("opacity", scrollpercent);
                $(".claseesfumada").css("opacity",scrollpercent * 4);
            }
            else
            {
                $("#contenedorcontacto").css("opacity", "1");
                $(".claseesfumada").css("opacity", 0.86);
            }
        }

       
        //iniciar();

        function irarriba() {
            var posproyectosweb = $(".listamenu").offset().top;
            $("HTML, BODY").animate({ scrollTop: posproyectosweb }, 600);
           
            contactooacerca = false;
        }

        $(".iconoarriba").on('click', function (e) {
            irarriba();
        });

        setTimeout(function () { $('.sidenav').sidenav(); }, 500);


    });

}

    addEvent(window, 'load', function () { loadScript('https://code.jquery.com/jquery-3.3.1.min.js',
        function(){ 

        CargarMaterilizeYcontacto();   
    });

    
});