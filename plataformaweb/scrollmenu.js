var altura = $('.menu').offset().top;
var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
var velocidadscroll = 600;


//-------------------------------------------controla lo que aparece o no segun el scroll ----------------------
$(window).on('scroll', function () {

	if ($(window).scrollTop() > 32) 
	{
		$(".navbar-fixed").css("position", "absolute");
		$(".navbar-fixed").css("top", "0px");	
	}	
	else
	{
		$(".navbar-fixed").css("position", "relative");
	}

});
//--------------------------SCROLL DEL MENU ----------------------------------------------
$("#inicio").on('click', function (e) { 
	e.preventDefault();

	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});

$("#home").on('click', function (e) { 
	e.preventDefault();

	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});

$("#mayor").on('click', function (e) {
	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});

$("#menunegocio").on('click', function(e) {
	e.preventDefault(); 

	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});

$("#tituloweb").on('click', function (e) {
	e.preventDefault();

	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});



$("#menuubicacion").on('click', function(e) {
	var posclientes = $("#seccionubicacion").offset().top - alturamenu; 
	e.preventDefault(); 
	$("HTML, BODY").animate({ scrollTop: posclientes}, velocidadscroll);
});
$("#menucontacto").on('click', function(e) {
	var poscontacto = $("#seccioncontacto").offset().top - alturamenu; 
	e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto}, velocidadscroll);
});
$("#menuanuncios").on('click', function (e) {
	var poscontacto = $("#seccionnovedades").offset().top - alturamenu; 
	e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#menuofertas").on('click', function (e) {
	var poscontacto = $("#seccionpromociones").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#menucategorias").on('click', function (e) {
	var poscontacto = $("#contenedorcategoria").offset().top - (alturamenu * 2); 
	e.preventDefault(); 
	$("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});


$("#menugaleria").on('click', function (e) 
{
	var poscontacto = $("#secciongaleria").offset().top - alturamenu;
	e.preventDefault();
	$("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});


$("#menuhomeo").on('click', function (e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: 0 }, 600);
});


$("#menuofertaso").on('click', function (e) {
	var poscontacto = $("#seccionpromociones").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});
$("#menugaleriao").on('click', function (e) {
	
	var poscontacto = $("#secciongaleria").offset().top - alturamenu;
	e.preventDefault();
	$("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);

});

$("#menuubicaciono").on('click', function (e) {
	var posclientes = $("#seccionubicacion").offset().top - alturamenu;
	e.preventDefault();
	$("HTML, BODY").animate({ scrollTop: posclientes }, velocidadscroll);
});
$("#menucontactoo").on('click', function (e) {
	var poscontacto = $("#seccioncontacto").offset().top - alturamenu;
	e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#menucategoriaso").on('click', function (e) {
	var poscontacto = $("#contenedorcategoria").offset().top - (alturamenu * 2); 
	e.preventDefault(); 
	$("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});
//----------------------------------------------------- PANEL PUBLICACION -------------------------------------------------
$("#botpublicar").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#bottarjeta").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});


$("#botlista").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botrubro").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botproveedores").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botclientes").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botvender").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});
$("#botmovimientos").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});
$("#botlistastock").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});



$("#botcaja").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
});

$("#botbonus").on('click', function (e) {
	var poscontacto = $("#contenido").offset().top - alturamenu; e.preventDefault(); $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
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

