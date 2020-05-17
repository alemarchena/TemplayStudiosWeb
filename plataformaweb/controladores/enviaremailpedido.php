<?php 

	include  'configuracion.php';
	  
	ini_set( 'display_errors', 1 );
	error_reporting( E_ALL );


	$nota = $_POST["nota"];
	$apellido = $_POST["apellido"];
	$email = $_POST["email"];
	$telefono = $_POST["telefono"];
	$mensaje = $_POST["mensaje"];
	$direccion = $_POST["direccion"];

	$titulo = "Pedido Web" . $nombreempresa;
	$subtitulo = "Detalle del Carrito";
	

	$cuerpo = "Nota: " . $nota . "\n Dirección: " . $direccion . "\n Apellido: " . $apellido . " - Email: " . $email . ", Telefono: " . $telefono . "\n Pedido: " . $mensaje . "\n";
	
	mail($emailtemplay, $titulo , $subtitulo . $cuerpo);

	if($emailempresa != "")
		mail($emailempresa, $titulo , $subtitulo . $cuerpo);

	if($emailencargado != "")
		mail($emailencargado, $titulo , $subtitulo . $cuerpo);
	
	
	if($email != "")
	{
		$mensajealcliente = "Muchas gracias por contactarnos, por favor no conteste este mensaje, en breve nos comunicaremos con usted. Saludos cordiales.";
		$subtituloalcliente = "Respuesta automática.";
		$tituloalcliente = "Contacto con " .$nombreempresa. ".";
		mail($email, $tituloalcliente , $subtituloalcliente . $mensajealcliente);
		echo "Enviado correctamente";
	}else
		echo "No enviado";

?>