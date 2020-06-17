<?php 

	include  'configuracion.php';
	  
	ini_set( 'display_errors', 1 );
	error_reporting( E_ALL );


	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$email = $_POST["email"];
	$telefono = $_POST["telefono"];
	$mensaje = $_POST["mensaje"];

	$titulo = "Mensaje Web cliente " . $nombreempresa;
	$subtitulo = "Contacto online de un visitante";
	

	$cuerpo = " Nombre: " . $nombre . ", Apellido: " . $apellido . " - Email: " . $email . ", Telefono: " . $telefono . " - Mensaje: " . $mensaje;
	
	mail($emailtemplay, $titulo , $subtitulo . $cuerpo);


	mail($emailempresa, $titulo , $subtitulo . $cuerpo);
	mail($emailencargado, $titulo , $subtitulo . $cuerpo);
	
	

	$mensajealcliente = "Muchas gracias por contactarnos, por favor no conteste este mensaje, en breve nos comunicaremos con usted. Saludos cordiales.";
	$subtituloalcliente = "Respuesta automática.";
	$tituloalcliente = "Contacto con " .$nombreempresa. ".";
	mail($email, $tituloalcliente , $subtituloalcliente . $mensajealcliente);

	echo "Enviado correctamente";
?>