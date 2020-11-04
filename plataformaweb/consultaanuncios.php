<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $objetoanuncio = json_decode($_POST['objetoanuncio'],true);


    $bdd = $objetoanuncio['bdd'];
    include  $bdd;

    $tabla= $objetoanuncio['tabla'];
    $tablarubros= $objetoanuncio['tablarubros'];
    $tablaunidadesgranel = $objetoanuncio['tablaunidadesgranel'];

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
    $ocultarprecio = $objetoanuncio['ocultarprecio'];


    $opcionantes = $objetoanuncio['opcionantes'];
    $tituloantes = $objetoanuncio['tituloantes'];
    $precioantes = $objetoanuncio['precioantes'];

    //venta fraccionada
    $codigobarra = $objetoanuncio['codigobarra'];
    $prefijocompra = $objetoanuncio['prefijoxcompra'];
    $prefijoventa = $objetoanuncio['prefijoxventa'];
    $costoxprefijo = $objetoanuncio['costoxprefijo'];
    $ventaxprefijo = $objetoanuncio['ventaxprefijo'];
    $comodin = $objetoanuncio['comodin'];

    

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
                $sentencia = $sentencia . " ( ( descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%' or ( $tabla.id = '$filtros' and $tabla.id !='' ) or ($tabla.comodin like '%" . $filtros . "%' and $tabla.comodin != '') or ($tabla.codigobarra = '" . $codigobarra . "' and $tabla.codigobarra != '') ) ";
            else
                $sentencia = $sentencia . " or ( descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%' or ( $tabla.id = '$filtros' and $tabla.id !='' ) or ($tabla.comodin like '%" . $filtros . "%' and $tabla.comodin != '') or ($tabla.codigobarra = '" . $codigobarra . "' and $tabla.codigobarra != '') ) ";

        }
     
    
    //--------------------------- Acciones -------------------------
    
     if($tipo == "consultanovedades" || $tipo == "consultaxcodigobarra" || $tipo == "consultalector" || $tipo == "consultatodosanunciosoferta" || $tipo == "consultarubros" || $tipo == "consultatodosanuncios" || $tipo == "consulta" || $tipo == "consultafiltros")
    {
        if($tipo == "consultanovedades"){
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios,".$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".esnovedad = '1'";
            // echo $sql;
        }else if($tipo == "consultatodosanunciosoferta"){
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".bonus," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios,".$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".esoferta = '1'";
            // echo $sql;
        }else if($tipo == "consultarubros"){
            if($sentencia == ""){
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".idrubro = " 
                                 .$idrubro . " order by " .$tabla. ".titulo";
                                
            }else{

                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".idrubro = " 
                                 .$idrubro . " " . $sentencia . " ) order by " .$tabla. ".titulo";
            }
        }else if($tipo == "consultafiltros")
        {
            if($sentencia == ""){
                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where 1 order by " .$tabla. ".titulo";
            }else{

                $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " . $sentencia . " ) order by " .$tabla. ".titulo";

                // echo $sql;
            }

            

        }else if($tipo == "consulta"){
            $sql = "Select * from " .$tabla. " where " .$tabla. ".id =" . $id;
        }else if($tipo == "consultaxcodigobarra"){
            $sql = "Select " .$tabla. ".id from " .$tabla. " where " .$tabla. ".codigobarra = '" . $codigobarra . "'";
            
        }else if($tipo == "consultatodosanuncios"){
            $sql = "Select "    .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".precio," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo," .$tabla. ".comodin," .$tabla. ".ocultarprecio,"
                                .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                .$tabla. ".idrubro," .$tablarubros. ".idrubro," .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where 1 order by " .$tablarubros. ".nombrerubro desc";
        }else if($tipo == "consultalector"){
            $sql = "Select " .$tabla. ".id," .$tabla. ".titulo," .$tabla. ".descripcion," .$tabla. ".imagen," .$tabla. ".codigobarra,"  .$tabla. ".prefijocompra," .$tabla. ".prefijoventa," .$tabla. ".costoxprefijo," .$tabla. ".ventaxprefijo," .$tabla. ".ocultarprecio,"
                                 .$tabla. ".precio," .$tabla. ".idrubro," .$tabla. ".esnovedad," .$tabla. ".esoferta,"
                                 .$tabla. ".bonus," .$tabla. ".costo," .$tabla. ".inactivo," .$tabla. ".nopublicar," .$tabla. ".productobonus," .$tabla. ".comodin," 
                                 .$tabla. ".tieneventaja," .$tabla. ".tituloventaja," .$tabla. ".precioventaja," .$tabla. ".textolinkexterno,".$tabla. ".linkexterno,"
                                 .$tabla. ".observaciones," .$tabla. ".comentarios," .$tabla. ".fechastockinicio," 
                                 .$tablaunidadesgranel. ".prefijocompra," .$tablaunidadesgranel. ".nombreprefijocompra," .$tablaunidadesgranel. ".nombreprefijoventa," .$tablaunidadesgranel. ".relacioncompraventa,"
                                 .$tablarubros. ".nombrerubro as rubro from ((" .$tabla. " LEFT JOIN " 
                                 .$tablarubros. " ON " .$tabla. ".idrubro = " .$tablarubros. ".idrubro ) LEFT JOIN "
                                 .$tablaunidadesgranel. " ON " .$tabla. ".prefijocompra = " .$tablaunidadesgranel. ".prefijocompra and " .$tabla. ".prefijoventa = " .$tablaunidadesgranel. ".prefijoventa ) where " .$tabla. ".codigobarra = '" 
                                 .$codigobarra . "' order by " .$tabla. ".titulo";
           
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
                $sql = "INSERT INTO " .$tabla. "(idrubro,   titulo ,  descripcion ,  precio  , costo ,  imagen ,  esnovedad ,  esoferta ,  nopublicar ,  observaciones ,  comentarios ,  productobonus ,  bonus , tieneventaja , tituloventaja, precioventaja,  textolinkexterno ,  linkexterno ,  codigobarra ,  prefijocompra ,  prefijoventa ,  costoxprefijo ,  ventaxprefijo, comodin,ocultarprecio) values('$idrubro','$titulo','$descripcion','$precio','$costo','$imagen','$esnovedad','$esoferta','$nopublicar','$observaciones','$comentarios','$productobonus','$bonus','$opcionantes','$tituloantes','$precioantes','$textolinkexterno','$linkexterno','$codigobarra','$prefijocompra','$prefijoventa','$costoxprefijo','$ventaxprefijo','$comodin','$ocultarprecio')";
                
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
                $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo', comodin = '$comodin', ocultarprecio = '$ocultarprecio'  where id= $id";
            }
            else
            {//actualiza los datos y la imagen que tenia
                $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo',imagen = '$imagen', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo', comodin = '$comodin' where id= $id";
            }
            $resultado  = $mysqli->query($sql);
            echo $resultado;
        }
        
        
    }else if($tipo == "baja")
    {

        $sql = "delete from " .$tabla. " where id = $id";
        $resultado  = $mysqli->query($sql);
        unlink($rutaimagenes.$imagen);
        echo $rutaimagenes.$imagen;
    }else if($tipo == "actualizapreciocostoyventa"){
            $sql = "update " .$tabla. " set costoxprefijo = '$costoxprefijo',ventaxprefijo = '$ventaxprefijo',precio = '$precio',costo = '$costo',precioanterior = '$precioanterior',costoanterior = '$costoanterior', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo' where id= $id";
            
            
            $resultado  = $mysqli->query($sql);
            echo $resultado;
    }
    $mysqli->close();
?>
