var altura = $('.menu').offset().top;
var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
var velocidadscroll = 600;

//-------------------------------------------controla lo que aparece o no segun el scroll ----------------------
$(window).on('scroll', function () {

	if ($(window).scrollTop() > 350) 
		$("#seccionbusqueda").css("display", "none");
	else
		$("#seccionbusqueda").css("display", "block");
});
//--------------------------SCROLL DEL MENU ----------------------------------------------
$("#inicio").on('click', function (e) { e.preventDefault(); $("html, body").animate({ scrollTop: 0 }, velocidadscroll); });
$("#home").on('click', function (e) { e.preventDefault(); $("html, body").animate({ scrollTop: 0 }, velocidadscroll); });

$("#menunegocio").on('click', function(e) {
	
	e.preventDefault(); 
	$("html, body").animate({ scrollTop: 0}, velocidadscroll * 1.2);
	$(".navbar-collapse").collapse("hide");
});
$("#menuubicacion").on('click', function(e) {
	var posclientes = $("#seccionubicacion").offset().top - alturamenu; 
	e.preventDefault(); 
	$("HTML, BODY").animate({ scrollTop: posclientes}, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});
$("#menucontacto").on('click', function(e) {var poscontacto = $("#seccioncontacto").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto}, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});
$("#menuanuncios").on('click', function (e) {
	var poscontacto = $("#seccionnovedades").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});
$("#menuproductos").on('click', function (e) {
	var poscontacto = $("#vervineria").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#menugaleria").on('click', function (e) {
	var poscontacto = $("#seccionnovedades").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});


$("#menuofertas").on('click', function (e) {
	var poscontacto = $("#seccionnovedades").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});
//----------------------------------------------------- PANEL PUBLICACION -------------------------------------------------
$("#botpublicar").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#bottarjeta").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});


$("#botlista").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botrubro").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botproveedores").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botclientes").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botvender").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botcaja").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});

$("#botbonus").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
	$(".navbar-collapse").collapse("hide");
});
$("#botlistastock").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botonobservaciones").on('click', function (e) {
	var poscontacto = $("#areaobservaciones").offset().top; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});
$("#botoncomentarios").on('click', function (e) {
	var poscontacto = $("#areacomentarios").offset().top; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});


//------------------------------- MOUSE SOBRE LA SECCION produce EFECTO EN EL MENU ----------------------------------------------

$("#seccionnovedades").mousemove(function (event) { $("#opciones").addClass('bounceIn animated'); });
$("#seccionnovedades").mouseleave(function (event) { $("#opciones").removeClass('bounceIn animated');});

$("#seccionubicacion").mousemove(function( event ) {$("#menuubicacion").addClass('bounceIn animated');});
$("#seccionubicacion").mouseleave(function( event ) {$("#menuubicacion").removeClass('bounceIn animated');});

$("#seccioncontacto").mousemove(function( event ) {$("#menucontacto").addClass('bounceIn animated');});
$("#seccioncontacto").mouseleave(function( event ) {$("#menucontacto").removeClass('bounceIn animated');});

