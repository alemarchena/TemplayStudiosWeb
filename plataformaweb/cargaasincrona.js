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
/* ------------------------------------- Todo listo ------------------------------------*/

function TodoListo(){

    
    
}

function CargarCodigoPropio()
{
    loadScript('establecerparametrosweb.js',
        function () {
            $(document).ready(function () {

                TodoListo();

            });
        }
    );

   
}

    addEvent(window, 'load', function () { 
    
        CargarCodigoPropio();

});