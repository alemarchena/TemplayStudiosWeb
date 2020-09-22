<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $objetoanuncio = json_decode($_POST['objetoanuncio'],true);


    $bdd = $objetoanuncio['bdd'];
    include  $bdd;

    $tabla= $objetoanuncio['tabla'];
    $tablarubros= $objetoanuncio['tablarubros'];

    // $fechainicio = $_POST['fechainicio'];
    // $fechafin = $_POST['fechafin'];

    $tipo = $objetoanuncio['tipo'];
    $id = $objetoanuncio['id'];
    $idrubro = $objetoanuncio['idrubro'];
    $filtro = $objetoanuncio['filtro'];

    $titulo = $objetoanuncio['titulo'];
    $descripcion = $objetoanuncio['descripcion'];
    $precio = $objetoanuncio['precio'];
    $precioanterior = $objetoanuncio['precioanterior'];
    $costo = $objetoanuncio['costo'];
    $costoanterior = $objetoanuncio['costoanterior'];
    $imagen = $objetoanuncio['imagen'];
    $rutaimagenes = $objetoanuncio['rutaimagenes'];
    $esnovedad = $objetoanuncio['esnovedad'];
    $esoferta = $objetoanuncio['esoferta'];
    $nopublicar = $objetoanuncio['nopublicar'];
    $productobonus = $objetoanuncio['productobonus'];
    $bonus = $objetoanuncio['bonus'];
    $observaciones = $objetoanuncio['observaciones'];
    $comentarios = $objetoanuncio['comentarios'];
    $textolinkexterno = $objetoanuncio['textolinkexterno'];
    $linkexterno = $objetoanuncio['linkexterno'];


    $opcionantes = $objetoanuncio['opcionantes'];
    $tituloantes = $objetoanuncio['tituloantes'];
    $precioantes = $objetoanuncio['precioantes'];

    //venta fraccionada
    $codigobarra = $objetoanuncio['codigobarra'];
    $prefijocompra = $objetoanuncio['prefijoxcompra'];
    $prefijoventa = $objetoanuncio['prefijoxventa'];
    $costoxprefijo = $objetoanuncio['costoxprefijo'];
    $ventaxprefijo = $objetoanuncio['ventaxprefijo'];

    

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
                $sentencia = $sentencia . " ( ( descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";
            else
                $sentencia = $sentencia . " or ( descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";

        }
     
    
    //--------------------------- Acciones -------------------------
    
     if($tipo == "consultatodosanunciosoferta" || $tipo == "consultarubros" || $tipo == "consultatodosanuncios" || $tipo == "consulta" || $tipo == "consultafiltros")
    {
        if($tipo == "consultatodosanunciosoferta"){
            // $sql = "Select * from " .$tabla. " where esoferta = '1'";
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios,".$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," 
                                 .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where " .$tabla. ".esoferta = '1'";
        }else if($tipo == "consultarubros"){
            if($sentencia == ""){
                // $sql = "Select * from " .$tabla. "," .$tablarubros. ".rubro where idrubro like '%" . $idrubro . "%' order by titulo";
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where " .$tabla. ".idrubro = " 
                                 .$idrubro . " order by " .$tabla. ".titulo";
            }else{

                // $sql = "Select * from " .$tabla. " where idrubro like '%" . $idrubro . "%' " . $sentencia . " ) order by titulo";
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where " .$tabla. ".idrubro = " 
                                 .$idrubro . " " . $sentencia . " ) order by " .$tabla. ".titulo";
            }
        }else if($tipo == "consultafiltros")
        {
            if($sentencia == ""){
                // $sql = "Select * from " .$tabla. "," .$tablarubros. ".rubro where idrubro like '%" . $idrubro . "%' order by titulo";
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus,"
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where 1 order by " .$tabla. ".titulo";
            }else{

                // $sql = "Select * from " .$tabla. " where idrubro like '%" . $idrubro . "%' " . $sentencia . " ) order by titulo";
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where " . $sentencia . " ) order by " .$tabla. ".titulo";

                
            }

        }else if($tipo == "consulta"){
            $sql = "Select * from " .$tabla. " where id =" . $id;

        }else if($tipo == "consultatodosanuncios"){
            $sql = "Select "    .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".precio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                .$tabla. ".idrubro," .$tablarubros. ".idrubro," .$tablarubros. ".nombrerubro as rubro from " .$tabla. " LEFT JOIN " 
                                .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro where 1 order by " .$tablarubros. ".nombrerubro desc";
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
        }else
        {
            echo "consultavacia";
        }
    }
    else 
    
    if($tipo == "alta")
    {
        if($id==0)
        {
            if(titulo != "")
            {
                $sql = "INSERT INTO " .$tabla. "(idrubro,   titulo ,  descripcion ,  precio  , costo ,  imagen ,  esnovedad ,  esoferta ,  nopublicar ,  observaciones ,  comentarios ,  productobonus ,  bonus , tieneventaja , tituloventaja, precioventaja,  textolinkexterno ,  linkexterno ,  codigobarra ,  prefijocompra ,  prefijoventa ,  costoxprefijo ,  ventaxprefijo) values('$idrubro','$titulo','$descripcion','$precio','$costo','$imagen','$esnovedad','$esoferta','$nopublicar','$observaciones','$comentarios','$productobonus','$bonus','$opcionantes','$tituloantes','$precioantes','$textolinkexterno','$linkexterno','$codigobarra','$prefijocompra','$prefijoventa','$costoxprefijo','$ventaxprefijo')";
                
                $resultado = $mysqli->query($sql);

                if($resultado)
                {
                    echo $resultado;
                }else{

                    echo "consultavacia ".$sql;
                }
            }

        }else{
            if($imagen == "")
            {//actualiza los datos pero se mantiene la imagen que tenia
                $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo'  where id= $id";
            }
            else
            {//actualiza los datos y la imagen que tenia
                $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo',imagen = '$imagen', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo' where id= $id";
            }
            $resultado  = $mysqli->query($sql);
            echo $resultado;
        }
        
        
    }else if($tipo == "baja")
    {
        unlink($rutaimagenes.$imagen);

  
        $sql = "delete from " .$tabla. " where id = $id";

        $resultado  = $mysqli->query($sql);
        echo $rutaimagenes.$imagen;
    }else if($tipo == "actualizapreciocostoyventa"){
            $sql = "update " .$tabla. " set precio = '$precio',costo = '$costo',precioanterior = '$precioanterior',costoanterior = '$costoanterior', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo' where id= $id";
            $resultado  = $mysqli->query($sql);
            echo $resultado;
    }
    $mysqli->close();
?>
