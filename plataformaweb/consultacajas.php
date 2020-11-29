<?php

    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $caja = json_decode($_POST['caja'],true);
    
    $bdd                = $caja['bdd'];
    include  $bdd;
    
    $tabla              = $caja['tabla'];
    $tipo               = $caja['tipo'];
    $tipomovimiento     = $caja['tipomovimiento'];
    $jerarquia          = $caja['jerarquia'];
    $id                 = $caja["id"];
    $monto              = $caja["monto"];
    $descripcion        = $caja["descripcion"];
    $hora               = $caja["hora"];
    $email              = $caja['email'];
    $fechaventarecibida = $caja['fechacaja'];
    $fechaventacreada   = date_create_from_format('dmY', $fechaventarecibida);
    $fechaventa         = date_format($fechaventacreada, 'Y-m-d');
    

    if($tipo == "consultacaja")
    {
        $fechaventarecibidadesde = $caja['fechaventadesde'];
        $fechaventacreadadesde= date_create_from_format('dmY', $fechaventarecibidadesde);
        $fechaventadesde = date_format($fechaventacreadadesde, 'Y-m-d');
        
        $fechaventarecibidahasta = $caja['fechaventahasta'];
        $fechaventacreadahasta= date_create_from_format('dmY', $fechaventarecibidahasta);
        $fechaventahasta = date_format($fechaventacreadahasta, 'Y-m-d');
    }

    //-----------------conectando con la base de datos---------------------

    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) { exit('No se pudo conectar a la base de datos'); }
        
    //--------------------------- Acciones -------------------------
    
    $segunjerarquia = '';

    if($jerarquia == 0)
    {
        $segunjerarquia =  $tabla. ".email = '".$email."' and ";
    }
    

    if($tipo == "consulta" || $tipo == "consultacaja")
    {
        if($tipo == "consulta")
        {
            $sql = "Select " 
            .$tabla. ".id," .$tabla. ".idusuario," .$tabla. ".email," .$tabla. ".monto," .$tabla. ".descripcion," .$tabla. ".fecha," .$tabla. ".hora," .$tabla. ".tipomovimiento from " 
            .$tabla. " where " . $segunjerarquia . " fecha = '" . $fechaventa . "'";
            
        }else{
            // $sql = "Select * from `" .$tabla. "` where fecha >= '" . $fechaventadesde . "' and  fecha <= '" . $fechaventahasta . "' order by fecha desc";
            $sql = "Select " 
            .$tabla. ".id," .$tabla. ".idusuario," .$tabla. ".email," .$tabla. ".monto," .$tabla. ".descripcion," .$tabla. ".fecha," .$tabla. ".hora," .$tabla. ".tipomovimiento from " 
            .$tabla. " where " . $segunjerarquia . " fecha >= '" . $fechaventadesde . "' and  fecha <= '" . $fechaventahasta . "' order by fecha desc";
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
        }else { echo "consultavacia"; }

    }else if($tipo == "alta" || $tipo == "baja")
    {
        if($tipo == "alta"){
            $sql = "Insert Into " .$tabla. "(idusuario, email, monto, descripcion, tipomovimiento, fecha, hora)
                values('$id','$email','$monto','$descripcion','$tipomovimiento','$fechaventa','$hora')";
        }else if($tipo == "baja"){
            $sql = "delete from " .$tabla. " where id = " .$id;
        }

        $resultado  = $mysqli->query($sql);
        if($resultado) { echo $resultado;}
        else
        { 
            echo "consultavacia ".$sql; 
        }
    }

    $mysqli->close();
?>
