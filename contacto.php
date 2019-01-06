<div class="subcontenedorcontacto">
	<div class="col-sm-12" align="left">
		<h4 >Por favor complete los datos y envíenos su inquietud</h4>
		<div class="input-group">
			<div class="input-group-prepend">
				<span class="input-group-text contacto">Nombre y Apellido</span>
			
				<input id="nombre" type="text" aria-label="First name" class="form-control contacto" placeholder="Escriba su nombre">
				<input id="apellido" type="text" aria-label="Last name" class="form-control contacto" placeholder="Escriba su Apellido">
			</div>
			<br>
			<div class="input-group-prepend btn-block">
				<span for="exampleInputEmail1"class="input-group-text  btn-block contacto">Su correo</span>
				<input id="email" type="email" class="form-control contacto" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email">

				<span class="input-group-text contacto" >Su Teléfono</span>
				<input id="telefono" type="text" aria-label="Telefono" class="form-control contacto" placeholder="Número">
			</div>
			<br>
			<div class="input-group-prepend btn-block">
		    	<span class="input-group-text contacto">Escribanos</span>
				<textarea id="mensaje" class="form-control contacto " aria-label="With textarea" placeholder="Su mensaje"></textarea>
	  		</div>
		</div>
	
		<button id="enviar" type="submit" class="btn text-white bg-dark contacto" style="font-size: 1.3em">Enviar</button>

	</div>
</div>

<script>
	
	$("#enviar").click(function(){
		var nombre = $("#nombre").val();
		var apellido = $("#apellido").val();
		var email = $("#email").val();
		var telefono = $("#telefono").val();
		var mensaje = $("#mensaje").val();

		$.ajax({

			url:"controladores/enviaremail.php",
			data:{nombre:nombre,apellido:apellido,email:email,telefono:telefono,mensaje:mensaje},
			type:"post",
			success:function(data){
				if(data!="consultavacia")
	            {
	            	alert("¡¡¡Gracias por enviar su mensaje!!!");
	            	nombre = $("#nombre").val("");
					apellido = $("#apellido").val("");
					email = $("#email").val("");
					telefono = $("#telefono").val("");
					mensaje = $("#mensaje").val("");
	            }
			},
			error:function(e){
				alert("Error al Enviar");
			}
		});
	});
	

</script>