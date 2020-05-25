//------------------------------------------- DATOS GLOBALES ------------------------------------


var arreglo = [];
var arregloproveedoranuncio = [];
var muestrastockinicio = false;


function posicioninicial() {
    var posicion = $("BODY").offset().top;
    $("HTML, BODY").animate({ scrollTop: posicion }, 600);
}

function configuracalendario() {
    $('.datepicker').datepicker({

        firstDay: true,
        format: 'dd-mm-yyyy',
        i18n: {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
        }
    });
}

function reconocerTooltipped()
{
    $('.tooltipped').tooltip();
}
// ------------------------------------------------------------------------------------------------------------
//------------------------------------------- PUBLICAR ANUNCIOS ------------------------------------
// ------------------------------------------------------------------------------------------------------------

function configuraciontabla(tabla)
{
    // $('#tablaanuncios').DataTable({
    $(tabla).DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Mostrar _MENU_ registros",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10,

        },
        "order": [[0, "desc"]],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}

function limpiarinputimagen()
{
    input = document.getElementById("imagen");
    input.value = '';
    input.innerHTML = "";
}

function limpiarformulario() {
    document.getElementById('id').value = "";

    //imagen
    document.getElementById("muestra").src = "imagenessitio/agregarimagen.jpg";
    document.getElementById("barra").value = 0;
    document.getElementById("valorbarra").innerHTML = "0%";

    limpiarinputimagen();

    if ($('#opcionnoguardar').prop('checked'))
    {

    }else
    {
        document.getElementById('titulo').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('costo').value = "";
        document.getElementById('observaciones').value = "";
        document.getElementById('comentarios').value = "";

    }

    $('#opcionnopublicar').prop('checked',false);

    posicioninicial();
}

function imageneszoom(){
        var elems = document.querySelectorAll('.materialboxed');
        $('.materialboxed').materialbox();
}

function eliminarEtiqueta_productos(identificacion) 
{
    var id = document.getElementById(identificacion);
    id.remove();
}

function agregarfiltroproductostock()
{
    var identi = $("#filtro_productos").val();
    var af = $("#criterios_productos");

    if (identi != ""){
        af.append("<a onclick='eliminarEtiqueta_productos(\"" + identi + "\")' id='" + identi + "' class='btn chip' href='#' role='button'>" + $("#filtro_productos").val() + "</a>");
        document.getElementById("filtro_productos").value ="";
        consultaranunciosstock_filtros();
        M.toast(
            {
                html: 'Buscando productos filtrados...',
                displayLength: '3000'
            });
    }
}

function validarfiltrostock(e)
{
    var key = window.event ? e.which : e.keyCode;
    
    if (key == 13){
        agregarfiltroproductostock();
    }
}



function validarnumero(e, contenido, caracteres)
{

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    if (key == 13) {
        var r = document.getElementById('rubro').value;
        var t = document.getElementById('titulo').value;
        var d = document.getElementById('descripcion').value;
        var p = document.getElementById('precio').value;

        if (r != "" && t != "" && d != "" && p != "" && p >= 0) {
            EnviarFormulario();
        }
        return true;
    }



    var key = window.event ? e.which : e.keyCode;

    if ( ( (key >= 48 && key <= 57) || (key >= 96 && key <= 105) ) && (contenido.length < caracteres)) {
        return true;
    }
    return false;
}

function validartecla(e, contenido, caracteres) {

    // obtenemos la tecla pulsada
    var unicode = e.keyCode ? e.keyCode : e.charCode;

    // Permitimos las siguientes teclas:
    // 8 backspace
    // 46 suprimir
    // 13 enter
    // 9 tabulador
    // 37 izquierda
    // 39 derecha
    // 38 subir
    // 40 bajar
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40){
        return true;
    }

    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13){
        var r = document.getElementById('rubro').value;
        var t = document.getElementById('titulo').value;
        var d = document.getElementById('descripcion').value;
        var p = document.getElementById('precio').value;
        var c = document.getElementById('costo').value;

        if (c != "" && r != "" && t != "" && d != "" && p != "" && p >= 0)
        {
            EnviarFormulario();
        }
        return true;
    }

    if (contenido.length >= caracteres)
        return false;

    return true;
}

function validarcambioimagen(){
    //valida el cambio en el input de la imagen
    var imagen = document.getElementById('imagen');
    imagen.onchange = function (e) { validarimagen(e); }
}

function validarimagen(e)
{
    var archivo = e.target.files[0];
    var extensiones = ["jpg", "PNG","png", "jpeg"];
    var verTam = function (mega) {
        return Math.pow(2, 20) * mega; //2 a la 20 da 1048576 que es 1Mb
    }

    extension = archivo.type.split('/').pop();
    tamanioMax = 1;

    if (extensiones.indexOf(extension) !== -1) //verificamos si la extension esta en el arreglo
    {
        if (archivo.size <= verTam(tamanioMax))
        {
            vistaimagen(archivo);
        }
        else {
            var aviso = document.getElementById("aviso")
            aviso.innerHTML = "Puede subir archivos hasta " + tamanioMax + "Mb como máximo.";
            $("#aviso").fadeIn(500);
            $("#aviso").fadeOut(5000);
            limpiarinputimagen();
            // console.log("Puede subir archivos hasta " + tamanioMax) + "Mb como máximo.";
            archivo.value ="";
        }
    } else {
        aviso.innerHTML = "Solo se admiten archivos de tipo " + extensiones;
            $("#aviso").fadeIn(500);
            $("#aviso").fadeOut(5000);
            limpiarinputimagen();

        // console.log("Solo se admiten archivos de tipo " + extensiones);
        archivo.value ="";
    }

    function vistaimagen(archivoprevia)
    {
        var fr = new FileReader();
        var barra = document.getElementById("barra");
        var muestra = document.getElementById("muestra");
        var valorbarra = document.getElementById("valorbarra");


        fr.onprogress = function(e){
            barra.value = (e.loaded * 100 / e.total);
            valorbarra.innerHTML = Math.round(barra.value) + "%";
        }

        fr.onloadend = function (e){
            muestra.src = fr.result;
        }

        fr.readAsDataURL(archivoprevia);
    }
}

function mostrarToastError(dato){


    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta la información de ' + dato ,
        footer: '<a href>Trabajas demasiado, tal vez necesitas un descanso!</a>'
    })

}

function EnviarFormulario()
{
    var formulario = document.getElementById("formulario");

    var id = document.getElementById('id').value;
    var rnombre = document.getElementById('rubro').value;
    var r = document.getElementById("opciones").value;
    var t = document.getElementById('titulo').value;
    var d = document.getElementById('descripcion').value;
    var p = document.getElementById('precio').value;
    var c = document.getElementById('costo').value;

    var observacion = document.getElementById('observaciones').value;
    var o = observacion.trim();
    o = o.substr(0, 800);

    var comentario = document.getElementById('comentarios').value;
    var come = comentario.trim();
    come = come.substr(0,800);

    var en;
    if ($('#esnovedad').prop('checked')) {
        en = 1;
    }else
    {
        en = 0;
    }

    var eo;
    if ($('#esoferta').prop('checked')) {
        eo = 1;
    } else {
        eo = 0;
    }

    var np;
    if ($('#opcionnopublicar').prop('checked')) {
        np = 1;
    } else {
        np = 0;
    }
    // validaciones de campos
    if (rnombre == "" ){ mostrarToastError("Rubro"); return; }
    if (t == "") { mostrarToastError("Titulo"); return; }
    if (d == ""){ mostrarToastError("Descripción"); return; }
    if (p == "" || p < 0) { mostrarToastError("Precio"); return; }
    if (c == "" || c < 0) { mostrarToastError("Costo"); return; }

    if (imagen.files.length == 0)
    {
        if (id == "")
        {//es nuevo y viene sin imagen
            mostrarToastError("Imagen");
            return;
        }else
        {//esta modificando pero dejo la misma imagen
            var i = "";
            altaanuncio(id, r, t, d, p, c, i, en, eo,np,o,come);
            limpiarformulario();

        }
    }else{
        var i = imagen.files[0].name;

        //subir imagen al servidor
        var formdata = new FormData(formulario);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("ok");
                 //guardar el anuncio en la base de datos
                altaanuncio(id, r, t, d, p, c, i, en, eo,np,o,come);
                limpiarformulario();

            } else
                console.log("intentando subir imagen...");
        };

        xhttp.open('POST', 'subirarchivo.php', true);
        xhttp.send(formdata);
    }

   

}

function altaanuncio(idpasado, r, t, d, p, c, i, en, eo,np,o,come)
{
    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tipo = "alta";

    var id;
    if (idpasado=="")
        id=0;
    else
        id = idpasado;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;
    itemanuncio.tipo = tipo;
    itemanuncio.id = id;
    itemanuncio.idrubro = r;
    itemanuncio.titulo = t;
    itemanuncio.descripcion = d;
    itemanuncio.precio= p;
    itemanuncio.costo = c;
    itemanuncio.imagen = i;
    itemanuncio.esnovedad= en;
    itemanuncio.esoferta= eo;
    itemanuncio.nopublicar = np;
    itemanuncio.observaciones= o;
    itemanuncio.comentarios = come;

    itemanuncio.rutaimagenes = "";
    itemanuncio.filtro = "";

    
    var objetoanuncio = JSON.stringify(itemanuncio);

    $.ajax({
        url: "consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success:function(data){
            if(data==1)
            {
                M.toast({ html: 'Ok guardado', displayLength: '1000', classes: 'rounded' });

                consultaranuncios();

            }else{
                M.toast({ html: 'Error al crear el registro : ' + data })
                console.log("retorno:" + data);

            }
        },
        error: function(e)
        {
            M.toast({ html: 'Error al intentar guardar.' })
        }
    });

}

function consultaranuncios(e)
{
    if ($.fn.dataTable.isDataTable('#tablaanuncios')) {
        tanuncios = $('#tablaanuncios').DataTable();
    }

    // var seleccion = document.getElementById("opcioneslista");
    // var seleccionrubro = seleccion.options[seleccion.selectedIndex].text;
    var seleccionidrubro = document.getElementById("opcioneslista").value;

    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;

    var tipo = "consultarubros";

    var rutaimagenes = "imagenes/";

    var id;

    if (document.getElementById('id')){
        id = document.getElementById('id').value;
    }else
        id="";


    if (id == "")
        id = 0;
    else
        id = id;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.titulo = "";
    itemanuncio.descripcion = "";
    itemanuncio.precio = "";
    itemanuncio.costo = "";
    itemanuncio.esnovedad = "";
    itemanuncio.esoferta = "";
    itemanuncio.nopublicar = "";
    itemanuncio.observaciones = "";
    itemanuncio.comentarios = "";

    itemanuncio.rutaimagenes = rutaimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);

    tanuncios.clear().draw(true);

    $.ajax({

        url: "consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio},

        type: "post",

        success: function (data)
        {

            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var esnov = "";
                var esofe = "";
                var nopub = "";

                arreglo = [];

                $.each(dd, function (key, value) {
                    if (dd[key].esnovedad == 1)
                        esnov = "ES NOVEDAD";
                    else
                        esnov = "";


                    if (dd[key].esoferta == 1)
                        esofe = "ES OFERTA";
                    else
                        esofe = "";

                    if (dd[key].nopublicar == 1)
                        nopub = "NO PUBLICAR";
                    else
                        nopub = "";

                    var objeto = new  Object();
                    objeto.id = dd[key].id;
                    objeto.titulo = dd[key].titulo;
                    objeto.descripcion = dd[key].descripcion;
                    objeto.observaciones = dd[key].observaciones;
                    objeto.comentarios = dd[key].comentarios;

                    arreglo.push(objeto);

                    tanuncios.row.add( [
                        dd[key].id,
                        "<a onclick='seleccionarproducto(\"" + dd[key].id + "\",\"" + dd[key].rubro + "\",\"" + dd[key].precio + "\",\"" + dd[key].costo + "\",\"" + dd[key].imagen + "\",\"" + dd[key].esnovedad + "\",\"" + dd[key].esoferta + "\",\"" + dd[key].nopublicar + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 " + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                        "<img class='materialboxed center-align' width='65%' src=" + "'" + rutaimagenes  + dd[key].imagen + "'></img>",
                        dd[key].rubro,
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].precio,
                        dd[key].costo,
                        esofe,
                        esnov,
                        nopub,
                        "<a onclick='eliminar(\"" + dd[key].id + "\",\"" + dd[key].imagen + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"
                    ] ).draw( false );


                });
                imageneszoom();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function eliminar(id, i)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            eliminaranuncio(id,i);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su anuncio permanece guardado :)'
            )
        }
    })
}

