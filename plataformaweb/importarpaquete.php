<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $bdd = $_POST['bdd'];
    include  $bdd;
    $tabla= $_POST['tabla'];
    
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    //--------------------------- Acciones -------------------------

    $paqueteFilas = $_POST['paqueteFilas'];
    $contador = 0;

    foreach ($paqueteFilas as $i => $value) 
    {
        
        // echo $paqueteFilas[$i];
        $objetoanuncio = json_decode($paqueteFilas[$i],true);
        $id = $objetoanuncio['id'];
        $codigobarra = $objetoanuncio['codigobarra'];
        $titulo = $objetoanuncio['titulo'];
        $descripcion = $objetoanuncio['descripcion'];
        $precio = $objetoanuncio['precio'];
        $costo = $objetoanuncio['costo'];
        $prefijocompra = $objetoanuncio['prefijocompra'];
        $prefijoventa = $objetoanuncio['prefijoventa'];
        $costoxprefijo = $objetoanuncio['costoxprefijo'];
        $ventaxprefijo = $objetoanuncio['ventaxprefijo'];

        $idrubro = 0;
        $imagen = "";
        $esnovedad = 0;
        $esoferta = 0;
        $nopublicar = 1;
        $observaciones = "";
        $comentarios = "";
        $textolinkexterno = "";
        $linkexterno = "";
        $productobonus = 0;
        $bonus = 0;
        $opcionantes = 0;
        $tituloantes = "";
        $precioantes = 0;
        
        // if($id==0)
        // {
            
            $sql = "INSERT INTO " .$tabla. "(idrubro,   titulo ,  descripcion ,  precio  , costo ,  imagen ,  esnovedad ,  esoferta ,  nopublicar ,  observaciones ,  comentarios ,  productobonus ,  bonus , tieneventaja , tituloventaja, precioventaja,  textolinkexterno ,  linkexterno ,  codigobarra ,  prefijocompra ,  prefijoventa ,  costoxprefijo ,  ventaxprefijo) values('$idrubro','$titulo','$descripcion','$precio','$costo','$imagen','$esnovedad','$esoferta','$nopublicar','$observaciones','$comentarios','$productobonus','$bonus','$opcionantes','$tituloantes','$precioantes','$textolinkexterno','$linkexterno','$codigobarra','$prefijocompra','$prefijoventa','$costoxprefijo','$ventaxprefijo')";
            
            $resultado = $mysqli->query($sql);
            if($resultado)$contador = $contador + 1;

        // }
    }

    echo $contador;
    
    
    // if($resultado)
    // {
    // }else{
    //     echo "consultavacia ".$sql;
    // }
    
    
        
    // else{
    //         if($imagen == "")
    //         {//actualiza los datos pero se mantiene la imagen que tenia
    //             $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo'  where id= $id";
    //         }
    //         else
    //         {//actualiza los datos y la imagen que tenia
    //             $sql = "update " .$tabla. " set idrubro = '$idrubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',costo = '$costo',imagen = '$imagen', esnovedad = '$esnovedad', esoferta = '$esoferta', nopublicar = '$nopublicar', productobonus = '$productobonus', bonus = '$bonus', tieneventaja = '$opcionantes', tituloventaja = '$tituloantes', precioventaja = '$precioantes' ,observaciones = '$observaciones', comentarios = '$comentarios', textolinkexterno = '$textolinkexterno',  linkexterno = '$linkexterno' , codigobarra = '$codigobarra' , prefijocompra = '$prefijocompra',  prefijoventa = '$prefijoventa' , costoxprefijo = '$costoxprefijo' , ventaxprefijo = '$ventaxprefijo' where id= $id";
    //         }
    //         $resultado  = $mysqli->query($sql);
    //         echo $resultado;
    //     }
        
   
    $mysqli->close();
?>
