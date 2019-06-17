<?php 
	ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
	$emailtemplay = "info@templaystudios.com";
	$emailale = "alemarchena@gmail.com";
	

	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$email = $_POST["email"];
	$telefono = $_POST["telefono"];
	$mensaje = $_POST["mensaje"];

	$titulo = "Mensaje Web";
	$subtitulo = "Contacto online ";
	

	$cuerpo = "Nombre: " . $nombre . ", Apellido: " . $apellido . " - Email: " . $email . ", Teléfono: " . $telefono . " - Mensaje: " . $mensaje;


	mail($emailtemplay, $titulo , $subtitulo . $cuerpo);
	mail($emailale, $titulo , $subtitulo . $cuerpo);


	$mensajealcliente = "Muchas gracias por contactarnos, por favor no conteste este mensaje, en breve nos comunicaremos con usted. Saludos cordiales.";
	$subtituloalcliente = "Respuesta automática.";
	$tituloalcliente = "Contacto con Templay Studios.";
	mail($email, $tituloalcliente , $subtituloalcliente . $mensajealcliente);

	echo "Enviado correctamente";
?>