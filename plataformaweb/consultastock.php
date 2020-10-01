<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $objetoanuncio = json_decode($_POST['objetoanuncio'],true);


    $bdd = $objetoanuncio['bdd'];
    include  $bdd;

    $tabla= $objetoanuncio['tabla'];
    $tablarubros= $objetoanuncio['tablarubros'];
    $tablacompras= $objetoanuncio['tablacompras'];
    $tablaventas= $objetoanuncio['tablaventas'];
    $tablaajustes= $objetoanuncio['tablaajustes'];
    $tablaproveedores= $objetoanuncio['tablaproveedores'];
    $tablaproveedoresanuncios= $objetoanuncio['tablaproveedoresanuncios'];
    $tablaunidadesgranel = $objetoanuncio['tablaunidadesgranel'];
    // $fechainicio = $_POST['fechainicio'];
    // $fechafin = $_POST['fechafin'];

    $tipo = $objetoanuncio['tipo'];
    $id = $objetoanuncio['id'];
    $codigobarra = $objetoanuncio['codigobarra'];
    $idrubro = $objetoanuncio['idrubro'];
    $filtro = $objetoanuncio['filtro'];

    $titulo = $objetoanuncio['titulo'];
    $descripcion = $objetoanuncio['descripcion'];
    $precio = $objetoanuncio['precio'];
    $costo = $objetoanuncio['costo'];
    $imagen = $objetoanuncio['imagen'];
    $rutaimagenes = $objetoanuncio['rutaimagenes'];
    $esnovedad = $objetoanuncio['esnovedad'];
    $esoferta = $objetoanuncio['esoferta'];
    $nopublicar = $objetoanuncio['nopublicar'];
    $observaciones = $objetoanuncio['observaciones'];
    $comentarios = $objetoanuncio['comentarios'];

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
        
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
   
    //----------------- filtro ---------------------
 
    $sentencia = "";

    foreach ($filtro as $filtros)
    {
        if($sentencia == "")
            $sentencia = $sentencia . " ( (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%'  or (comodin like '%" . $filtros . "%' and comodin != '') ) ";
        else
            $sentencia = $sentencia . " or (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%'  or (comodin like '%" . $filtros . "%' and comodin != '') ) ";
    }
     
    
    //--------------------------- Acciones -------------------------
    
     if($tipo == "consultalector" || $tipo == "consultafiltros" || $tipo == "consultarubros" || $tipo == "consulta")
    {
        if($tipo == "consultarubros")
        {
            // $sqlpor rubro
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".precioanterior," .$tabla. ".idrubro," .$tabla. ".costo," .$tabla. ".costoanterior," .$tabla. ".imagen," .$tabla. ".fechastockinicio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo," 
                                 .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".tieneventaja," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro," 
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor," 
                                 .$tablaproveedores. ".nombreproveedor from ((((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) LEFT JOIN " 
                                 .$tablaproveedores. " ON " .$tablaproveedores. ".idproveedor = " .$tablaproveedoresanuncios. ".idproveedor ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " 
                                 .$tabla. ".idrubro = " .$idrubro . " order by " .$tabla. ".titulo";
                   
                                //  echo $sql;
        }else if($tipo == "consultafiltros")
        {
            if($sentencia == "")
            {
                // $sql todo 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".precioanterior," .$tabla. ".idrubro," .$tabla. ".costo," .$tabla. ".costoanterior," .$tabla. ".imagen," .$tabla. ".fechastockinicio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".tieneventaja," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa,"  .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro," 
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor," 
                                 .$tablaproveedores. ".nombreproveedor from ((((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) LEFT JOIN " 
                                 .$tablaproveedores. " ON " .$tablaproveedores. ".idproveedor = " .$tablaproveedoresanuncios. ".idproveedor ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where  1 order by " 
                                 .$tabla. ".titulo";
                                //  echo $sql;

            }
            else
            {
                // $sql con $sentencia 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".precioanterior," .$tabla. ".idrubro," .$tabla. ".costo," .$tabla. ".costoanterior," .$tabla. ".imagen," .$tabla. ".fechastockinicio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".tieneventaja," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa,"  .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro,"
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor,"
                                 .$tablaproveedores. ".nombreproveedor from ((((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN " 
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) LEFT JOIN " 
                                 .$tablaproveedores. " ON " .$tablaproveedores. ".idproveedor = " .$tablaproveedoresanuncios. ".idproveedor ) LEFT JOIN " 
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa  ) where " . $sentencia . " ) order by " .$tabla. ".titulo";
                                //  echo $sql;
           
            }
        }else if($tipo == "consulta")
        {
            // $sql por id;
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa,"  .$tablaunidadesgranel. ".relacioncompraventa,"                    
                                .$tabla. ".precio," .$tabla. ".precioanterior," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".tieneventaja," 
                                .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," 
                                .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra  and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".id = " 
                                .$id . " order by " .$tabla. ".titulo";
        }else if($tipo == "consultalector")
        {
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".precioanterior," .$tabla. ".idrubro," .$tabla. ".costo," .$tabla. ".costoanterior," .$tabla. ".imagen," .$tabla. ".fechastockinicio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo," 
                                 .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".tieneventaja," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro," 
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor," 
                                 .$tablaproveedores. ".nombreproveedor from ((((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) LEFT JOIN " 
                                 .$tablaproveedores. " ON " .$tablaproveedores. ".idproveedor = " .$tablaproveedoresanuncios. ".idproveedor ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " 
                                 .$tabla. ".codigobarra = " .$codigobarra . " order by " .$tabla. ".titulo";
               
        }

    
        $resultado  = $mysqli->query($sql);
      
        $data = array();
        
    
        if($resultado)
        {
            
            $resultado->data_seek(0);
            
            while($fila = $resultado->fetch_assoc())
            {
                $fechainiciofila = $fila['fechastockinicio'];
                $idproductofila =  $fila['id'];

                //suma todas las compras de los productos 
                if( $fila['fechastockinicio'] != "0000-00-00")
                    $sqlsumaCompras = "SELECT SUM(cantidad) AS totalcompras FROM ".$tablacompras. " where idproducto = " .$idproductofila. " and fechacompra >= '". $fechainiciofila. "'";
                else
                    $sqlsumaCompras = "SELECT SUM(cantidad) AS totalcompras FROM ".$tablacompras. " where idproducto = " .$idproductofila. "";

                    $resultadoCompras  = $mysqli->query($sqlsumaCompras);
                    if($resultadoCompras){
                        $sumaCompras = $resultadoCompras->fetch_assoc() ;
                        if($sumaCompras["totalcompras"] == null)
                            $totalcompras = 0;
                        else
                            $totalcompras = $sumaCompras["totalcompras"];
                    }                  
                    else
                        $totalcompras = 0;

                
                //suma todas las ventas de los productos 
                if( $fila['fechastockinicio'] != "0000-00-00")
                    $sqlsumaVentas = "SELECT SUM(cantidad) AS totalventas FROM ".$tablaventas. " where idproducto = " .$idproductofila. " and fecha >= '". $fechainiciofila. "'";
                else
                    $sqlsumaVentas = "SELECT SUM(cantidad) AS totalventas FROM ".$tablaventas. " where idproducto = " .$idproductofila. "";

                    $resultadoVentas  = $mysqli->query($sqlsumaVentas);
                    if($resultadoVentas){
                        $sumaVentas = $resultadoVentas->fetch_assoc();
                        if($sumaVentas["totalventas"] == null)
                            $totalventas = 0;
                        else
                            $totalventas = $sumaVentas["totalventas"];
                    }else
                        $totalventas = 0;
                    

                //suma todos los ajustes de entrada de los productos que tienen stock de inicio
                if( $fila['fechastockinicio'] != "0000-00-00")
                    $sqlsumaAE = "SELECT SUM(cantidad) AS totalAE FROM ".$tablaajustes. " where idproducto = " .$idproductofila. " and fechamovimiento >= '". $fechainiciofila. "' and tipomovimientonombrecorto = 'AE'";
                else
                    $sqlsumaAE = "SELECT SUM(cantidad) AS totalAE FROM ".$tablaajustes. " where idproducto = " .$idproductofila. " and tipomovimientonombrecorto = 'AE'";
                    
                    $resultadoAE  = $mysqli->query($sqlsumaAE);
                    if($resultadoAE){
                        $sumaAE = $resultadoAE->fetch_assoc() ;
                        if($sumaAE["totalAE"] == null)
                            $totalAE = 0;
                        else
                            $totalAE = $sumaAE["totalAE"];
                    }else
                        $totalAE = 0;

                //suma todos los ajustes de salida de los productos que tienen stock de inicio
                if( $fila['fechastockinicio'] != "0000-00-00")
                    $sqlsumaAS = "SELECT SUM(cantidad) AS totalAS FROM ".$tablaajustes. " where idproducto = " .$idproductofila. " and fechamovimiento >= '". $fechainiciofila. "' and tipomovimientonombrecorto = 'AS'";
                else
                    $sqlsumaAS = "SELECT SUM(cantidad) AS totalAS FROM ".$tablaajustes. " where idproducto = " .$idproductofila. " and tipomovimientonombrecorto = 'AS'";
                
                    $resultadoAS  = $mysqli->query($sqlsumaAS);
                    if($resultadoAS){
                        $sumaAS = $resultadoAS->fetch_assoc() ;
                        if($sumaAS["totalAS"] == null)
                            $totalAS = 0;
                        else
                            $totalAS = $sumaAS["totalAS"];
                    }else
                        $totalAS = 0;

                $stock = ($totalcompras + $totalAE) - ($totalventas + $totalAS);

                $fila["stock"] = $stock;
            
                array_push($data,  $fila );
                
                
            }

            echo json_encode($data);

        }else
        {
            echo "consultavacia";
        }
    }
    
    $mysqli->close();
?>
