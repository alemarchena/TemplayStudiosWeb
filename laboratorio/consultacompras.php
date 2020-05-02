<?php

    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $comprado = json_decode($_POST['comprado'],true);
    
    $bdd = $comprado['bdd'];
    include  $bdd;
    $tabla= $comprado['tabla'];
    $tablaanuncios= $comprado['tablaanuncios'];
    $tablaproveedores= $comprado['tablaproveedores'];
    $tipo = $comprado['tipo'];
    $fechacomprarecibida =$comprado['fechacompra'];
    
    
    $fechacompracreada= date_create_from_format('dmY', $fechacomprarecibida);
    $fechacompra = date_format($fechacompracreada, 'Y-m-d');
    

    // if($fechacomprarecibida == "")
    // {
    //     $fechacompra = null;
    // }else{
    //     $fechacompracreada= date_create_from_format('dmY', $fechacomprarecibida);
    //     $fechacompra = date_format($fechacompracreada, 'Y-m-d');
    // }

    if($tipo == "alta")
    {
        $idproducto     = $comprado["id"];
        $costo          = $comprado["costo"];
        $cantidad       = $comprado["cantidad"];
        $idproveedor    = $comprado["idproveedorelegido"];
    }

    if($tipo == "actualizafechainicio"){
        $idproducto     = $comprado["id"];

    }


    if($tipo == "baja")
    {
        $id = $comprado['id'];
    }
       
    if($tipo == "consulta")
    {
        $fechacomprarecibidadesde = $comprado['fechacompradesde'];
        $fechacompracreadadesde= date_create_from_format('dmY', $fechacomprarecibidadesde);
        $fechacompradesde = date_format($fechacompracreadadesde, 'Y-m-d');
        
        $fechacomprarecibidahasta = $comprado['fechacomprahasta'];
        $fechacomprarcreadahasta= date_create_from_format('dmY', $fechacomprarecibidahasta);
        $fechacomprahasta = date_format($fechacomprarcreadahasta, 'Y-m-d');
    }

    //-----------------conectando con la base de datos---------------------

    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) { exit('No se pudo conectar a la base de datos'); }
        
    //--------------------------- Acciones -------------------------
    
    if($tipo == "consulta")
    {

            $sql = "Select " .$tabla. ".fechacompra," .$tabla. ".id as idcompra," .$tabla. ".idproveedor," .$tabla. ".idproducto," .$tabla. ".cantidad," .$tabla. ".costo as costocompra," 
            .$tablaanuncios. ".id," .$tablaanuncios. ".titulo,".$tablaanuncios. ".descripcion," .$tablaanuncios. ".costo as costoactual," 
            .$tablaanuncios. ".precio," .$tablaanuncios. ".fechastockinicio," .$tablaproveedores. ".idproveedor," .$tablaproveedores. ".nombreproveedor from ( ( (" 
            .$tabla. " LEFT JOIN " .$tablaanuncios. " ON " .$tabla. ".idproducto  = " .$tablaanuncios.".id) LEFT JOIN " 
            .$tablaproveedores. " ON " .$tabla. ".idproveedor = " .$tablaproveedores.".idproveedor) )  where fechacompra >= '" .$fechacompradesde. "' and  fechacompra <= '" . $fechacomprahasta . "'";


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

    }else if($tipo == "alta" || $tipo == "baja"  || $tipo == "actualizafechainicio")
    {
        if($tipo == "alta"){
            $sql = "Insert Into " .$tabla. "(idproducto, costo, fechacompra, cantidad, idproveedor)
                values('$idproducto','$costo','$fechacompra','$cantidad','$idproveedor')";
        
        }else if($tipo == "baja"){
            $sql = "delete from " .$tabla. " where id = $id";
            
        }else if( $tipo == "actualizafechainicio"){

            $sql = "update " .$tablaanuncios. " set fechastockinicio = '" .$fechacompra. "' where id='" .$idproducto. "'" ;
        }

        // echo $sql;
        

        $resultado  = $mysqli->query($sql);
        if($resultado) { echo $resultado;}
        else{ echo "consultavacia ".$sql; }
    }
?>
