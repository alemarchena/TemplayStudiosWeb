<?php 
	ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );

    date_default_timezone_set('America/Argentina/Mendoza');

    header('content-type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");

    //CONFIGURACION INICIO
    // $emailtemplay = "alemarchena@gmail.com";
    //CONFIGURACION FIN
    
    if (isset($_POST['email'])) {
        $emailnuevo = $_POST["email"];
    }else
    {
        $emailnuevo = null;
    }

    if($emailnuevo!= null)
    {
        mail($emailtemplay, "Nuevo usuario Templay" , "Email de ingreso:", $emailnuevo );

        echo "Revise su casilla de correo " . $emailnuevo . "-";
    }else
    {
        echo "Hubo un problema para autenticar.";
    }
?>