function eliminaranuncio(idpasado,i)
{
    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tipo = "baja";

    var rutaimagenes = "imagenes/";
    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.titulo = "";
    itemanuncio.descripcion = "";
    itemanuncio.precio = "";
    itemanuncio.costo = "";
    itemanuncio.esnovedad = "";
    itemanuncio.esoferta = "";
    itemanuncio.nopublicar = "";
    itemanuncio.observaciones = "";
    itemanuncio.comentarios = "";

    itemanuncio.rutaimagenes = rutaimagenes;
    itemanuncio.rubro = "";
    itemanuncio.imagen = i;
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);

    $.ajax({
        url:"consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio},
        type: "post",
            success:function(data){
                if(data!="consultavacia")
                {
                    Swal.fire(
                        'Eliminado!',
                        'El anuncio fué borrado.',
                        'success'
                    )
                }else{
                    M.toast({ html: 'Error al intentar eliminar.' })
                }
            },
            error: function(e)
            {
                alert("Error en el alta.");
            }
    });
    consultaranuncios();

}

function seleccionarproducto(id, rub, pre, cos, ima, en, eo, np)
{
   
    posicioninicial();
    $('#collapsePub').collapse('toggle');

    limpiarinputimagen();
    document.getElementById('id').value = id;
    document.getElementById('rubro').value = rub;



    $("#opciones option").each(function () {

        if ($(this).text().trim() == rub.trim() )
        {
            $("#opciones option:selected").prop("selected", false);
            $(this).prop("selected", true);
        }
    });

    document.getElementById('precio').value = pre;
    document.getElementById('costo').value = cos;
    document.getElementById("muestra").src = "imagenes/" + ima; //vista previa de la imagen

    //barra de progreso
    document.getElementById("barra").value = 100;
    document.getElementById("valorbarra").innerHTML = "100%";

    validarcambioimagen();

    if (en == 1)
    {
        $("#esnovedad").prop("checked", true);
    }
    else {
        $("#esnovedad").prop("checked", false);
    }

    if (eo == 1) {
        $("#esoferta").prop("checked", true);
    }
    else {
        $("#esoferta").prop("checked", false);
    }

    if (np == 1) {
        $("#opcionnopublicar").prop("checked", true);
    }
    else {
        $("#opcionnopublicar").prop("checked", false);
    }


    //Verifica el id pasado y lo compara con el arreglo que armo durante la consulta
    arreglo.forEach(function (valor, indice) {

        if (arreglo[indice].id == id)
        {
            document.getElementById('titulo').value = arreglo[indice].titulo;
            document.getElementById('descripcion').value = arreglo[indice].descripcion;
            document.getElementById('observaciones').value = arreglo[indice].observaciones;
            document.getElementById('comentarios').value = arreglo[indice].comentarios;
        }
    });



}
// ------------------------------------------------------------------------------------------------------------
//------------------------------------------------ RUBROS ----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function configuraciontablarubro() {
    $('#tablarubros').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA LO QUE DESEA BUSCAR:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay rubros para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            }
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "pageLength": 10

    });
}

function limpiarformulariorubro() {
    document.getElementById('idrubro').value = "";
    document.getElementById('nombrerubro').value = "";
}

function validarteclarubro(e, contenido, caracteres) {

    // obtenemos la tecla pulsada
    var unicode = e.keyCode ? e.keyCode : e.charCode;

    // Permitimos las siguientes teclas:
    // 8 backspace
    // 46 suprimir
    // 13 enter
    // 9 tabulador
    // 37 izquierda
    // 39 derecha
    // 38 subir
    // 40 bajar
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        var r = document.getElementById('nombrerubro').value;


        if (r != "") {
            EnviarFormularioRubro();
        }
        return true;
    }

    if (contenido.length >= caracteres)
        return false;

    return true;
}

function EnviarFormularioRubro() {

    var id = document.getElementById('idrubro').value;
    var r = document.getElementById('nombrerubro').value;

    // validaciones de campos
    if (r == "") { mostrarToastError("Rubro"); return; }

    //guardar el anuncio en la base de datos
    altarubro(id, r);
    limpiarformulariorubro();

}

function altarubro(idpasado, r) {

    var bdd = conexionbdd;
    var tabla = tablarubros;
    var tipo = "alta";


    var id;
    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = r;
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({
        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                // M.toast({ html: 'Registro Guardado!' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Guardado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                consultarrubros();

            } else {
                M.toast({ html: 'Error al crear el registro' });
                console.log("retorno:" + data);

            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });

}

function consultarrubros(e) {
    if ($.fn.dataTable.isDataTable('#tablarubros')) {
        tr = $('#tablarubros').DataTable();
    }

    var bdd = conexionbdd ; 
    var tabla = tablarubros;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },

        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                tr.clear().draw(true);

                $.each(dd, function (key, value) {
                    tr.row.add([
                        "<a onclick='seleccionarrubros(\"" + dd[key].idrubro + "\",\"" + dd[key].nombrerubro + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2" + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                        dd[key].nombrerubro,
                        "<a onclick='eliminarr(\"" + dd[key].idrubro + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"
                    ]).draw(false);
                });

            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });
}

function consultarubros_seleccion(e) {

    var bdd = conexionbdd;
    var tabla = tablarubros;
    
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var op = $("#opciones");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opciones").empty();
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opciones").append(a);

                //selecciona el primer item
                $("#opciones option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}


function consultarubros_seleccionconprecio(e) {

    var bdd = conexionbdd;
    var tabla = tablarubros;

    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var op = $("#opcionesconprecio");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opcionesconprecio").empty();
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcionesconprecio").append(a);

                //selecciona el primer item
                $("#opcionesconprecio option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function consultarubros_seleccion_lista(e) {

    var bdd = conexionbdd;
    var tabla = tablarubros;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var oplista = $("#opcioneslista");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opcioneslista").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcioneslista").append(a);

                //selecciona el primer item
                $("#opcioneslista option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });


            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}



function eliminarr(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            intentaEliminarRubro(id);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su rubro permanece guardado :)'
            )
        }
    })
}

function intentaEliminarRubro(idpasado){

    var bdd = conexionbdd;
    var tabla = tablarubros;
    var tabladeanuncios = tablaanuncios;

    var tipo = "consultarubroenanuncios";

    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tablaanuncios = tabladeanuncios;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({
        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",
        success: function (data) {

            // console.log(data);


            if (data == "[]"|| data == "consultavacia") {
                eliminarrubro(id);
            } else if (data != "[]" && data != "consultavacia")
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Este rubro está usado en un artículo, no puede ser eliminado',
                    showConfirmButton: false,
                    timer: 2500
                })
            }else{
                
                console.log(data);
            }
            consultarrubros();
        },
        error: function (e) {
            alert("Error en el alta.");
        }
    });


}

function eliminarrubro(idpasado) {
    var bdd = conexionbdd;
    var tabla = tablarubros;

    var tipo = "baja";

    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({
        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",
        success: function (data) {
            if (data != "consultavacia") {
                Swal.fire(
                    'Eliminado!',
                    'El rubro fué borrado.',
                    'success'
                )
            } else {
                M.toast({ html: 'Error al intentar eliminar.' })
            }
            consultarrubros();
        },
        error: function (e) {
            alert("Error en el alta.");
        }
    });
 

}

function seleccionarrubros(id, rub) {

    document.getElementById('idrubro').value = id;
    document.getElementById('nombrerubro').value = rub;

    $('#collapseRub').collapse('toggle');

    posicioninicial();

}

$("#opciones").change(function () {
    var o = document.getElementById("opciones");
    var opcion = o.options[o.selectedIndex].text;
    document.getElementById('rubro').value = opcion;
});


// ------------------------------------------------------------------------------------------------------------
//------------------------------------------------ VENTAS ----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function configuraciontablacaja(tabla) {
    // $('#tablaanuncios').DataTable({
    $(tabla).DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Mostrar _MENU_ registros",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10,

        },
        "order": [[0, "desc"]],
        "columnDefs": [
            {
                "targets": [0],
                "visible": true,
                "searchable": false
            }
        ],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}

function consultaranunciosvender(e) {

    if ($.fn.dataTable.isDataTable('#tablaanunciosvender')) {
        t = $('#tablaanunciosvender').DataTable();
    }
    // var seleccion = document.getElementById("opcioneslista");
    // var seleccionrubro = seleccion.options[seleccion.selectedIndex].text;

    var seleccionidrubro = document.getElementById("opcioneslista").value;


    var bdd = conexionbdd;

    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tipo = "consultarubros";
    var rutaimagenes = "imagenes/";

    var id;

    if (document.getElementById('id')) {
        id = document.getElementById('id').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.titulo = "";
    itemanuncio.descripcion = "";
    itemanuncio.precio = "";
    itemanuncio.costo = "";
    itemanuncio.esnovedad = "";
    itemanuncio.esoferta = "";
    itemanuncio.nopublicar = "";
    itemanuncio.observaciones = "";
    itemanuncio.comentarios = "";

    itemanuncio.rutaimagenes = rutaimagenes;
    itemanuncio.idrubro = seleccionidrubro ;
    itemanuncio.imagen = "";
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);
    t.clear().draw(true);


    $.ajax({

        url: "consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success: function (data) {
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado


                $.each(dd, function (key, value) {

                    t.row.add([
                        dd[key].observaciones,
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].precio,
                        "<a onclick='menosuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_neg_1</i>",
                        "<input onKeyDown='return validarnumero(event, this.value, 6) ' onKeyUp ='return validarnumero(event, this.value, 6) ' id ='cantidad_" + dd[key].id + "' name ='cantidad_" + dd[key].id + "' type ='text' class='validate masmenoscolumna'></input>",
                        "<a onclick='masuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_plus_1</i>",
                        "<input onKeyDown='return validarnumero(event, this.value, 6) ' onKeyUp ='return validarnumero(event, this.value, 6) ' id ='precio_" + dd[key].id + "' name ='precio_" + dd[key].id + "' type ='number' class='validate escampoprecio' value=" + "'" + dd[key].precio + "'></input>",
                        "<a data-position='right'  data-tooltip='Guardar' onclick='vender(\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 masmenos tooltipped" + "\"><i class=" + "\"material-icons\"" + ">assignment_turned_in</i>",

                        "<img class='materialboxed center-align' width='65%' src=" + "'" + rutaimagenes + dd[key].imagen + "'></img>"
                        
                    ]).draw(false);
                });
                t.columns.adjust().draw();
                reconocerTooltipped();
                imageneszoom();
                eligetipopago();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function vender(id,idrubro,costo){

    if ($.fn.dataTable.isDataTable('#tablavender')) {
        tv = $('#tablavender').DataTable();
    }
    var can = document.getElementById('cantidad_' + id);
    var pre = document.getElementById('precio_' + id);
    var fechaventa = $("#fechaventa").val();
    var nombrecliente = $("#clienteelegido").val();
    var idclienteelegido = document.getElementById("opcioneslistaclientes").value;
    var porcentajebonus = $("#bonusestablecido").val();
    var tipopagonombrecorto = document.getElementById("opcioneslistatiposdepago").value;
    var bonus = Math.round(can.value * (costo * porcentajebonus / 100));

    if (parseInt(can.value, 10) > 0 && fechaventa != "" && nombrecliente != "Selecciona un cliente" && nombrecliente != "" && tipopagonombrecorto != "")
    {
        fechaventa = conviertefechaastringdmy(fechaventa);
        guardarventa(id, pre.value, costo, idrubro, fechaventa, can.value,idclienteelegido, bonus, tipopagonombrecorto);
        can.value = "";

    }else
    {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Complete fecha, cantidad cliente y tipo de pago',
            showConfirmButton: false,
            timer: 2500
        })
    }
}

