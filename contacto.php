
<form>
	<div class="form-row subcontenedorcontacto">
		<h4 >Por favor complete los datos y envíenos su inquietud</h4>
	  
		<div class="form-row px-6">
			<div class="form-group col-md-6">
				<label for="inputEmail4">Nombre</label>
				<input id="nombre" type="text" aria-label="First name" class="form-control contacto" placeholder="Escriba su nombre">
			</div>
			<div class="form-group col-md-6">
				<label for="inputEmail4">Apellido</label>
				<input id="apellido" type="text" aria-label="Last name" class="form-control contacto" placeholder="Escriba su Apellido">
			</div>

		<div class="form-row">
			<div class="form-group col-md-6">
				<label for="inputEmail4">Email</label>
				<input id="email" type="email" class="form-control"  placeholder="Email">
			</div>
			<div class="form-group col-md-6">
				<label for="inputAddress">Teléfono</label>
				<input id="telefono" type="text" class="form-control" placeholder="Número de teléfono">
			</div>

		</div>

 		<div class="form-group col-md-12">
			<label for="inputAddress2">Mensaje</label>
			<textarea id="mensaje" class="form-control contacto " aria-label="With textarea" placeholder="Su mensaje"></textarea>
			<button id="enviar" type="submit" class="btn text-white bg-dark contacto" style="font-size: 1.3em">Enviar</button>
		</div>
	
	
</form>
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