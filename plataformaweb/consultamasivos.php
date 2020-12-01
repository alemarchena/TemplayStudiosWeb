<?php

    date_default_timezone_set('America/Argentina/Mendoza');
 //---------------------parametros recibidos en el POST----------------------

    $bdd = $_POST['bdd'];
    include  $bdd;
    $tabla= $_POST['tabla'];
    $tipo= $_POST['tipo'];
    
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    //------------------- Decision segun quien llama ----------------- 
    
    
    
    if($tipo == "proveedor")
    {
        $tablaproveedoresanuncios   =  $_POST['tablaproveedoresanuncios'];
        $accion= $_POST['accion'];
    }
    
    if($tipo == "publicidad" || $tipo == "publica" || $tipo == "publicapromo" || $tipo == "publicanovedad" || $tipo == "ocultaprecios")
    {
        $accion= $_POST['accion'];
    }


    //--------------------------- Acciones -------------------------

    $paquete = $_POST['paquete'];
    $contador = 0;

    foreach ($paquete as $i => $value) 
    {
        $objetoanuncio  = json_decode($paquete[$i],true);
        $id             = $objetoanuncio['id'];
        
        if($tipo == "categoria")
        {
            $idrubro    = $objetoanuncio['idrubro'];
            $sql = "update " .$tabla. " set idrubro = '$idrubro' where id= $id";
        }

        if($tipo == "proveedor")
        {
            $idproveedor = $objetoanuncio['idproveedor'];
           
            if($accion == "alta")
                $sql = "Insert into " .$tablaproveedoresanuncios. "(idproveedor,idanuncio) values(" .$idproveedor. "," .$id. ")";
            else if( $accion == "baja")
                $sql = "delete from " .$tablaproveedoresanuncios." where idproveedor=" .$idproveedor. " and idanuncio = " .$id;
        }

        if($tipo == "publica")
        {
            if($accion == "si")
                $sql = "update " .$tabla. " set nopublicar = '0' where id= $id";
            else
                $sql = "update " .$tabla. " set nopublicar = '1' where id= $id";
        }

        if($tipo == "publicapromo")
        {
            if($accion == "si")
                $sql = "update " .$tabla. " set esoferta = '1' where id= $id";
            else
                $sql = "update " .$tabla. " set esoferta = '0' where id= $id";
        }

        if($tipo == "publicanovedad")
        {
            if($accion == "si")
                $sql = "update " .$tabla. " set esnovedad = '1' where id= $id";
            else
                $sql = "update " .$tabla. " set esnovedad = '0' where id= $id";
        }

        if($tipo == "ocultaprecios")
        {
            if($accion == "si")
                $sql = "update " .$tabla. " set ocultarprecio = '1' where id= $id";
            else
                $sql = "update " .$tabla. " set ocultarprecio = '0' where id= $id";
        }

         if($tipo == "publicidad")
        {
            if($accion == "si")
                $sql = "update " .$tabla. " set espublicidad = '1' where id= $id";
            else
                $sql = "update " .$tabla. " set espublicidad = '0' where id= $id";
        }

        $resultado = $mysqli->query($sql);
        if($resultado)$contador = $contador + 1;
    }

    echo $contador;
    $mysqli->close();
?>
