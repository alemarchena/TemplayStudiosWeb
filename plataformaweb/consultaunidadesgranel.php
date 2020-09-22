<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $unidades = json_decode($_POST['objeto'],true);
    
    $bdd = $unidades["bdd"];
    include  $bdd;
    $tipo = $unidades['tipo'];
    $tabla= $unidades['tabla'];
    $id = $unidades["id"];
    $prefijo = $unidades["prefijo"];
   
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
       

    //-------------------------------- Acciones --------------------------
 


    if($tipo == "consultatodo")
    {
        
        $sql = "Select * from " .$tabla. " where 1 order BY prefijocompra";

        // else if( $tipo == "consulta" ){
        //     $sql = "Select * from " .$tabla. " where idcliente =" . $id . " order by nombrecliente asc";
        // }else if( $tipo == "consultaclienteenventa" ){
        //     $sql = "Select * from " .$tablaventas. " where idcliente =" . $id . " order by nombrecliente asc";
        // }else if( $tipo == "verificar" ){
        //     $sql = "Select * from " .$tabla. " where email = '" . $emailcliente . "'";
            // echo $sql;
            

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

    // }else if($tipo == "alta" || $tipo == "baja" || $tipo == "bajaxemail" || $tipo == "actualizaemail")
    // {
    //     if($tipo == "alta")
    //     {
    //         if($id==0)
    //         {
    //             // if($nombrecliente != "")
    //             // {
    //                 $sql = "INSERT INTO " .$tabla. "(nombrecliente,direccion,telefono,email) 
    //                 values('$nombrecliente','$direccioncliente','$telefonocliente','$emailcliente')";
    //             // }
    //         }else{
    //             $sql = "update " .$tabla. " set nombrecliente = '$nombrecliente',direccion = '$direccioncliente',telefono = '$telefonocliente',email= '$emailcliente',bonus='$bonus' where idcliente= $id";
    //         }
    //     }else if( $tipo == "baja")
    //     {
    //         $sql = "delete from " .$tabla. " where idcliente = $id";
    //     }else if ($tipo == "bajaxemail")
    //     {
    //         $sql = "delete from " .$tabla. " where email = $emailcliente";
    //     }else if ($tipo == "actualizaemail")
    //     {
    //         $sql = "update " .$tabla. " set  email= '$emailcliente' where idcliente = $id";
    //     }


    //     $resultado = $mysqli->query($sql);
    //     if($resultado)
    //     {
    //         echo $resultado;
    //     }else{
    //         echo "consultavacia";
    //     }
    // }else if($tipo == "bonussumado")
    // {
    //     $bonuscliente = "Select bonus from " .$tabla. " where idcliente =" . $id;
    //     $resultadobonus  = $mysqli->query($bonuscliente);
    //     $fila = $resultadobonus->fetch_assoc();
    //     $bonussumado = $fila["bonus"] + $bonus;

    //     $sql = "update " .$tabla. " set bonus = '$bonussumado' where idcliente= $id";
    //     $resultado  = $mysqli->query($sql);
    //     echo $resultado;
    // }else if($tipo == "bonusrestado")
    // {
    //     $bonuscliente = "Select bonus from " .$tabla. " where idcliente =" . $id;
    //     $resultadobonus  = $mysqli->query($bonuscliente);
    //     $fila = $resultadobonus->fetch_assoc();
    //     $bonusrestado = $fila["bonus"] - $bonus;

    //     $sql = "update " .$tabla. " set bonus = '$bonusrestado' where idcliente= $id";
    //     $resultado  = $mysqli->query($sql);
    //     echo $resultado;
    // }
 
    }

    $mysqli->close();
?>
