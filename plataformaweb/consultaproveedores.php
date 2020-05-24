<?php
    
    date_default_timezone_set('America/Argentina/Mendoza');
    //---------------------parametros recibidos en el POST----------------------

    $proveedor = json_decode($_POST['proveedor'],true);

    $bdd = $proveedor['bdd'];
    include  $bdd;
    $tipo = $proveedor['tipo'];
    $tabla= $proveedor['tabla'];
    $idproveedor = $proveedor["id"];
    $id=$idproveedor;
    $nombreproveedor = $proveedor["nombreproveedor"];
    $direccionproveedor = $proveedor["direccionproveedor"];
    $telefonoproveedor = $proveedor["telefonoproveedor"];
    $emailproveedor = $proveedor["emailproveedor"];

    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
       
    //--------------------------- Acciones -------------------------
    
    if($tipo == "consultatodosanuncios" || $tipo == "consulta")
    {
        if($tipo == "consultatodosanuncios"){
            $sql = "Select * from " .$tabla. " where 1 order by nombreproveedor";}
        else{
            $sql = "Select * from " .$tabla. " where idproveedor =" . $id . " order by nombreproveedor"; }

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
        { echo "consultavacia"; }

    }else if($tipo == "alta" || $tipo == "baja")
    {
        if($tipo == "alta"){
            if($id==0)
            {
                if($nombreproveedor != "")
                {
                    $sql = "INSERT INTO " .$tabla. "(nombreproveedor,direccion,telefono,email) 
                    values('$nombreproveedor','$direccionproveedor','$telefonoproveedor','$emailproveedor')";
                }
            }else{
                $sql = "update " .$tabla. " set nombreproveedor = '$nombreproveedor',direccion = '$direccionproveedor',telefono = '$telefonoproveedor',email= '$emailproveedor' where idproveedor= $id";
            }
        }else
        {
            $sql = "delete from " .$tabla. " where idproveedor = $id";
        }

        $resultado = $mysqli->query($sql);
        if($resultado)
            echo $resultado;
        else
            echo "consultavacia ".$sql;
    }
 
?>
