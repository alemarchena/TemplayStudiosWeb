<?php
    header('content-type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
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
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    //---------------------parametros recibidos en el POST----------------------
        $tipo = $_POST['tipo'];
        $id = $_POST['id'];
        $rubro = $_POST['rubro'];
    //---------------------------insercion del anuncio-------------------------
    // Consulta
    if($tipo == "consultatodosanuncios")
    {
        $sql = "Select * from " .$tabla. " where 1";
        $resultado  = $mysqli->query($sql);
        $data = array();
        if($resultado)
        {
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
    }else if($tipo == "consulta")
    {
        $sql = "Select * from " .$tabla. " where idrubro =" . $id;
        $resultado  = $mysqli->query($sql);
        $data = array();
        if($resultado)
        {
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
    }else if($tipo == "alta")
    {
        if($id==0)
        {
            if(titulo != "")
            {
                $sql = "INSERT INTO " .$tabla. "(nombrerubro) values('$rubro')";
                $resultado = $mysqli->query($sql);
                if($resultado)
                {
                    echo $resultado;
                }else{
                    echo "consultavacia ".$sql;
                }
            }
        }else{
            $sql = "update " .$tabla. " set nombrerubro = '$rubro' where idrubro= $id";
            $resultado  = $mysqli->query($sql);
            echo $resultado;
        }
    }else if($tipo == "baja")
    {
        $sql = "delete from " .$tabla. " where idrubro = $id";
        $resultado  = $mysqli->query($sql);
        echo $rutaimagenes.$imagen;
    }
 
?>
