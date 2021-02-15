<?php

    date_default_timezone_set('America/Argentina/Mendoza');

//---------------------parametros recibidos en el POST----------------------

    
    $bdd = $_POST['bdd'];
    include  $bdd;
    $tabla= $_POST['tabla'];
    $tipo = $_POST['tipo'];

    //-----------------conectando con la base de datos---------------------

    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) { exit('No se pudo conectar a la base de datos'); }

    $itemsdeventa = $_POST['itemsdeventa'];
    $contador = 0;

    foreach ($itemsdeventa as $i => $value) {
        //itemsdeventa es un arreglo que llega convertido a json
        $objetoanuncio = json_decode($itemsdeventa[$i], true);

        $idproducto = $objetoanuncio['idproducto'];
        $precio = $objetoanuncio['precio'];
        $costo = $objetoanuncio['costo'];
        $idrubro = $objetoanuncio['idrubro'];
        $fechaventa = $objetoanuncio['fechaventa'];
        $fechaventacreada = date_create_from_format('dmY', $fechaventa);
        $fechaventa = date_format($fechaventacreada, 'Y-m-d');

        $hora = $objetoanuncio['hora'];
        $cantidad = $objetoanuncio['cantidad'];
        $idcliente = $objetoanuncio['idclienteelegido'];
        $bonus = $objetoanuncio['bonus'];
        $tipopago = $objetoanuncio['tipopagonombrecorto'];
        $email = $objetoanuncio['email'];
        $numdvp = $objetoanuncio['numdvp'];

        if ($tipo == "altapaquete") {
            $sql = "INSERT INTO " . $tabla . "(idproducto, precio, costo, idrubro, fecha, hora, cantidad,idcliente,bonus,tipopago,email,numdvp)
                values('$idproducto','$precio','$costo','$idrubro','$fechaventa','$hora','$cantidad','$idcliente','$bonus','$tipopago','$email','$numdvp')";
        }
        
        $resultado = $mysqli->query($sql);
        if ($resultado) $contador = $contador + 1;
    }

    echo $contador;
    $mysqli->close();
?>
