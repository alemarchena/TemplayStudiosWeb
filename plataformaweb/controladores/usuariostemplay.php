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
    $idplataformaagregada = $objetojson['idplataformaagregada'];
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    $data = array();
    
  
    if($tipo=="alta" || $tipo=="altarelacion" || $tipo=="bajarelacion" || $tipo == "baja" || $tipo == "activar" || $tipo == "desactivar" )
    {
        if($tipo=="alta")
            $sql = "insert into " .$tabla. "(email) values('".$email."')";
        else if($tipo=="baja")
            $sql = "delete from " .$tabla. " where email = '" .$email. "'";
        else if($tipo == "activar" )
            $sql = "update " .$tabla. " set activo = true where id = '".$id."'";
        else if($tipo == "desactivar" )
            $sql = "update " .$tabla. " set activo = false where id = '".$id."'";
        else  if($tipo=="altarelacion")
            $sql = "insert into " .$usuarioplataforma. "(idusuario,idplataforma) values(".$id.",".$idplataformaagregada.")";
        else  if($tipo=="bajarelacion")
            $sql = "delete from " .$usuarioplataforma. " where idusuario = ".$id." and idplataforma =".$idplataformaagregada;

        $resultado = $mysqli->query($sql);
            
        if($resultado)
        {
            echo $resultado;
        } else{
            echo "-1";
        }
    }
    else if($tipo == "consultar" || $tipo == "verificar" || $tipo == "plataforma" || $tipo == "plataformaadmin" || "consultausuarios" || "consultaplataformas" || "consultausuarioplataforma")
    {
        if($tipo == "consultar")
            $sql = "select * from " .$tabla. " where email = '" .$email. "'";
        else if( $tipo == "verificar"){
            $sql = "select " .$tabla. ".email,".$tabla. ".esadmin,".$tabla. ".jerarquia,"
            .$plataforma. ".nombre," 
            .$usuarioplataforma. ".idusuario," .$usuarioplataforma. ".idplataforma from (( "
            .$tabla. " LEFT JOIN " .$usuarioplataforma. " ON " .$tabla. ".id = " .$usuarioplataforma. ".idusuario ) LEFT JOIN "
            .$plataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma) where " 
            .$tabla. ".email = '" .$email. "' and " .$tabla. ".activo = true";
        }
        else if( $tipo == "plataforma"){
            

            $sql = "select " .$plataforma.".id,".$plataforma. ".nombre,"    .$plataforma.".bdd,".$plataforma.".tablaajustes,"
            .$plataforma.".tablaanuncios,"      .$plataforma.".tablabonus," .$plataforma.".tablaclientes,".$plataforma.".tablacompras,".$plataforma.".tablafiltros,"
            .$plataforma.".tablaproveedores,"   .$plataforma.".tablaproveedoresanuncios,".$plataforma.".tablarubros,".$plataforma.".dominio,".$plataforma.".tablaunidadesgranel,".$plataforma.".tablabloqueos,"
            .$plataforma.".tablaventas,"        .$plataforma.".tablatiposdepago,".$plataforma.".tablatiposdemovimientos,".$plataforma.".rutaimagenes,"
            .$usuarioplataforma.".idusuario,"   .$usuarioplataforma.".idplataforma,". $tabla .".esadmin"." from ((" 
            .$plataforma. " LEFT JOIN " .$usuarioplataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma".
            ") LEFT JOIN " .$tabla. " ON " .$usuarioplataforma. ".idusuario = " .$tabla.  ".id) where " .$usuarioplataforma. ".idusuario = " .$id ;

        }else if( $tipo == "plataformaadmin"){
            

            $sql = "select " .$plataforma.".id,".$plataforma. ".nombre,"    .$plataforma.".bdd,".$plataforma.".tablaajustes,"
            .$plataforma.".tablaanuncios,"      .$plataforma.".tablabonus," .$plataforma.".tablaclientes,".$plataforma.".tablacompras,".$plataforma.".tablafiltros,"
            .$plataforma.".tablaproveedores,"   .$plataforma.".tablaproveedoresanuncios,".$plataforma.".tablarubros,".$plataforma.".dominio,".$plataforma.".tablaunidadesgranel,".$plataforma.".tablabloqueos,"
            .$plataforma.".tablaventas,"        .$plataforma.".tablatiposdepago,".$plataforma.".tablatiposdemovimientos,".$plataforma.".rutaimagenes,"
            .$usuarioplataforma.".idusuario,"   .$usuarioplataforma.".idplataforma,". $tabla .".esadmin"." from ((" 
            .$plataforma. " LEFT JOIN " .$usuarioplataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma".
            ") LEFT JOIN " .$tabla. " ON " .$usuarioplataforma. ".idusuario = " .$tabla.  ".id) where " .$usuarioplataforma. ".idusuario = " .$id. " and ".$usuarioplataforma. ".idplataforma = " .$idplataformaagregada;

        }elseif ($tipo == "consultausuarios"){
            $sql = "select * from " .$tabla;
        }elseif ($tipo == "consultaplataformas"){
            $sql = "select * from " .$plataforma;
        }elseif ($tipo == "consultausuarioplataforma"){
             $sql = "select " .$usuarioplataforma.".idusuario," .$usuarioplataforma.".idplataforma," 
            .$plataforma. ".nombre," . $tabla .".email from ((" 
            .$usuarioplataforma. " LEFT JOIN " .$plataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma".
            ") LEFT JOIN " .$tabla. " ON " .$usuarioplataforma. ".idusuario = " .$tabla.  ".id)";
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