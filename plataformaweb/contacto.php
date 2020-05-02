
<form id="formulariocontacto ">
	<div class="form-row d-flex justify-content-center" id="contenidoformulariocontacto">
		<p class="contacto">Por favor complete los datos y envíenos su inquietud</p>
		<div class="form-group col-10 offset-sm-1">
			<div class="form-row">
				<div class="col-sm-3">
					<label class="contacto" for="nombre">Nombre</label>
					<input id="nombre" type="text" aria-label="Last name" class="form-control " placeholder="Escriba su Nombre">
				</div>
				<div class="col-sm-3">
					<label class="contacto" for="apellido">Apellido</label>
					<input id="apellido" type="text" aria-label="Last name" class="form-control " placeholder="Escriba su Apellido">
				</div>
				<div class="col-sm-3">
					<label class="contacto" for="email">Email</label>
					<input id="email" type="email" class="form-control " placeholder="Ingrese su email">
				</div>
				<div class="col-sm-3">
					<label class="contacto" for="celular">Teléfono</label>
					<input id="celular" type="text" class="form-control " placeholder="Ingrese su teléfono">
				</div>
			</div>
			
		<div>
	
		<div class="form-group ">
			<div class="col-12">
				<label class="contacto" style="padding-top: 1em;" for="mensaje">Mensaje</label>
				<textarea id="mensaje" class="form-control contactoplaceholder" aria-label="With textarea" placeholder="Escriba su mensaje"></textarea>
				<br>
				<button id="enviar" type="submit" class="btn describir" style="font-size: 1em">Enviar</button>
			</div>
		</div>
	</div>
</form>
<script>
	
	$("#enviar").click(function(){
		var telefono = $("#celular").val();


		var nombre = $("#nombre").val();
		var apellido = $("#apellido").val();
		var email = $("#email").val();
		var mensaje = $("#mensaje").val();

		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Gracias por enviar su mensaje',
			showConfirmButton: false,
			timer: 1500
		});

	

		$.ajax({

			url:"controladores/enviaremail.php",
			data:{nombre:nombre,apellido:apellido,email:email,telefono:telefono,mensaje:mensaje},
			type:"post",
			success:function(data)
			{
				if(data=="Enviado correctamente")
				{
					
						
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