function guardarventa(id, precio, costo, idrubro, fechaventa, cantidad, idclienteelegido, bonus,tipopago) {

    var bdd = conexionbdd;
    var tabla = tablaventas;
    var tipo = "alta";

    var itemventa = new Object();
    itemventa.bdd = bdd;
    itemventa.tabla = tabla;
    itemventa.tipo = tipo;

    itemventa.id = id;
    itemventa.precio = precio;
    itemventa.costo = costo;
    itemventa.idrubro = idrubro;
    itemventa.cantidad = cantidad;
    itemventa.idclienteelegido = idclienteelegido;
    itemventa.bonus = bonus;
    itemventa.tipopago = tipopago;
    itemventa.fechaventa = fechaventa;

    itemventa.fechaventadesde = "";
    itemventa.fechaventahasta = "";

    var vendido = JSON.stringify(itemventa);

    $.ajax({
        url: "consultaventas.php",
        data: { vendido: vendido },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                var tipobonus = "bonussumado";
                guardarbonusencliente(idclienteelegido, bonus, tipobonus);
                consultarventasdeldia(fechaventa);

                M.toast({ html: 'Ok guardado', displayLength: '1000', classes: 'rounded' });

            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function guardarbonusencliente(id, bonus, tipo)
{
    var bdd = conexionbdd;
    var tabla = tablaclientes;

    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = "";
    datosclientes.direccioncliente = "";
    datosclientes.telefonocliente = "";
    datosclientes.emailcliente = "";
    datosclientes.bonus = bonus;

    var cliente = JSON.stringify(datosclientes);

    $.ajax({
        url: "consultaclientes.php",
        data: { cliente: cliente },
        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                M.toast({ html: 'Bonus de cliente actualizado!' })
            } else {
                M.toast({ html: 'Error al crear el registro bonus en el cliente' });
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar el bonus de cliente.' });
        }
    });

}

function consultarventasdeldia(fechaventa,e) {


    if ($.fn.dataTable.isDataTable('#tablavender')) {
        tventas = $('#tablavender').DataTable();
    }

    var bdd = conexionbdd;
    var tabla = tablaventas;
    var tabladeanuncios = tablaanuncios;
    var tabladeclientes = tablaclientes;
    var tabladerubro = tablarubros;
    

    var tipo = "consulta";

    var itemventa = new Object();
    itemventa.bdd = bdd;
    itemventa.tabla = tabla;
    itemventa.tablaanuncios = tabladeanuncios;
    itemventa.tablaclientes = tabladeclientes;
    itemventa.tablarubros = tabladerubro;
    itemventa.tipo = tipo;

    itemventa.fechaventa = fechaventa;
    itemventa.fechaventadesde = "";
    itemventa.fechaventahasta = "";
    itemventa.id = "";
    itemventa.titulo = "";
    itemventa.precio = "";
    itemventa.costo = "";
    itemventa.descripcion = "";
    itemventa.rubro = "";
    itemventa.cantidad = "";
    itemventa.nombrecliente = "";
    itemventa.idclienteelegido = "";
    itemventa.bonus = "";
    itemventa.tipopago = "";

    var vendido = JSON.stringify(itemventa);
    tventas.clear().draw(true);

    $.ajax({

        url: "consultaventas.php",
        data: { vendido: vendido},

        type: "post",

        success: function (data) {

            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                $.each(dd, function (key, value) {

                    tventas.row.add([
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].cantidad,
                        dd[key].precio,
                        
                        dd[key].idcliente,
                        dd[key].nombrecliente,
                        dd[key].bonus,
                        dd[key].tipopago,
                        "<a onclick='quitar(\"" + dd[key].id + "\",\"" + dd[key].idcliente + "\",\"" + dd[key].bonus + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"

                    ]).draw(false);
                });
                tventas.columns.adjust().draw();

            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function quitar(idventa,idcliente,bonusventa){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            eliminaventa(idventa, idcliente, bonusventa);
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su venta permanece guardada :)'
            )
        }
    })
}

function eliminaventa(idventa, idcliente, bonusventa)
{

    //elimino de la base de datos
    var bdd = conexionbdd;
    var tabla = tablaventas;
    var tipo = "baja";
    var id = idventa;

    var itemventa = new Object();
    itemventa.bdd = bdd;
    itemventa.tabla = tabla;
    itemventa.tipo = tipo;
    itemventa.id = id;

    itemventa.fechaventa = "";
    itemventa.fechaventadesde = "";
    itemventa.fechaventahasta = "";
    itemventa.titulo = "";
    itemventa.precio = "";
    itemventa.costo = "";
    itemventa.descripcion = "";
    itemventa.rubro = "";
    itemventa.cantidad = "";
    itemventa.nombrecliente = "";
    itemventa.idclienteelegido = "";
    itemventa.bonus = "";
    itemventa.tipopago = "";

    var vendido = JSON.stringify(itemventa);

    $.ajax({
        url: "consultaventas.php",
        data: { vendido: vendido},
        type: "post",
        success: function (data) {
            if (data != "consultavacia") {
                var tipobonus = "bonusrestado";
                guardarbonusencliente(idcliente, bonusventa, tipobonus);

                var fechaventa = $("#fechaventa").val();
                fechaventaenviada = conviertefechaastringdmy(fechaventa);
                consultarventasdeldia(fechaventaenviada);

                Swal.fire(
                    'Eliminado!',
                    'La venta fué borrada.',
                    'success'
                )
            } else {
                M.toast({ html: 'Error al intentar eliminar.' })
            }
        },
        error: function (e) {
            alert("Error en el alta.");
        }
    });

}

function masuno(id){
    var etiqueta = document.getElementById('cantidad_' + id);
    var can = parseInt(etiqueta.value);

    if (isNaN(can))
        can = 0;

    can += 1;
    etiqueta.value = can;
}

function menosuno(id){
    var etiqueta = document.getElementById('cantidad_' + id);
    var can = parseInt(etiqueta.value);

    if (isNaN(can))
        can = 0;

    can -= 1;

    if (can < 0)
        can = 0;

    etiqueta.value = can;

}

function configuraciontablaanunciosvender() {
    $('#tablaanunciosvender').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Mostrar _MENU_ Documentos",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "order": [[0, "desc"]],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}

function configuraciontablavender() {
    $('#tablavender').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "BUSQUEDA EN EL PEDIDO:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "order": [[0, "desc"]],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}

function configuraciontablacaja() {
    $('#tablacaja').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "Puedes buscar datos en la caja:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            }
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "pageLength": 10

    });
}

function consultacaja(fechaventadesde, fechaventahasta, e) {


    if ($.fn.dataTable.isDataTable('#tablacaja')) {
        t = $('#tablacaja').DataTable();
    }

    var bdd = conexionbdd;
    var tabla = tablaventas;
    var tabladeanuncios = tablaanuncios;
    var tabladeclientes = tablaclientes;
    var tabladerubro = tablarubros;

    var tipo = "consultacaja";

    var itemventa = new Object();
    itemventa.bdd = bdd;
    itemventa.tabla = tabla;
    itemventa.tablaanuncios = tabladeanuncios;
    itemventa.tablaclientes = tabladeclientes;
    itemventa.tablarubros = tabladerubro;
    itemventa.tipo = tipo;
    itemventa.fechaventadesde = fechaventadesde;
    itemventa.fechaventahasta = fechaventahasta;
    
    itemventa.id = "";
    itemventa.titulo = "";
    itemventa.precio = "";
    itemventa.costo = "";
    itemventa.descripcion = "";
    itemventa.rubro = "";
    itemventa.cantidad = "";
    itemventa.nombrecliente = "";
    itemventa.idclienteelegido = "";
    itemventa.bonus = "";
    itemventa.tipopago = "";
    itemventa.fechaventa = "";

    var vendido = JSON.stringify(itemventa);
    
    $.ajax({

        url: "consultaventas.php",
        data: { vendido: vendido },

        type: "post",

        success: function (data) {

        
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                t.clear().draw(true);
                $("#totalventa").attr("value", "");
                $("#totalcosto").attr("value", "");
                var totalventa = 0;
                var totalcosto = 0;

                $.each(dd, function (key, value) {
                    cantidadxprecio = dd[key].cantidad * dd[key].precio;
                    cantidadxcosto = dd[key].cantidad * dd[key].costo;
                    totalventa += cantidadxprecio;
                    totalcosto += cantidadxcosto;
                    t.row.add([
                        conviertefecha(dd[key].fecha.toString()),
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].cantidad,
                        dd[key].precio,
                        cantidadxprecio,
                        
                        dd[key].rubro,
                        dd[key].costo,
                        cantidadxcosto
                    ]).draw(false);
                });

                if(totalventa>0){
                    $("#totalventa").attr("value", totalventa);
                }else
                {
                    $("#totalventa").attr("value", "");
                }


                if (totalcosto>0){
                    $("#totalcosto").attr("value", totalcosto);
                }else
                {
                    $("#totalcosto").attr("value", "");
                }

                
                if(totalventa >0 && totalcosto >0 )
                {
                    $("#rentabilidadpesos").attr("value", totalventa - totalcosto);
                    
                    var renta = Math.ceil( (totalventa - totalcosto) / totalcosto  *100);
                    $("#rentabilidadporcentaje").attr("value", renta);
                }else
                {
                    $("#rentabilidadpesos").attr("value", "");
                    $("#rentabilidadporcentaje").attr("value", "");

                }
                
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

// ------------------------------------------------------------------------------------------------------------
//------------------------------------------------ PROVEEDORES ----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

var estaAsignandoProductos = true;

function configuraciontablaproveedores() {
    $('#tablaproveedores').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA LO QUE DESEA BUSCAR:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay rubros para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            }
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "pageLength": 10

    });
}


function configuraciontablaproveedorproductos() {

        $('#tablaanunciosproveedores').DataTable({
            "language": {

                "processing": "Procesando...",
                "search": "PRODUCTOS",
                "lengthMenu": " ",
                "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
                "emptyTable": "No hay registros guardados",
                "zeroRecords": "No hay registros guardados",
                "infoEmpty": "No hay anuncios para mostrar",
                "paginate": {
                    "first": "Primera",
                    "previous": "Anterior",
                    "next": "Siguiente",
                    "last": "Ultima"
                },
                "aria": {
                    "sortAscending": "Ordenar columna ascendente",
                    "sortDescending": "Ordenar columna descendente"
                },
                "pageLength": 10
            }
            ,
            // "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'
            "dom": '<"top"fl>rt<"bottom"p><"clear">'
        });
   
}

function limpiarformularioproveedor() {
    document.getElementById('idproveedor').value = "";
    document.getElementById('nombreproveedor').value = "";
    document.getElementById('direccionproveedor').value = "";
    document.getElementById('telefonoproveedor').value = "";
    document.getElementById('emailproveedor').value = "";
}

function validarteclaProveedor(e, contenido, caracteres) {

    // obtenemos la tecla pulsada
    var unicode = e.keyCode ? e.keyCode : e.charCode;

    // Permitimos las siguientes teclas:
    // 8 backspace
    // 46 suprimir
    // 13 enter
    // 9 tabulador
    // 37 izquierda
    // 39 derecha
    // 38 subir
    // 40 bajar
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        var n = document.getElementById('nombreproveedor').value;
        var d = document.getElementById('direccionproveedor').value;
        var t = document.getElementById('telefonoproveedor').value;
        var e = document.getElementById('emailproveedor').value;


        if (n != "" && d != "" && t != "" && e != "") {
            EnviarFormularioProveedores();
        }
        return true;
    }

    if (contenido.length >= caracteres)
        return false;

    return true;
}

function EnviarFormularioProveedores() {

    var id = document.getElementById('idproveedor').value;
    var n = document.getElementById('nombreproveedor').value;
    var d = document.getElementById('direccionproveedor').value;
    var t = document.getElementById('telefonoproveedor').value;
    var e = document.getElementById('emailproveedor').value;



    // validaciones de campos
    if (n == "") { mostrarToastError("Nombre"); return; }
    // if (d == "") { mostrarToastError("Dirección"); return; }
    // if (t == "") { mostrarToastError("Teléfono"); return; }
    // if (e == "") { mostrarToastError("Email"); return; }


    //guardar el anuncio en la base de datos
    altaproveedor(id,n,d,t,e);
    limpiarformularioproveedor();
    consultarproveedores();
    consultaproveedores_seleccion_lista();

}

function altaproveedor(idpasado, n,d,t,e) {

    var bdd = conexionbdd;
    var tabla = tablaproveedores;
    var tipo = "alta";

    var id;
    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var datosproveedor = new Object();
    datosproveedor.bdd = bdd;
    datosproveedor.tabla = tabla;
    datosproveedor.tipo = tipo;
    datosproveedor.id = id;
    datosproveedor.nombreproveedor = n;
    datosproveedor.direccionproveedor = d;
    datosproveedor.telefonoproveedor = t;
    datosproveedor.emailproveedor= e;

    var proveedor = JSON.stringify(datosproveedor);

    $.ajax({
        url: "consultaproveedores.php",
        data: {proveedor: proveedor },
        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                // M.toast({ html: 'Registro Guardado!' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Guardado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                consultarproveedores();

            } else {
                M.toast({ html: 'Error al crear el registro' });
                console.log("retorno:" + data);

            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });

}

function consultarproveedores(e) {
    if ($.fn.dataTable.isDataTable('#tablaproveedores')) {
        tr = $('#tablaproveedores').DataTable();
    }

    var bdd = conexionbdd;
    var tabla = tablaproveedores;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idproveedor')) {
        id = document.getElementById('idproveedor').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datosproveedor = new Object();
    datosproveedor.bdd = bdd;
    datosproveedor.tabla = tabla;
    datosproveedor.tipo = tipo;
    datosproveedor.id = id;
    datosproveedor.nombreproveedor = "";
    datosproveedor.direccionproveedor = "";
    datosproveedor.telefonoproveedor = "";
    datosproveedor.emailproveedor = "";

    var proveedor = JSON.stringify(datosproveedor);

    $.ajax({

        url: "consultaproveedores.php",
        data: { proveedor: proveedor },

        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                tr.clear().draw(true);

                $.each(dd, function (key, value) {
                    tr.row.add([
                        "<a onclick='seleccionarproveedores(\"" + dd[key].idproveedor + "\",\"" + dd[key].nombreproveedor + "\",\"" + dd[key].direccion + "\",\"" + dd[key].telefono + "\",\"" + dd[key].email + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2" + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                        dd[key].idproveedor,
                        dd[key].nombreproveedor,
                        dd[key].direccion,
                        dd[key].telefono,
                        dd[key].email,
                        "<a onclick='eliminarp(\"" + dd[key].idproveedor + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                        "<a href='https://wa.me/" + dd[key].telefono + "?text=Hola " + dd[key].nombreproveedor + "' target='_blank' class=" + "\"btn-floating btn-large waves-effect bg-success" + "\"> <i class='fab fa-whatsapp'></i> </a>"

                    ]).draw(false);
                });
                limpiarformularioproveedor();
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });
}

