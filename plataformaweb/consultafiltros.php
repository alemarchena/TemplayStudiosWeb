<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $filtro = json_decode($_POST['filtro'],true);

    $bdd = $filtro["bdd"];
    include  $bdd;
    $tipo = $filtro['tipo'];
    $tabla= $filtro['tabla'];
    
    $idfiltro = $filtro["id"];
    $id=$idfiltro;
    $nombrefiltro = $filtro["nombrefiltro"];
    

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
       

    //-------------------------------- Acciones --------------------------


    if($tipo == "consultatodosanuncios" || $tipo == "consulta")
    {
        if($tipo == "consultatodosanuncios")
            $sql = "Select * from " .$tabla. " where 1 order by nombrefiltro asc";
        else if( $tipo == "consulta" ){
            $sql = "Select * from " .$tabla. " where idfiltro =" . $id . " order by nombrefiltro asc";
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
        {
            echo "consultavacia";
        }
    }else if($tipo == "alta" || $tipo == "baja")
    {
        if($tipo == "alta")
        {
            if($id==0)
            {
                $sql = "INSERT INTO " .$tabla. "(nombrefiltro) values('$nombrefiltro')";
            }else{
                $sql = "update " .$tabla. " set nombrefiltro = '$nombrefiltro' where idfiltro= $id";
            }
        }else if( $tipo == "baja")
        {
            $sql = "delete from " .$tabla. " where idfiltro = $id";
        }


        $resultado = $mysqli->query($sql);
        if($resultado)
        {
            echo $resultado;
        }else{
            echo "consultavacia";
        }
    }
 
    $mysqli->close();
?>
