var altura = $('.menu').offset().top;
var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo


$(window).on('scroll', function(){
	if ( $(window).scrollTop() > altura ){
		$('.menu').addClass('menu-fixed');
	}
	else{
		$('.menu').removeClass('menu-fixed');
	}
	
});

//--------------------------SCROLL DEL MENU ----------------------------------------------
$("#inicio").on('click',function(e){ e.preventDefault(); $("html, body").animate({ scrollTop: 0 }, 800); });

	
$("#menumultimedia").on('click',function(e){var posmultimedia = $("#seccionmultimedia").offset().top - alturamenu ; e.preventDefault(); $("html, body").animate({scrollTop:posmultimedia }, 800); $("#listamultimedia").addClass('flipInX animated'); });

$("#menudisenio").on('click', function(e){var posdisenio = $("#secciondisenio").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posdisenio}, 800);});

$("#menuproyectosweb").on('click', function(e) {var posproyectosweb = $("#seccionproyectosweb").offset().top - alturamenu ; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posproyectosweb}, 800);});

$("#menuapps").on('click', function(e) {var posapps = $("#seccionapps").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posapps}, 800);});

$("#menuclientes").on('click', function(e) {var posclientes = $("#seccionclientes").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: posclientes}, 800);});

$("#subcontenedorcontacto").load("contacto.php");

$("#menucontacto").on('click', function(e) {var poscontacto = $("#seccioncontacto").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto}, 800);});

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