function seleccionarproveedores(id, nom,dir,tel,ema ) {

    document.getElementById('idproveedor').value = id;
    document.getElementById('nombreproveedor').value = nom;
    document.getElementById('direccionproveedor').value = dir;
    document.getElementById('telefonoproveedor').value = tel;
    document.getElementById('emailproveedor').value = ema;

    posicioninicial();
    $('#collapseOneProveedor').collapse('toggle');

}

function eliminarp(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            intentaEliminarProveedor(id);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su proveedor permanece guardado :)'
            )
        }
    })
}

function intentaEliminarProveedor(idpasado){

    var bdd = conexionbdd;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;
    
    var tipo = "consultaunproveedorenrelacion";

    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var itemproveedor = new Object();
    itemproveedor.bdd = bdd;
    itemproveedor.tablaproveedoresanuncios = tabladeproveedoresanuncios;
    itemproveedor.tipo = tipo;
    itemproveedor.idproveedor = id;
    var objetoanuncio = JSON.stringify(itemproveedor);

    $.ajax({
        url: "consultaproveedoranuncio.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success: function (data) {


            if (data == "[]" || data == "consultavacia") {
                eliminarproveedor(id);
            } else if (data != "[]" && data != "consultavacia")
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Este proveedor tiene productos asignados, no puede ser eliminado',
                    showConfirmButton: false,
                    timer: 2500
                })
            }else{
                
                console.log(data);
            }
            
        },
        error: function (e) {
            alert("Error en el intento de eliminar un proveedor.");
        }
    });


}

function eliminarproveedor(idpasado) {
    var bdd = conexionbdd;
    var tabla = tablaproveedores;

    var tipo = "baja";

    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;


    var datosproveedor = new Object();
    datosproveedor.bdd = bdd;
    datosproveedor.tabla = tabla;
    datosproveedor.tipo = tipo;
    datosproveedor.id = id;
    datosproveedor.nombreproveedor = "";
    datosproveedor.direccionproveedor = "";
    datosproveedor.telefonoproveedor = "";
    datosproveedor.emailproveedor = "";

    var proveedor = JSON.stringify(datosproveedor);

    $.ajax({
        url: "consultaproveedores.php",
        data: { proveedor: proveedor },
        type: "post",
        success: function (data) {

            if (data != "consultavacia") {
                Swal.fire(
                    'Eliminado!',
                    'El proveedor fué borrado.',
                    'success'
                )

                consultarproveedores();
                consultaproveedores_seleccion_lista();
                posicioninicial();

            } else {
                M.toast({ html: 'Error al intentar eliminar.' })
            }
        },
        error: function (e) {
            alert("Error en el alta.");
        }
    });


}

function consultaproveedores_seleccion_lista(e) {

    var bdd = conexionbdd;
    var tabla = tablaproveedores;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idproveedor')) {
        id = document.getElementById('idproveedor').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datosproveedores = new Object();
    datosproveedores.bdd = bdd;
    datosproveedores.tabla = tabla;
    datosproveedores.tipo = tipo;
    datosproveedores.id = id;
    datosproveedores.nombreproveedor = "";
    datosproveedores.direccionproveedor = "";
    datosproveedores.telefonoproveedor = "";
    datosproveedores.emailproveedor = "";

    var objetoproveedor = JSON.stringify(datosproveedores);

    // var oplista = $("#opcioneslistaclientes");


    $.ajax({

        url: "consultaproveedores.php",
        data: { proveedor: objetoproveedor },
        type: "post",

        success: function (data) {
            $("#opcioneslistaproveedores").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un proveedor</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idproveedor + ' > ' + dd[key].nombreproveedor + '</option>');
                });

                $("#opcioneslistaproveedores").append(a);

                //selecciona el primer item
                $("#opcioneslistaproveedores option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay proveedores dados de alta.' });
            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}


function consultarProveedoresProductosXrubro(tipopasado,e) {

   
    var seleccionidproveedor = document.getElementById("opcioneslistaproveedores").value;

    if (seleccionidproveedor == "") {

        //si no eligio proveedor, muestra el mensaje y coloca el rubro sin seleccion
        $("#opcioneslista option:selected").prop("selected", false);

        var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
        var poscontacto = $("#collapseThreeProveedor").offset().top - alturamenu;
        $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);

        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Selecciona un proveedor!!!',
            showConfirmButton: false,
            timer: 2500
        })
    } else {

        var seleccionidrubro = document.getElementById("opcioneslista").value;


        if (seleccionidrubro == "") {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Selecciona un rubro!!!',
                showConfirmButton: false,
                timer: 2500
            })
        }else
        {
            $('#collapseBuscaxRubro').collapse('toggle')


            var bdd = conexionbdd;
            var tabla = tablaanuncios;
            var tabladerubros = tablarubros;
            var tabladeproveedores = tablaproveedores;
            var tabladeproveedoresanuncios = tablaproveedoresanuncios;
            
            var tipo = tipopasado;
            // var tipo = "consultarubros";
            var idanuncio = "";

            var tas = null;

            if ($.fn.dataTable.isDataTable('#tablaanunciosproveedores'))
                tas = $('#tablaanunciosproveedores').DataTable();
            else return;

            tas.clear().draw(true);

            var itemanuncio = new Object();

            itemanuncio.bdd = bdd;
            itemanuncio.tabla = tabla;
            itemanuncio.tablarubros = tabladerubros;
            itemanuncio.tablaproveedores = tabladeproveedores;
            itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;
            itemanuncio.tipo = tipo;
            itemanuncio.idrubro = seleccionidrubro;
            itemanuncio.idproveedor = seleccionidproveedor;
            itemanuncio.id = idanuncio;
            itemanuncio.filtro = "";
            
            itemanuncio.filtro = "";

            var objetoanuncio = JSON.stringify(itemanuncio);
            arregloproveedoranuncio = [];

            $("#opcioneslista option:selected").prop("selected", false);


            $.ajax({

                url: "consultaproveedoranuncio.php",

                data: { objetoanuncio: objetoanuncio },
                type: "post",

                success: function (data) {

            
                    // console.log(data);
                    

                    if (data != "consultavacia") {

                        dd = JSON.parse(data); //data decodificado
                        $.each(dd, function (key, value) {

                            opcionproveedoranuncio = "opcionproveedoranuncio_" + dd[key].id;
                            if (dd[key].anunciodelproveedor == "SI")
                                estado = "checked";
                            else
                                estado = "";

                            var objetoarreglo = new Object();
                            objetoarreglo.idanuncio = dd[key].id;
                            objetoarreglo.idproveedor = seleccionidproveedor;
                            objetoarreglo.titulo = dd[key].titulo;
                            objetoarreglo.opcionproveedoranuncio = opcionproveedoranuncio;
                            objetoarreglo.costo = dd[key].costo;
                            objetoarreglo.precio = dd[key].precio;
                            objetoarreglo.tildado = estado;

                            arregloproveedoranuncio.push(objetoarreglo);



                            tas.row.add([
                                dd[key].titulo,
                                "<label><input onclick = 'agregaquitaproveedoranuncio(\"" + dd[key].id + "\",\"" + opcionproveedoranuncio + "\")' id='" + opcionproveedoranuncio + "' type='checkbox' class='filled-in columnadedos' " + estado + " /><span class='colorletras'>Si</span></label>",
                                dd[key].descripcion,
                                dd[key].costo,
                                dd[key].precio
                                
                            ]).draw(false);

                        });
                        tas.columns.adjust().draw();
                        var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
                        var poscontacto = $("#filapregunta").offset().top - alturamenu;
                        $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);
                        // console.log(arregloproveedoranuncio);

                    } else {
                        M.toast(
                            {
                                html: 'No hay datos para mostrar!',
                                displayLength: '1500'
                            });
                    }
                },
                error: function (e) {
                    M.toast(
                        {
                            html: 'No hay buena conexión!',
                            displayLength: '4000'
                        });
                    console.log("Error de comunicación");
                }
            });
        }
    }
}

function consultarProveedoresProductosXfiltro(tipopasado, e ) {

    //$('#collapseFiltro').collapse('toggle')

    var seleccionidproveedor = document.getElementById("opcioneslistaproveedores").value;

    
    if (seleccionidproveedor==""){
        

        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Selecciona un proveedor!!!',
            showConfirmButton: false,
            timer: 2500
        })
    }else{

        var bdd = conexionbdd;
        var tabladerubros = tablarubros;
        var tabla = tablaanuncios;
        var tabladeproveedores = tablaproveedores;
        var tabladeproveedoresanuncios = tablaproveedoresanuncios;
        var tipo = tipopasado;

        // var tipo = "consultafiltros";

        var tas = null;

        if ($.fn.dataTable.isDataTable('#tablaanunciosproveedores'))
            tas = $('#tablaanunciosproveedores').DataTable();
        else return;

        var filtro = [];
        $("#criterios_proveedoranuncios .btn").each(function () {
            filtro.push($(this).text());
        });

        var idanuncio = "";

        var itemanuncio = new Object();
        itemanuncio.bdd = bdd;
        itemanuncio.tabla = tabla;
        itemanuncio.tablarubros = tabladerubros;
        itemanuncio.tablaproveedores = tabladeproveedores;
        itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;


        itemanuncio.tipo = tipo;
        itemanuncio.idrubro = "";
        itemanuncio.idproveedor = seleccionidproveedor;
        itemanuncio.id = idanuncio;
        itemanuncio.filtro = "";

        itemanuncio.filtro = filtro;

        var objetoanuncio = JSON.stringify(itemanuncio);

        
        tas.clear().draw(true);
        arregloproveedoranuncio = [];

        // console.log(objetoanuncio);

        $.ajax({

            url: "consultaproveedoranuncio.php",

            data: { objetoanuncio: objetoanuncio },
            type: "post",

            success: function (data) {

                // console.log(data);
                
                if (data != "consultavacia") {
                    dd = JSON.parse(data); //data decodificado
                    
                    
                    $.each(dd, function (key, value) {
                        
                        opcionproveedoranuncio = "opcionproveedoranuncio_" + dd[key].id;
                       
                        if(dd[key].anunciodelproveedor == "SI")
                            estado = "checked";
                        else
                            estado = "";

                        var objetoarreglo = new Object();
                        objetoarreglo.idanuncio = dd[key].id;
                        objetoarreglo.idproveedor = seleccionidproveedor;
                        objetoarreglo.titulo = dd[key].titulo;
                        objetoarreglo.opcionproveedoranuncio = opcionproveedoranuncio;
                        objetoarreglo.costo = dd[key].costo;
                        objetoarreglo.precio = dd[key].precio;
                        objetoarreglo.tildado = estado;

                        arregloproveedoranuncio.push(objetoarreglo);

                        
                            
                        tas.row.add([
                            dd[key].titulo,
                            "<label><input onclick = 'agregaquitaproveedoranuncio(\"" + dd[key].id + "\",\"" + opcionproveedoranuncio + "\")' id='" + opcionproveedoranuncio + "' type='checkbox' class='filled-in columnadedos' " + estado + " /><span class='colorletras'>Si</span></label>",
                            dd[key].descripcion,
                            dd[key].costo,
                            dd[key].precio

                        ]).draw(false);

                    });
                    tas.columns.adjust().draw();
                    var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
                    var poscontacto = $("#filapregunta").offset().top - alturamenu;
                    $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);

                    // console.log(arregloproveedoranuncio);
                } else {
                    M.toast(
                        {
                            html: 'No hay datos para mostrar!',
                            displayLength: '1500'
                        });
                }
            },
            error: function (e) {
                M.toast(
                    {
                        html: 'No hay buena conexión!',
                        displayLength: '4000'
                    });
                console.log("Error de comunicación");
            }
        });
    }
}   


function agregarfiltroproveedoranuncio(tipopasado) {

    var identi = $("#filtro_proveedoranuncios").val();
    var af = $("#criterios_proveedoranuncios");

    if (identi != "") {
        af.append("<a onclick='eliminarEtiqueta_productos(\"" + identi + "\")' id='" + identi + "' class='btn chip' href='#' role='button'>" + $("#filtro_proveedoranuncios").val() + "</a>");
        document.getElementById("filtro_proveedoranuncios").value = "";
        consultarProveedoresProductosXfiltro(tipopasado);
        M.toast(
            {
                html: 'Buscando productos filtrados...',
                displayLength: '3000'
            });
    }
}

