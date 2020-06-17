<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');
   //---------------------parametros recibidos en el POST----------------------

    $objetorubro = json_decode($_POST['objetorubro'],true);
    
    $bdd = $objetorubro['bdd'];
    include  $bdd;

    $tabla= $objetorubro['tabla'];
    $tablaanuncios= $objetorubro['tablaanuncios'];
    $tipo = $objetorubro['tipo'];
    $id = $objetorubro['id'];
    $rubro = $objetorubro['rubro'];

    //-----------------conectando con la base de datos---------------------

    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
        
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    //---------------------------insercion del anuncio-------------------------
    // Consulta
    if($tipo == "consultatodosanuncios" || $tipo == "consulta" || $tipo == "consultarubroenanuncios")
    {
        if($tipo == "consultatodosanuncios" ){
            $sql = "Select * from " .$tabla. " where 1 order by nombrerubro asc";
        }else if($tipo == "consulta"){
            $sql = "Select * from " .$tabla. " where idrubro =" . $id . " order by nombrerubro asc";
        }else if($tipo == "consultarubroenanuncios"){
            $sql = "Select * from " .$tablaanuncios. " where idrubro =" . $id. " order by nombrerubro asc";
        } 

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
        { echo "consultavacia";}
        
    }else if($tipo == "alta")
    {
        if($id==0)
        {
            if($rubro != "")
            {
                $sql = "INSERT INTO " .$tabla. "(nombrerubro) values('$rubro')";
                $resultado = $mysqli->query($sql);
                if($resultado)
                {
                    echo $resultado;
                }else{
                    echo "consultavacia".$sql;
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
