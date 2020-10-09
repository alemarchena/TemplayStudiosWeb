<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $bdd = $_POST['bdd'];
    include  $bdd;
    $tabla= $_POST['tabla'];
    
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    //--------------------------- Acciones -------------------------

    $paquete = $_POST['paquete'];
    $contador = 0;

    foreach ($paquete as $i => $value) 
    {
        $objetoanuncio = json_decode($paquete[$i],true);

        $id         = $objetoanuncio['id'];
        $idrubro    = $objetoanuncio['idrubro'];

        $sql = "update " .$tabla. " set idrubro = '$idrubro' where id= $id";
        $resultado = $mysqli->query($sql);
        if($resultado)$contador = $contador + 1;
    }

    echo $contador;
    $mysqli->close();
?>
