 <?php
	header('content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");
    //subida del archivo al servidor
//CONFIGURACION INICIO

    $ruta="imagenes/";
//CONFIGURACION FIN

    $nombrearchivo = basename($_FILES["imagen"]["name"]);
    $destino= $ruta . $nombrearchivo;

    if(move_uploaded_file($_FILES["imagen"]["tmp_name"],$destino)){
        echo "imagensubida";
    }else{
        echo "errorimagen";
    }

?>