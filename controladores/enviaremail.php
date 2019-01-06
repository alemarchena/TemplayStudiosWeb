<?php 
	ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
	$email = "info@templaystudios.com";
	$emailale = "alemarchena@gmail.com";
	$emailjuan = "juan_pacheco@outlook.com";

	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$email = $_POST["email"];
	$telefono = $_POST["telefono"];
	$mensaje = $_POST["mensaje"];

	$titulo = "Mensaje Web";
	$subtitulo = "Contacto online ";
	


	$cuerpo = "Nombre: " . $nombre . ", Apellido: " . $apellido . " - Email: " . $email . ", Teléfono: " . $telefono . " - Mensaje: " . $mensaje;

	mail($email, $titulo , $subtitulo . $cuerpo);
	mail($emailale, $titulo , $subtitulo . $cuerpo);
	mail($emailjuan, $titulo , $subtitulo . $cuerpo);

	echo "Enviado correctamente";
?>