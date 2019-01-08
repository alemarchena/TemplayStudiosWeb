var altura = $('.menu').offset().top;
var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
var velocidadscroll = 600;

$(window).on('scroll', function(){
	if ( $(window).scrollTop() > altura ){
		$('.menu').addClass('menu-fixed');
	}
	else{
		$('.menu').removeClass('menu-fixed');
	}
	
});

//--------------------------SCROLL DEL MENU ----------------------------------------------
$("#inicio").on('click',function(e){ e.preventDefault(); $("html, body").animate({ scrollTop: 0 }, velocidadscroll); });

	
$("#menumultimedia").on('click',function(e){var posmultimedia = $("#seccionmultimedia").offset().top - alturamenu ; e.preventDefault(); $("html, body").animate({scrollTop:posmultimedia }, velocidadscroll); $("#listamultimedia").addClass('flipInX animated'); });

$("#menudisenio").on('click', function(e){var posdisenio = $("#secciondisenio").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posdisenio}, velocidadscroll);});

$("#menuproyectosweb").on('click', function(e) {var posproyectosweb = $("#seccionproyectosweb").offset().top - alturamenu ; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posproyectosweb}, velocidadscroll);});

$("#menuapps").on('click', function(e) {var posapps = $("#seccionapps").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posapps}, velocidadscroll);});

$("#menuclientes").on('click', function(e) {var posclientes = $("#seccionclientes").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posclientes}, velocidadscroll);});

$("#subcontenedorcontacto").load("contacto.php");

$("#menucontacto").on('click', function(e) {var poscontacto = $("#seccioncontacto").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto}, velocidadscroll);});

//------------------------------- MOUSE SOBRE LA SECCION produce EFECTO EN EL MENU ----------------------------------------------

$("#seccionmultimedia").mousemove(function( event ) {$("#menumultimedia").addClass('bounceIn animated');});
$("#seccionmultimedia").mouseleave(function( event ) {$("#menumultimedia").removeClass('bounceIn animated');});

$("#secciondisenio").mousemove(function( event ) {$("#menudisenio").addClass('bounceIn animated');});
$("#secciondisenio").mouseleave(function( event ) {$("#menudisenio").removeClass('bounceIn animated');});

$("#seccionproyectosweb").mousemove(function( event ) {$("#menuproyectosweb").addClass('bounceIn animated');});
$("#seccionproyectosweb").mouseleave(function( event ) {$("#menuproyectosweb").removeClass('bounceIn animated');});

$("#seccionapps").mousemove(function( event ) {$("#menuapps").addClass('bounceIn animated');});
$("#seccionapps").mouseleave(function( event ) {$("#menuapps").removeClass('bounceIn animated');});

$("#seccionclientes").mousemove(function( event ) {$("#menuclientes").addClass('bounceIn animated');});
$("#seccionclientes").mouseleave(function( event ) {$("#menuclientes").removeClass('bounceIn animated');});

$("#seccioncontacto").mousemove(function( event ) {$("#menucontacto").addClass('bounceIn animated');});
$("#seccioncontacto").mouseleave(function( event ) {$("#menucontacto").removeClass('bounceIn animated');});