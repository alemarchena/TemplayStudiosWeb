
<form id="formulariocontacto">
	<div class="form-row" id="contenidoformulariocontacto">
		<h4 >Por favor complete los datos y envíenos su inquietud</h4>
		<div class="form-group col-12">
			<div class="form-row">
				<div class="col-sm-6">
					<label class="contacto" for="nombre">Nombre</label>
					<input id="nombre" type="text" aria-label="Last name" class="form-control contacto" placeholder="Escriba su Nombre">
				</div>
				
			</div>
			<div class="form-row">
				<div class="col-sm-4">
					<label class="contacto" style="padding-top: 1em;" for="email">Email</label>
					<input id="email" type="email" class="form-control contacto" placeholder="Ingrese su email">
				</div>
				<div class="col-sm-2">
					<label class="contacto" style="padding-top: 1em;" for="telefono">Teléfono</label>
					<input id="telefono" type="text" class="form-control contacto" placeholder="Ingrese su número">
				</div>
			</div>
		<div>
	
		<div class="form-row ">
			<div class="col-12">
				<label class="contacto" style="padding-top: 1em;" for="mensaje">Mensaje</label>
				<textarea id="mensaje" class="form-control contacto" aria-label="With textarea" placeholder="Escriba su mensaje"></textarea>
				<button id="enviar" type="submit" class="btn text-white bg-dark" style="font-size: 1.3em">Enviar</button>
			</div>
		</div>
	</div>
</form>
<script>
	
	$("#enviar").click(function(){
		var nombre = $("#nombre").val();

		var email = $("#email").val();
		var telefono = $("#telefono").val();
		var mensaje = $("#mensaje").val();

		$.ajax({

			url:"controladores/enviaremail.php",
			data:{nombre:nombre,email:email,telefono:telefono,mensaje:mensaje},
			type:"post",
			success:function(data){
				if(data!="consultavacia")
	            {
	            	alert("¡¡¡Gracias por enviar su mensaje!!!");
	            	nombre = $("#nombre").val("");
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