<?php
    date_default_timezone_set('America/Argentina/Mendoza');
    include "conexiones/parametrostemplay.php";

    $mysqli = new mysqli( $host,$user,$password, $dbname,$port, $socket);
    
    if($mysqli->connect_error){
        exit("nobdd");
    }

    $objetojson = json_decode($_POST['objetojson'],true);
    $email = $objetojson['email'];
    $tipo = $objetojson['tipo'];
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    $data = array();

  
    if($tipo=="alta")
    {
        $sql = "insert into " .$tabla. "(email) values('".$email."')";
        $resultado = $mysqli->query($sql);
        
        if($resultado)
        {
            echo $resultado;
        } else{
            echo "-1";
        }
    }
    else if($tipo == "baja")
    {

    }else if($tipo == "consultar")
    {
        $sql = "select * from " .$tabla. " where email = '" .$email. "'";
        $resultado = $mysqli->query($sql);
        
        if($resultado)
        {
            $resultado->data_seek(0);
            while($fila=$resultado->fetch_assoc())
            {
                array_push($data,$fila);
            }
        }
        echo json_encode($data);

    }else if($tipo == "validar")
    {


    }else if($tipo == "activar")
    {
        // $activo = $fila['activo'];
        // if($activo == true)
        // {

        // }
    }


?>