function validarfiltroproveedoranuncio(e)
{
    var key = window.event ? e.which : e.keyCode;

    if (key == 13) {
        if (estaAsignandoProductos)
            agregarfiltroproveedoranuncio("consultafiltros");
        else
            agregarfiltroproveedoranuncio("consultafiltrosdelproveedor");
    }
}

function agregaquitaproveedoranuncio(idanuncio, opcionproveedoranuncio) {

    // var seleccionpro = document.getElementById("opcioneslistaproveedores");
    // var seleccionproveedor = seleccionpro.options[seleccionpro.selectedIndex].text;
    var seleccionidproveedor = document.getElementById("opcioneslistaproveedores").value;
    
    tilde = document.getElementById(opcionproveedoranuncio);
    
    if (tilde.checked == true) {
        if (seleccionidproveedor == "") {
            tilde.checked = false;

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Selecciona un proveedor!!!',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            if(estaAsignandoProductos == true)
            {
                altabajaproveedoranuncio(idanuncio, seleccionidproveedor, "alta", "'Ok asignado !'");
            }else{
                for (var a = 0; a < arregloproveedoranuncio.length; a++) {
                    var objeto = arregloproveedoranuncio[a].opcionproveedoranuncio;

                    if (objeto == opcionproveedoranuncio) {
                        arregloproveedoranuncio[a].tildado = "checked"
                    }
                }
               
            }
        }
    }
    else {
        if (estaAsignandoProductos == true)
        {
            tilde.checked = false;
            altabajaproveedoranuncio(idanuncio, seleccionidproveedor, "baja", 'Ok desasignado !');//Deja en blanco la fecha de stock de inicio
        }else
        {
            for (var a = 0; a < arregloproveedoranuncio.length; a++) {
                var objeto = arregloproveedoranuncio[a].opcionproveedoranuncio;

                if (objeto == opcionproveedoranuncio) {
                    arregloproveedoranuncio[a].tildado = ""
                }
            }
            
        }
    }

}

function agregaquitatodosprovanun(altabaja){
    if(arregloproveedoranuncio.length > 0)
    {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            if (altabaja=="alta"){
            titulo = "¿Va Asignar " + arregloproveedoranuncio.length + " productos al proveedor ?"
        }else{
            titulo = "¿Va Desasignar " + arregloproveedoranuncio.length + " productos al proveedor ?"
        }
        swalWithBootstrapButtons.fire({
            title: titulo,
            text: "Esta acción mostrará varios mensajes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Asignar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true
        }).then((result) => 
        {
            if (result.value) {
                agregarquitartodos(altabaja);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Perfecto',
                        'Sigue todo como estaba :)'
                        )
                    }
        })
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debe seleccionar un proveedor y rubro antes de esta acción!',
            showConfirmButton: false,
            timer: 2500
        })
       
        
    }
}

function agregarquitartodos(altabaja)
{

    for(a=0 ;a < arregloproveedoranuncio.length;a++)
    {
        var anu = document.getElementById(arregloproveedoranuncio[a].opcionproveedoranuncio);
        if(anu){
            
            if (altabaja == "alta"){
                anu.checked = true; 
            }
            else{
                anu.checked = false; 
            }
        }


        var mensaje = "";
        mensaje = arregloproveedoranuncio[a].titulo + " Ok";
        altabajaproveedoranuncio(arregloproveedoranuncio[a].idanuncio, arregloproveedoranuncio[a].idproveedor, altabaja, mensaje);
    }

    if ($.fn.dataTable.isDataTable('#tablaanunciosproveedores'))
        tas = $('#tablaanunciosproveedores').DataTable();
    
    tas.clear().draw(true);
    
    arregloproveedoranuncio = [];

}

function altabajaproveedoranuncio(idanuncio, seleccionidproveedor, tipo, mensaje)
{
    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tablarubros = "";
    var tabladeproveedores = tablaproveedores;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tablarubros;
    itemanuncio.tablaproveedores = tabladeproveedores;
    itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;

    itemanuncio.tipo = tipo;
    itemanuncio.idproveedor = seleccionidproveedor;
    itemanuncio.id = idanuncio;
    itemanuncio.idrubro = "";
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);

    // console.log(objetoanuncio);

    $.ajax({

        url: "consultaproveedoranuncio.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",

        success: function (data) {

            if (data != "consultavacia") {

                M.toast(
                {
                    html: mensaje,
                    displayLength: '1500'
                });

            } else {
                M.toast(
                    {
                        html: 'Error, no actualizado..',
                        displayLength: '1500'
                    });
            }
        },
        error: function (e) {
            M.toast(
                {
                    html: 'No hay buena conexión!',
                    displayLength: '4000'
                });
                
            console.log("Error de comunicación");
        }
    });

}

function cambiapreciosmasivos(tip)
{
    var aplicaalcosto = 0;
    var aplicaalaventa = 0;

    if ($('#aplicaacosto').prop('checked')) {
        aplicaalcosto = 1;
    } 
    
    if ($('#aplicaaventa').prop('checked')) {
        aplicaalaventa = 1;
    }

    if(aplicaalcosto == 1 || aplicaalaventa == 1)
    {
        var alcancemodificacion = "";
        
        if(aplicaalcosto == 1 && aplicaalaventa == 1)
        {
            alcancemodificacion = "costoyventa";
        }else if(aplicaalcosto == 1 && aplicaalaventa == 0)
        {
            alcancemodificacion = "costo";
        }else
            alcancemodificacion = "venta";

        
        var porcentaje = document.getElementById("porcentaje");
        if (tip == "restar" && porcentaje.value > 100){


            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'No puede restar mas del 100%',
                showConfirmButton: false,
                timer: 2500
            })
        
            return;
        }

        if (porcentaje.value != "" && porcentaje.value > 0 )
        {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            if (tip == "sumar") var mt = "¿Desea SUMAR el " + porcentaje.value  +  "% al precio de venta ?";
            if (tip == "restar") var mt = "¿Desea RESTAR el " + porcentaje.value +  "% al precio de venta ?";

            swalWithBootstrapButtons.fire({
                title: 'Modificar precios',
                text: mt,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si!',
                cancelButtonText: 'No!',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    
                    cambiarPreciosVentaMasivamente(porcentaje.value, tip, alcancemodificacion);
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Perfecto',
                        'Los precios siguen iguales!!!'
                    )
                }
            })
        }else{

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Ingrese el porcentaje para el cambio de precios !',
                showConfirmButton: false,
                timer: 2500
            })
        }
    }else
    {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debe aplicarse el cambio al costo,venta o ambos !',
            showConfirmButton: false,
            timer: 3000
        })
    }
}



function cambiarPreciosVentaMasivamente(porcentaje, tip, alcancemodificacion){
    
    for (var a = 0; a < arregloproveedoranuncio.length; a++) 
    {
   
        idproducto = arregloproveedoranuncio[a].idanuncio;
        costoactual = parseInt(arregloproveedoranuncio[a].costo);
        precioactual = parseInt(arregloproveedoranuncio[a].precio);
        porcentaje = parseInt(porcentaje);

        var redondeo = $('#opcionredondear').prop('checked');

        if (tip == "sumar")
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = parseInt(costoactual + costoactual * porcentaje / 100);
                if(redondeo)
                    costonuevo = Math.ceil(costonuevo/10)*10;
            }
            else
                costonuevo = parseInt(costoactual);

            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = parseInt(precioactual + precioactual * porcentaje / 100);
                if(redondeo)
                    precionuevo = Math.ceil(precionuevo/10)*10;
            }
            else
                precionuevo = parseInt(precioactual);

            
        }else
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = parseInt( costoactual - costoactual * porcentaje / 100);
                if(redondeo)
                    costonuevo = Math.ceil(costonuevo/10)*10;
            }
            else
                costonuevo = parseInt( costoactual);
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa"){
                precionuevo = parseInt(precioactual - precioactual * porcentaje / 100);
                if(redondeo)
                    precionuevo = Math.ceil(precionuevo/10)*10;
            }
            else
                precionuevo = parseInt(precioactual);

        }

        
        if (arregloproveedoranuncio[a].tildado == "checked") {
            actualizapreciocostoyventa(idproducto, precionuevo, precioactual, costonuevo, costoactual)
        }

        var tas = null;
        if ($.fn.dataTable.isDataTable('#tablaanunciosproveedores'))
            tas = $('#tablaanunciosproveedores').DataTable();
        else return;

        tas.clear().draw(true);
    }

    
}
// ------------------------------------------------------------------------------------------------------------
//------------------------------------------------ CLIENTES ----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function configuraciontablaclientes () {

    $("#tablaclientes").DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA LO QUE DESEA BUSCAR:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay rubros para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            }
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "pageLength": 10

    });
}

function limpiarformulariocliente() {
    document.getElementById('idcliente').value = "";
    document.getElementById('nombrecliente').value = "";
    document.getElementById('direccioncliente').value = "";
    document.getElementById('telefonocliente').value = "";
    document.getElementById('emailcliente').value = "";
    document.getElementById('bonus').value = "";
    document.getElementById('cantidadsumarestabonus').value = "";
}

function validarteclaCliente(e, contenido, caracteres) {

    // obtenemos la tecla pulsada
    var unicode = e.keyCode ? e.keyCode : e.charCode;

    // Permitimos las siguientes teclas:
    // 8 backspace
    // 46 suprimir
    // 13 enter
    // 9 tabulador
    // 37 izquierda
    // 39 derecha
    // 38 subir
    // 40 bajar
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        var n = document.getElementById('nombrecliente').value;
        var d = document.getElementById('direccioncliente').value;
        var t = document.getElementById('telefonocliente').value;
        var e = document.getElementById('emailcliente').value;


        if (n != "" && d != "" && t != "" && e != "") {
            EnviarFormularioClientes();
        }
        return true;
    }

    if (contenido.length >= caracteres)
        return false;

    return true;
}

function EnviarFormularioClientes() {

    var id = document.getElementById('idcliente').value;
    var n = document.getElementById('nombrecliente').value;
    var d = document.getElementById('direccioncliente').value;
    var t = document.getElementById('telefonocliente').value;
    var e = document.getElementById('emailcliente').value;



    // validaciones de campos
    if (n == "") { mostrarToastError("Nombre"); return; }



    //guardar el anuncio en la base de datos
    altacliente(id, n, d, t, e);
    limpiarformulariocliente();

}

function altacliente(idpasado, n, d, t, e) {


    var bdd = conexionbdd;
    var tabla = tablaclientes;
    var tipo = "alta";

    var id;
    if (idpasado == "")
        id = 0;
    else
        id = idpasado;

    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = n;
    datosclientes.direccioncliente = d;
    datosclientes.telefonocliente = t;
    datosclientes.emailcliente = e;

    var cliente = JSON.stringify(datosclientes);

    $.ajax({
        url: "consultaclientes.php",
        data: { cliente: cliente },
        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                // M.toast({ html: 'Registro Guardado!' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Guardado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                consultarclientes();

            } else {
                M.toast({ html: 'Error al crear el registro' });
                console.log("retorno:" + data);

            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });

}

function consultarclientes(e) {
    if ($.fn.dataTable.isDataTable('#tablaclientes')) {
        tr = $('#tablaclientes').DataTable();
    }

    var bdd = conexionbdd;
    var tabla = tablaclientes;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idcliente')) {
        id = document.getElementById('idcliente').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = "";
    datosclientes.direccioncliente = "";
    datosclientes.telefonocliente = "";
    datosclientes.emailcliente = "";
    datosclientes.bonus = "";

    var cliente = JSON.stringify(datosclientes);

    $.ajax({

        url: "consultaclientes.php",
        data: { cliente: cliente },

        type: "post",

        success: function (data) {
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                tr.clear().draw(true);

                $.each(dd, function (key, value)
                {

                    if(dd[key].telefono!=""){
                        tr.row.add([
                            "<a onclick='seleccionarclientes(\"" + dd[key].idcliente + "\",\"" + dd[key].nombrecliente + "\",\"" + dd[key].direccion + "\",\"" + dd[key].telefono + "\",\"" + dd[key].email + "\",\"" + dd[key].bonus + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2" + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                            dd[key].idcliente,
                            dd[key].nombrecliente,
                            dd[key].direccion,
                            dd[key].telefono,
                            dd[key].email,
                            "<a onclick='eliminarc(\"" + dd[key].idcliente + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                            "<a href='https://wa.me/" + dd[key].telefono + "?text=Hola " + dd[key].nombrecliente + "' target='_blank' class=" + "\"btn-floating btn-large waves-effect bg-success" + "\"> <i class='fab fa-whatsapp'></i> </a>",
                            dd[key].bonus

                        ]).draw(false);
                    }
                    else
                    {
                        tr.row.add([
                            "<a onclick='seleccionarclientes(\"" + dd[key].idcliente + "\",\"" + dd[key].nombrecliente + "\",\"" + dd[key].direccion + "\",\"" + dd[key].telefono + "\",\"" + dd[key].email + "\",\"" + dd[key].bonus + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2" + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                            dd[key].idcliente,
                            dd[key].nombrecliente,
                            dd[key].direccion,
                            dd[key].telefono,
                            dd[key].email,
                            "<a onclick='eliminarc(\"" + dd[key].idcliente + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                            "",
                            dd[key].bonus
                        ]).draw(false);
                    }
                });
                limpiarformulariocliente();
                
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });
}

function seleccionarclientes(id, nom,dir,tel,ema,bonus) {

    document.getElementById('idcliente').value = id;
    document.getElementById('nombrecliente').value = nom;
    document.getElementById('direccioncliente').value = dir;
    document.getElementById('telefonocliente').value = tel;
    document.getElementById('emailcliente').value = ema;
    document.getElementById('bonus').value = bonus;

    document.getElementById("sumarbonus").disabled = false;
    document.getElementById("restarbonus").disabled = false;

    $('#collapseCli').collapse('toggle');

    posicioninicial();
}

function eliminarc(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            intentaEliminarcliente(id);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su cliente permanece guardado :)'
            )
        }
    })
}

