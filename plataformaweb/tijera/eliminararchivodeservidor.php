 <?php
    
    $carpeta = $_POST['carpeta'];
    // unlink($nombrearchivo);
    
    $files = glob($carpeta.'*.jpg'); //obtenemos todos los nombres de los ficheros
    foreach($files as $file){
        if(is_file($file))
        unlink($file); //elimino el fichero
    }
    echo "ok";

?>