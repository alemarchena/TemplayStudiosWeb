<?php

    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $ajustado = json_decode($_POST['ajustado'],true);
    
    $bdd = $ajustado['bdd'];
    include  $bdd;
    $tabla= $ajustado['tabla'];
    $tablaanuncios= $ajustado['tablaanuncios'];

    $tipo = $ajustado['tipo'];
    $fechaajusterecibida =$ajustado['fechaajuste'];
    $fechaajustecreada= date_create_from_format('dmY', $fechaajusterecibida);
    $fechaajuste = date_format($fechaajustecreada, 'Y-m-d');

    if($tipo == "alta")
    {
        $idproducto     = $ajustado["id"];
        $cantidad       = $ajustado["cantidad"];
        $tipomovimientonombrecorto      = $ajustado["tipomovimientonombrecorto"];
    }

   
    if($tipo == "baja")
    {
        $id = $ajustado['id'];
    }
       
    if($tipo == "consulta")
    {
        $fechaajusteecibidadesde = $ajustado['fechaajustedesde'];
        $fechaajustecreadadesde= date_create_from_format('dmY', $fechaajusteecibidadesde);
        $fechaajustedesde = date_format($fechaajustecreadadesde, 'Y-m-d');
        
        $fechaajusterecibidahasta = $ajustado['fechaajustehasta'];
        $fechaajustercreadahasta= date_create_from_format('dmY', $fechaajusterecibidahasta);
        $fechaajustehasta = date_format($fechaajustercreadahasta, 'Y-m-d');
    }

    //-----------------conectando con la base de datos---------------------

    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) { exit('No se pudo conectar a la base de datos'); }
        
    //--------------------------- Acciones -------------------------
    
    if($tipo == "consulta")
    {
        if($tipo == "consulta")
        {
            $sql = "Select " .$tabla. ".fechamovimiento," .$tabla. ".id as idajuste," .$tabla. ".idproducto," .$tabla. ".cantidad," .$tabla. ".tipomovimientonombrecorto," 
            .$tablaanuncios. ".id," .$tablaanuncios. ".titulo," .$tablaanuncios. ".fechastockinicio," .$tablaanuncios. ".descripcion from (" 
            .$tabla. " LEFT JOIN " .$tablaanuncios. " ON " .$tabla. ".idproducto  = " .$tablaanuncios.".id)  where fechamovimiento >= '" .$fechaajustedesde. "'  and  fechamovimiento <= '" . $fechaajustehasta . "'";
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

    }else if($tipo == "alta" || $tipo == "baja" )
    {
        if($tipo == "alta"){
            $sql = "Insert Into " .$tabla. "(idproducto, fechamovimiento, cantidad, tipomovimientonombrecorto)
                values('$idproducto','$fechaajuste','$cantidad','$tipomovimientonombrecorto')";
        
        }else if($tipo == "baja"){
            $sql = "delete from " .$tabla. " where id = $id";

        }
    

        $resultado  = $mysqli->query($sql);

        if($resultado) 
        {
            echo $resultado;
        }
        else
        { 
            echo "consultavacia ".$sql; 
        }
    }
    $mysqli->close();
?>
