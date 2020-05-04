<?php
    date_default_timezone_set('America/Argentina/Mendoza');
    include "configuracion.php";

    $mysqli = new mysqli( $host,$user,$password, $dbname,$port, $socket);
    
    if($mysqli->connect_error){
        exit("nobdd");
    }

    $objetojson = json_decode($_POST['objetojson'],true);
    $email = $objetojson['email'];
    $tipo = $objetojson['tipo'];
    $id = $objetojson['id'];
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    $data = array();
    
  
    if($tipo=="alta" || $tipo == "baja" || $tipo == "activar" || $tipo == "desactivar" )
    {
        if($tipo=="alta")
            $sql = "insert into " .$tabla. "(email) values('".$email."')";
        else if($tipo=="baja")
            $sql = "delete from " .$tabla. " where email = '" .$email. "'";
        else if($tipo == "activar" )
            $sql = "update " .$tabla. " set activo = true where email = '".$email."'";
        else if($tipo == "desactivar" )
            $sql = "update " .$tabla. " set activo = false where email = '".$email."'";
       
            
        $resultado = $mysqli->query($sql);
            
        if($resultado)
        {
            echo $resultado;
        } else{
            echo "-1";
        }
    }
    else if($tipo == "consultar" || $tipo == "verificar" || $tipo == "plataforma" || "consultausuarios" || "consultaplataformas")
    {
        if($tipo == "consultar")
            $sql = "select * from " .$tabla. " where email = '" .$email. "'";
        else if( $tipo == "verificar")
            $sql = "select * from " .$tabla. " where email = '" .$email. "' and activo = true";
        else if( $tipo == "plataforma"){
            

            $sql = "select " .$plataforma.".id,".$plataforma. ".nombre,"    .$plataforma.".bdd,".$plataforma.".tablaajustes,"
            .$plataforma.".tablaanuncios,"      .$plataforma.".tablabonus," .$plataforma.".tablaclientes,".$plataforma.".tablacompras,"
            .$plataforma.".tablaproveedores,"   .$plataforma.".tablaproveedoresanuncios,".$plataforma.".tablarubros,".$plataforma.".dominio,"
            .$plataforma.".tablaventas,"        .$plataforma.".tablatiposdepago,".$plataforma.".tablatiposdemovimientos,".$plataforma.".rutaimagenes,"
            .$usuarioplataforma.".idusuario,"   .$usuarioplataforma.".idplataforma,". $tabla .".esadmin"." from ((" 
            .$plataforma. " LEFT JOIN " .$usuarioplataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma".
            ") LEFT JOIN " .$tabla. " ON " .$usuarioplataforma. ".idusuario = " .$tabla.  ".id) where " .$usuarioplataforma. ".idusuario = " .$id ;

        }elseif ($tipo == "consultausuarios"){
            $sql = "select * from " .$tabla;
        }elseif ($tipo == "consultaplataformas"){
            $sql = "select * from " .$plataforma;
        }

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
    }
?>