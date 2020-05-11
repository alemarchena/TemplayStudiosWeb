<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title>Recortador</title>

<!-- Bootstrap core CSS -->
<link href="dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="assets/sticky-footer-navbar.css" rel="stylesheet">

<link rel="stylesheet" href="css/jquery.Jcrop.min.css" type="text/css" />
<script src="js/jquery.min.js"></script>
<script src="js/jquery.Jcrop.min.js"></script>



</head>

<body>

<div class="container">
  <h3 class="mt-5">Recortar imagen</h3>
  <hr>
  <div class="row">
    
    <div class="col-12 col-md-12"> 
      <!-- Contenido -->
      <form class="form-inline">
          <div class="form-group mb-2">
          <ul class="list-group">
            <li class="list-group-item">
            <div><img src="imagenes/ImagenOriginal.jpg" id="RecortarImagen" class="img" /><br /></div>
            </li>
          </ul>
          </div>
          <div class="form-group mb-2" style="padding:20px;"><input class="btn btn-primary" type='button' id="recortar" value='Recortar Imagen'></div>
          <div class="form-group mb-2" style="padding:20px;"><input class="btn btn-primary" type='button' id="descargar" value='Descargar Imagen'></div>
      </form>


      <div class="form-inline">
        <div class="form-group mb-2">        
        
        <ul class="list-group">
          <li class="list-group-item">
          <div><img src="#" id="imgrecortada_img" style="display: none;"></div>
          </li>
        </ul>

        </div>
      </div> 
    
      <script type="text/javascript">

    
        $(document).ready(function(){
            var size;
            $('#RecortarImagen').Jcrop({
              aspectRatio: 1,
              onSelect: function(c){
              size = {x:c.x,y:c.y,w:c.w,h:c.h};
              $("#recortar").css("visibility", "visible");     
              $("#descargar").css("visibility", "visible");     
              }
            });
        
            $("#recortar").click(function(){
                var img = $("#RecortarImagen").attr('src');
                $("#imgrecortada_img").show();
                $("#descargar").show();
                $("#imgrecortada_img").attr('src','ImagenRecortada.php?x='+size.x+'&y='+size.y+'&w='+size.w+'&h='+size.h+'&img='+img);
            
               
            });
        });
      </script>
      <!-- Fin Contenido --> 
    </div>
  </div>
  <!-- Fin row --> 
</div>
<!-- Fin container -->


<script src="dist/js/bootstrap.min.js"></script>
</body>
</html>
<script>



function descargar(){

   var source =  $("#imgrecortada_img").attr('src');

    var a = document.createElement('a');

    a.download = true;
    a.target = '_blank';
    a.href= source;

    a.click();
}

$("#descargar").click(function(){
  descargar();
});
</script>