function intentaEliminarcliente(idpasado)
{
    var bdd = conexionbdd;
    var tabla = tablaclientes;
    var tabladeventas = tablaventas;
    var tipo = "consultaclienteenventa";

    var id;

    id = idpasado;

    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tablaventas = tabladeventas;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = "";
    datosclientes.direccioncliente = "";
    datosclientes.telefonocliente = "";
    datosclientes.emailcliente = "";
    datosclientes.bonus = "";

    var cliente = JSON.stringify(datosclientes);

    $.ajax({

        url: "consultaclientes.php",
        data: { cliente: cliente },

        type: "post",

        success: function (data) 
        {
            if (data == "[]" ) 
            {
                eliminarcliente(id);
            }else if (data != "[]" && data != "consultavacia") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'El cliente existe en una venta, no puede ser eliminado',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });
}

function eliminarcliente(idpasado) {
    var bdd = conexionbdd;
    var tabla = tablaclientes;

    var tipo = "baja";

    var id;

    if (idpasado == "")
        id = 0;
    else
        id = idpasado;


    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = "";
    datosclientes.direccioncliente = "";
    datosclientes.telefonocliente = "";
    datosclientes.emailcliente = "";

    var cliente = JSON.stringify(datosclientes);

    $.ajax({
        url: "consultaclientes.php",
        data: { cliente: cliente },
        type: "post",
        success: function (data) {

            if (data != "consultavacia") {
                Swal.fire(
                    'Eliminado!',
                    'El cliente fué borrado.',
                    'success'
                )

                consultarclientes();
                posicioninicial();
            } else {
                M.toast({ html: 'Error al intentar eliminar.' })
            }
        },
        error: function (e) {
            alert("Error en el alta.");
        }
    });
}

function consultaclientes_seleccion_lista(e) {

    var bdd = conexionbdd;
    var tabla = tablaclientes;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idcliente')) {
        id = document.getElementById('idcliente').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datosclientes = new Object();
    datosclientes.bdd = bdd;
    datosclientes.tabla = tabla;
    datosclientes.tipo = tipo;
    datosclientes.id = id;
    datosclientes.nombrecliente = "";
    datosclientes.direccioncliente = "";
    datosclientes.telefonocliente = "";
    datosclientes.emailcliente = "";

    var cliente = JSON.stringify(datosclientes);

    // var oplista = $("#opcioneslistaclientes");


    $.ajax({

        url: "consultaclientes.php",
        data: {cliente: cliente },
        type: "post",

        success: function (data) {
            $("#opcioneslistaclientes").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un cliente</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idcliente + ' > ' + dd[key].nombrecliente + '</option>');
                });

                $("#opcioneslistaclientes").append(a);

                //selecciona el primer item
                $("#opcioneslistaclientes option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay clientes dados de alta.' });
            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function sumarrestarbonus(tip){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    if (tip == "bonussumado") var mt = "¿Seguro desea sumar puntos?";
    if (tip == "bonusrestado") var mt = "¿Seguro desea restar puntos?";

    swalWithBootstrapButtons.fire({
        title: 'Modificar puntos',
        text: mt,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: 'No!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            sumarestabonus(tip);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Los puntos no se modificaron'
            )
        }
    })

}

function sumarestabonus(tip){

    var idb = $("#idcliente").val();
    var csrb = $("#cantidadsumarestabonus").val();
    csrb = parseInt(csrb);
    var bb = $("#bonus").val();
    bb = parseInt(bb);

    if (tip == "bonusrestado") {
        if (csrb > bb) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tu cliente tiene menos puntos de los descontados ',

            })
        } else {
            if (csrb > 0) {

                guardarbonusencliente(idb, csrb, tip);

                window.setTimeout(function () {
                    consultarclientes(); //execute load function
                    posicionlistacliente();

                }, 1000);


            }
        }
    }
    else if (tip == "bonussumado")
    {
        if (csrb > 0) {

            guardarbonusencliente(idb, csrb, tip);

            window.setTimeout(function () {

                consultarclientes(); //execute load function
                posicionlistacliente();

            }, 1000);


        }
    }
}

function posicionlistacliente(){
    var posicion = $("#tablaclientes").offset().top;
    $("HTML, BODY").animate({ scrollTop: posicion }, 600);
}


// ------------------------------------------------------------------------------------------------------------
//---------------------------------------------- MARKETING ------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function validarbonus(e, contenido, caracteres) {

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    if (key == 13) {
        var b = document.getElementById('bonus').value;

        if (r != "" && t != "" && d != "" && p != "" && p >= 0) {
            EnviarFormulario();
        }
        return true;
    }



    var key = window.event ? e.which : e.keyCode;

    if (((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) && (contenido.length < caracteres)) {
        return true;
    }
    return false;
}

