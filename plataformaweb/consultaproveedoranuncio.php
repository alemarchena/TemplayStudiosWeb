<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $objetoanuncio = json_decode($_POST['objetoanuncio'],true);


    $bdd = $objetoanuncio['bdd'];
    include  $bdd;

    $tabla= $objetoanuncio['tabla'];
    $tablarubros= $objetoanuncio['tablarubros'];
    $tablaproveedores= $objetoanuncio['tablaproveedores'];
    $tablaproveedoresanuncios= $objetoanuncio['tablaproveedoresanuncios'];
 

    // $fechainicio = $_POST['fechainicio'];
    // $fechafin = $_POST['fechafin'];

    $tipo = $objetoanuncio['tipo'];
    $id = $objetoanuncio['id'];
    $idrubro = $objetoanuncio['idrubro'];
    $idproveedor = $objetoanuncio['idproveedor'];
    
    $filtro = $objetoanuncio['filtro'];


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
            $sentencia = $sentencia . " ( (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";
        else
            $sentencia = $sentencia . " or (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";
    }
     
    
    //--------------------------- Acciones -------------------------
    
     if($tipo == "verificar" || $tipo == "consultaunproveedorenrelacion" || $tipo == "consultafiltros" || $tipo == "consultarubros" || $tipo == "consultarubrosdelproveedor" || $tipo == "consultafiltrosdelproveedor")
    {
        if($tipo == "consultarubros")
        {
            // $sqlpor rubro
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo," 
                                 .$tablarubros. ".nombrerubro as rubro," 
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro) LEFT JOIN " 
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where " 
                                 .$tabla. ".idrubro = " .$idrubro . " order by " .$tabla. ".titulo";
                                 
        }else if($tipo == "consultarubrosdelproveedor")
        {
            // $sqlpor rubro
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo," 
                                 .$tablarubros. ".nombrerubro as rubro," 
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro) LEFT JOIN " 
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where " 
                                 .$tabla. ".idrubro = " .$idrubro. " and " .$tablaproveedoresanuncios. ".idanuncio = " .$tabla.".id and " 
                                 .$tablaproveedoresanuncios. ".idproveedor =" .$idproveedor. " order by " .$tabla. ".titulo";
                                
        //    echo $sql;

        }else if($tipo == "consultafiltros")
        {
            if($sentencia == "")
            {
                // $sql todo 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo," 
                                 .$tablarubros. ".nombrerubro as rubro, "
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where 1 order by " 
                                 .$tabla. ".titulo";
            }
            else
            {
                // $sql con $sentencia 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo,"
                                 .$tablarubros. ".nombrerubro as rubro, "
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where " 
                                 .$sentencia . " ) order by " .$tabla. ".titulo";
            }
        }else if($tipo == "consultafiltrosdelproveedor")
        {
             if($sentencia == "")
            {
                // $sql todo 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo," 
                                 .$tablarubros. ".nombrerubro as rubro, "
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where " 
                                 .$tablaproveedoresanuncios. ".idanuncio = " .$tabla.".id and " .$tablaproveedoresanuncios. ".idproveedor =" .$idproveedor. 
                                 " order by " .$tabla. ".titulo";
            }
            else
            {
                // $sql con $sentencia 
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion,"  
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".costo,"
                                 .$tablarubros. ".nombrerubro as rubro, "
                                 .$tablaproveedoresanuncios. ".idanuncio," .$tablaproveedoresanuncios. ".idproveedor from ((" 
                                 .$tabla. " LEFT JOIN " .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro) LEFT JOIN "
                                 .$tablaproveedoresanuncios. " ON " .$tabla. ".id = " .$tablaproveedoresanuncios. ".idanuncio ) where (" 
                                 .$tablaproveedoresanuncios. ".idanuncio = " .$tabla.".id and " .$tablaproveedoresanuncios. ".idproveedor =" .$idproveedor. ") and "
                                 .$sentencia . " ) order by " .$tabla. ".titulo";
            }
        }else if($tipo == "consultaunproveedorenrelacion"){
            $sql = "Select * from " . $tablaproveedoresanuncios . " where idproveedor = " .$idproveedor . "";
        }else if($tipo == "verificar"){
            $sql = "Select * from " . $tablaproveedoresanuncios . " where idanuncio = " . $id . " and idproveedor = " .$idproveedor . "";
        }
    
        // echo $sql;
        $resultado  = $mysqli->query($sql);
      
        $data = array();
        
    
        if($resultado)
        {
            
            $resultado->data_seek(0);
            
            while($fila = $resultado->fetch_assoc())
            {
                
                $idanunciofila =  $fila['idanuncio'];
                $idproveedorfila =  $fila['idproveedor'];
                
                // $fila["anunciodelproveedor"] = "Id: " .$idfila . ",idanuncio:" . $idanunciofila. "IdProveed:" .$idproveedorfila;


                if($idproveedorfila != "" && $idanunciofila != "") 
                {
                    if($idproveedorfila == $idproveedor)
                            $fila["anunciodelproveedor"] = "SI";
                        else
                            $fila["anunciodelproveedor"] = "NO";
                }
                else
                    $fila["anunciodelproveedor"] = "NO";
                
                array_push($data,  $fila );
            }

            echo json_encode($data);

        }else
        {
            echo "consultavacia";
        }
    }if($tipo == "alta" || $tipo == "baja" )
    {
        if($tipo == "alta")
            $sql = "Insert into " .$tablaproveedoresanuncios. "(idproveedor,idanuncio) values(" .$idproveedor. "," .$id. ")";
        else if( $tipo == "baja")
            $sql = "delete from " .$tablaproveedoresanuncios." where idproveedor=" .$idproveedor. " and idanuncio = " .$id;

        // echo $sql;

        $resultado  = $mysqli->query($sql);
        if($resultado) { echo $resultado;}
        else{ echo "consultavacia ".$sql; }

    }
    
    $mysqli->close();
?>
