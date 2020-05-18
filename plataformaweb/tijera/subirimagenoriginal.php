 <?php

    $ruta="imagenesrecorte/";
    
    $nombrearchivo = basename($_FILES["imagen"]["name"]);
    $destino= $ruta . $nombrearchivo;

 
    if(move_uploaded_file($_FILES["imagen"]["tmp_name"],$destino)){
        echo $destino;
    }else{
        echo "errorimagen";
    }
 
?>