function guardarbonus(){
    var bdd = conexionbdd;
    var tipo = "consultar";
    var tabla = tablabonus;

    M.toast({ html: 'Verificando bonus', displayLength: '1000', classes: 'rounded' });

    $.ajax({
        url: "consultabonus.php",
        data: { bdd: bdd, tabla: tabla, tipo: tipo },
        type: "post",
        success: function (data) {
            if (data == "[]" || data == "") 
            {
                grabarbonus("alta");
            }else
            {
                grabarbonus("actualizar");
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' })
        }
    });
   
}

function grabarbonus(tipopasado){
 var bdd = conexionbdd;
    var tipo = tipopasado;
    var tabla = tablabonus;

    bonusestablecido = $("#bonusestablecido").val();


    $.ajax({
        url: "consultabonus.php",
        data: { bdd:bdd,tabla:tabla, tipo:tipo,bonusestablecido: bonusestablecido },
        type: "post",
        success: function (data) {
            if (data != "[]") {
                M.toast({ html: 'Ok guardado', displayLength: '1000', classes: 'rounded' });
            } else {
                M.toast({ html: 'Error al crear el registro' })
                console.log("retorno:" + data);
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' })
        }
    });
}

function consultarbonus() {

    var bdd = conexionbdd;
    var tipo = "consultar";
    var tabla = tablabonus;

    M.toast({ html: 'Consultando bonus', displayLength: '1000', classes: 'rounded' });

    $.ajax({
        url: "consultabonus.php",
        data: { bdd: bdd, tabla: tabla, tipo: tipo },
        type: "post",
        success: function (data) {

            if (data != "[]") {
                asignabonus(data);
            } else {
                M.toast({ html: 'Error al crear el registro' })
                console.log("retorno:" + data);
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' })
        }
    });
}

function asignabonus(bonusleido){

    document.getElementById('bonusestablecido').value = bonusleido;
}


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------ COMPRAS Y AJUSTES ------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function configuraciontablamovimiento() {
    $('#tablaanunciosmovimientos').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "BUSQUEDA EN EL PEDIDO:",
            "lengthMenu": "",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "order": [[0, "desc"]],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}
function configuraciontablamovimientosstock() {
    $('#tablamovimientostock').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Mostrar _MENU_ Documentos",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "order": [[0, "desc"]],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}
function configuraciontablamovimientostockajuste() {
    $('#tablamovimientostockajuste').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Mostrar _MENU_ Documentos",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            ['10 Resultados', '25 Resultados', '50 Resultados', 'Motrar Todos']
        ],
        "order": [[0, "desc"]],
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}

function desdehasta() {
    fechamovimientoenviadadesde = conviertefechaastringdmy($("#fechamovimientodesde").val());
    fechamovimientoenviadahasta = conviertefechaastringdmy($("#fechamovimientohasta").val());
    consultarcomprasdeldia(fechamovimientoenviadadesde, fechamovimientoenviadahasta);
}

function desdehastaajuste() {
    fechamovimientoenviadadesde = conviertefechaastringdmy($("#fechamovimientodesde").val());
    fechamovimientoenviadahasta = conviertefechaastringdmy($("#fechamovimientohasta").val());
    tipomovimientonombrecorto = eligetipomovimiento();
    consultarajustesdeldia(fechamovimientoenviadadesde, fechamovimientoenviadahasta);
}

function consultaranunciosparamovimientos(e) {

    if ($.fn.dataTable.isDataTable('#tablaanunciosmovimientos')) {
        t = $('#tablaanunciosmovimientos').DataTable();
    }
    var seleccion = document.getElementById("opcioneslista");
    var seleccionrubro = seleccion.options[seleccion.selectedIndex].text;

    var seleccionidrubro = document.getElementById("opcioneslista").value;


    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tipo = "consultarubros";
    var rutadeimagenes = rutaimagenes;

    var tabladecompras = tablacompras;
    var tabladeventas = tablaventas;
    var tabladeajustes = tablaajustes;
    var tabladeproveedores = tablaproveedores;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;
    
    var id;

    if (document.getElementById('id')) {
        id = document.getElementById('id').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;

    itemanuncio.tablacompras = tabladecompras;
    itemanuncio.tablaventas = tabladeventas;
    itemanuncio.tablaajustes = tabladeajustes;
    itemanuncio.tablaproveedores = tabladeproveedores;
    itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.titulo = "";
    itemanuncio.descripcion = "";
    itemanuncio.precio = "";
    itemanuncio.costo = "";
    itemanuncio.esnovedad = "";
    itemanuncio.esoferta = "";
    itemanuncio.nopublicar = "";
    itemanuncio.observaciones = "";
    itemanuncio.comentarios = "";

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);
    var opcioninicio;
    $.ajax({

        // url: "consultaanuncios.php",
        url: "consultastock.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success: function (data) {
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                t.clear().draw(true);
                fsi = "";

                $.each(dd, function (key, value) {
                    opcioninicio = "opcionstockinicio_" + dd[key].id;

                    if (dd[key].fechastockinicio == "0000-00-00"){
                        fsi = "";
                        estado = "";
                    }else{
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)
                        estado = "checked";
                    }

                    t.row.add([
                        
                        "<label><input onclick = 'agregaquitastockinicio(\"" + dd[key].id + "\",\"" + opcioninicio + "\")' id='" + opcioninicio + "' type='checkbox' class='filled-in columnadedos' " + estado + " /><span class='colorletras'>Si</span></label>",
                        dd[key].titulo,
                        dd[key].descripcion,
                        "<a onclick='menosuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect  brown darken-3 " + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_neg_1</i>",
                        "<input onKeyDown='return validarnumero(event, this.value, 6) ' onKeyUp ='return validarnumero(event, this.value, 6) ' id ='cantidad_" + dd[key].id + "' name ='cantidad_" + dd[key].id + "' type ='text' class='validate columnadetres'></input>",
                        "<a onclick='masuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_plus_1</i>",
                        "<input onKeyDown='return validarnumero(event, this.value, 6) ' onKeyUp ='return validarnumero(event, this.value, 6) ' id ='costo_" + dd[key].id + "' name ='costo_" + dd[key].id + "' type ='number' class='validate escampocosto' value=" + "'" + dd[key].costo + "'></input>",
                        "<input onKeyDown='return validarnumero(event, this.value, 6) ' onKeyUp ='return validarnumero(event, this.value, 6) ' id ='precio_" + dd[key].id + "' name ='precio_" + dd[key].id + "' type ='number' class='validate escampoprecio' value=" + "'" + dd[key].precio + "'></input>",
                        "<a data-position='right'  data-tooltip='Guardar' onclick='moverstock(\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 masmenos tooltipped" + "\"><i class=" + "\"material-icons\"" + ">assignment_turned_in</i>",

                        "<img class='materialboxed center-align' width='30%' src=" + "'" + rutaimagenes + dd[key].imagen + "'></img>",
                        
                        dd[key].costo,
                        dd[key].stock,

                        fsi

                    ]).draw(false);
                });
                t.columns.adjust().draw();
                reconocerTooltipped();
                imageneszoom();
                eligetipomovimiento();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function agregaquitastockinicio(id,opcioninicio)
{

    var fechamovimiento = $("#fechacompraajuste").val();
    fechamovimiento = conviertefechaastringdmy(fechamovimiento);
    tilde = document.getElementById(opcioninicio);

    if(tilde.checked==true)
    {
        if(fechamovimiento==""){
            tilde.checked = false;

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Ingrese una fecha',
                showConfirmButton: false,
                timer: 2500
            })
        }else{
            actualizastockiniciocompras(id, fechamovimiento);
        }
    }
    else
    {
        tilde.checked = false;
        actualizastockiniciocompras(id, "");//Deja en blanco la fecha de stock de inicio
    }

}

function moverstock(id,costoactual,precioactual) {

    

    if ($.fn.dataTable.isDataTable('#tablamovimientostock')) {
        tv = $('#tablamovimientostock').DataTable();
    }

    var can = document.getElementById('cantidad_' + id);
    var pre = document.getElementById('precio_' + id);
    var cos = document.getElementById('costo_' + id);

    var fechamovimiento = $("#fechacompraajuste").val();
    var nombreproveedor = $("#proveedorelegido").val();
    var idproveedorelegido = document.getElementById("opcioneslistaproveedores").value;

    var tipomovimientonombrecorto = document.getElementById("opcioneslistatiposmovimientostock").value;

    
    if (parseInt(can.value, 10) > 0 && fechamovimiento != "" && nombreproveedor != "Selecciona un Proveedor" && nombreproveedor != "" && tipomovimientonombrecorto != "") {
        fechamovimiento = conviertefechaastringdmy(fechamovimiento);

        tipomovimientonombrecorto = eligetipomovimiento();

        if (tipomovimientonombrecorto == "CO") {
            guardarcompra(id, pre.value, precioactual, cos.value, costoactual, fechamovimiento, can.value, idproveedorelegido, tipomovimientonombrecorto);
        } else {
            guardarajuste(id, fechamovimiento, can.value, tipomovimientonombrecorto);
        }
        can.value = "";

    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Complete fecha, cantidad, proveedor y tipo de movimiento',
            showConfirmButton: false,
            timer: 2500
        })
    }
}

function consultarcomprasdeldia(fechacompradesde, fechacomprahasta, e) {

    if ($.fn.dataTable.isDataTable('#tablamovimientostock')) {
        tcompra = $('#tablamovimientostock').DataTable();

    }

    var bdd = conexionbdd;
    var tabla = tablacompras;
    var tabladeanuncios = tablaanuncios;
    var tabladeproveedores = tablaproveedores;
    var tipo = "consulta";

    var itemcompra = new Object();
    itemcompra.bdd              = bdd;
    itemcompra.tabla            = tabla;
    itemcompra.tablaanuncios    = tabladeanuncios;
    itemcompra.tablaproveedores = tabladeproveedores;
    
    itemcompra.tipo = tipo;

    itemcompra.fechacompra = "";
    itemcompra.fechacompradesde = fechacompradesde;
    itemcompra.fechacomprahasta = fechacomprahasta;
    itemcompra.id = "";
    itemcompra.costo = "";
    itemcompra.cantidad = "";
    itemcompra.idproveedor = "";
    
    var comprado = JSON.stringify(itemcompra);

    tcompra.clear().draw(true);

    var totalcompras = 0;
    $("#totalcompras").val("");

    $.ajax({

        url: "consultacompras.php",
        data: { comprado: comprado },

        type: "post",

        success: function (data) {

            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado
                
                fsi = "";

                $.each(dd, function (key, value) {

                    if (dd[key].fechastockinicio == "0000-00-00")
                        fsi = "";
                    else
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                    fco = vista_ymdAdmy(dd[key].fechacompra)

                    totalcompras = totalcompras + dd[key].cantidad * dd[key].costocompra;
                    tcompra.row.add([
                        fco,
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].cantidad,
                        dd[key].costocompra,
                        
                        dd[key].nombreproveedor,
                        dd[key].precio,
                        dd[key].costoactual,
                        "Compra",
                        "<a onclick='quitarcompra(\"" + dd[key].idcompra + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                        fsi

                    ]).draw(false);
                });
                $("#totalcompras").val(totalcompras);
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function guardarcompra(id, precionuevo, precioactual, costonuevo, costoactual, fechamovimiento, cantidad, idproveedorelegido, tipomovimientonombrecorto) {

  

    var bdd = conexionbdd;
    var tabla = tablacompras;
    var tabladeanuncios = tablaanuncios;

    var tipo = "alta";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tablaanuncios = tabladeanuncios;
    itemmovimiento.tipo = tipo;

    itemmovimiento.id = id;
    itemmovimiento.costo = costonuevo;
    itemmovimiento.cantidad = cantidad;
    itemmovimiento.idproveedorelegido = idproveedorelegido;
    itemmovimiento.tipomovimientonombrecorto = tipomovimientonombrecorto;
    itemmovimiento.fechacompra = fechamovimiento;

    var comprado = JSON.stringify(itemmovimiento);

    $.ajax({
        url: "consultacompras.php",
        data: { comprado: comprado },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                M.toast({ html: 'Ok compra guardada', displayLength: '1000', classes: 'rounded' });
                actualizapreciocostoyventa(id,precionuevo, precioactual, costonuevo,costoactual);
            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function actualizapreciocostoyventa(idproducto,precionuevo, precioactual,costonuevo,costoactual)
{
    
    if (precionuevo != precioactual || costonuevo != costoactual)
    {
        var bdd = conexionbdd;
        var tabla = tablaanuncios;
        var tipo = "actualizapreciocostoyventa";

        var itemanuncio = new Object();
        itemanuncio.bdd = bdd;
        itemanuncio.tabla = tabla;
        itemanuncio.tablarubros = "";
        itemanuncio.tipo = tipo;
        itemanuncio.id = idproducto;
        itemanuncio.idrubro = "";
        itemanuncio.titulo = "";
        itemanuncio.descripcion = "";
        itemanuncio.precio = precionuevo;
        itemanuncio.costo = costonuevo;
        itemanuncio.precioanterior = precioactual;
        itemanuncio.costoanterior = costoactual;
        itemanuncio.imagen = "";
        itemanuncio.esnovedad = "";
        itemanuncio.esoferta = "";
        itemanuncio.nopublicar = "";
        itemanuncio.observaciones = "";
        itemanuncio.comentarios = "";

        itemanuncio.rutaimagenes = "";
        itemanuncio.filtro = "";


        var objetoanuncio = JSON.stringify(itemanuncio);

        $.ajax({
            url: "consultaanuncios.php",
            data: { objetoanuncio: objetoanuncio },
            type: "post",
            success: function (data) {
                if (data == 1) {
                    if (precionuevo != precioactual) {
                        M.toast({ html: 'Ok, precio de venta actualizado!', displayLength: '2000', classes: 'rounded' });
                    }
                    if (costonuevo != costoactual) {
                        M.toast({ html: 'Ok, costo actualizado', displayLength: '2000', classes: 'rounded' });
                    }
                } else {
                    M.toast({ html: 'Error al actualizar el registro : ' + data })
                    console.log("retorno:" + data);

                }
            },
            error: function (e) {
                M.toast({ html: 'Error al intentar guardar.' })
            }
        });
    }
}

function actualizastockiniciocompras(id, fechamovimiento) {

    var bdd = conexionbdd;
    var tabla = tablacompras;
    var tabladeanuncios = tablaanuncios;

    var tipo = "actualizafechainicio";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tablaanuncios = tabladeanuncios;
    itemmovimiento.tipo = tipo;

    itemmovimiento.id = id;
    itemmovimiento.cantidad = "";
    itemmovimiento.tipomovimientonombrecorto = "";
    itemmovimiento.fechacompra = fechamovimiento;

    var comprado = JSON.stringify(itemmovimiento);

  
    $.ajax({
        url: "consultacompras.php",
        data: { comprado: comprado },
        type: "post",
        success: function (data) {

 
            
            if (data != "consulta vacia") {
                M.toast({ html: 'Ok actualizado stock inicio', displayLength: '1000', classes: 'rounded' });

            } else {

                M.toast({ html: 'Error al actualizar el stock de inicio' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function quitarcompra(idcompra){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            eliminarcompra(idcompra);
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su compra permanece guardada :)'
            )
        }
    })
}

function eliminarcompra(idcompra){
    var bdd = conexionbdd;
    var tabla = tablacompras;
    var tabladeanuncios = tablaanuncios;

    var tipo = "baja";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tablaanuncios = tabladeanuncios;
    itemmovimiento.tipo = tipo;

    itemmovimiento.id = idcompra;
    itemmovimiento.costo = "";
    itemmovimiento.cantidad = "";
    itemmovimiento.idproveedorelegido = "";
    itemmovimiento.tipomovimientonombrecorto = "";
    itemmovimiento.fechacompra = "";

    var comprado = JSON.stringify(itemmovimiento);
   
    

    $.ajax({
        url: "consultacompras.php",
        data: { comprado: comprado },
        type: "post",
        success: function (data) {

            if (data != "[]") {
                M.toast({ html: 'Ok compra eliminada', displayLength: '1000', classes: 'rounded' });
                desdehasta();

            } else {
                M.toast({ html: 'Error al crear el registro' })
            }

        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function consultarajustesdeldia(fechamovimientodesde, fechamovimientohasta, e) {

    if ($.fn.dataTable.isDataTable('#tablamovimientostockajuste')) {
        tajuste = $('#tablamovimientostockajuste').DataTable();

    }

    var bdd = conexionbdd;
    var tabla = tablaajustes;
    var tabladeanuncios = tablaanuncios;
    var tipo = "consulta";

    var itemajuste = new Object();
    itemajuste.bdd = bdd;
    itemajuste.tabla = tabla;
    itemajuste.tablaanuncios = tabladeanuncios;

    itemajuste.tipo = tipo;

    itemajuste.fechaajuste = "";
    itemajuste.fechaajustedesde = fechamovimientodesde;
    itemajuste.fechaajustehasta = fechamovimientohasta;
    itemajuste.id = "";
    itemajuste.cantidad = "";
    itemajuste.tipomovimientonombrecorto = "";


    var ajustado = JSON.stringify(itemajuste);

    tajuste.clear().draw(true);
    $.ajax({

        url: "consultaajustes.php",
        data: { ajustado: ajustado },

        type: "post",

        success: function (data) {

            if (data != "consultavacia") {
                fsi = "";

                dd = JSON.parse(data); //data decodificado
                $.each(dd, function (key, value) {

                    if (dd[key].fechastockinicio == "0000-00-00")
                        fsi = "";
                    else
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                    faj = vista_ymdAdmy(dd[key].fechamovimiento)

                    tajuste.row.add([
                        faj,
                        dd[key].titulo,
                        dd[key].descripcion,    
                        dd[key].cantidad,
                        
                        dd[key].tipomovimientonombrecorto,
                        "<a onclick='quitarajuste(\"" + dd[key].idajuste + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                        fsi

                    ]).draw(false);
                });
            }

        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }



    });

}

function quitarajuste(idajuste) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea eliminar ?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            eliminarajuste(idajuste);
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Perfecto',
                'Su ajuste permanece guardado :)'
            )
        }
    })
}

function eliminarajuste(idajuste) {

    var bdd = conexionbdd;
    var tabla = tablaajustes;
    var tabladeanuncios = tablaanuncios;

    var tipo = "baja";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tablaanuncios = tabladeanuncios;

    itemmovimiento.tipo = tipo;

    itemmovimiento.id = idajuste;
    itemmovimiento.cantidad = "";
    itemmovimiento.tipomovimientonombrecorto = "";
    itemmovimiento.fechaajuste = "";

    var ajustado = JSON.stringify(itemmovimiento);

    

    $.ajax({
        url: "consultaajustes.php",
        data: { ajustado: ajustado },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                M.toast({ html: 'Ok ajuste eliminado', displayLength: '1000', classes: 'rounded' });
                desdehastaajuste();
            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function guardarajuste(id, fechamovimiento, cantidad, tipomovimientonombrecorto) {

    var bdd = conexionbdd;
    var tabla = tablaajustes;
    var tabladeanuncios = tablaanuncios;

    var tipo = "alta";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tablaanuncios = tabladeanuncios;

    itemmovimiento.tipo = tipo;

    itemmovimiento.id = id;
    itemmovimiento.cantidad = cantidad;
    itemmovimiento.tipomovimientonombrecorto = tipomovimientonombrecorto;
    itemmovimiento.fechaajuste = fechamovimiento;

    var ajustado = JSON.stringify(itemmovimiento);
  
  
    $.ajax({
        url: "consultaajustes.php",
        data: { ajustado: ajustado },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                M.toast({ html: 'Ok ajuste guardado', displayLength: '1000', classes: 'rounded' });

            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}


// ------------------------------------------------------------------------------------------------------------
// -------------------------------------------- Stock ---------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function configuraciontablastock() {
    $('#tablaanunciosstock').DataTable({
        "language": {

            "processing": "Procesando...",
            "search": "ESCRIBA AQUI ABAJO:",
            "lengthMenu": "Lista de anuncios",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros guardados",
            "zeroRecords": "No hay registros guardados",
            "infoEmpty": "No hay anuncios para mostrar",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            },
            "aria": {
                "sortAscending": "Ordenar columna ascendente",
                "sortDescending": "Ordenar columna descendente"
            },
            "pageLength": 10
        }
        ,
        "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'
    });
}

function veronostinicio() {
    if (muestrastockinicio) {

        $("#hstinicio").show();
        $("#stinicio").show();
    }
    else {

        $("#hstinicio").hide();
        $("#stinicio").hide();
    }
}

function consultaranunciosstock_rubros(e) {
    var seleccion = document.getElementById("opcioneslista");
    var seleccionrubro = seleccion.options[seleccion.selectedIndex].text;

    var seleccionidrubro = document.getElementById("opcioneslista").value;


    if (seleccionrubro != "Seleccione un rubro") {
        $('#collapseBuscaxRubro').collapse('toggle');
        
        var bdd = conexionbdd;
        var rutadeimagenes = rutaimagenes;
        var tabla = tablaanuncios;
        var tabladerubros = tablarubros;
        var tabladecompras = tablacompras;
        var tabladeventas = tablaventas;
        var tabladeajustes = tablaajustes;
        var tabladeproveedores = tablaproveedores;
        var tabladeproveedoresanuncios = tablaproveedoresanuncios;

        var tipo = "consultarubros";

        var t = null;

        if ($.fn.dataTable.isDataTable('#tablaanunciosstock'))
            tas = $('#tablaanunciosstock').DataTable();
        else return;


        var id = "";
        if (id == "") id = 0;
        else id = id;

        var itemanuncio = new Object();

        itemanuncio.bdd = bdd;
        itemanuncio.tabla = tabla;
        itemanuncio.tablarubros = tabladerubros;
        itemanuncio.tablacompras = tabladecompras;
        itemanuncio.tablaventas = tabladeventas;
        itemanuncio.tablaajustes = tabladeajustes;
        itemanuncio.tablaproveedores = tabladeproveedores;
        itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;

        itemanuncio.tipo = tipo;
        itemanuncio.id = id;

        itemanuncio.titulo = "";
        itemanuncio.descripcion = "";
        itemanuncio.precio = "";
        itemanuncio.costo = "";
        itemanuncio.esnovedad = "";
        itemanuncio.esoferta = "";
        itemanuncio.nopublicar = "";
        itemanuncio.observaciones = "";
        itemanuncio.comentarios = "";

        itemanuncio.rutaimagenes = rutadeimagenes;
        itemanuncio.idrubro = seleccionidrubro;
        itemanuncio.imagen = "";
        itemanuncio.filtro = "";

        var objetoanuncio = JSON.stringify(itemanuncio);
        // veronostinicio();
        tas.clear().draw(true);

        // console.log(objetoanuncio);
        $.ajax({

            url: "consultastock.php",

            data: { objetoanuncio: objetoanuncio },
            type: "post",
            
            success: function (data) {

                // console.log(data);
                
                if (data != "consultavacia") {

                    dd = JSON.parse(data); //data decodificado

                    $.each(dd, function (key, value) {

                        if (dd[key].fechastockinicio == "0000-00-00")
                            fsi = "";
                        else
                            fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                        var precio;
                        if (dd[key].precio > 0)
                            precio = "$ " + dd[key].precio;
                        else
                            precio = "Consultar Precio";
                        
                        if(dd[key].precioanterior > 0)
                            precioant = "$ " + dd[key].precioanterior;
                        else
                            precioant = "$ ";

                        if(dd[key].costoanterior > 0)
                            costoant = "$ " + dd[key].costoanterior;
                        else
                            costoant = "$ ";
                            
                        tas.row.add([
                            precio,
                            dd[key].titulo,
                            dd[key].descripcion,
                            dd[key].rubro,
                            dd[key].stock,
                            dd[key].nombreproveedor,
                            precioant,
                            costoant,
                            fsi


                        ]).draw(false);
                        
                    });
                    tas.columns.adjust().draw();
                } else {
                    M.toast(
                        {
                            html: 'No hay datos para mostrar!',
                            displayLength: '1500'
                        });
                }
            },
            error: function (e) {
                M.toast(
                    {
                        html: 'No hay buena conexión!',
                        displayLength: '4000'
                    });
                console.log("Error de comunicación");
            }
        });
    }
}

function consultaranunciosstock_filtros(e) 
{


    //$('#collapseFiltro').collapse('toggle')
    var alturamenu = $('.menu').outerHeight(true);//mide la altura del objeto con margen borde y padding externo
    var poscontacto = $("#btnconsultaxrubro").offset().top - alturamenu; 
    $("HTML, BODY").animate({ scrollTop: poscontacto }, velocidadscroll);

    var bdd = conexionbdd;
    var rutadeimagenes = rutaimagenes;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tabladecompras = tablacompras;
    var tabladeventas = tablaventas;
    var tabladeajustes = tablaajustes;
    var tabladeproveedores = tablaproveedores;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;

    var tipo = "consultafiltros";

    var t = null;

    if ($.fn.dataTable.isDataTable('#tablaanunciosstock'))
        tf = $('#tablaanunciosstock').DataTable();
    else return;

    var filtro = [];
    $("#criterios_productos .btn").each(function () {
        filtro.push($(this).text());
    });

    var id = "";
    if (id == "") id = 0;
    else id = id;

    var itemanuncio = new Object();

    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;
    itemanuncio.tablacompras = tabladecompras;
    itemanuncio.tablaventas = tabladeventas;
    itemanuncio.tablaajustes = tabladeajustes;
    itemanuncio.tablaproveedores = tabladeproveedores;
    itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.titulo = "";
    itemanuncio.descripcion = "";
    itemanuncio.precio = "";
    itemanuncio.costo = "";
    itemanuncio.esnovedad = "";
    itemanuncio.esoferta = "";
    itemanuncio.nopublicar = "";
    itemanuncio.observaciones = "";
    itemanuncio.comentarios = "";

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = "";
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;

    var objetoanuncio = JSON.stringify(itemanuncio);
    // veronostinicio();

    // console.log(objetoanuncio);
    tf.clear().draw(true);


    $.ajax({

        url: "consultastock.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",

        success: function (data) {

            //   console.log(data);

            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                $.each(dd, function (key, value) {
                   
                    if (dd[key].fechastockinicio == "0000-00-00")
                        fsi = "";
                    else
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                    var precio;
                    if (dd[key].precio > 0)
                        precio = "$ " + dd[key].precio;
                    else
                        precio = "Consultar Precio";

                    if(dd[key].precioanterior > 0)
                        precioant = "$ " + dd[key].precioanterior;
                    else
                        precioant = "$ ";

                    if(dd[key].costoanterior > 0)
                        costoant = "$ " + dd[key].costoanterior;
                    else
                        costoant = "$ ";

                        tf.row.add([
                            precio,
                            dd[key].titulo,
                            dd[key].descripcion,
                            dd[key].rubro,
                            dd[key].stock,
                            dd[key].nombreproveedor,
                            precioant,
                            costoant,
                            fsi


                        ]).draw(false);
                });
                tf.columns.adjust().draw();
            } else {
                M.toast(
                    {
                        html: 'No hay datos para mostrar!',
                        displayLength: '1500'
                    });
            }
        },
        error: function (e) {
            M.toast(
                {
                    html: 'No hay buena conexión!',
                    displayLength: '4000'
                });
            console.log("Error de comunicación");
        }
    });

}   

// ------------------------------------------------------------------------------------------------------------
//------------------------------------------- Tipos de Pago ----------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function consultatiposdepago_seleccion_lista(e) {

    var bdd = conexionbdd;
    var tabla = tablatiposdepago;
    var tipo = "consultatodo";

    var id;

    if (document.getElementById('idtipodepagoelegido')) {
        id = document.getElementById('idtipodepagoelegido').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datos = new Object();
    datos.id = id;
    datos.nombre = "";
    datos.bdd= bdd;
    datos.tabla= tabla;
    datos.tipo = tipo;


    var datosjson = JSON.stringify(datos);

    // var oplista = $("#opcioneslistaclientes");


    $.ajax({

        url: "consultatiposdepago.php",
        data: { datos: datosjson },
        type: "post",

        success: function (data) {
            $("#opcioneslistatiposdepago").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un tipo de pago</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].nombrecorto + ' > ' + dd[key].nombre + '</option>');
                });

                $("#opcioneslistatiposdepago").append(a);

                //selecciona el primer item
                $("#opcioneslistatiposdepago option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay tipos de pago dados de alta.' });
            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function eligetipopago(){

    var tipopagonombrecorto = document.getElementById("opcioneslistatiposdepago").value;

    if (tipopagonombrecorto == "BO") {
        $(".escampoprecio").each(function ()
        {
            $(this).val("0")
            $(this).prop("disabled", true);
            $(this).prop("type", "text");
        });
    }
    else
    {
        $(".escampoprecio").each(function () {
            $(this).prop("disabled", false);
            $(this).prop("type", "number");
        });

        $('#tablaanunciosvender tbody tr').each(function () {
            var preciolista = $(this).find('td:eq(8)').text();
            $(this).find('td:eq(3) input').val(preciolista);
        });
    }

}

// ------------------------------------------------------------------------------------------------------------
// --------------------------------- tipos de movimiento -----------------------------------------
// ------------------------------------------------------------------------------------------------------------

function consultatiposdemovimiento_seleccion_lista(e) {

    var bdd = conexionbdd;
    var tabla = tablatiposdemovimientos;
    var tipo = "consultatodo";

    var id;

    if (document.getElementById('idtipomovimientostockelegido')) {
        id = document.getElementById('idtipomovimientostockelegido').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;

    var datos = new Object();
    datos.id = id;
    datos.nombre = "";
    datos.bdd= bdd;
    datos.tabla= tabla;
    datos.tipo = tipo;


    var datosjson = JSON.stringify(datos);

    // var oplista = $("#opcioneslistaclientes");


    $.ajax({

        url: "consultatiposdemovimiento.php",
        data: { datos: datosjson },
        type: "post",

        success: function (data) {
            $("#opcioneslistatiposmovimientostock").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un tipo de movimiento</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].nombrecorto + ' > ' + dd[key].nombre + '</option>');
                });

                $("#opcioneslistatiposmovimientostock").append(a);

                //selecciona el primer item
                $("#opcioneslistatiposmovimientostock option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay tipos de movimiento dados de alta.' });
            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function eligetipomovimiento() {

    var tipomovimientonombrecorto = document.getElementById("opcioneslistatiposmovimientostock").value;

    return tipomovimientonombrecorto;

}

// ------------------------------------------------------------------------------------------------------------
// --------------------------------- Pagina Web -----------------------------------------
// ------------------------------------------------------------------------------------------------------------

function consultarubros_seleccion_listapaginaweb(e) {

    var bdd = conexionbddpaginaweb;
    var tabla = tablarubrospaginaweb;
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var oplista = $("#opcioneslista");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opcioneslista").empty();
            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcioneslista").append(a);

                //selecciona el primer item
                $("#opcioneslista option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });


            }


        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function consultarubros_seleccionpaginaweb(e) {

    var bdd = conexionbddpaginaweb;
    var tabla = tablarubrospaginaweb;
    
    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var op = $("#opciones");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opciones").empty();
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opciones").append(a);

                //selecciona el primer item
                $("#opciones option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

function consultarubros_seleccionconpreciopaginaweb(e) {

    var bdd = conexionbddpaginaweb;
    var tabla = tablarubrospaginaweb;

    var tipo = "consultatodosanuncios";

    var id;

    if (document.getElementById('idrubro')) {
        id = document.getElementById('idrubro').value;
    } else
        id = "";


    if (id == "")
        id = 0;
    else
        id = id;


    var op = $("#opcionesconprecio");

    var itemrubro = new Object();
    itemrubro.bdd = bdd;
    itemrubro.tabla = tabla;
    itemrubro.tipo = tipo;
    itemrubro.id = id;
    itemrubro.rubro = "";
    var objetorubro = JSON.stringify(itemrubro);

    $.ajax({

        url: "consultarubros.php",
        data: { objetorubro: objetorubro },
        type: "post",

        success: function (data) {
            $("#opcionesconprecio").empty();
            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                var a = [];
                a.push('<option value = "" selected >Seleccione un rubro</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcionesconprecio").append(a);

                //selecciona el primer item
                $("#opcionesconprecio option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para este rubro.' });
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

