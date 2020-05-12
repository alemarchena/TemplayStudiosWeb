<?php

	header('content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");

    
    date_default_timezone_set('America/Argentina/Mendoza');

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
    //---------------------parametros recibidos en el POST----------------------

        // $fechainicio = $_POST['fechainicio'];
        // $fechafin = $_POST['fechafin'];

        $tipo = $_POST['tipo'];
        $id = $_POST['id'];
        $rubro = $_POST['rubro'];
        $filtro = $_POST['filtro'];

        $titulo = $_POST['titulo'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $imagen = $_POST['imagen'];
        $rutaimagenes = $_POST['rutaimagenes'];
        $esnovedad = $_POST['esnovedad'];
        $esoferta = $_POST['esoferta'];
 
        $sentencia = "";

        foreach ($filtro as $filtros)
   		{
            if($sentencia == "")
                $sentencia = $sentencia . " and ( (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";
            else
                $sentencia = $sentencia . " or (descripcion like '%" . $filtros . "%' or titulo like '%" . $filtros . "%') ";

        }
     
       
        //---------------------------insercion del anuncio-------------------------
  
    // Consulta
    
     if($tipo == "consultatodosanunciosoferta")
    {
        $sql = "Select * from " .$tabla. " where esoferta = '1'";
         

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
    }else if($tipo == "consultarubros")
    {
        if($sentencia == ""){
            $sql = "Select * from " .$tabla. " where rubro like '%" . $rubro . "%'";
         }else{

            $sql = "Select * from " .$tabla. " where rubro like '%" . $rubro . "%' " . $sentencia . " ) order by titulo";
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
    else if($tipo == "consultatodosanuncios")
    {
        
        $sql = "Select * from " .$tabla. " where 1";

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


    }else if($tipo == "consulta")
    {

        $sql = "Select * from " .$tabla. " where id =" . $id;
        //var_dump($sql);

        $resultado  = $mysqli->query($sql);
        //var_dump($resultado);
        
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
    }else if($tipo == "alta")
    {
        if($id==0)
        {
            if(titulo != "")
            {
                $sql = "INSERT INTO " .$tabla. "(rubro,titulo,descripcion,precio,imagen,esnovedad,esoferta) values('$rubro','$titulo','$descripcion','$precio','$imagen','$esnovedad','$esoferta')";

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
                $sql = "update " .$tabla. " set rubro = '$rubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio', esnovedad = '$esnovedad', esoferta = '$esoferta' where id= $id";
            }
            else
            {//actualiza los datos y la imagen que tenia
            $sql = "update " .$tabla. " set rubro = '$rubro',titulo = '$titulo',descripcion = '$descripcion',precio = '$precio',imagen = '$imagen', esnovedad = '$esnovedad', esoferta = '$esoferta' where id= $id";


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
    }
 
?>
