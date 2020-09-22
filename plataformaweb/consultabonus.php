<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    $bdd = $_POST['bdd'];
    include  $bdd;

    $tabla= $_POST['tabla'];

    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }

    //---------------------parametros recibidos en el POST----------------------
        $tipo = $_POST['tipo'];
        $bonusestablecido = $_POST['bonusestablecido'];
       
    //---------------------------insercion del anuncio-------------------------
    // Consulta
    if($tipo == "consultar")
    {
        $sql = "Select bonusestablecido from " .$tabla. " where 1";
        $resultado  = $mysqli->query($sql);
        $fila = $resultado->fetch_assoc();
        echo ($fila["bonusestablecido"]);
     
    }else if($tipo == "actualizar")
    {
        $sql = "update " .$tabla. " set bonusestablecido = '$bonusestablecido '";
        $resultado  = $mysqli->query($sql);
        echo $resultado;
        
    }else if($tipo == "alta")
    {
        $sql = "insert into " .$tabla. "(bonusestablecido) values('$bonusestablecido ')";
        $resultado  = $mysqli->query($sql);
        echo $resultado;
        
    }
    $mysqli->close();
?>
