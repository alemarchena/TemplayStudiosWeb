function checkCookietabaqueria(nombre, conprecio) {
  var name = nombre;
  var cuqui = getCookie(name);
  if (cuqui == 1) {
    setTimeout(function () {
      abreTabaqueria(conprecio);
    }, 500);
    return;
  }else
  {
    
    M.toast(
      {
        html: 'Por favor declare su edad!!!',
        displayLength: '3000'
      });
    ocultatabaqueria();
  }
}

function abreTabaqueria(conprecio) {
  

  if (conprecio == "si"){

    $("#seccionbuscados").load("anuncios_tarjeta_conprecio.html");
  }
  else{
    $("#seccionbuscados").load("anuncios_tarjeta.html");
  }
  document.getElementById("declaracion").style.display = "none";

  
}

function ocultatabaqueria() {

  $("#vervineria").hide();
  document.getElementById("declaracion").style.visibility = "visible";

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays, conprecio) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  document.getElementById("declaracion").style.display = "none";

  if (conprecio == "si") {

    $("#seccionbuscados").load("anuncios_tarjeta_conprecio.html");
  }
  else {
    $("#seccionbuscados").load("anuncios_tarjeta.html");
  }



}







// ------------------------------------ cuqui para suscripciones ---------------------------------------

function checkCookie() {
  var suscripcion = getCookie("popDisplayedTabaqueria");
  if (suscripcion == 1) {
   
   //alert("Bienvenido al sitio");
   return;

  } else {
    
    setTimeout( function() {
            subscriptionPopup();
        },10000);
    
  }
}


function subscriptionPopup(){
    // get the mPopup
    var mpopup = $('#mpopupBox');
    
    // open the mPopup
    mpopup.show();
    
    // close the mPopup once close element is clicked
    $(".close").on('click',function(){
        mpopup.hide();
    });
    
    // close the mPopup when user clicks outside of the box
    $(window).on('click', function(e) {
        if(e.target == mpopup[0]){
            mpopup.hide();
        }
    });
    
    

}