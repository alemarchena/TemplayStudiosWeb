<?
date_default_timezone_set('America/Argentina/Mendoza');

header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

include "../conexiones/parametros.php";


$mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

if($mysqli->connect_error)
{
    exit('No se pudo conectar a la base de datos:');
}

if (isset($_POST['email'])) {
    $email = $_POST["email"];

}else{
    $email = null;
}

if($email != null)
{
    $sql = "Select * from logueo where email = '".  $email ."'";
    $resultado  = $mysqli->query($sql);

    $data = array();
    if($resultado)
    {
        $resultado->data_seek(0);
        
        while($fila = $resultado->fetch_assoc())
        {
            array_push($data,  $fila );
            session_start();
            $_SESSION["usuario"] = "ok";
        }
                
        echo json_encode($data);
    }else
    {
        session_destroy();
    }
}else
{
    echo "Vengo sin email";
    session_destroy();
}
?>