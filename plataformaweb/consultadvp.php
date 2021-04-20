<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $bdd = $_POST['bdd'];
    include  $bdd;
    $tabla= $_POST['tabla'];
    $tipo = $_POST['tipo'];
    $numdvp = $_POST['numdvp'];
    $email = $_POST['email'];
    
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

//--------------------------- Acciones -------------------------
    $contador = 0;

    if($tipo == "alta")
    {
        $paquetedvp = $_POST['paquetedvp'];
            
        foreach ($paquetedvp as $i => $value) 
        {
            //paquetedvp es un arreglo que llega convertido a json
            $objetoanuncio = json_decode($paquetedvp[$i],true);

            $tipopago = $objetoanuncio['tipopago'];
            $monto = $objetoanuncio['monto'];
            $fechaventa = $objetoanuncio['fechaventa'];
            $fechaventacreada = date_create_from_format('dmY', $fechaventa);
            $fechaventa = date_format($fechaventacreada, 'Y-m-d');
            
            $sql = "INSERT INTO " .$tabla. "(tipopago,monto,numdvp,fecha,email) values('$tipopago','$monto','$numdvp','$fechaventa','$email')";
            
            $resultado = $mysqli->query($sql);
            if($resultado)$contador = $contador + 1;
        }
    }else if($tipo == "eliminardvp"){
        $tipopago = $_POST['tipopago'];

        $sql = "delete from " . $tabla . " where tipopago = '$tipopago' and numdvp = '$numdvp'";
        $resultado = $mysqli->query($sql);
        if ($resultado) $contador = $contador + 1;
        
    }else if($tipo == "modificardvp"){
        $monto = $_POST['monto'];
        $tipopago = $_POST['tipopago'];

        $sql = "update " . $tabla . " set monto = $monto where tipopago = '$tipopago' and numdvp = '$numdvp'";
        
        $resultado = $mysqli->query($sql);
        if ($resultado) $contador = $contador + 1;
        
    }

    echo $contador;
    $mysqli->close();
?>
