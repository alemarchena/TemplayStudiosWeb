<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $cliente = json_decode($_POST['cliente'],true);

    $bdd = $cliente["bdd"];
    include  $bdd;
    $tipo = $cliente['tipo'];
    $tabla= $cliente['tabla'];
    $tablaventas= $cliente['tablaventas'];
    $idcliente = $cliente["id"];
    $id=$idcliente;
    $nombrecliente = $cliente["nombrecliente"];
    $direccioncliente = $cliente["direccioncliente"];
    $telefonocliente = $cliente["telefonocliente"];
    $emailcliente = $cliente["emailcliente"];
    $bonus = $cliente["bonus"];

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
       

    //-------------------------------- Acciones --------------------------


    if($tipo == "consultatodosanuncios" || $tipo == "consulta" || $tipo == "consultaclienteenventa")
    {
        if($tipo == "consultatodosanuncios")
            $sql = "Select * from " .$tabla. " where 1 order by nombrecliente desc";
        else if( $tipo == "consulta" ){
            $sql = "Select * from " .$tabla. " where idcliente =" . $id . " order by nombrecliente desc";
        }else if( $tipo == "consultaclienteenventa" ){
            $sql = "Select * from " .$tablaventas. " where idcliente =" . $id . " order by nombrecliente desc";
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
                if($nombrecliente != "")
                {
                    $sql = "INSERT INTO " .$tabla. "(nombrecliente,direccion,telefono,email) 
                    values('$nombrecliente','$direccioncliente','$telefonocliente','$emailcliente')";
                   
                }
            }else{
                $sql = "update " .$tabla. " set nombrecliente = '$nombrecliente',direccion = '$direccioncliente',telefono = '$telefonocliente',email= '$emailcliente',bonus='$bonus' where idcliente= $id";
            }
        }else
        {
            $sql = "delete from " .$tabla. " where idcliente = $id";
        }
        $resultado = $mysqli->query($sql);
        if($resultado)
        {
            echo $resultado;
        }else{
            echo "consultavacia ".$sql;
        }
    }else if($tipo == "bonussumado")
    {
        $bonuscliente = "Select bonus from " .$tabla. " where idcliente =" . $id;
        $resultadobonus  = $mysqli->query($bonuscliente);
        $fila = $resultadobonus->fetch_assoc();
        $bonussumado = $fila["bonus"] + $bonus;

        $sql = "update " .$tabla. " set bonus = '$bonussumado' where idcliente= $id";
        $resultado  = $mysqli->query($sql);
        echo $resultado;
    }else if($tipo == "bonusrestado")
    {
        $bonuscliente = "Select bonus from " .$tabla. " where idcliente =" . $id;
        $resultadobonus  = $mysqli->query($bonuscliente);
        $fila = $resultadobonus->fetch_assoc();
        $bonusrestado = $fila["bonus"] - $bonus;

        $sql = "update " .$tabla. " set bonus = '$bonusrestado' where idcliente= $id";
        $resultado  = $mysqli->query($sql);
        echo $resultado;
    }
 
    
?>
