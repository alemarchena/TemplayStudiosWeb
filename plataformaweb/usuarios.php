<?php
    date_default_timezone_set('America/Argentina/Mendoza');
    include "conexiones/parametrostemplay.php";


    $mysqli = new mysqli( $host,$user,$password, $dbname,$port, $socket);
    if($mysqli->connect_error){
        exit("nobdd");
    }

    $objetojson = json_decode($_POST['objetojson'],true);
    $tipo = $objetojson['tipo'];
    $id = $objetojson['id'];
    $idplataformaactual = $objetojson['idplataformaactual'];

    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    $data = array();
    
  
    if($tipo=="actualizarpermisos" || $tipo == "consultausuarioplataforma" )
    {
        if("consultausuarioplataforma")
        {
            if ($tipo == "consultausuarioplataforma"){
                $sql = "select " .$usuarioplataforma.".idusuario," .$usuarioplataforma.".idplataforma," 
                .$plataforma. ".nombre," . $tabla .".email from ((" 
                .$usuarioplataforma. " LEFT JOIN " .$plataforma. " ON " .$plataforma. ".id = " .$usuarioplataforma. ".idplataforma".
                ") LEFT JOIN " .$tabla. " ON " .$usuarioplataforma. ".idusuario = " .$tabla.  ".id) where " .$usuarioplataforma. ".idplataforma = " .$idplataformaactual . " order by idusuario asc";
            }else
            if($tipo == "actualizarpermisos" )
            {
                // $sql = "update " .$tabla. " set activo = false where id = '".$id."'";
                // $sql = "update from " .$usuarioplataforma. " where idusuario = ".$id." and idplataforma =".$idplataformaagregada;
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
    }
?>