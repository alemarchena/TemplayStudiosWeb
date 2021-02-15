<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    $objeto = json_decode($_POST['objeto'],true);
    $bdd = $objeto["bdd"];
    include  $bdd;

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }

   
    $tabla          = $objeto['tabla'];
    $tipo           = $objeto['tipo'];
    $id             = $objeto['id'];
    $bloqueo        = $objeto['bloqueo'];

    if($tipo == "consultapaquete"){
        $arreglousuario = $_POST['arreglousuario'];
    }


    // Consulta
    if($tipo == "consultar" )
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
    }else if($tipo == "consultapaquete"){

        $data = array();
        
        foreach ($arreglousuario as $i => $value) 
        {
            $objeto = json_decode($arreglousuario[$i],true);
            $idusuario = $objeto['idusuario'];
           
            $sql = "Select idusuario,bloqueo from " .$tabla. " where idusuario = " . $idusuario;
            $resultado  = $mysqli->query($sql);
            
            if($resultado)
            {
                $resultado->data_seek(0);

                while($fila = $resultado->fetch_assoc())
                {                   
                    array_push($data,  $fila );
                }
            }
        }

        echo json_encode($data);

    }else if ($tipo == "alta")
    {
        $sql = "insert into " .$tabla. "(idusuario,bloqueo) values('$id','$bloqueo')";
        $resultado  = $mysqli->query($sql);
        echo $resultado; 
    }else if ($tipo == "baja")
    {
        $sql = "delete from " .$tabla. " where idusuario = " . $id . " and bloqueo = " . $bloqueo ;
        $resultado  = $mysqli->query($sql);
        echo $resultado; 
    }

    $mysqli->close();
?>
