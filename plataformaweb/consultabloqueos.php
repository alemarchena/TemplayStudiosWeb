<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    $objeto = json_decode($_POST['objeto'],true);

    $bdd = $objeto["bdd"];
    include  $bdd;
    $tabla = $objeto['tabla'];
    $tipo = $objeto['tipo'];
    $id = $objeto['id'];


    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }

   
    // Consulta
    if($tipo == "consultar")
    {
        $sql = "Select bloqueo from " .$tabla. " where idusuario = " . $id;
        $resultado  = $mysqli->query($sql);
        
        if($resultado)
        {
            $data = array();
            $resultado->data_seek(0);

            while($fila = $resultado->fetch_assoc())
            {
                array_push($data,  $fila );
            }

            echo json_encode($data);
        }else
        {
            echo "consultavacia";
        }
     
            // }else if($tipo == "actualizar")
            // {
            //     $sql = "update " .$tabla. " set bonusestablecido = '$bonusestablecido '";
            //     $resultado  = $mysqli->query($sql);
            //     echo $resultado;
                
            // }else if($tipo == "alta")
            // {
            //     $sql = "insert into " .$tabla. "(bonusestablecido) values('$bonusestablecido ')";
            //     $resultado  = $mysqli->query($sql);
            //     echo $resultado; 
    }
    $mysqli->close();
?>
