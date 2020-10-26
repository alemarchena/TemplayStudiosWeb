<?php

    date_default_timezone_set('America/Argentina/Mendoza');

    //---------------------parametros recibidos en el POST----------------------

    $vendido = json_decode($_POST['vendido'],true);
    
    $bdd = $vendido['bdd'];
    include  $bdd;
    $tabla= $vendido['tabla'];
    $tablaanuncios= $vendido['tablaanuncios'];
    $tablaclientes= $vendido['tablaclientes'];
    $tablarubros= $vendido['tablarubros'];
    $tipo = $vendido['tipo'];
    $tablaunidadesgranel = $vendido['tablaunidadesgranel'];
    $email = $vendido['email'];
    $jerarquia = $vendido['jerarquia'];


    $fechaventarecibida =$vendido['fechaventa'];
    $fechaventacreada= date_create_from_format('dmY', $fechaventarecibida);
    $fechaventa = date_format($fechaventacreada, 'Y-m-d');

    if($tipo == "alta")
    {
        $idproducto     = $vendido["id"];
        $precio         = $vendido["precio"];
        $costo          = $vendido["costo"];
        $idrubro        = $vendido["idrubro"];
        $cantidad       = $vendido["cantidad"];
        $idcliente      = $vendido["idclienteelegido"];
        $bonus          = $vendido["bonus"];
        $tipopago       = $vendido["tipopago"];
    }

    if($tipo == "baja")
    {
        $id = $vendido['id'];
    }
       
    if($tipo == "consultacaja")
    {
        $fechaventarecibidadesde = $vendido['fechaventadesde'];
        $fechaventacreadadesde= date_create_from_format('dmY', $fechaventarecibidadesde);
        $fechaventadesde = date_format($fechaventacreadadesde, 'Y-m-d');
        
        $fechaventarecibidahasta = $vendido['fechaventahasta'];
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
            // $sql = "Select * from `" .$tabla. "` where fecha = '" . $fechaventa . "'";
            $sql = "Select " 
            .$tabla. ".id," .$tabla. ".cantidad," .$tabla. ".precio," .$tabla. ".costo," .$tabla. ".fecha," .$tabla. ".email," 
            .$tabla. ".bonus," .$tabla. ".tipopago," .$tabla. ".idproducto," .$tabla. ".idcliente," .$tabla. ".idrubro," .$tabla. ".email,"
            .$tablaanuncios. ".id as idproducto," .$tablaanuncios. ".titulo," .$tablaanuncios. ".descripcion," .$tablaanuncios. ".codigobarra,"  
            .$tablaclientes. ".idcliente,".$tablaclientes. ".nombrecliente," 
            .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
            .$tablarubros. ".idrubro," .$tablarubros. ".nombrerubro as rubro from ( ( ( (" 
                   .$tabla. " LEFT JOIN " .$tablaanuncios. 
            " ON " .$tabla. ".idproducto = " .$tablaanuncios. ".id)        LEFT JOIN " .$tablaclientes. 
            " ON " .$tabla. ".idcliente  = " .$tablaclientes. ".idcliente) LEFT JOIN " .$tablarubros. 
            " ON " .$tabla. ".idrubro    = " .$tablarubros.    ".idrubro ) LEFT JOIN " .$tablaunidadesgranel.
            " ON " .$tablaanuncios. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tablaanuncios. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " . $segunjerarquia . " fecha = '" . $fechaventa . "'";
            
        }else{
            // $sql = "Select * from `" .$tabla. "` where fecha >= '" . $fechaventadesde . "' and  fecha <= '" . $fechaventahasta . "' order by fecha desc";
            $sql = "Select " 
            .$tabla. ".id," .$tabla. ".cantidad," .$tabla. ".precio," .$tabla. ".costo," .$tabla. ".fecha," 
            .$tabla. ".bonus," .$tabla. ".tipopago," .$tabla. ".idproducto," .$tabla. ".idcliente," .$tabla. ".idrubro," .$tabla. ".email,"
            .$tablaanuncios. ".id as idproducto," .$tablaanuncios. ".titulo," .$tablaanuncios. ".descripcion," .$tablaanuncios. ".codigobarra," 
            .$tablaclientes. ".idcliente,".$tablaclientes. ".nombrecliente," 
            .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
            .$tablarubros. ".idrubro," .$tablarubros. ".nombrerubro as rubro from ( ( ( (" 
                   .$tabla. " LEFT JOIN " .$tablaanuncios. 
            " ON " .$tabla. ".idproducto = " .$tablaanuncios. ".id)         LEFT JOIN " .$tablaclientes. 
            " ON " .$tabla. ".idcliente  = " .$tablaclientes. ".idcliente ) LEFT JOIN " .$tablarubros. 
            " ON " .$tabla. ".idrubro    = " .$tablarubros.    ".idrubro  ) LEFT JOIN " .$tablaunidadesgranel.
            " ON " .$tablaanuncios. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tablaanuncios. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " . $segunjerarquia . " fecha >= '" . $fechaventadesde . "' and  fecha <= '" . $fechaventahasta . "' order by fecha desc";
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
            $sql = "Insert Into " .$tabla. "(idproducto, precio, costo, idrubro, fecha, cantidad,idcliente,bonus,tipopago,email)
                values('$idproducto','$precio','$costo','$idrubro','$fechaventa','$cantidad','$idcliente','$bonus','$tipopago','$email')";
        
        }else{
            $sql = "delete from " .$tabla. " where id = $id";
        }

        $resultado  = $mysqli->query($sql);
        if($resultado) { echo $resultado;}
        else{ echo "consultavacia ".$sql; }
    }

    $mysqli->close();
?>
