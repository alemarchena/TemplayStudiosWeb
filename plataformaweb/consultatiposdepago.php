<?php
    date_default_timezone_set('America/Argentina/Mendoza');
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    //---------------------parametros recibidos en el POST----------------------
    $datos = json_decode($_POST['datos'],true);

    $id = $datos["id"];
    $bdd = $datos["bdd"];
    $tabla = $datos["tabla"];
    $tipo = $datos["tipo"];

    include  $bdd;
  
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

    if($mysqli->connect_error)
        exit('No se pudo conectar a la base de datos');
    
    //---------------------------insercion del anuncio-------------------------
    // Consulta
    if($tipo == "consultatodo" || $tipo == "consulta")
    {
        if($tipo == "consultatodo")
            $sql = "Select * from " .$tabla. " where 1 order by nombre asc";
        
        if($tipo == "consulta")
            $sql = "Select * from " .$tabla. " where id =" . $id . " order by nombre asc";

        $resultado  = $mysqli->query($sql);
        $data = array();
        if($resultado)
        {
            $resultado->data_seek(0);
            while($fila = $resultado->fetch_assoc())
                array_push($data,  $fila );
                
            echo json_encode($data);
        }else
            echo "consultavacia";
    }
    
    if($tipo == "alta" || $tipo == "baja")
    {
        if($tipo == "alta")
        {
            if($id==0)
            {
                if($nombre != "")
                    $sql = "INSERT INTO " .$tabla. "(nombre) values('$nombre')";
            }else
                $sql = "update " .$tabla. " set nombre = '$nombre'";
        }

        if($tipo == "baja")
            $sql = "delete from " .$tabla. " where id = $id";
        
        $resultado  = $mysqli->query($sql);
        if($resultado)
        {
            echo $resultado;
        }else{
            echo "consultavacia ".$sql;
        }
    }

     $mysqli->close();
?>
