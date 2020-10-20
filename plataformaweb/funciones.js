//------------------------------------------- DATOS GLOBALES ------------------------------------


var arreglo = [];
var arregloproveedoranuncio = [];
cantidadporpagina = 12; //cantidad de anuncios que entran en una pagina
var muestrastockinicio = false;

arregloconsultaofertas = []; //arreglo que guarda los anuncios de la consulta
arregloconsultabuscados = []; //arreglo que guarda los anuncios de la consulta
paginaactualofertas = 0;
paginaactualbuscados = 0;
paginastotalesofertas = 0;
paginastotalesbuscados = 0;

arregloUnidades = []; //unidades de compra y venta de los productos fraccionados
relacionCV = ""; //relacion compra venta para los productos fraccionados, se usa como multiplicador o divison en los precios
arreglochecktilde = []; //arreglo para tildas cambios masivos

encontro = false;
llama = "";

arreglobloqueos = [];

function escrolear(claseelemento) {
    setInterval(() => {

         $('html, body').animate({
            scrollTop: $("." + claseelemento).offset().top
        }, 600);      
    }, 1000);

}

function posicioninicial() {
 
    setInterval(() => {
        var elemento = document.getElementsByClassName("navbar");
        var posicion = elemento.scrollTop;
        $("HTML, body").animate({ scrollTop: posicion}, 400);
       
    }, 1000);
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
    
    if(llama == "anuncios")
    {
        document.getElementById("muestra").src = "img/agregarimagen.jpg";
        document.getElementById("barra").value = 0;
        document.getElementById("valorbarra").innerHTML = "0%";
        limpiarinputimagen();
    }


    if ($('#opcionnoguardar').prop('checked'))
    {

    }else
    {
        document.getElementById('titulo').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('costo').value = "";
        if(llama == "anuncios")
        {
            document.getElementById('observaciones').value = "";
            document.getElementById('comentarios').value = "";
            document.getElementById('bonus').value = "";
            document.getElementById('tituloantes').value = "";
            document.getElementById('precioantes').value = "";

            document.getElementById('textolinkexterno').value = "";
            document.getElementById('linkexterno').value = "";
        
            $('#opcionbonus').prop('checked', false);
            $('#opcionantes').prop('checked', false);
            $('#esnovedad').prop('checked', false);
            $('#esoferta').prop('checked', false);
            $('#opcionnopublicar').prop('checked',false);

            var op = $("#idcomovende").val();
            if (op > 0) 
            {
                var pco = $("#prefijoxcompra").val();
                var pve = $("#prefijoxventa").val();
            
                if(pco > 0 && pve > 0)
                {
                    BlanqueCamposCostoPrecio(1);
                }
                else
                {
                    if(pco == 0 )
                    {                        
                        $("#divprefijoventa").css('display', 'none');
                        $("#divpreciocomprapref").css('display', 'none');
                        $("#divprecioventapref").css('display', 'none');
                        $("#costo").css('display', 'none');
                        $("#precio").css('display', 'none');
                    }

                    if(pve==0)
                    {
                        $("#divpreciocomprapref").css('display', 'none');
                        $("#divprecioventapref").css('display', 'none');
                        $("#costo").css('display', 'none');
                        $("#precio").css('display', 'none');
                    }
                }
            }else
            {
                BlanqueCamposCostoPrecio(0);
                $("#divprefijocompra").css('display', 'none');
                $("#divprefijoventa").css('display', 'none');
            }
            
        }

        document.getElementById('costofraccionado').value = "";
        document.getElementById('ventafraccionado').value = "";
        document.getElementById('codigobarra').value = "";

    }
        
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
        consultaranunciosstock("consultafiltros");
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
    if (unicode == 250 || unicode == 190 || unicode == 8 || unicode == 44 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
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
    if (unicode == 250 || unicode == 190 || unicode == 8 || unicode == 44 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40){
        return true;
    }

    
     //punto del teclado numerico o coma del teclado alfa
    if (e.keyCode == 110 || e.keyCode == 188) {
        return true;
    }

    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13){
        var r = document.getElementById('rubro').value;
        var t = document.getElementById('titulo').value;
        var d = document.getElementById('descripcion').value;
        var p = document.getElementById('precio').value;
        var c = document.getElementById('costo').value;
        t = t.trim();
        d= d.trim();

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

    if (extensiones.toString().indexOf(extension) !== -1) //verificamos si la extension esta en el arreglo
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
        text: 'Falta ' + dato ,
        footer: '<a href>Falto un dato</a>'
    })

}



function consultaUnidadesGranel(tipo, e) {

    var bdd = conexionbdd;
    var tabla = tablaunidadesgranel;

    var itemunidades = new Object();
    itemunidades.bdd        = bdd;
    itemunidades.tipo       = tipo;
    itemunidades.tabla      = tabla;
    itemunidades.id         = "";
    itemunidades.prefijo    = "";
    var objeto = JSON.stringify(itemunidades);

    $.ajax({

        url: "consultaunidadesgranel.php",
        data: { objeto: objeto },
        type: "post",

        success: function (data) {
            $("#prefijoxcompra").empty();

            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado

                arregloUnidades = [];
                var a = [];
                a.push('<option value = "" selected >Unid.Compra</option >');
                var unidadAnterior="";

                $.each(dd, function (key, value) {

                    if( dd[key].prefijocompra != 0)
                    {
                        if(unidadAnterior != dd[key].prefijocompra )
                            a = a.concat('<option value = ' + dd[key].prefijocompra + ' > ' + dd[key].nombreprefijocompra + '</option>');

                        unidadAnterior = dd[key].prefijocompra;

                        var objeto = new Object();
                        objeto.nombreprefijocompra = dd[key].nombreprefijocompra;
                        objeto.prefijocompra = dd[key].prefijocompra;
                        objeto.nombreprefijoventa = dd[key].nombreprefijoventa;
                        objeto.prefijoventa = dd[key].prefijoventa;
                        objeto.relacioncompraventa = dd[key].relacioncompraventa;
                        arregloUnidades.push(objeto);
                    }
                });

                $("#prefijoxcompra").append(a);

                //selecciona el primer item
                $("#prefijoxcompra option:selected").prop("selected", false);
                $(this).prop("selected", true);

            } 
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });
}

function LlenaUnidadesVenta()
{
    var prefijoelegido = $("#idprefijocompra").val();   //verifica que se eligio en la lista de compra
    $("#prefijoxventa").empty();//vacia la lista de venta

    var opc = [];
    opc.push('<option value = "" selected >Unid.Venta</option >'); //crea la primera opcion de la lista de venta
    
    for (a = 0 ; a < arregloUnidades.length;a++)
    {
        if(arregloUnidades[a].prefijocompra == prefijoelegido)
            opc = opc.concat('<option value = ' + arregloUnidades[a].prefijoventa + ' > ' + arregloUnidades[a].nombreprefijoventa  + '</option>');
    }
    $("#prefijoxventa").append(opc);
}

function BuscarRelacionCompraVenta()
{
    relacionCV = "";
    var prefijoelegido = $("#idprefijoventa").val();   //verifica que se eligio en la lista de venta
    for (a = 0 ; a < arregloUnidades.length;a++)
    {
        if(arregloUnidades[a].prefijoventa == prefijoelegido)
            relacionCV = arregloUnidades[a].relacioncompraventa;
    }
}

function EnviarFormulario()
{

    var rnombre = "";
    var r = "";
    var bonus = 0;

    var tia = "";
    var pea = "";
    var tle = "";
    var le = "";

    var observacion = "";
    var o ="";
    
    var comentario = "";
    var come = comentario.trim();
    
    var en=0;
    var eo=0;
    var pb=0;
    var np=0;
    var oa=0;


    if(llama == "anuncios")
    {
        var formulario = document.getElementById("formulario");
        rnombre = document.getElementById('rubro').value;
        r = document.getElementById("opciones").value;
        bonus = document.getElementById('bonus').value;
        tia = document.getElementById('tituloantes').value;
        pea = document.getElementById('precioantes').value;
        tle = document.getElementById('textolinkexterno').value;
        le = document.getElementById('linkexterno').value;
        comodin = document.getElementById('comodin').value;

        observacion = document.getElementById('observaciones').value;
        o = observacion.trim();
        o = o.substr(0, 800);

        comentario = document.getElementById('comentarios').value;
        come = comentario.trim();
        come = come.substr(0,800);

        if ($('#esnovedad').prop('checked')) {
            en = 1;
        }else
        {
            en = 0;
        }

        if ($('#esoferta').prop('checked')) {
            eo = 1;
        } else {
            eo = 0;
        }

        if ($('#opcionnopublicar').prop('checked')) {
            np = 1;
        } else {
            np = 0;
        }

        if ($('#opcionbonus').prop('checked')) {
            pb = 1;
        } else {
            pb = 0;
        }

        
        if ($('#opcionantes').prop('checked')) {
            oa = 1;
        } else {
            oa = 0;
        }

    }else if(llama == "comprar")
    {
        rnombre = document.getElementById('rubro').value;
        r = document.getElementById("opcioneslista").value;
    }
    
    //------------ validaciones para campos fraccionados ----------
    var codbar = document.getElementById('codigobarra').value;
    codbar = codbar.trim();
    
    var pfixc = 0;
    var pfixv = 0;
    var costoxprefijo = 0;
    var ventaxprefijo = 0;

    var comovende = document.getElementById('comovende').value;
    
    if(comovende == 1)
    {
        pfixc = document.getElementById("prefijoxcompra").value;
        pfixv = document.getElementById("prefijoxventa").value;
        costoxprefijo = document.getElementById("costofraccionado").value;
        ventaxprefijo = document.getElementById("ventafraccionado").value;
    }
    //------------------------------------------------------------

    var id = document.getElementById('id').value;
    var t = document.getElementById('titulo').value;
    var d = document.getElementById('descripcion').value;
    var p = document.getElementById('precio').value;
    var c = document.getElementById('costo').value;
    

    
    // validaciones de campos
    if (rnombre == "") { mostrarToastError("Categoría"); return; }
    if (t == "") { mostrarToastError("Titulo"); return; }
    if (d == ""){ mostrarToastError("Descripción"); return; }
    if (p == "" || p < 0) { 
        p = 0; 
    }
    if (c == "" || c < 0) { 
        c = 0;
    }
    if (pb == 1 && (bonus == "" || bonus == 0)) { mostrarToastError("Bonus"); return; }
    if (oa == 1 && (pea == "" || pea == 0)) { mostrarToastError("Precio tachado"); return; }
    if (tle!="" || le != "")
    {
        if(tle == "")
        {
            mostrarToastError("Texto link externo"); return; 
        }
        
        if(le == "")
        {
            mostrarToastError("Link externo"); return; 
        }
    }
    
     //------------------ detecta mas de un punto en el numero -----------
    var posicion = -1;
    
    
    posicion = p.toString().indexOf(",");
    if(posicion >=0)
        p = p.slice(0, posicion) + "." + p.slice(posicion + 1); 
    
    posicion = -1;

    posicion = c.toString().indexOf(",");
    if(posicion >=0)
        c = c.slice(0, posicion) + "." + c.slice(posicion + 1); 
    
    posicion = -1;
    
    posicion = pea.toString().indexOf(",");
    if(posicion >=0)
        pea = pea.slice(0, posicion) + "." + pea.slice(posicion + 1); 
    

        if (imagen.files.length == 0)
        {
            if (id == "")
            {//es nuevo y viene sin imagen
                // mostrarToastError(" imagen, se guardará una por defecto!!!");
                i = "sinimagen.jpg";
                // altaanuncio(id, r, t, d, p, c, i, en, eo, np, o, come, pb, bonus, oa, tia, pea, tle, le,codbar,pfixc,pfixv,costoxprefijo,ventaxprefijo);

            }else
            {//esta modificando pero dejo la misma imagen
                var i = "";
            }
            altaanuncio(id, r, t, d, p, c, i, en, eo,np,o,come,pb,bonus,oa,tia,pea,tle,le,codbar,pfixc,pfixv,costoxprefijo,ventaxprefijo,comodin);

        }else{
            var i = imagen.files[0].name;

            //subir imagen al servidor
            var formdata = new FormData(formulario);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("ok");
                    //guardar el anuncio en la base de datos
                    altaanuncio(id, r, t, d, p, c, i, en, eo, np, o, come, pb, bonus, oa, tia, pea, tle, le,codbar,pfixc,pfixv,costoxprefijo,ventaxprefijo,comodin);
                    // limpiarformulario();

                } else
                    console.log("intentando subir imagen...");
            };

            xhttp.open('POST', 'subirarchivo.php', true);
            xhttp.send(formdata);
        }

}



function altaanuncio(idpasado, r, t, d, p, c, i, en, eo, np, o, come, pb, bonus, oa, tia, pea, tle, le,codbar,pfixc,pfixv,costoxprefijo,ventaxprefijo,comodin)
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
    itemanuncio.productobonus = pb;
    itemanuncio.bonus = bonus;
    itemanuncio.opcionantes = oa;
    itemanuncio.tituloantes = tia;
    itemanuncio.precioantes = pea;
    itemanuncio.textolinkexterno = tle;
    itemanuncio.linkexterno = le;
    
    itemanuncio.rutaimagenes = "";
    itemanuncio.filtro = "";

    itemanuncio.codigobarra = codbar;
    itemanuncio.prefijoxcompra = pfixc;
    itemanuncio.prefijoxventa =pfixv;
    itemanuncio.costoxprefijo = costoxprefijo;
    itemanuncio.ventaxprefijo = ventaxprefijo;
    itemanuncio.comodin = comodin.toString().trim();


    var objetoanuncio = JSON.stringify(itemanuncio);

    limpiarformulario();

    $.ajax({
        url: "consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success:function(data){
            if(data==1)
            {
                M.toast({ html: 'Ok guardado', displayLength: '1000', classes: 'rounded' });

                consultaranuncios("consultarubros");


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

function consultaranuncios(tipo)
{
    if(llama=="anuncios")
    {
        if ($.fn.dataTable.isDataTable('#tablaanuncios')) {
            tanuncios = $('#tablaanuncios').DataTable();
        }
    }

    var seleccionidrubro = document.getElementById("opcioneslista").value;
    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
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

        if (document.getElementById('id')) {
        id = document.getElementById('id').value;
    } else
        id = 0;

    var filtro = [];
    if(tipo == "consultafiltros" || tipo == "consultalector"){

        // si el tipo no es rubro va a buscar por filtro
        var textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;
        textobuscado = textobuscado.trim();

        if (textobuscado == "") {
            return false;
        }
        filtro.push( textobuscado );
    }

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;
    itemanuncio.rutaimagenes = rutaimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;
    itemanuncio.codigobarra = textobuscado;
   
    var objetoanuncio = JSON.stringify(itemanuncio);

    if(llama=="anuncios")
    {
        tanuncios.clear().draw(true);
    }


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
                var probo = "";
                var opant = "";
                arreglo = [];
                $.each(dd, function (key, value) 
                {
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

                    if (dd[key].productobonus == 1)
                        probo = "PARA BONUS";
                    else
                        probo = "";

                    if (dd[key].tieneventaja == 1)
                        opant = "VENTAJA COMERCIAL";
                    else
                        opant = "";

                    var objeto          = new  Object();
                    objeto.id           = dd[key].id;
                    objeto.titulo       = dd[key].titulo;
                    objeto.descripcion  = dd[key].descripcion;
                    objeto.observaciones = dd[key].observaciones;
                    objeto.comentarios  = dd[key].comentarios;
                    objeto.precio       = dd[key].precio
                    objeto.costo        = dd[key].costo
                    objeto.precioventaja = dd[key].precioventaja

                    objeto.codigobarra  = dd[key].codigobarra;
                    objeto.prefijoxcompra = dd[key].prefijocompra;
                    objeto.prefijoxventa = dd[key].prefijoventa;
                    objeto.costoxprefijo = dd[key].costoxprefijo;
                    objeto.ventaxprefijo = dd[key].ventaxprefijo;
                    objeto.comodin       = dd[key].comodin;
                    objeto.relacioncompraventa = dd[key].relacioncompraventa;

                    arreglo.push(objeto);
                    if(llama == "anuncios")
                    {
                        tanuncios.row.add( [
                            dd[key].id,
                            "<a href='#formulario' onclick='seleccionarproducto(\"" + dd[key].id + "\",\"" + dd[key].rubro + "\",\"" + dd[key].imagen + "\",\"" + dd[key].esnovedad + "\",\"" + dd[key].esoferta + "\",\"" + dd[key].nopublicar + "\",\"" + dd[key].productobonus + "\",\"" + dd[key].bonus + "\",\"" + dd[key].tieneventaja + "\",\"" + dd[key].tituloventaja + "\",\"" + dd[key].textolinkexterno + "\",\"" + dd[key].linkexterno+ "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 " + "\"><i class=" + "\"material-icons\"" + ">border_color</i>",
                            "<img class='materialboxed center-align' width='65%' src=" + "'" + rutaimagenes  + dd[key].imagen + "'></img>",
                            dd[key].rubro,
                            dd[key].id,
                            dd[key].codigobarra,
                            dd[key].titulo,
                            dd[key].descripcion,
                            "<label class='blockcosto'>" + dd[key].costo + "</label>",
                            dd[key].precio,
                            esofe,
                            esnov,
                            nopub,
                            dd[key].comodin,
                            // opant,
                            // dd[key].tituloventaja,
                            // dd[key].precioventaja,
                            "<a onclick='eliminar(\"" + dd[key].id + "\",\"" + dd[key].imagen + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"
                        ] ).draw( false );
                    }
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
    if (i =="sinimagen.jpg")
        i=" ";
    itemanuncio.imagen = i;
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);

    $.ajax({
        url:"consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio},
        type: "post",
            success:function(data){
                if(data=="consultavacia")
                {
                    M.toast({ html: 'Error al intentar eliminar.' })
                }else
                {
                    consultaranuncios("consultarubros");
                }
            },
            error: function(e)
            {
                alert("Error en el alta.");
            }
    });

}
//-------------------------- -------------------- ----------------------

function CalcularValoresFraccionados() {
    var cf = $("#costofraccionado").val();

    if (cf > 0)
    {
        var costovta = cf / relacionCV;
        costovta = Math.round(costovta * 100) / 100;

        document.getElementById("costo").value = costovta;
    }
    else
        document.getElementById("costo").value ="";

    var pf = $("#ventafraccionado").val();
    if(pf > 0)
    {
        var preciovta = pf / relacionCV;
        preciovta = Math.round(preciovta * 100) / 100;

        document.getElementById("precio").value = preciovta;
    }
    else
        document.getElementById("precio").value ="";
}

function mostrarDivPrefijoCompra(mostrar){
    if(mostrar == "0")
    {
        $("#divprefijocompra").css('display', 'none');
        $("#divprefijoventa").css('display', 'none');
        $("#divpreciocomprapref").css('display', 'none');
        $("#divprecioventapref").css('display', 'none');


    }else{
        
        $("#divprefijocompra").css('display', 'flex');
        $("#prefijoxcompra option:selected").prop("selected", false);
    }
}

    
function mostrarDivPrefijoVenta(mostrar)
{
    if (mostrar == "0") 
    {
        $("#divprefijoventa").css('display', 'none');
        $("#divpreciocomprapref").css('display', 'none');
        $("#divprecioventapref").css('display', 'none');
    } else {

        $("#divprefijoventa").css('display', 'flex');
        $("#prefijoxventa option:selected").prop("selected", false);

    }
}

function mostrarCamposCostoPrecio(mostrar)
{
    if (mostrar == "0") {
        $("#divpreciocomprapref").css('display', 'none');
        $("#divprecioventapref").css('display', 'none');
    }else{

        $("#divpreciocomprapref").css('display', 'block');
        $("#divprecioventapref").css('display', 'block');
    }
}


function BlanqueCamposCostoPrecio(mostrar)
{
    if (mostrar == "0") 
    {
        document.getElementById("costofraccionado").value = "";
        document.getElementById("ventafraccionado").value = "";

        document.getElementById("costo").readOnly = false;
        document.getElementById("precio").readOnly = false;
    } else {

        document.getElementById("costo").value = "";
        document.getElementById("precio").value = "";

        document.getElementById("costo").readOnly = true;
        document.getElementById("precio").readOnly = true;
    }
}

function CamposValoresAcero(){
    document.getElementById("costofraccionado").value = "";
    document.getElementById("ventafraccionado").value = "";
    document.getElementById("costo").value = "";
    document.getElementById("precio").value = "";
}

 function unCambioComoVende(){
    document.getElementById("idcomovende").value = document.getElementById("comovende").value;
    var op = $("#idcomovende").val();

    if (op > 0) {
        mostrarDivPrefijoCompra(1);
        BlanqueCamposCostoPrecio(1);
        CamposValoresAcero();

        MostrarCostoPrecio(0);

    }
    else {
        mostrarDivPrefijoCompra(0);
        BlanqueCamposCostoPrecio(0);
        MostrarCostoPrecio(1);

    }
}

    

function unCambioPrefijoCompra()
{
    document.getElementById("idprefijocompra").value = document.getElementById("prefijoxcompra").value;
    var pre = $("#idprefijocompra").val();

    if (pre != "") {
        LlenaUnidadesVenta();
        mostrarDivPrefijoVenta(1);
        CalcularValoresFraccionados();
    } else {
        mostrarDivPrefijoVenta(0);
        CamposValoresAcero();
    }
}

function MostrarCostoPrecio(mostrar)
{
    if(mostrar == "0")
    {
        $("#costo").css('display', 'none');
        $("#precio").css('display', 'none');
    }else{
        $("#costo").css('display', 'block');
        $("#precio").css('display', 'block');
    }
}
function unCambioPrefijoVenta()
{
    document.getElementById("idprefijoventa").value = document.getElementById("prefijoxventa").value;
    BuscarRelacionCompraVenta();

    var pre = $("#idprefijoventa").val();  
    if (pre != ""){
        mostrarCamposCostoPrecio(1);
        CalcularValoresFraccionados();
        MostrarCostoPrecio(1);
    }
    else{
        mostrarCamposCostoPrecio(0)
        CamposValoresAcero();
        MostrarCostoPrecio(0);
    }
}
//-------------------------- -------------------- ----------------------


// function seleccionarproducto(id, rub, pre, cos, ima, en, eo, np,pb,bonus,oa,tia,pea,tle,le)
function seleccionarproducto(id, rub, ima, en, eo, np,pb,bonus,oa,tia,tle,le)
{
    
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
    
    document.getElementById('bonus').value = bonus;
    document.getElementById('tituloantes').value = tia;
    document.getElementById("muestra").src = "imagenes/" + ima; //vista previa de la imagen
    document.getElementById('textolinkexterno').value = tle;
    document.getElementById('linkexterno').value = le;

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

    if (pb == 1) {
        $("#opcionbonus").prop("checked", true);
    }
    else {
        $("#opcionbonus").prop("checked", false);
    }
    if (oa == 1) {
        $("#opcionantes").prop("checked", true);
    }
    else {
        $("#opcionantes").prop("checked", false);
    }
    
    //Verifica el id pasado y lo compara con el arreglo que armo durante la consulta
    arreglo.forEach(function (valor, indice) {

        if (arreglo[indice].id == id)
        {
            document.getElementById('titulo').value         = arreglo[indice].titulo;
            document.getElementById('descripcion').value    = arreglo[indice].descripcion;
            document.getElementById('observaciones').value  = arreglo[indice].observaciones;
            document.getElementById('comentarios').value    = arreglo[indice].comentarios;
            document.getElementById('precioantes').value    = arreglo[indice].precioventaja;
            document.getElementById('codigobarra').value    = arreglo[indice].codigobarra;
            document.getElementById('comodin').value        = arreglo[indice].comodin;
        
            // relacionCV = arreglo[indice].relacioncompraventa;

            apc = arreglo[indice].prefijoxcompra;
            apv = arreglo[indice].prefijoxventa;

            if ( apc > 0)
            {
                document.getElementById("comovende").value = 1;
                //seleccionar comovende a 1
                $("#comovende option[value='1']").attr("selected", true);
                
                $("#divprefijocompra").css('display', 'flex');
                $("#prefijoxcompra option[value='" + apc + "']").attr("selected", true);
                document.getElementById("idprefijocompra").value = document.getElementById("prefijoxcompra").value;                

                $("#divprefijoventa").css('display', 'flex');
                LlenaUnidadesVenta();
                $("#prefijoxventa option[value='" + apv + "']").attr("selected", true);
                document.getElementById("idprefijoventa").value = document.getElementById("prefijoxventa").value;

                $("#divpreciocomprapref").css('display', 'block');
                $("#divprecioventapref").css('display', 'block');
                document.getElementById('costofraccionado').value =  arreglo[indice].costoxprefijo;
                document.getElementById('ventafraccionado').value =  arreglo[indice].ventaxprefijo;

                document.getElementById('precio').value = arreglo[indice].precio;
                document.getElementById('costo').value = arreglo[indice].costo;
                document.getElementById("costo").readOnly = true;
                document.getElementById("precio").readOnly = true;
            }else
            {
                document.getElementById("comovende").value = 0;

                //seleccionar comovende a 0
                $("#comovende option[value='0']").attr("selected", true);

                $("#prefijoxcompra option[value='0']").attr("selected", true);
                $("#prefijoxventa option[value='0']").attr("selected", true);

                document.getElementById("costofraccionado").value = "";
                document.getElementById("ventafraccionado").value = "";

                $("#divprefijocompra").css('display', 'none');
                $("#divprefijoventa").css('display', 'none');
                $("#divpreciocomprapref").css('display', 'none');
                $("#divprecioventapref").css('display', 'none');
                
                document.getElementById('precio').value = arreglo[indice].precio;
                document.getElementById('costo').value = arreglo[indice].costo;
                document.getElementById("costo").readOnly = false;
                document.getElementById("precio").readOnly = false;
            }
            BuscarRelacionCompraVenta();
        }
        posicioninicial();
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
    if (r == "") { mostrarToastError("Categoría"); return; }

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
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opciones").append(a);

                //selecciona el primer item
                $("#opciones option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });
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
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcionesconprecio").append(a);

                //selecciona el primer item
                $("#opcionesconprecio option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });
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
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcioneslista").append(a);

                //selecciona el primer item
                $("#opcioneslista option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });


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
                'Su categoría permanece guardada :)'
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

            if (data == "[]"|| data == "consultavacia") {
                eliminarrubro(id);
            } else if (data != "[]" && data != "consultavacia")
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Esta categoría está usada en un artículo, no puede ser eliminada',
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
                    'La categoría fué borrada.',
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

itemsEnlaventa = 0;

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


function validarinputcantidadprecio(e, contenido, caracteres,id,idrubro,costo,titulo,unidadvta,downup)
{
    var key = window.event ? e.which : e.keyCode;

    if (e.keyCode == 107 || e.keyCode == 13)  //tecla + o enter
    {
        if(downup==1)
            vender(id, idrubro, costo, titulo, unidadvta);
       return false;
    }
    
    //punto del teclado numerico o coma del teclado alfa
    if (e.keyCode == 110 || e.keyCode == 188) {
        return true;
    }

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 44 || unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }

    if ( ( (key >= 48 && key <= 57) || (key >= 96 && key <= 105) ) && (contenido.length < caracteres)) 
    {
        return true;
    }
    return false;
}

function validarinputcantidad(e, contenido, caracteres,id,idrubro,costo,titulo,unidadvta,downup)
{
    var key = window.event ? e.which : e.keyCode;

    if (e.keyCode == 107 || e.keyCode == 13) //tecla + o enter
    {
        if (downup == 1)
            vender(id,idrubro,costo,titulo,unidadvta);

       return false;
    }
    
    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 44 || unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        return true;
    }


    if ( ( (key >= 48 && key <= 57) || (key >= 96 && key <= 105) ) && (contenido.length < caracteres)) 
    {
        return true;
    }
    return false;

}

arregloitemsventa = [];
totalpedido = 0;
    



function insertarEnCarrito(id,idrubro,costo,titulo,precio)
{
    if(!id){
        return false;
    }

    var fechaventa = $("#fechaventa").val();
    var porcentajebonus = $("#bonusestablecido").val();
    var bonus = Math.round(1 * (costo * porcentajebonus / 100));

    if (fechaventa != "" )
    {
        fechaventa = conviertefechaastringdmy(fechaventa);
        reservaritemventa(id, precio, costo, idrubro, fechaventa, 1, bonus,titulo);
    }else if (fechaventa == "" )
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'Complete fecha ',showConfirmButton: false,
            timer: 2500})
    }
}


function consultaranunciosvender(tipo) {

    if ($.fn.dataTable.isDataTable('#tablaanunciosvender')) {
        t = $('#tablaanunciosvender').DataTable();
    }
    var seleccionidrubro = document.getElementById("opcioneslista").value;

    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var rutaimagenes = "imagenes/";

    var id;

    if (document.getElementById('id')) {
        id = document.getElementById('id').value;
    } else
        id = 0;

    var filtro = [];
    if (tipo == "consultafiltros" || tipo == "consultalector"){

        // si el tipo no es rubro va a buscar por filtro
        var textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;
        textobuscado = textobuscado.trim();

        if (textobuscado == "") {
            return false;
        }
        filtro.push( textobuscado );
    }
    
   

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;
    itemanuncio.tipo = tipo;
    itemanuncio.id = id;
    itemanuncio.rutaimagenes = rutaimagenes;
    itemanuncio.idrubro = seleccionidrubro ;
    itemanuncio.filtro = filtro;
    itemanuncio.codigobarra = textobuscado;
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;
    

    var objetoanuncio = JSON.stringify(itemanuncio);
    t.clear().draw(true);

    if(tipo != "consultafiltros")
        document.getElementById("cajabusqueda").value = "";

    encontro = false;
    var peco = "";

    $.ajax({

        url: "consultaanuncios.php",
        data: { objetoanuncio: objetoanuncio },
        type: "post",
        success: function (data)
        {

            if (data != "consultavacia") {
                dd = JSON.parse(data); //data decodificado
                
                var porcentajebonus = $("#bonusestablecido").val();
                var bonus = 0;
                var fechaventa;

                $.each(dd, function (key, value) {
                    encontro = true;

                    bonus = Math.round(1 * (dd[key].costo * porcentajebonus / 100));
                    fechaventa = $("#fechaventa").val();
                    peco = dd[key].prefijocompra;

                    if (tipo == "consultalector" && peco == 0) //inserta directamente solo a productos por unidades
                    {              
                        if (fechaventa != "" )
                        {
                            fechaventa = conviertefechaastringdmy(fechaventa);
                            reservaritemventa(dd[key].id, dd[key].precio, dd[key].costo, dd[key].idrubro, fechaventa, 1, bonus,  dd[key].titulo, dd[key].nombreprefijoventa );
                        }else{
                            Swal.fire({position: 'top-end',icon: 'warning',title: 'Complete fecha ',showConfirmButton: false,
                                timer: 2500})
                        }          
                    }else
                    {
                        t.row.add([
                            
                        dd[key].precio,
                        "<a onclick='menosuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_neg_1</i>",
                        dd[key].id,
                        dd[key].codigobarra,
                        dd[key].titulo,
                        dd[key].descripcion,
                        "<input onKeyDown ='return validarinputcantidad(event, this.value, 8,\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\",\"" + dd[key].titulo + "\",\"" + dd[key].nombreprefijoventa + "\",0) ' onKeyUp ='return validarinputcantidad(event, this.value, 8,\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\",\"" + dd[key].titulo + "\",\"" + dd[key].nombreprefijoventa + "\",1) '  id ='cantidad_" + dd[key].id + "' name ='cantidad_" + dd[key].id + "' type = 'text' class='validate masmenoscolumna saltacantidad' ></input>",
                        dd[key].nombreprefijoventa,
                            "<input onKeyDown ='return validarinputcantidadprecio(event, this.value, 8,\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\",\"" + dd[key].titulo + "\",\"" + dd[key].nombreprefijoventa + "\",0) ' onKeyUp ='return validarinputcantidadprecio(event, this.value, 8,\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\",\"" + dd[key].titulo + "\",\"" + dd[key].nombreprefijoventa + "\",1) '  id ='precio_" + dd[key].id + "' name ='precio_" + dd[key].id + "' type ='text' class='validate escampoprecio saltaprecio blockmodiprecio' value=" + "'" + dd[key].precio + "'></input>",
                        "<a onclick='masuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_plus_1</i>",
                        "<a data-position='right'  data-tooltip='Agregar' onclick='vender(\"" + dd[key].id + "\",\"" + dd[key].idrubro + "\",\"" + dd[key].costo + "\",\"" + dd[key].titulo + "\",\"" + dd[key].nombreprefijoventa + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 masmenos tooltipped" + "\"><i class=" + "\"material-icons\"" + "\">add</i>",
                        "<img class='materialboxed center-align' width='30px' src=" + "'" + rutaimagenes + dd[key].imagen + "'></img>"
                        
                        ]).draw(true);
                        
                    }
                    
                    
                });

                verificabloqueo();
                t.columns.adjust().draw();

                if (tipo != "consultalector" || peco == 0) //inserta directamente solo a productos por unidades
                {
                    t.columns.adjust().draw();
    
                    mostrarResultadoBusqueda();
                    reconocerTooltipped();
                    imageneszoom();
                    eligetipopago();
                    identificasaltainput('saltacantidad');
                    identificasaltainput('saltaprecio');
                    
                    hacefoco();
                }
            }else
            {
                mostrarResultadoBusqueda();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function mostrarResultadoBusqueda()
{
    if(encontro == true)
        document.getElementById("listaproductos").style.display = "block";
    else
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'No hay coincidencias ',showConfirmButton: false,timer: 1500})
        document.getElementById("listaproductos").style.display = "none";
    }
}

function hacefoco()
{
    var posicion=0;

    var alturamenu = $('#my-nav').outerHeight(true);

    if(llama == "vender")
    {
        $('.saltacantidad')[0].focus();

        posicion = $("#tablaanunciosvender").offset().top - alturamenu; 
    }else
    if(llama=="comprar")
    {
        
        $('.saltacantidad')[0].focus();
        
        posicion = $("#tablaanunciosmovimientos").offset().top - alturamenu; 
    }else
    if(llama=="anuncios")
    {
        posicion = $("#tablaanuncios_filter").offset().top - alturamenu; 
    }
    
    $("HTML, BODY").animate({ scrollTop: posicion}, 600);
    
}



function identificasaltainput(clase)
{
    var todos = $('.' + clase).length;
    var indice=0;

    $('.' + clase).on('keydown',function(e)
    {
        if(e.keyCode === 13 ) 
        {
            if(this.value == "")
            {
                e.preventDefault();
                indice = $('.' + clase).index(this)+1;
                if(indice == todos )
                    indice = 0;
                $('.' + clase)[indice].focus();
            }
        }

        if( e.keyCode === 40) 
        {
            e.preventDefault();
            indice = $('.' + clase).index(this)+1;
            if(indice == todos )
                indice = 0;
            $('.' + clase)[indice].focus();
        }

        if ( e.keyCode === 38 )
        {
            e.preventDefault();
            indice = $('.' + clase).index(this) - 1;

            if (indice == -1)
                indice = todos-1;

            $('.' + clase)[indice].focus();
        } 
    });
    
    
}

//es el metodo que queda ligado al boton en la linea del producto
function vender(id, idrubro, costo, titulo, unidadvta){
    if(!id){
        return false;
    }
  
    var can = document.getElementById('cantidad_' + id);
    var cantisinmas = can.value.replace('+','');
    can.value = cantisinmas;

    var pre = document.getElementById('precio_' + id);
    var fechaventa = $("#fechaventa").val();
    var porcentajebonus = $("#bonusestablecido").val();
    var bonus = Math.round(can.value * (costo * porcentajebonus / 100));

    if (parseInt(can.value, 10) > 0 && fechaventa != "" )
    {
        fechaventa = conviertefechaastringdmy(fechaventa);
        reservaritemventa(id, pre.value, costo, idrubro, fechaventa, can.value, bonus, titulo, unidadvta);
        can.value = "";

    }else if (fechaventa == "" )
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'Complete fecha ',showConfirmButton: false,
            timer: 2500})
    }else if (parseInt(can.value, 10) > 0 )
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'Complete cantidad',showConfirmButton: false,
            timer: 2500})
    }

}

function reservaritemventa(id_riv, precio_riv, costo_riv, idrubro_riv, fechaventa_riv, cantidad_riv, bonus_riv, titulo_riv, unidadvta) {

    itemsEnlaventa +=1;
   
  
    var subtotal = precio_riv * cantidad_riv;
    subtotal = Math.round(subtotal * 100) / 100;
    // subtotal=Math.round10(subtotal, -1);

   
    var objeto = new Object();

    objeto.id = id_riv;
    objeto.precio = precio_riv;
    objeto.costo = costo_riv;
    objeto.idrubro = idrubro_riv;
    objeto.fechaventa = fechaventa_riv;
    objeto.cantidad = cantidad_riv;
    objeto.unidadvta = unidadvta;
    objeto.bonus = bonus_riv;
    objeto.titulo = titulo_riv;
    objeto.subtotal = subtotal;
    objeto.itemsEnlaventa = itemsEnlaventa;
    //agrega el item en el objeto
    arregloitemsventa.push(objeto);

    //agrega visualmente el item en la pagina
    agregaritemventa(id_riv, precio_riv, cantidad_riv, titulo_riv, subtotal, unidadvta);
}


function agregaritemventa(id, precio, cantidad,titulo,subtotal,unidadvta) {

    var t;

    if ($.fn.dataTable.isDataTable('#tablaitemsventa')) {
        t = $('#tablaitemsventa').DataTable();
    }
    
    var pre= precio;

    posicion = pre.toString().indexOf(".");
    if(posicion >=0)
        pre = pre.slice(0, posicion) + "," + pre.slice(posicion + 1); 

    t.row.add([
        id,
        titulo,          
        cantidad,
        unidadvta,
        pre,
        subtotal,
        "<a class='borra' onclick='borrarfila(\"" + itemsEnlaventa + "\")' class=" + "\"btn-floating btn-small waves-effect waves-light  blue darken-2 masmenos" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"
    ]);
    t.columns.adjust().draw();
    
    document.getElementById("pedido").style.display  = "block";
    

    calculatotal();
    focoencajabusqueda("");

    M.toast(
    {
        html: 'Ok Agregado!',
        displayLength: '1000'
    });
}


function calculatotal()
{
    totalpedido = 0;
    subtotal = 0;
    for (var a = 0; a < arregloitemsventa.length; a++) 
    {
        subtotal = arregloitemsventa[a].subtotal;
        totalpedido = totalpedido + subtotal;
    }
    totalpedido = Math.round(totalpedido * 100) / 100;
    document.getElementById("totalpedido").value = totalpedido;

}

function borrarfila(iditemsEnlaventa)
{
    //borra la fila visualmente
    $("#tablaitemsventa").on('click', '.borra', function () {
        $(this).parent().parent().css('display', 'none');
    }); 

    calculatotal();

    var arregloAux = [];
    var subtotal = 0;


    //borra la fila del arreglo
    for(var a = 0 ; a < arregloitemsventa.length ; a++)
    {
        if (iditemsEnlaventa == arregloitemsventa[a].itemsEnlaventa) 
        {
            subtotal = arregloitemsventa[a].subtotal;
            totalpedido = parseFloat(totalpedido) - subtotal;
            // arregloitemsventa.splice(a, 1);
        }else{
            var o = new Object();

            o.id = arregloitemsventa[a].id;
            o.precio = arregloitemsventa[a].precio;
            o.costo =  arregloitemsventa[a].costo;
            o.idrubro =  arregloitemsventa[a].idrubro;
            o.fechaventa =  arregloitemsventa[a].fechaventa;
            o.cantidad =  arregloitemsventa[a].cantidad;
            o.bonus =  arregloitemsventa[a].bonus;
            o.titulo =  arregloitemsventa[a].titulo;
            o.subtotal =  arregloitemsventa[a].subtotal;
            o.itemsEnlaventa = arregloitemsventa[a].itemsEnlaventa;
            //agrega el item en el objeto
            arregloAux.push(o);            
        }        
    }

    //---------------------- Re armo el arreglo de items de la venta --------------------------

    arregloitemsventa = arregloAux;

    //-----------------------------------------------------------------------------------------
    totalpedido = Math.round(totalpedido * 100) / 100;

    document.getElementById("totalpedido").value = totalpedido;


    if (totalpedido == 0)
    {
        if ($.fn.dataTable.isDataTable('#tablaitemsventa')) {
            t = $('#tablaitemsventa').DataTable();
        }else
        {
            t = $('#tablaitemsventa').DataTable();
        }

        t.clear().draw(false);

        limpiacamposventa();
    }
}






// -------------------------------- Se procesa desde un boton en la pagina ---------------------
function procesarventa(){
    var nombrecliente = $("#clienteelegido").val();
    var idclienteelegido = document.getElementById("opcioneslistaclientes").value;
    var tipopagonombrecorto = document.getElementById("opcioneslistatiposdepago").value;

     if (nombrecliente == "" || nombrecliente == "Selecciona un cliente")
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'Indique el cliente',showConfirmButton: false,
            timer: 1500})
        return false;
     
    }else  if (tipopagonombrecorto == ""){

        Swal.fire({position: 'top-end',icon: 'warning',title: 'Indique el tipo de pago',showConfirmButton: false,
            timer: 1500})
        return false;
    }
   if(arregloitemsventa.length <= 0)
   {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'Busque artículos y agregue al pedido',showConfirmButton: false,
            timer: 1500})
        return false;

   }
    var ar = arregloitemsventa;

    //recorre el arreglo de items y los guarda
    for (var a = 0; a < ar.length; a++)
    {
        guardarventa(ar[a].id, ar[a].precio, ar[a].costo, ar[a].idrubro, ar[a].fechaventa, ar[a].cantidad,idclienteelegido, ar[a].bonus, tipopagonombrecorto);
    }
    
    var fechaventa = $("#fechaventa").val();
    fechaventa = conviertefechaastringdmy(fechaventa);

    setTimeout(function(){ consultarventasdeldia(fechaventa); }, 2000);

    // arregloitemsventa = [];
    ar = [];
    // totalpedido = 0;
    
    var t = $("#tablaitemsventa").DataTable();
    
    t.clear().draw(true);
    limpiacamposventa();

}

function guardarventa(id, precio, costo, idrubro, fechaventa, cantidad, idclienteelegido, bonus,tipopagonombrecorto) {

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
    itemventa.tipopago = tipopagonombrecorto;
    itemventa.fechaventa = fechaventa;

    var vendido = JSON.stringify(itemventa);

    $.ajax({
        url: "consultaventas.php",
        data: { vendido: vendido },
        type: "post",
        success: function (data) {

      
            if (data != "[]") {

                var tipobonus = "bonussumado";
                guardarbonusencliente(idclienteelegido, bonus, tipobonus);
                limpiacamposventa();
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

function limpiacamposventa()
{
    itemsEnlaventa = 0;
    totalpedido = 0;
    document.getElementById("totalpedido").value = totalpedido;
    document.getElementById("pedido").style.display = "none";
    arregloitemsventa = [];
    
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
                // M.toast({ html: 'Bonus de cliente actualizado!' })
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
    }else
        tventas = $('#tablavender').DataTable();

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
    itemventa.tablaunidadesgranel = tablaunidadesgranel;

    itemventa.fechaventa = fechaventa;
    
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

                    total = dd[key].cantidad * dd[key].precio;
                    total = Math.round(total * 100) / 100;

                    tventas.row.add([

                        dd[key].id,
                        dd[key].codigobarra,
                        dd[key].titulo,
                        dd[key].cantidad,
                        dd[key].nombreprefijoventa,
                        "$ " + dd[key].precio,
                        "$ " + total,
                        dd[key].tipopago,
                        dd[key].idcliente,
                        dd[key].nombrecliente,
                        dd[key].bonus,
                        "<a onclick='quitar(\"" + dd[key].id + "\",\"" + dd[key].idcliente + "\",\"" + dd[key].bonus + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos blockeliminar" + "\"><i class=" + "\"material-icons\"" + ">delete</i>"

                    ]).draw(false);
                });
                verificabloqueo();
                tventas.columns.adjust().draw(false);
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

                // Swal.fire(
                //     'Eliminado!',
                //     'La venta fué borrada.',
                //     'success'
                // )
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
        "dom": '<"top"p>rt<"bottom"p><"bottom"fl><"clear">'
        // "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'

    });
}




function configuraciontablaPedido() {
    $('#tablaitemsventa').DataTable({
        dom: '<"top"CRTl><"clear">rt<"bottom"ip><"clear">',
       "paging":   false,
        "ordering": false,
        "info":     false
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
            "pageLength": -1
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
    itemventa.tablaunidadesgranel = tablaunidadesgranel;
    
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
                    cantidadxcosto = Math.round(cantidadxcosto *100)/100;

                    t.row.add([
                        conviertefecha(dd[key].fecha.toString()),
                        dd[key].id,
                        dd[key].codigobarra,
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].cantidad,
                        dd[key].nombreprefijoventa,
                        dd[key].precio,
                        cantidadxprecio,
                        
                        dd[key].nombrecliente,
                        dd[key].rubro,
                        "<label class='blockcosto'>"+  dd[key].costo + "</label>",
                        "<label class='blockcosto'>" + cantidadxcosto + "</label>",
                        
                    ]).draw(false);
                });

                var totalventavista = Math.round(totalventa * 100) / 100;
                var totalcostovista = Math.round(totalcosto *100)/100;

                if(totalventa>0){
                    $("#totalventa").attr("value", totalventavista);
                }else
                {
                    $("#totalventa").attr("value", "");
                }


                if (totalcosto>0){
                    $("#totalcosto").attr("value", totalcostovista);
                }else
                {
                    $("#totalcosto").attr("value", "");
                }

                if (totalventavista >0 && totalcosto >0 )
                {
                    var rentapesosvista;
                    rentapesosvista = totalventavista - totalcostovista;
                    rentapesosvista = Math.round(rentapesosvista * 100)/100;


                    $("#rentabilidadpesos").attr("value", rentapesosvista);
                    
                    var renta = Math.floor( (totalventa - totalcosto) / totalcosto  *100);
                    var rentavista = Math.round(renta *100)/100;

                    $("#rentabilidadporcentaje").attr("value", rentavista);
                }else
                {
                    $("#rentabilidadpesos").attr("value", "");
                    $("#rentabilidadporcentaje").attr("value", "");

                }
                verificabloqueo();
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
    // datosproveedores.nombreproveedor = "";
    // datosproveedores.direccionproveedor = "";
    // datosproveedores.telefonoproveedor = "";
    // datosproveedores.emailproveedor = "";

    var objetoproveedor = JSON.stringify(datosproveedores);



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
                title: 'Selecciona una categoría!!!',
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

        $.ajax({

            url: "consultaproveedoranuncio.php",

            data: { objetoanuncio: objetoanuncio },
            type: "post",

            success: function (data) {

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
            title: 'Debe seleccionar un proveedor y categoría antes de esta acción!',
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

                // M.toast(
                // {
                //     html: mensaje,
                //     displayLength: '1500'
                // });

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

function cambiapreciosmasivamente(tip) 
{
    var aplicaalcosto = 0;
    var aplicaalaventa = 0;
    var aplicamontoporcentaje = 0;

    if ($('#aplicaacosto').prop('checked')) {
        aplicaalcosto = 1;
    }

    if ($('#aplicaaventa').prop('checked')) {
        aplicaalaventa = 1;
    }

    aplica = document.getElementById("chkaplicaporcentaje");
    if(aplica.checked){
        aplicamontoporcentaje = "porce";
    }else
    {
        aplicamontoporcentaje = "monto";
    }

    if (aplicaalcosto == 1 || aplicaalaventa == 1) 
    {
        var alcancemodificacion = "";

        if (aplicaalcosto == 1 && aplicaalaventa == 1) {
            alcancemodificacion = "costoyventa";
        } else if (aplicaalcosto == 1 && aplicaalaventa == 0) {
            alcancemodificacion = "costo";
        } else
            alcancemodificacion = "venta";


        var valorcambio = document.getElementById("valorcambio");
        if(aplicamontoporcentaje == "porce")
        {

            if (tip == "restar" && valorcambio.value > 100) {
                Swal.fire({
                    position: 'top-end',icon: 'warning',title: 'No puede restar mas del 100%',showConfirmButton: false,timer: 2500})
                    return;
            }

            if (valorcambio.value != "" && valorcambio.value > 0) {

                const swalWithBootstrapButtons = Swal.mixin({customClass: {confirmButton: 'btn btn-success',cancelButton: 'btn btn-danger'},buttonsStyling: false})
                if (tip == "sumar") var mt = "¿Desea SUMAR el " + valorcambio.value + "% al precio de venta ?";
                if (tip == "restar") var mt = "¿Desea RESTAR el " + valorcambio.value + "% al precio de venta ?";

                swalWithBootstrapButtons.fire({title: 'Modificar precios',text: mt,icon: 'warning',showCancelButton: true,
                    confirmButtonText: 'Si!',cancelButtonText: 'No!',reverseButtons: true}).then((result) => {
                    if (result.value) {
                        cambiarporcentajePreciosVentaMasivamente(valorcambio.value, tip, alcancemodificacion);
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {swalWithBootstrapButtons.fire('Perfecto','Los precios siguen iguales!!!')}
                })
            
            } else {

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

            //cambiar montos

            if (valorcambio.value != "" && valorcambio.value > 0) 
            {

                const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
                if (tip == "sumar") var mt = "¿Desea SUMAR $ " + valorcambio.value + " al precio de venta ?";
                if (tip == "restar") var mt = "¿Desea RESTAR $ " + valorcambio.value + " al precio de venta ?";

                swalWithBootstrapButtons.fire({
                    title: 'Modificar precios', text: mt, icon: 'warning', showCancelButton: true,
                    confirmButtonText: 'Si!', cancelButtonText: 'No!', reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        cambiarmontoPreciosVentaMasivamente(valorcambio.value, tip, alcancemodificacion);
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) { swalWithBootstrapButtons.fire('Perfecto', 'Los precios siguen iguales!!!') }
                })

            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Ingrese el monto para el cambio de precios !',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        }



    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debe aplicarse el cambio al costo,venta o ambos !',
            showConfirmButton: false,
            timer: 3000
        })
    }
}



function cambiarmontoPreciosVentaMasivamente(monto, tip, alcancemodificacion)
{


    for (var a = 0; a < arreglochecktilde.length; a++) 
    {
        idproducto          = arreglochecktilde[a].idanuncio;
        costoactualxprefijo = parseFloat(arreglochecktilde[a].costoxprefijo);
        ventaactualxprefijo = parseFloat(arreglochecktilde[a].ventaxprefijo);
        costoanterior       = parseFloat(arreglochecktilde[a].costo);
        precioanterior      = parseFloat(arreglochecktilde[a].precio);
        relacioncove        = parseFloat(arreglochecktilde[a].relacioncompraventa);
        
        monto               = parseFloat(monto);
        

        comocompra          = arreglochecktilde[a].prefijocompra;
        var costonuevo      = 0;
        var precionuevo     = 0;
       

        if(comocompra == 0)
        {
            costonuevo = costoanterior;
            precionuevo = precioanterior;
            
            
        }else
        {
            costonuevo = costoactualxprefijo;
            precionuevo = ventaactualxprefijo;
            
        }

        var redondeo = $('#opcionredondear').prop('checked');

        if (tip == "sumar")
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = costonuevo + monto;
                if(redondeo)
                    costonuevo = Math.floor(costonuevo/10)*10;

                if(comocompra > 0)
                    costoactualxprefijo = costonuevo;                 

                costonuevo = costonuevo / relacioncove;
                costonuevo = Math.round(costonuevo * 100) / 100;
            }
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = precionuevo + monto;
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;
               
                if(comocompra > 0)
                    ventaactualxprefijo = precionuevo;
                precionuevo = precionuevo / relacioncove;
                precionuevo = Math.round(precionuevo * 100) / 100;
            }
        }else
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = costonuevo - monto;
                if(redondeo)
                    costonuevo = Math.floor(costonuevo/10)*10;

                if(comocompra > 0)
                    costoactualxprefijo = costonuevo;                                               
                costonuevo = costonuevo / relacioncove;
                costonuevo = Math.round(costonuevo * 100) / 100;
            }
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = precionuevo - monto;
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;

                if(comocompra > 0)
                    ventaactualxprefijo = precionuevo;
                precionuevo = precionuevo / relacioncove;
                precionuevo = Math.round(precionuevo * 100) / 100;
            }
        }

        
        if (arreglochecktilde[a].tildado == true) {
            actualizaporcentajepreciocostoyventa(idproducto, precionuevo, precioanterior, costonuevo, costoanterior, costoactualxprefijo, ventaactualxprefijo)
            M.toast({ html: 'Hecho,' + arreglochecktilde[a].idproducto, displayLength: '300', classes: 'rounded' });

        }

    }
    
    var tas = null;
    if ($.fn.dataTable.isDataTable('#tablaanunciosmasivos'))
        tas = $('#tablaanunciosmasivos').DataTable();
    else return;

    tas.clear().draw(true);
    document.getElementById("todostilde").checked = false;
    
}

function cambiarporcentajePreciosVentaMasivamente(porcentaje, tip, alcancemodificacion)
{


    for (var a = 0; a < arreglochecktilde.length; a++) 
    {
        idproducto          = arreglochecktilde[a].idanuncio;
        costoactualxprefijo = parseFloat(arreglochecktilde[a].costoxprefijo);
        ventaactualxprefijo = parseFloat(arreglochecktilde[a].ventaxprefijo);
        costoanterior       = parseFloat(arreglochecktilde[a].costo);
        precioanterior      = parseFloat(arreglochecktilde[a].precio);
        relacioncove        = parseFloat(arreglochecktilde[a].relacioncompraventa);
        porcentaje          = parseFloat(porcentaje);
        
        comocompra          = arreglochecktilde[a].prefijocompra;
        var costonuevo      = 0;
        var precionuevo     = 0;
       

        if(comocompra == 0)
        {
            costonuevo = costoanterior;
            precionuevo = precioanterior;
            
            
        }else
        {
            costonuevo = costoactualxprefijo;
            precionuevo = ventaactualxprefijo;
            
        }

        var redondeo = $('#opcionredondear').prop('checked');

        if (tip == "sumar")
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = costonuevo + costonuevo * porcentaje / 100;
                if(redondeo)
                    costonuevo = Math.floor(costonuevo/10)*10;

                if(comocompra > 0)
                    costoactualxprefijo = costonuevo;                 

                costonuevo = costonuevo / relacioncove;
                costonuevo = Math.round(costonuevo * 100) / 100;
            }
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = precionuevo + precionuevo * porcentaje / 100;
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;
               
                if(comocompra > 0)
                    ventaactualxprefijo = precionuevo;
                precionuevo = precionuevo / relacioncove;
                precionuevo = Math.round(precionuevo * 100) / 100;
            }
        }else
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = costonuevo - costonuevo * porcentaje / 100;
                if(redondeo)
                    costonuevo = Math.floor(costonuevo/10)*10;

                if(comocompra > 0)
                    costoactualxprefijo = costonuevo;                                               
                costonuevo = costonuevo / relacioncove;
                costonuevo = Math.round(costonuevo * 100) / 100;
            }
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = precionuevo - precionuevo * porcentaje / 100;
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;

                if(comocompra > 0)
                    ventaactualxprefijo = precionuevo;
                precionuevo = precionuevo / relacioncove;
                precionuevo = Math.round(precionuevo * 100) / 100;
            }
        }

        
        if (arreglochecktilde[a].tildado == true) {
            actualizaporcentajepreciocostoyventa(idproducto, precionuevo, precioanterior, costonuevo, costoanterior, costoactualxprefijo, ventaactualxprefijo)
            M.toast({ html: 'Hecho,' + arreglochecktilde[a].idproducto, displayLength: '300', classes: 'rounded' });
        }

    }
    
    var tas = null;
    if ($.fn.dataTable.isDataTable('#tablaanunciosmasivos'))
        tas = $('#tablaanunciosmasivos').DataTable();
    else return;

    tas.clear().draw(true);
    document.getElementById("todostilde").checked = false;

}


function actualizaporcentajepreciocostoyventa(idproducto,precionuevo, precioactual,costonuevo,costoactual,costoxprefijoenviado,ventaxprefijoenviado)
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
        itemanuncio.costoxprefijo = costoxprefijoenviado;
        itemanuncio.ventaxprefijo = ventaxprefijoenviado;


        var objetoanuncio = JSON.stringify(itemanuncio);
        
        $.ajax({
            url: "consultaanuncios.php",
            data: { objetoanuncio: objetoanuncio },
            type: "post",
            success: function (data) {

               
                if (data == 1) {
                    // if (precionuevo != precioactual) {
                    //     M.toast({ html: 'Ok, precio de venta actualizado!', displayLength: '2000', classes: 'rounded' });
                    // }
                    // if (costonuevo != costoactual) {
                    //     M.toast({ html: 'Ok, costo actualizado', displayLength: '2000', classes: 'rounded' });
                    // }
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
//--------------------------- cambios de precios modificados xxx
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
                    costonuevo = Math.floor(costonuevo/10)*10;
            }
            else
                costonuevo = parseInt(costoactual);

            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa")
            {
                precionuevo = parseInt(precioactual + precioactual * porcentaje / 100);
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;
            }
            else
                precionuevo = parseInt(precioactual);

            
        }else
        {
            if (alcancemodificacion == "costo" || alcancemodificacion == "costoyventa")
            {
                costonuevo = parseInt( costoactual - costoactual * porcentaje / 100);
                if(redondeo)
                    costonuevo = Math.floor(costonuevo/10)*10;
            }
            else
                costonuevo = parseInt( costoactual);
            
            if (alcancemodificacion == "venta" || alcancemodificacion == "costoyventa"){
                precionuevo = parseInt(precioactual - precioactual * porcentaje / 100);
                if(redondeo)
                    precionuevo = Math.floor(precionuevo/10)*10;
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


function verificaproveedoranuncio(idanuncio, seleccionidproveedor)
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

    itemanuncio.tipo = "verificar";
    itemanuncio.idproveedor = seleccionidproveedor;
    itemanuncio.id = idanuncio;
    itemanuncio.idrubro = "";
    itemanuncio.filtro = "";

    var objetoanuncio = JSON.stringify(itemanuncio);



    $.ajax({

        url: "consultaproveedoranuncio.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",

        success: function (data) {

            if (data == "[]") {
                altabajaproveedoranuncio(idanuncio, seleccionidproveedor, "alta", "Ok producto asociado al proveedor")
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
            if (data == "[]" || data == "consultavacia") 
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
        "dom": '<"top"p>rt<"bottom"p><"clear">'

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

function volverAconsultar()
{

    var cb = $("#cajabusqueda").val();

    if ($('#usalector').prop('checked'))
    {
        consultaranunciosparamovimientos("consultalector");
    }else
    {
        if( cb != "") 
        {
            consultaranunciosparamovimientos("consultafiltros");
        }else
        {
            consultaranunciosparamovimientos("consultarubros");
        }

    }
}
function CalculaPrecioSegunMargen(costo,porcentaje){
    
    if(costo == "") costo = 0;
    if(porcentaje == "") porcentaje = 0;
    
    var precioventa = 0;
    precioventa = parseFloat(costo) + (parseFloat(porcentaje) * parseFloat(costo)) / 100;
    precioventa = Math.round(precioventa * 100) / 100;

    if(precioventa <= "" || precioventa == NaN) precioventa = "";
    return precioventa;
}

function CalculaMargenSegunPrecio(precioventa,costo)
{
    if(costo == "") costo = 0;
    if(precioventa == "") precioventa = 0;

    var rentavista=0;
    var renta = (parseFloat(precioventa) - parseFloat(costo)) / parseFloat(costo)  * 100;
    rentavista = Math.round(renta *100)/100;
    if (rentavista <= 0 || rentavista == NaN) rentavista = "";
    return rentavista;
}

function validarinputcantidadpreciocompras(e, contenido, caracteres,uping,unfr,id,costo,precio,prefijocompra, prefijoventa, relacioncompraventa, codigobarra)
{
    var key = window.event ? e.which : e.keyCode;

    if (e.keyCode == 107 || e.keyCode == 13) //tecla + o enter
    {
        if (uping == 0)
            moverstock(id, costo, precio, prefijocompra, prefijoventa, relacioncompraventa, codigobarra);

       return false;
    }
    
    //punto del teclado numerico o coma del teclado alfa
    if (e.keyCode == 110 || e.keyCode == 188) {
        return true;
    }

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 44 || unicode == 8 || unicode == 46 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
         
      
        
        if(unfr != undefined)
        {
            if(unfr == 'fr')
                var cosxpre = document.getElementById("costoxprefijo_" + id);
            else if(unfr == 'un')
                var cosxpre = document.getElementById("costo_" + id);

            if (uping == 1) 
            {
                var cantidad = document.getElementById("cantidad_" + id);
                
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;

                document.getElementById("subtotalcompra_" + id).innerHTML = st;
            }else
            {
                // var renta = (parseFloat(contenido) - cosxpre.value) / cosxpre.value  * 100;
                // var rentavista = Math.round(renta *100)/100;
                // rentavista = Math.round(rentavista * 100) / 100;
                
                var rentavista=0;
                rentavista = CalculaMargenSegunPrecio(contenido,cosxpre.value);
                document.getElementById("porcentajem_" + id).value = parseFloat(rentavista);
            }
        }
        return true;
    }

    if ( ( (key >= 48 && key <= 57) || (key >= 96 && key <= 105) ) && (contenido.length < caracteres)) 
    {
        

        if (unfr != undefined) 
        {
            if (unfr == 'fr')
                var cosxpre = document.getElementById("costoxprefijo_" + id);
            else if (unfr == 'un')
                var cosxpre = document.getElementById("costo_" + id);

            if (uping == 1) {
                var cantidad = document.getElementById("cantidad_" + id);

                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;
            } else {
                // var renta = (parseFloat(contenido) - cosxpre.value) / cosxpre.value * 100;
                // var rentavista = Math.round(renta * 100) / 100;
               
                // rentavista = Math.round(rentavista * 100) / 100;

                var rentavista=0;
                rentavista = CalculaMargenSegunPrecio(contenido,cosxpre.value);
                document.getElementById("porcentajem_" + id).value = parseFloat(rentavista);
            }
        }
        return true;
    }
    return false;
}

function validarinputcantidadcompras(e,contenido, caracteres,uping,unfr, id, costo, precio,prefijocompra,prefijoventa,relacioncompraventa,codigobarra,downup)
{
    var key = window.event ? e.which : e.keyCode;
    
    if (e.keyCode == 107 || e.keyCode == 13) //tecla + o enter
    {
        if(downup==1) //si la tecla esta subiendo compra pero si esta bajando osea 0 no compra
        moverstock(id, costo, precio, prefijocompra, prefijoventa, relacioncompraventa, codigobarra);

        return false;
    }

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 46  || unicode == 8 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        
        if (uping == 1) {
            var cantidad = document.getElementById("cantidad_" + id);
            if(unfr == 'fr')
                var cosxpre = document.getElementById("costoxprefijo_" + id);
            else if(unfr == 'un')
                var cosxpre = document.getElementById("costo_" + id);

            if(unfr != undefined)
            {
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;
            }
        }
        return true;
    }

    if (((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || unicode == 46 ) && (contenido.length < caracteres)) 
    {
        if (uping == 1) {
            var cantidad = document.getElementById("cantidad_" + id);
            if (unfr == 'fr')
                var cosxpre = document.getElementById("costoxprefijo_" + id);
            else if(unfr == 'un')
                var cosxpre = document.getElementById("costo_" + id);

            if(unfr != undefined)
            {
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;
            }
        }
        return true;
    }
    return false;
}
function validarinputporcentaje(e,contenido, caracteres,uping,unfr, id,relacioncompraventa)
{
    var key = window.event ? e.which : e.keyCode;

     //punto del teclado numerico o coma del teclado alfa
    if (e.keyCode == 110 || e.keyCode == 188) {
        return true;
    }

    var unicode = e.keyCode ? e.keyCode : e.charCode;
    if (unicode == 46 || unicode == 8 || unicode == 9 || unicode == 37 || unicode == 39 || unicode == 38 || unicode == 40) {
        
        if (uping == 1) {
            var cantidad = document.getElementById("cantidad_" + id);
            if(unfr == 'fr')
            {
                var cosxpre = document.getElementById("costoxprefijo_" + id);
                var venxpre = document.getElementById("ventaxprefijo_" + id);
            }
            else if(unfr == 'un')
            {
                var cosxpre = document.getElementById("costo_" + id);
                var venxpre = document.getElementById("precio_" + id);
            }

            if(unfr != undefined)
            {
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;

                // var pv = parseFloat(cosxpre.value) + (parseFloat(contenido) * parseFloat(cosxpre.value)) / 100;
                // pv = Math.round(pv * 100) / 100;
                var pv=0;
                pv = CalculaPrecioSegunMargen(cosxpre.value,contenido);

                if(pv == NaN)
                    pv == 0
                else
                    pv = parseFloat(pv);

                if(unfr == 'fr')
                {
                    var venxpre = document.getElementById("ventaxprefijo_" + id);
                }
                else if(unfr == 'un')
                {
                    var venxpre = document.getElementById("precio_" + id);
                }
                venxpre.value = pv;

            }
        }
        return true;
    }

    if ( ( (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || unicode == 46 ) && (contenido.length < caracteres)) 
    {
        if (uping == 1) {
            var cantidad = document.getElementById("cantidad_" + id);
            if (unfr == 'fr')
                var cosxpre = document.getElementById("costoxprefijo_" + id);
            else if(unfr == 'un')
                var cosxpre = document.getElementById("costo_" + id);

            if(unfr != undefined)
            {
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;

                if(unfr != undefined)
            {
                var st = cantidad.value * cosxpre.value;
                st = Math.round(st * 100) / 100;
                document.getElementById("subtotalcompra_" + id).innerHTML = st;

                // var pv = parseFloat(cosxpre.value) + (parseFloat(contenido) * parseFloat(cosxpre.value)) / 100;
                // pv = Math.round(pv * 100) / 100;

                var pv=0;
                pv = CalculaPrecioSegunMargen(cosxpre.value,contenido);

                if(pv == NaN)
                    pv == 0
                else
                    pv = parseFloat(pv);

                if(unfr == 'fr')
                {
                    var venxpre = document.getElementById("ventaxprefijo_" + id);
                }
                else if(unfr == 'un')
                {
                    var venxpre = document.getElementById("precio_" + id);
                }
                venxpre.value = pv;

            }
            }
        }
        return true;
    }
    return false;
}

function consultaranunciosparamovimientos(tipo,e) {

      
    if ($.fn.dataTable.isDataTable('#tablaanunciosmovimientos')) {
        t = $('#tablaanunciosmovimientos').DataTable();
    }
    // var seleccion = document.getElementById("opcioneslista");
    // var seleccionrubro = seleccion.options[seleccion.selectedIndex].text;

    var seleccionidrubro = document.getElementById("opcioneslista").value;


    var bdd = conexionbdd;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
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

    var filtro = [];
    if(tipo == "consultafiltros" ||tipo == "consultalector" ){

        // si el tipo no es rubro va a buscar por filtro
        var textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;
        textobuscado = textobuscado.trim();
        if (textobuscado == "") {
            return false;
        }
        filtro.push( textobuscado );
    }

    var itemanuncio = new Object();
    itemanuncio.bdd = bdd;
    itemanuncio.tabla = tabla;
    itemanuncio.tablarubros = tabladerubros;
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;

    itemanuncio.tablacompras = tabladecompras;
    itemanuncio.tablaventas = tabladeventas;
    itemanuncio.tablaajustes = tabladeajustes;
    itemanuncio.tablaproveedores = tabladeproveedores;
    itemanuncio.tablaproveedoresanuncios = tabladeproveedoresanuncios;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;
    itemanuncio.codigobarra = textobuscado;

    var objetoanuncio = JSON.stringify(itemanuncio);
    var opcioninicio;
    encontro = false;

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
                encontro = true;
                var tituloanterior = "";

                $.each(dd, function (key, value) {
                    opcioninicio = "opcionstockinicio_" + dd[key].id;

                    if (dd[key].fechastockinicio == "0000-00-00"){
                        fsi = "";
                        estado = "";
                    }else{
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)
                        estado = "checked";
                    }

                    var filaCosto = "";
                    var filaVenta ="";
                    var formaVta= "";
                    var stok = 0;
                    var unfr="";
                    stok = dd[key].stock / dd[key].relacioncompraventa;

                    if(dd[key].prefijocompra == 0) //es un producto de venta unitaria
                    {
                        unfr = 'un';
                        filaCosto = "<input  onKeyDown='return validarinputcantidadpreciocompras(event, this.value, 8,1) ' onKeyUp ='return validarinputcantidadpreciocompras(event, this.value, 8,1,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\") ' id ='costo_" + dd[key].id + "' name ='costo_" + dd[key].id + "' type ='text' class='validate escampocosto saltacosto blockcosto' value=" + "'" + dd[key].costo + "'></input>";
                        filaVenta = "<input  onKeyDown='return validarinputcantidadpreciocompras(event, this.value, 8,0) ' onKeyUp ='return validarinputcantidadpreciocompras(event, this.value, 8,0,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\") ' id ='precio_" + dd[key].id + "' name ='precio_" + dd[key].id + "' type ='text' class='validate escampoprecio saltaprecio blockmodiprecio' value=" + "'" + dd[key].precio + "'></input>";
                        formaVta = "<label>x Unidad</label>";
                       
                    }else //es un producto de venta fraccionada
                    {
                        unfr = 'fr';
                        filaCosto = "<input onKeyDown='return validarinputcantidadpreciocompras(event, this.value, 8,1) ' onKeyUp ='return validarinputcantidadpreciocompras(event, this.value, 8,1,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costoxprefijo + "\",\"" + dd[key].ventaxprefijo + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\") ' id ='costoxprefijo_" + dd[key].id + "' name ='costoxprefijo_" + dd[key].id + "' type ='text' class='validate escampocosto saltacosto blockcosto' value=" + "'" + dd[key].costoxprefijo + "'></input>";
                        filaVenta = "<input onKeyDown='return validarinputcantidadpreciocompras(event, this.value, 8,0) ' onKeyUp ='return validarinputcantidadpreciocompras(event, this.value, 8,0,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costoxprefijo + "\",\"" + dd[key].ventaxprefijo + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\") ' id ='ventaxprefijo_" + dd[key].id + "' name ='ventaxprefijo_" + dd[key].id + "' type ='text' class='validate escampoprecio saltaprecio blockmodiprecio' value=" + "'" + dd[key].ventaxprefijo + "'></input>";
                        formaVta = "<label>Fraccionado en " + dd[key].nombreprefijoventa + "</label>";
                    }

                    if(tituloanterior != dd[key].titulo)
                    {
                        tituloanterior = dd[key].titulo;
                        t.row.add([
                            
                            // "<label><input onclick = 'agregaquitastockinicio(\"" + dd[key].id + "\",\"" + opcioninicio + "\")' id='" + opcioninicio + "' type='checkbox' class='filled-in columnadedos' " + estado + " /><span class='colorletras'>Si</span></label>",
                            dd[key].id,
                            dd[key].codigobarra,
                                
                            dd[key].titulo,
                            "<input onKeyDown='return validarinputcantidadcompras(event, this.value, 8,0,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\",0) ' onKeyUp ='return validarinputcantidadcompras(event, this.value, 8,1,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\",1) ' id ='cantidad_" + dd[key].id + "' name ='cantidad_" + dd[key].id + "' type ='text' class='validate columnadetres saltacantidad'></input>",
                            "<label>"+ dd[key].nombreprefijocompra +"</label>",
                            filaCosto,
                            "<label style='display: inline-block;' id ='subtotalcompra_" + dd[key].id + "' name ='subtotalcompra_" + dd[key].id + "'></label>",
                            "<input onKeyDown='return validarinputporcentaje(event, this.value, 8,0,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].relacioncompraventa + "\") ' onKeyUp ='return validarinputporcentaje(event, this.value, 8,1,\"" + unfr + "\",\"" + dd[key].id + "\",\"" + dd[key].relacioncompraventa + "\") ' id ='porcentajem_" + dd[key].id + "' name ='porcentajem_" + dd[key].id + "' type ='text' class='validate columnadetres saltacantidad'></input>",
                            
                            // formaVta,
                            filaVenta,
                            "<a onclick='moverstock(\"" + dd[key].id + "\",\"" + dd[key].costo + "\",\"" + dd[key].precio + "\",\"" + dd[key].prefijocompra + "\",\"" + dd[key].prefijoventa + "\",\"" + dd[key].relacioncompraventa + "\",\"" + dd[key].codigobarra + "\")' class=" + "\"btn-floating btn-large waves-effect waves-light  blue darken-2 masmenos " + "\"><i class=" + "\"material-icons\"" + ">save</i>",
                            // "<img class='materialboxed center-align' width='30%' src=" + "'" + rutaimagenes + dd[key].imagen + "'></img>",                                                
                            // "<a onclick='menosuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect  brown darken-3 " + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_neg_1</i>",
                            // "<a onclick='masuno(\"" + dd[key].id + "\")' class=" + "\"btn-floating btn-small waves-effect   brown darken-3" + "\"><i class=" + "\"material-icons md-18\"" + ">exposure_plus_1</i>",
                            "<label class='blockstock'>" + stok + "</label>",
                            "<label>"+ dd[key].nombreprefijocompra +"</label>",

                            // fsi

                        ]).draw(false);
                    }
                });
                verificabloqueo();
                t.columns.adjust().draw();

                reconocerTooltipped();
                imageneszoom();
                eligetipomovimiento();

                identificasaltainput('saltacantidad');
                identificasaltainput('saltaprecio');
                identificasaltainput('saltacosto');

                // colapsarCompras();
                mostrarResultaodosBusquedaCompras();
                hacefoco();

            }else
            {
                mostrarResultaodosBusquedaCompras();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function mostrarResultaodosBusquedaCompras()
{
    if(encontro == true)
    {
        document.getElementById("tablaproductoscompras").style.display = "block";
        document.getElementById("actualizarcompras").style.display = "block";
    }
    else
    {
        Swal.fire({position: 'top-end',icon: 'warning',title: 'No hay coincidencias ',showConfirmButton: false,timer: 1500})
        document.getElementById("tablaproductoscompras").style.display = "none";
        document.getElementById("actualizarcompras").style.display = "none";

    }
}

function colapsarCompras(){
    if($("#collapseConsultaCompras").hasClass("show"))
        $('#collapseConsultaCompras').collapse('toggle');
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

function moverstock(id,costoactual,precioactual,prefijocompra,prefijoventa,relacioncompraventa,codigobarra) {

    if ($.fn.dataTable.isDataTable('#tablamovimientostock')) {
        tv = $('#tablamovimientostock').DataTable();
    }
    var costoxprefijoenviado=0;
    var ventaxprefijoenviado=0;

    var canAjuste =0; //Los ajustes se realizan en cantidades de VENTA y no de compra
    //cantidad es la cantidad de compra sin fraccionar * relacioncompraventa, siempre que sea producto de vta x fraccion
    var can="";
    var pre="";
    var cos="";
    can = document.getElementById('cantidad_' + id);
    if(can)
    {

    
        canAjuste = can.value;

        if(prefijocompra == 0)
        {

            can = can.value;
            pre = document.getElementById('precio_' + id);
            pre = pre.value;
            cos = document.getElementById('costo_' + id);
            cos = cos.value;
        }else
        {
        
            can = can.value * relacioncompraventa;
            pre = document.getElementById('ventaxprefijo_' + id);
            ventaxprefijoenviado = pre.value;
            pre = pre.value / relacioncompraventa;

            cos = document.getElementById('costoxprefijo_' + id);
            costoxprefijoenviado = cos.value;
            cos = cos.value / relacioncompraventa;
        }


        var fechamovimiento = $("#fechacompraajuste").val();
        var nombreproveedor = $("#proveedorelegido").val();
        var idproveedorelegido = document.getElementById("opcioneslistaproveedores").value;

        var tipomovimientonombrecorto = document.getElementById("opcioneslistatiposmovimientostock").value;

        if( fechamovimiento != "")
        {
            if(nombreproveedor != "Selecciona un Proveedor" && nombreproveedor != "" )        
            {
                if(tipomovimientonombrecorto != "")
                {
                    
                        if(parseInt(can, 10) > 0)
                        {
                            fechamovimiento = conviertefechaastringdmy(fechamovimiento);
                            tipomovimientonombrecorto = eligetipomovimiento();

                            if (tipomovimientonombrecorto == "CO") {
                                guardarcompra(id, pre, precioactual, cos, costoactual, fechamovimiento, can, idproveedorelegido, tipomovimientonombrecorto, prefijocompra,prefijoventa,costoxprefijoenviado,ventaxprefijoenviado,codigobarra);
                            } else {
                                guardarajuste(id, fechamovimiento, canAjuste, tipomovimientonombrecorto, prefijocompra,prefijoventa);
                            }
                            can = "";
                            setTimeout(() => {
                                document.getElementById('cantidad_' + id).value = "";
                                
                            }, 100);
                        }
                        else
                        {
                            if(can != "")
                            {
                                Swal.fire({
                                position: 'top-end',icon: 'warning',title: 'Ingrese una cantidad por favor',
                                showConfirmButton: false,timer: 2500})
                            }
                        }
                }else
                {
                    Swal.fire({
                        position: 'top-end',icon: 'warning',title: 'Ingrese tipo de movimiento por favor',
                        showConfirmButton: false,timer: 2500})
                }
            }else
            {
                Swal.fire({position: 'top-end',icon: 'warning',title: 'Ingrese el proveedor por favor',
                    showConfirmButton: false,timer: 2500})
            }

        }else
        {
            Swal.fire({position: 'top-end',icon: 'warning',title: 'Ingrese la fecha por favor',
                showConfirmButton: false,timer: 2500})
        }
    }
    
    // colapsarCompras();
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
    itemcompra.tablaunidadesgranel = tablaunidadesgranel;
    
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
                arreglocomprobantes = [];
                

                $.each(dd, function (key, value) {

                    if (dd[key].fechastockinicio == "0000-00-00")
                        fsi = "";
                    else
                        fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                    fco = vista_ymdAdmy(dd[key].fechacompra)

                    totalcompras = totalcompras + dd[key].cantidad * dd[key].costocompra;
                    totalcompras = Math.round(totalcompras * 100) / 100;

                    subtotal = 0;
                    subtotal = dd[key].cantidad * dd[key].costocompra;
                    subtotal = Math.round(subtotal * 100) / 100;

                    cantidadEnPrefijo   = dd[key].cantidad / dd[key].relacioncompraventa;
                    costoEnPrefijo      = dd[key].costocompra * dd[key].relacioncompraventa;
                    precioEnPrefijo     = dd[key].precio * dd[key].relacioncompraventa;

                    var objeto = new Object();
                    objeto.subtotal = subtotal;
                    objeto.comprobante = dd[key].comprobantecompra;
                    arreglocomprobantes.push(objeto);

                    tcompra.row.add([
                        fco,
                        "<input class='saltacomprobante' onfocusout='guardanumerocomprobantemodificado(this.value," + dd[key].idcompra + ")' type ='text' value = '" + dd[key].comprobantecompra +  "'></input>",
                        dd[key].id,
                        dd[key].codigobarra,
                        dd[key].titulo,
                        cantidadEnPrefijo,
                        dd[key].nombreprefijocompra,
                        "<label class='blockcosto'>" + "$ " + costoEnPrefijo + "</label>",

                        "$ " + precioEnPrefijo,
                        
                        dd[key].nombreproveedor,
                        "Compra",
                        "<a onclick='quitarcompra(\"" + dd[key].idcompra + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos blockeliminar " + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                        dd[key].cantidad,
                        dd[key].nombreprefijoventa,
                        "<label class='blockcosto'>" + "$ " + subtotal + "</label>",
                        // fsi

                    ]).draw(false);

                    identificasaltainput('saltacomprobante');
                });
                $("#totalcompras").val(totalcompras);
                verificabloqueo();
            }
        },
        error: function (e) {
            console.log("Error en la consulta." + e.value);
        }
    });
}

function consultarcomprobantecompra()
{
     var fechamovimiento = $("#fechacompraajuste").val();
     
    $("#fechamovimientodesde").val(fechamovimiento);
    $("#fechamovimientohasta").val(fechamovimiento);

    fechamovimientoenviada = conviertefechaastringdmy(fechamovimiento);
    consultarcomprasdeldia(fechamovimientoenviada, fechamovimientoenviada);

    tipomovimientonombrecorto = eligetipomovimiento();
    consultarajustesdeldia(fechamovimientoenviada,fechamovimientoenviada);
    
    setInterval(() => {
        var suma = 0;
        comprobantebuscado = document.getElementById("comprobanteconsulta");
        for(var a=0;a<arreglocomprobantes.length ;a++)
        {
            if(arreglocomprobantes[a].comprobante == comprobantebuscado.value.trim())
            {
                suma = suma + arreglocomprobantes[a].subtotal;
            }
        }
        document.getElementById("subtotalcomprobante").value = "$ " + suma;
    }, 1000);
    
}
function guardanumerocomprobantemodificado(nuevonumerocompra,idcompra)
{
    var bdd = conexionbdd;
    var tabla = tablacompras;
    
    var tipo = "actualizacomprobante";

    var itemmovimiento = new Object();
    itemmovimiento.bdd = bdd;
    itemmovimiento.tabla = tabla;
    itemmovimiento.tipo = tipo;

    itemmovimiento.idcompra = idcompra;
    itemmovimiento.comprobantecompra = nuevonumerocompra;


    var comprado = JSON.stringify(itemmovimiento);

    $.ajax({
        url: "consultacompras.php",
        data: { comprado: comprado },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                M.toast({ html: 'Número de comprobante actualizado', displayLength: '1000', classes: 'rounded' });
                
            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function guardarcompra(id, precionuevo, precioactual, costonuevo, costoactual, fechamovimiento, cantidad, idproveedorelegido, tipomovimientonombrecorto, prefijocompra, prefijoventa, costoxprefijoenviado,ventaxprefijoenviado,codigobarra) {

    var comprobantecompra =   document.getElementById('numerocomprobantecompra').value;
    comprobantecompra = comprobantecompra.trim();


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
    itemmovimiento.comprobantecompra = comprobantecompra;
    itemmovimiento.prefijocompra = prefijocompra;
    itemmovimiento.prefijoventa = prefijoventa;
    itemmovimiento.costoxprefijo = costoxprefijoenviado;
    itemmovimiento.ventaxprefijo = ventaxprefijoenviado;
    itemmovimiento.codigobarra = codigobarra;

    var comprado = JSON.stringify(itemmovimiento);
    $.ajax({
        url: "consultacompras.php",
        data: { comprado: comprado },
        type: "post",
        success: function (data) {
            if (data != "[]") {

                M.toast({ html: 'Ok compra guardada', displayLength: '1000', classes: 'rounded' });
                actualizapreciocostoyventa(id, precionuevo, precioactual, costonuevo, costoactual, costoxprefijoenviado, ventaxprefijoenviado);
                verificaproveedoranuncio(id, idproveedorelegido);
                focoencajabusqueda("");

            } else {
                M.toast({ html: 'Error al crear el registro' })
            }
        },
        error: function (e) {
            M.toast({ html: 'Error al intentar guardar.' });
        }
    });
}

function actualizapreciocostoyventa(idproducto,precionuevo, precioactual,costonuevo,costoactual,costoxprefijoenviado,ventaxprefijoenviado)
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
        itemanuncio.costoxprefijo = costoxprefijoenviado;
        itemanuncio.ventaxprefijo = ventaxprefijoenviado;


        var objetoanuncio = JSON.stringify(itemanuncio);

        $.ajax({
            url: "consultaanuncios.php",
            data: { objetoanuncio: objetoanuncio },
            type: "post",
            success: function (data) {
                if (data == 1) {
                    // if (precionuevo != precioactual) {
                    //     M.toast({ html: 'Ok, precio de venta actualizado!', displayLength: '2000', classes: 'rounded' });
                    // }
                    // if (costonuevo != costoactual) {
                    //     M.toast({ html: 'Ok, costo actualizado', displayLength: '2000', classes: 'rounded' });
                    // }
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
    itemajuste.tablaunidadesgranel = tablaunidadesgranel;

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

                    //Los ajustes son en unidades de venta y NO  de compra

                    tajuste.row.add([
                        faj,
                        dd[key].titulo,
                        dd[key].descripcion,    
                        dd[key].cantidad,
                        dd[key].nombreprefijoventa,
                        
                        dd[key].tipomovimientonombrecorto,
                        "<a onclick='quitarajuste(\"" + dd[key].idajuste + "\")' class=" + "\"btn-floating btn-large waves-effect   pink darken-4 masmenos" + "\"><i class=" + "\"material-icons\"" + ">delete</i>",
                        // fsi

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

function guardarajuste(id, fechamovimiento, cantidad, tipomovimientonombrecorto, prefijocompra,prefijoventa) {

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
    itemmovimiento.prefijocompra = prefijocompra;
    itemmovimiento.prefijoventa = prefijoventa;

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
        "pageLength": -1,
        "language": {

            "processing": "Procesando...",
            "search": "Sub búsquedas:",
            "lengthMenu": "Registros x página",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros para ver",
            "zeroRecords": "No hay registros para ver",
            "infoEmpty": "No hay registros  para ver",
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
        }
        // ,
        // "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'
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


function consultaranunciosstock(tipo) 
{
    var seleccionidrubro = document.getElementById("opcioneslista").value;
    var filtro = [];
    if(tipo == "consultafiltros" ||tipo == "consultalector" ){

        // si el tipo no es rubro va a buscar por filtro
        var textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;
        textobuscado = textobuscado.trim();
       
        filtro.push( textobuscado );
    }
    
    var bdd = conexionbdd;
    var rutadeimagenes = rutaimagenes;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tabladecompras = tablacompras;
    var tabladeventas = tablaventas;
    var tabladeajustes = tablaajustes;
    var tabladeproveedores = tablaproveedores;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;

    var tipo = tipo;

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
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;
    itemanuncio.codigobarra = textobuscado;

    var objetoanuncio = JSON.stringify(itemanuncio);
    // veronostinicio();
    tas.clear().draw(true);

    $.ajax({

        url: "consultastock.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",
        
        success: function (data) {

            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                $.each(dd, function (key, value) {

                    // if (dd[key].fechastockinicio == "0000-00-00")
                    //     fsi = "";
                    // else
                    //     fsi = vista_ymdAdmy(dd[key].fechastockinicio)

                    var preciocompra=0;
                    var precioventa=0;

                    if(dd[key].prefijocompra > 0)
                    {
                        if (dd[key].costoxprefijo > 0)
                            preciocompra = "$ " + dd[key].costoxprefijo;
                        else
                            preciocompra = "Consultar Precio";

                        if (dd[key].ventaxprefijo > 0)
                            precioventa = "$ " + dd[key].ventaxprefijo;
                        else
                            precioventa = "Consultar Precio";
                    }else
                    {
                        if (dd[key].costo > 0)
                            preciocompra = "$ " + dd[key].costo;
                        else
                            preciocompra = "Consultar Precio";

                        if (dd[key].precio > 0)
                            precioventa = "$ " + dd[key].precio;
                        else
                            precioventa = "Consultar Precio";
                    }

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
                        
                    stok = dd[key].stock / dd[key].relacioncompraventa;


                    tas.row.add([
                        dd[key].id,
                        dd[key].codigobarra,
                        "<label class='blockcosto'>" + preciocompra + "</label>",
                        precioventa,
                        "<label class='blockstock'>" + stok + "</label>",
                        dd[key].nombreprefijocompra,
                        dd[key].titulo,
                        dd[key].descripcion,
                        dd[key].rubro,
                        dd[key].nombreproveedor,
                        precio,
                        dd[key].nombreprefijoventa,
                        "<label class='blockcosto'>" + costoant + "</label>",
                        precioant
                        // fsi


                    ]).draw(false);
                    
                });

                verificabloqueo();
                tas.columns.adjust().draw();
                verListaReg(1);
            } else {
                verListaReg(0);

                M.toast(
                    {
                        html: 'No hay datos para mostrar!',
                        displayLength: '1500'
                    });
            }
        },
        error: function () {
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
//------------------------------------------- Cambios masivos ----------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function configuraciontablamasivos() {
    $('#tablaanunciosmasivos').DataTable({
        "pageLength": -1,
        "language": {

            "processing": "Procesando...",
            "search": "Sub búsquedas:",
            "lengthMenu": "Registros x página",
            "info": "Registro: _START_ de _END_ - Total: _TOTAL_",
            "emptyTable": "No hay registros para ver",
            "zeroRecords": "No hay registros para ver",
            "infoEmpty": "No hay registros  para ver",
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
        }
        // ,
        // "dom": '<"top"fl><"top"p>rt<"bottom"p><"clear">'
    });
}

function consultaranunciosmasivos(tipo) 
{
    var seleccionidrubro = document.getElementById("opcioneslista").value;
    var filtro = [];
    if(tipo == "consultafiltros" ||tipo == "consultalector" ){
        // si el tipo no es rubro va a buscar por filtro
        var textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;
        textobuscado = textobuscado.trim();
       
        filtro.push( textobuscado );
    }
    
    var bdd = conexionbdd;
    var rutadeimagenes = rutaimagenes;
    var tabla = tablaanuncios;
    var tabladerubros = tablarubros;
    var tabladecompras = tablacompras;
    var tabladeventas = tablaventas;
    var tabladeajustes = tablaajustes;
    var tabladeproveedores = tablaproveedores;
    var tabladeproveedoresanuncios = tablaproveedoresanuncios;

    var tipo = tipo;

    var t = null;

    if ($.fn.dataTable.isDataTable('#tablaanunciosmasivos'))
        tas = $('#tablaanunciosmasivos').DataTable();
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
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;

    itemanuncio.tipo = tipo;
    itemanuncio.id = id;

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;
    itemanuncio.codigobarra = textobuscado;

    var objetoanuncio = JSON.stringify(itemanuncio);
    // veronostinicio();
    tas.clear().draw(true);

    $.ajax({

        url: "consultastock.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",
        
        success: function (data) {
            

            if (data != "consultavacia") {

                dd = JSON.parse(data); //data decodificado

                arreglochecktilde = [];
                

                $.each(dd, function (key, value) {

                    if (dd[key].esnovedad == 1)
                        esnov = "Si";
                    else
                        esnov = "";

                    if (dd[key].esoferta == 1)
                        esofe = "Si";
                    else
                        esofe = "";

                    if (dd[key].nopublicar == 1)
                        nopub = "No";
                    else
                        nopub = "Si";

                    if (dd[key].productobonus == 1)
                        probo = "Bonus";
                    else
                        probo = "";

                    if (dd[key].tieneventaja == 1)
                        opant = "Ventaja";
                    else
                        opant = "";

                    var preciocompra=0;
                    var precioventa=0;

                    if(dd[key].prefijocompra > 0)
                    {
                        if (dd[key].costoxprefijo > 0)
                            preciocompra = "$ " + dd[key].costoxprefijo;
                        else
                            preciocompra = "Consultar Precio";

                        if (dd[key].ventaxprefijo > 0)
                            precioventa = "$ " + dd[key].ventaxprefijo;
                        else
                            precioventa = "Consultar Precio";
                    }else
                    {
                        if (dd[key].costo > 0)
                            preciocompra = "$ " + dd[key].costo;
                        else
                            preciocompra = "Consultar Precio";

                        if (dd[key].precio > 0)
                            precioventa = "$ " + dd[key].precio;
                        else
                            precioventa = "Consultar Precio";
                    }

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
                        
                    stok = dd[key].stock / dd[key].relacioncompraventa;
                    
                    //cracion del arreglo de checks
                    var objetoarreglo = new Object();
                    objetoarreglo.idanuncio = dd[key].id;
                    objetoarreglo.prefijocompra = dd[key].prefijocompra;
                    objetoarreglo.costoxprefijo = dd[key].costoxprefijo;
                    objetoarreglo.ventaxprefijo = dd[key].ventaxprefijo;
                    objetoarreglo.costo = dd[key].costo;
                    objetoarreglo.precio = dd[key].precio;
                    objetoarreglo.relacioncompraventa = dd[key].relacioncompraventa;
                    objetoarreglo.idproveedor = dd[key].idproveedor;
                    objetoarreglo.tildado = false;


                    arreglochecktilde.push(objetoarreglo);

                    tas.row.add([
                        "<label><input onclick = 'checktilde(\"" + dd[key].id + "\")' id='chk" + dd[key].id  + "' type='checkbox' class='filled-in columnadedos'/><span id='spn" + dd[key].id + "' class='colorletras'>No</span></label>",
                        dd[key].id,
                        dd[key].codigobarra,
                        dd[key].comodin,
                        "<label class='blockcosto'>" + preciocompra + "</label>",
                        precioventa,
                        "<label class='blockstock'>" + stok + "</label>",
                        dd[key].nombreprefijocompra,
                        dd[key].titulo,
                        dd[key].rubro,
                        dd[key].nombreproveedor,
                        esnov,
                        esofe,
                        nopub,
                        // probo,
                        // opant,

                    ]).draw(false);
                    
                });
                verificabloqueo();
                tas.columns.adjust().draw();
                verListaReg(1);
               
                escrolear("table");
            } else {
                verListaReg(0);

                M.toast(
                    {
                        html: 'No hay datos para mostrar!',
                        displayLength: '1500'
                    });
            }
        },
        error: function () {
            M.toast(
                {
                    html: 'No hay buena conexión!',
                    displayLength: '4000'
                });
            console.log("Error de comunicación");
        }
    });    
}

function checktilde(id)
{

    tilde = document.getElementById("chk"+id);
    spn = document.getElementById("spn"+id);
    quehace = false;

    if (tilde.checked == false) 
    {
        spn.innerHTML = "NO";
        quehace = false;
    }else
    {
        spn.innerHTML = "SI";
        quehace = true;
    }

    arreglochecktilde.forEach(element => {
        if(element.idanuncio == id)
        {
            element.tildado = quehace;
            return;
        }
    });

}

function checktodostilde()
{
    todost = document.getElementById("todostilde");
    if(todost.checked == true)
    {
        arreglochecktilde.forEach(element => {
            document.getElementById("chk"+element.idanuncio).checked = true;
            document.getElementById("spn"+element.idanuncio).innerHTML = "SI";
            element.tildado = true;
        });     
    }else{
        arreglochecktilde.forEach(element => {
            document.getElementById("chk"+element.idanuncio).checked = false;
            document.getElementById("spn"+element.idanuncio).innerHTML = "NO";
            element.tildado = false;
         });  
    }
}

function publicanovedadmasivamente(accion){
    verificarsiquiere("publicanovedad",accion); 
}
function publicapromomasivamente(accion){
    verificarsiquiere("publicapromo",accion); 
}
function publicamasivamente(accion){
    verificarsiquiere("publica",accion); 
}
function asignarcategoriamasivamente()
{
    var categoria = document.getElementById("opciones");
    if(categoria.value !="")
    {
        verificarsiquiere("categoria","sinaccion");
    }
}

function asignarproveedormasivamente(accion)
{
    
    var proveedor = document.getElementById("opcioneslistaproveedores");
    if (proveedor.value !="")
    {
        verificarsiquiere("proveedor", accion);
    }
}

function verificarsiquiere(llamado, accion){
 const swalWithBootstrapButtons = Swal.mixin({
        customClass: {confirmButton: 'btn btn-success',cancelButton: 'btn btn-danger' },buttonsStyling: false})

        swalWithBootstrapButtons.fire({title: 'Desea procesar ?',text: "Esta acción no se podrá revertir!",
        icon: 'warning',showCancelButton: true,confirmButtonText: 'Si!',cancelButtonText: 'No!',reverseButtons: true
    }).then((result) => {
        if (result.value) {
            if(llamado == "categoria")
                asignarcategoriasmasivamente();
            else if (llamado == "proveedor")
                asignarproveedoresmasivamente(accion);
            else if (llamado == "publica" || llamado == "publicapromo" || llamado == "publicanovedad")
                publicacion(accion,llamado);

        } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })
}


function publicacion(accion,tipo){
    paquete = [];
    for (var a = 0; a < arreglochecktilde.length; a++) 
    {
        if (arreglochecktilde[a].tildado == true) 
        {
            var datos = new Object();
            datos.id = arreglochecktilde[a].idanuncio;
            var datosjson = JSON.stringify(datos);
            paquete.push(datosjson);
        }
    }

    if(paquete.length > 0)
    {
        var bdd = conexionbdd;
        var tabla = tablaanuncios;

        $.ajax({

            url: "consultamasivos.php",
            data: { bdd: bdd, tabla: tabla, tipo:tipo,accion:accion,paquete: paquete },
            type: "post",

            success: function (data) {
                limpiaanunciosmasivos();
                
                Swal.fire(
                    'Actualizados',
                    data + ' productos',
                )
            }
            ,
            error: function (e) {
                console.log("Error en la consulta." + e.value);
            }
        });
    }
}

function asignarcategoriasmasivamente()
{

    paquete = [];
    var categoria = document.getElementById("opciones");

    for (var a = 0; a < arreglochecktilde.length; a++) 
    {
        if (arreglochecktilde[a].tildado == true) 
        {

            var datos = new Object();
            datos.id = arreglochecktilde[a].idanuncio;
            datos.idrubro = categoria.value;

            var datosjson = JSON.stringify(datos);
            paquete.push(datosjson);
        }
    }

    if(paquete.length > 0)
    {

        var bdd = conexionbdd;
        var tabla = tablaanuncios;
        var tipo = "categoria";

        $.ajax({

            url: "consultamasivos.php",
            data: { bdd: bdd, tabla: tabla, tipo:tipo,paquete: paquete },
            type: "post",

            success: function (data) {
                limpiaanunciosmasivos();
                
                Swal.fire(
                    'Actualizados',
                    data + ' productos',
                )
            }
            ,
            error: function (e) {
                console.log("Error en la consulta." + e.value);
            }
        });
    }
}

function limpiaanunciosmasivos(){
    if ($.fn.dataTable.isDataTable('#tablaanunciosmasivos'))
    {
        tas = $('#tablaanunciosmasivos').DataTable();
        tas.clear().draw(true);
    }

    document.getElementById("todostilde").checked = false;

}


function asignarproveedoresmasivamente(accion)
{

    paquete = [];
    var proveedor = document.getElementById("opcioneslistaproveedores");

    for (var a = 0; a < arreglochecktilde.length; a++) 
    {
        if (arreglochecktilde[a].tildado == true) 
        {

            var datos = new Object();
            datos.id = arreglochecktilde[a].idanuncio;
            datos.idproveedor = proveedor.value;

            var datosjson = JSON.stringify(datos);
            paquete.push(datosjson);
        }
    }


    if(paquete.length > 0)
    {
        var bdd = conexionbdd;
        var tabla = tablaanuncios;        
        var tipo = "proveedor";

        $.ajax({

            url: "consultamasivos.php",
            data: { bdd: bdd, tabla: tabla, tipo: tipo,tablaproveedoresanuncios:tablaproveedoresanuncios, accion:accion, paquete: paquete },
            type: "post",

            success: function (data) {
                limpiaanunciosmasivos();
                Swal.fire(
                    'Actualizados',
                    data + ' productos',
                )
            }
            ,
            error: function (e) {
                console.log("Error en la consulta." + e.value);
            }
        });
    }
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

        // $('#tablaanunciosvender tbody tr').each(function () {
        //     var preciolista = $(this).find('td:eq(8)').text();
        //     $(this).find('td:eq(3) input').val(preciolista);
        // });
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

function eligetipomovimiento() 
{

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
    $("#opcioneslista").empty();

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

                var a = [];
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcioneslista").append(a);

                //selecciona el primer item
                $("#opcioneslista option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });


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
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + ' > ' + dd[key].nombrerubro + '</option>');
                });

                $("#opciones").append(a);

                //selecciona el primer item
                $("#opciones option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });
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
                a.push('<option value = "" selected >Categoría</option >');

                $.each(dd, function (key, value) {
                    a = a.concat('<option value = ' + dd[key].idrubro + '> ' + dd[key].nombrerubro + '</option>');
                });

                $("#opcionesconprecio").append(a);

                $("#opcionesconprecio").trigger('contentChanged');
                //selecciona el primer item
                $("#opcionesconprecio option:selected").prop("selected", false);

                $(this).prop("selected", true);
            } else {
                M.toast({ html: 'No hay novedades para esta categoría.' });
            }
        },
        error: function (e) {
            alert("Error en la consulta." + e.value);
        }
    });

}

//------------------------------------------- convertidor de fecha -----------------------------

function conviertefecha(fecharecibidatexto)
{
		
		fec = fecharecibidatexto;
        
		anio = fec.substring(0, 4);
		mes = fec.substring(5,7);
		dia = fec.substring(8,10);
		
		ensamble = mes + "-" + dia + "-" + anio;
		fecha = new Date(ensamble).toLocaleDateString('es-AR');
		return fecha;
}

function conviertefechaparabdd(fecharecibidatexto)
{
		fec = fecharecibidatexto;
        
		dia = fec.substring(0, 2);
		mes = fec.substring(3,5);
		mes-=1;//resto porque luego Date funciona como mes 0 a enero
		anio = fec.substring(6,10);
		
		fecha = new Date(anio,mes,dia);
		return fecha;
}

function conviertefechaastringdmy(fecharecibidatexto) {
	fec = fecharecibidatexto;

	dia = fec.substring(0, 2);
	mes = fec.substring(3, 5);
	anio = fec.substring(6, 10);

	ensamble = dia + mes + anio;
	return ensamble;
}

function vista_ymdAdmy(fecharecibidatexto) {
	fec = fecharecibidatexto;

	ensamble = fec.replace("-", "");

	anio = fec.substring(0, 4);
	mes = fec.substring(5, 7);
	dia  = fec.substring(8, 10);

	ensamble = dia + "-" + mes + "-" + anio;

	return ensamble;
}

function conviertefechadmy(fecharecibidatextodmy) {
	fec = fecharecibidatextodmy;

	dia = fec.substring(0, 2);
	mes = fec.substring(3, 5);
	anio = fec.substring(6, 10);

	ensamble = mes + "-" + dia + "-" + anio;
	fecha = new Date(ensamble).toLocaleDateString('es-AR');
	return fecha;
}

// ------------------------------------------ Exportacion a excel -----------------------------

function exportTableToExcel(tableID, filename)
{
    if(filename != '')
    {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }

        Swal.fire(
                'Excelente',
                'Ya tienes la descarga!!!',
        )
    }else{
            
        Swal.fire(
            'Atención!',
            'Seleccione primero una consulta.',
            )
    }
}

// -----------------Consulta de anuncio-------------------

function inicializaselect(){
    $('select').formSelect();
}

function declaracollapsible(){

    $('.collapsible').collapsible();
}

function verificamayoriaedad()
{
        var isVisible = $("#vervineria").is(":visible");
        if (!isVisible) {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
            })

            swalWithBootstrapButtons.fire({
                text: 'Por favor declare su edad!!!',
                icon: 'warning'
            })
            return false;
        } 
}



function consultabusqueda(tipo, opcion, tarjetaconprecio ) {

    var tipoconsulta = tipo;
    var tamaniotarjeta = "large";
    var bdd = conexionbddpaginaweb;
    var rutadeimagenes = rutaimagenespaginaweb;
    var tabla = tablaanunciospaginaweb;
    var tabladerubros = tablarubrospaginaweb;
    var tablaunidadesgranel = tablaunidadesgranelweb;

    var seleccion="";
    var seleccionidrubro="";
    var filtro ="";
    var textobuscado="";

    //Verifico quien llama a la busqueda
    if(tipo == "consultarubros")
    {
        verificamayoriaedad();
        
        seleccion = document.getElementById(opcion);
        seleccionidrubro = document.getElementById(opcion).value;

        if (seleccionidrubro == "") 
        {
            return false;
        }
       
    }else if (tipo == "consultatodosanunciosoferta")
    {
       

    }else if (tipo == "consultafiltros")
    {

        verificamayoriaedad();

        textobuscado = $("#cajabusqueda").val();
        textobuscado = document.getElementById("cajabusqueda").value;

        if (textobuscado == "") {
            return false;
        }

        filtro = [];
        filtro.push( textobuscado );
        

    }else
    {
        return false;
    }
    

    // var t = null;
    var id = "";

    if (id == "") id = 0;
    else id = id;

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

    itemanuncio.rutaimagenes = rutadeimagenes;
    itemanuncio.idrubro = seleccionidrubro;
    itemanuncio.imagen = "";
    itemanuncio.filtro = filtro;
    itemanuncio.tablaunidadesgranel = tablaunidadesgranel;

    var objetoanuncio = JSON.stringify(itemanuncio);

    var nombrehijo="";
    if(tipo == "consultarubros")
    {
        nombrehijo = "hijos";
        arregloconsultabuscados = [];
        
    } else if (tipo == "consultatodosanunciosoferta")
    {
        nombrehijo = "hijosofer";
        arregloconsultaofertas = [];

    }else  if (tipo == "consultafiltros")
    {
        nombrehijo = "hijos";
        arregloconsultabuscados = [];
    }

    M.toast(
    {
        html: '...Buscando',
        displayLength: '3000'
    });

    
    
    $.ajax({
        url: "consultaanuncios.php",

        data: { objetoanuncio: objetoanuncio },
        type: "post",

        success: function (data) 
        {
           

            if (data != '[]' && data != 'consultavacia') {

                dd = JSON.parse(data); //data decodificado
                
                var cuenta = 0;
                var parteobservacion = "";
                var partecomentario = "";
                var valorbonus = "";
                var textolinkexterno = "";
                var linkexterno= "";
                var descripcionacotada="";

                $.each(dd, function (key, value) {

                    if (dd[key].nopublicar == 0) 
                    {
                        cuenta = cuenta + 1;

                        parteobservacion = "";
                        partecomentario = "";
                        listaobservacioncomentario = "";
                        partemastexto = "";
                        descripcionacotada = "";

                        if (dd[key].productobonus == 1) {
                            valorbonus = "Cange por " + dd[key].bonus + " bonus";
                        } else {
                            valorbonus = "";
                        }


                        if (dd[key].tieneventaja) {

                            tituloventaja = dd[key].tituloventaja;
                            precioventaja = "$ " + dd[key].precioventaja;

                            if (tituloventaja.trim() == "" || precioventaja == 0) {
                                tituloventaja = "";
                                precioventaja = "";
                            }
                        } else {
                            tituloventaja = "";
                            precioventaja = "";
                        }

                        textolinkexterno = dd[key].textolinkexterno;
                        linkexterno = dd[key].linkexterno;

                        // Observaciones y comentarios
                        if (dd[key].observaciones != "") {
                            parteobservacion = "<li class=''> <div class='collapsible-header'><i class='material-icons icosabermas'>chrome_reader_mode</i>Saber mas...</div><div class='collapsible-body'><span>" + dd[key].observaciones + "</span></div></li>";
                        } else {
                            parteobservacion = "";

                        }

                        if (dd[key].comentarios != "") {
                            partecomentario = "<li class=''> <div class='collapsible-header'><i class='material-icons icosugerencias'>comment</i>Sugerencias</div><div class='collapsible-body'><span>" + dd[key].comentarios + "</span></div></li>"
                        } else {
                            partecomentario = ""

                        }

                        descripcionacotada = dd[key].descripcion;
                        partemastexto = "";
                        
                        if(descripcionacotada)
                        {
                            if(descripcionacotada.length > 85)
                            {
                                partemastexto = "<p>" + descripcionacotada + "</p>";
                                descripcionacotada = descripcionacotada.slice(0,85) + " . . .";
                            }
                        }
                       

                        var agregado = "";
                        var iconomasinfo = "";
                        var verpreciotarjeta="";

                        if ( "" != partemastexto || parteobservacion != "" || partecomentario != "") {

                            listaobservacioncomentario = partemastexto + "<ul class='collapsible'>" + parteobservacion + partecomentario + "</ul> ";
                            agregado = "<div class='card-reveal'> <span class='card-title grey-text text-darken-4'>Información<i class='material-icons right'>close</i></span>" + listaobservacioncomentario + "</div>"
                            iconomasinfo = "<i class='material-icons right'>pageview</i>";
                        }
                        // -----------------------------

                        
                            if (tarjetaconprecio  == "si") {

                                var precio;
                                if (dd[key].precio > 0) {
                                    precio = "$ " + dd[key].precio;
                                    verpreciotarjeta = "preciotarjeta";
                                } else {
                                    precio = "Consultar Precio";
                                    tituloventaja = "";
                                    precioventaja = "";
                                    verpreciotarjeta = "preciotarjetaconsultar";

                                }

                                var objeto = new Object();
                                objeto.insercion = "<div class='col s12 m6 l4 " + nombrehijo + "'><div class='card " + tamaniotarjeta + "'><div id='tarjetaimagen' class='card-image waves-block waves-light'><img src='" + rutadeimagenes + dd[key].imagen + "' class=' materialboxed center-align tamaimagen'  alt='...'></img></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'><h5 id='titulotarjeta' class='center'>" + dd[key].titulo + "</h5>" + iconomasinfo + "</span><p id='descripciontarjeta' class='card-text center m-1'>" + descripcionacotada + "</p><hr><div class='row '><div class='col s6 '><p id='preciotarjeta' class='filapreciotarjeta " + verpreciotarjeta + "'>" + precio + "</p></div><div class='col s6'><p><a class='enlaceespecial' target='_blank' href='" + linkexterno + "'>" + textolinkexterno + "</a></p></div></div><div class='row '><div class='col s6 '><p id='titventaja' class='tituloventaja '>" + tituloventaja + "</p><p id='preventaja' class='precioventaja'><del>" + precioventaja + "</del></p></div><div class='col s6'><p class='valorbonus'>" + valorbonus + "</p></div></div></div>" + agregado + "</div></div>";
                                
                                if (tipo == "consultarubros" || tipo == "consultafiltros"){
                                    paginaactualbuscados = 1;
                                    arregloconsultabuscados.push(objeto);
                                } else if (tipo == "consultatodosanunciosoferta") {
                                    paginaactualofertas = 1;
                                    arregloconsultaofertas.push(objeto);
                                } 
                            }
                    }
                });

                if(cuenta>0) //osea si hay registros para mostrar
                {
                    //coloco la cantidad de 
                    var resto = cuenta % cantidadporpagina; 
                    
                    var cantidadpaginas=0;
                    if( resto > 0)
                        cantidadpaginas = Math.floor(cuenta / cantidadporpagina) + 1;
                    else
                        cantidadpaginas = cuenta / cantidadporpagina;
                        
                    
                    crearpaginador(cantidadpaginas,tipoconsulta);
                    muestraanuncionarreglo(1, tipoconsulta);   //inserto los anuncios del resultado

                    
                }else
                {
                    crearpaginador(cantidadpaginas,tipoconsulta)
                    muestraanuncionarreglo(1, tipoconsulta);   //inserto los anuncios del resultado

                }
            }
            else {
                if (seleccionidrubro != "") {
                    Swal.fire({
                        closeOnEsc: false,
                        title: 'No hay novedades para esta categoría!',

                    })
                }
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

// ------------------- Crea los botones de navegacion en el resultado de la consulta -----------

function crearpaginador(cantidadpaginas, tipoconsulta){


        var lis = null;
        var t = null;

        //segun quien es el objeto que busca, elimina los botones del paginador, de la busqueda anterior
        if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros") {

            $("#listaencontradosbuscador").empty();  
            
            if (cantidadpaginas > 1) {
                paginastotalesbuscados = cantidadpaginas;
                insertabotonespaginas("listaencontradosbuscador", paginastotalesbuscados, tipoconsulta);
            }

        } else if (tipoconsulta == "consultatodosanunciosoferta") {

            $("#listaencontradospromociones").empty();  

            if (cantidadpaginas > 1) {
                paginastotalesofertas = cantidadpaginas;
                insertabotonespaginas("listaencontradospromociones", paginastotalesofertas,tipoconsulta);
            }
        } 
    
}

function insertabotonespaginas(nombrelista, cantidadpaginastotales, tipoconsulta)
{
    var referencia ="";
    var referenciabotones = "";

    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros") {
        referencia = "#seccionbuscadosbuscador";
        referenciabotones = referencia;

    }
    else if (tipoconsulta == "consultatodosanunciosoferta") {
        referencia = "#seccionpromociones";
        referenciabotones = referencia;

    }

    var liizquierda=null;

    //inserta el boton <<
    liizquierda=document.createElement('li');
    liizquierda.id = "atras" + tipoconsulta + nombrelista;

    liizquierda.innerHTML = "<li onclick='iratras(\"" + tipoconsulta + "\",\"" + nombrelista + "\",\"" + referenciabotones + "\")' class=' waves-effect' href='#!'><a href='#!'><i class='material-icons'>chevron_left</i></a></li>";
    document.getElementById(nombrelista).appendChild(liizquierda);

    // Creo un elemento en la lista para cada pagina

    for (var a = 1; a <= cantidadpaginastotales; a++) 
    {
        var li=document.createElement('li');
        li.id = "pagina" + a + nombrelista; 

        if(1==a){
            li.innerHTML = "<li onclick='irapagina(" + a + ",\"" + tipoconsulta + "\",\"" + nombrelista + "\",\"" + referencia + "\")' class=' " + nombrelista + " waves-effect'><a href='" + referencia + "'>" + a  + "</a></li>";
            li.classList.add("active"); 
            if (cantidadpaginastotales > 1)
                liizquierda.classList.add("disabled");
        }
        else
            li.innerHTML = "<li onclick='irapagina(" + a + ",\"" +  tipoconsulta + "\",\"" + nombrelista + "\",\"" + referencia + "\")' class=' " + nombrelista + " waves-effect '><a href='" + referencia + "'>" + a + "</a></li>";

        document.getElementById(nombrelista).appendChild(li);
    }

   
    var liderecha=document.createElement('li');
    liderecha.id = "adelante" + tipoconsulta + nombrelista;
    liderecha.innerHTML = "<li  onclick='iradelante(\"" + tipoconsulta + "\",\"" + nombrelista + "\",\"" + referenciabotones + "\")' class=' waves-effect'  href='#!'><a href='#!'><i class='material-icons'>chevron_right</i></a></li>";
    document.getElementById(nombrelista).appendChild(liderecha);
    
}
// ----------------------------------------------------------------------------------------------------------

function verificaestadoaa(tipoconsulta,nombrelista){


    var ade="";
    var atr ="";
    ade = document.getElementById('adelante' + tipoconsulta + nombrelista);
    atr = document.getElementById('atras'+ tipoconsulta + nombrelista);
    
    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros" )
    {
        //verifico como deben quedar los botones de adelante y atras
        if(paginaactualbuscados == paginastotalesbuscados) //es la ultima pagina
        {
            ade.classList.remove("enabled"); 
            ade.classList.add("disabled");

            atr.classList.remove("disabled"); 
            atr.classList.add("enabled");


        }else if(paginaactualbuscados == 1) //es la primer pagina
        {
            
            ade.classList.remove("disabled");
            ade.classList.add("enabled");

            atr.classList.remove("enabled");
            atr.classList.add("disabled");
            
        }else //esta en una pagina intermedia
        {
            ade.classList.remove("disabled");
            ade.classList.add("enabled");

            atr.classList.remove("disabled"); 
            atr.classList.add("enabled");
        }

    }else if (tipoconsulta == "consultatodosanunciosoferta")
    {
         //verifico como deben quedar los botones de adelante y atras
        if(paginaactualofertas == paginastotalesofertas) //es la ultima pagina
        {
            ade.classList.remove("enabled"); 
            ade.classList.add("disabled");

            atr.classList.remove("disabled"); 
            atr.classList.add("enabled");


        }else if(paginaactualofertas == 1) //es la primer pagina
        {
            ade.classList.remove("disabled"); 
            ade.classList.add("enabled");

            atr.classList.remove("enabled"); 
            atr.classList.add("disabled");
            
        }else //esta en una pagina intermedia
        {
            ade.classList.remove("disabled");
            ade.classList.add("enabled");

            atr.classList.remove("disabled"); 
            atr.classList.add("enabled");
        }

       
    }
}

function irareferencia(referencia)
{   
    var codigo = referencia;

    // var alturacat = $('#contenedorcategoria').offset().top;
    var alturapub = $('#seccionpublicidad').offset().top;

    var mover = $(codigo).offset().top;

    $("html,body").animate(
        { scrollTop: mover - alturapub}, 1000);

        return false;

}


function irapagina(pagina, tipoconsulta,nombrelista,referencia)
{
    
  
    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros" )
    {
        var pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
        pag.classList.remove("active"); 

        paginaactualbuscados = pagina;

        pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
        pag.classList.add("active"); 

        muestraanuncionarreglo(paginaactualbuscados, tipoconsulta);

    } else if (tipoconsulta == "consultatodosanunciosoferta")
    {
        var pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
        pag.classList.remove("active"); 

        paginaactualofertas = pagina;

        pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
        pag.classList.add("active"); 


        muestraanuncionarreglo(paginaactualofertas, tipoconsulta);
    }

    verificaestadoaa(tipoconsulta,nombrelista);
    irareferencia(referencia);

}



function iradelante(tipoconsulta, nombrelista, referencia){


    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros")
    {
        if( paginaactualbuscados < paginastotalesbuscados)
        {
            var pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
            pag.classList.remove("active"); 

            paginaactualbuscados = paginaactualbuscados + 1;
            muestraanuncionarreglo(paginaactualbuscados,tipoconsulta);

            pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
            pag.classList.add("active"); 

        }
    } else if (tipoconsulta == "consultatodosanunciosoferta")
    {
        if(paginaactualofertas < paginastotalesofertas)
        {
            var pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
            pag.classList.remove("active"); 

            paginaactualofertas = paginaactualofertas + 1;
            muestraanuncionarreglo(paginaactualofertas, tipoconsulta);

            pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
            pag.classList.add("active"); 

        }
    }

    verificaestadoaa(tipoconsulta,nombrelista);
    irareferencia(referencia);

}

function iratras(tipoconsulta, nombrelista,referencia)
{

    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros")
    {
        if( paginaactualbuscados > 1)
        {
            var pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
            pag.classList.remove("active"); 
            
            paginaactualbuscados = paginaactualbuscados - 1;
            muestraanuncionarreglo(paginaactualbuscados,tipoconsulta);

            pag = document.getElementById("pagina" + paginaactualbuscados + nombrelista);
            pag.classList.add("active");

        }
    } else if (tipoconsulta == "consultatodosanunciosoferta")
    {
        if(paginaactualofertas > 1)
        {
            var pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
            pag.classList.remove("active"); 

            paginaactualofertas = paginaactualofertas - 1;
            muestraanuncionarreglo(paginaactualofertas, tipoconsulta);
            
            pag = document.getElementById("pagina" + paginaactualofertas + nombrelista);
            pag.classList.add("active"); 
        }
    }

    verificaestadoaa(tipoconsulta,nombrelista);
    irareferencia(referencia);


}

function muestraanuncionarreglo(numerodepagina, tipoconsulta)
{
    var arregloconsulta = [];
    var t = null;

    //segun quien es el objeto que busca, elimina los anuncios anteriores de la vista
    if (tipoconsulta == "consultarubros" || tipoconsulta == "consultafiltros") 
    {
        sn = $('#seccionbuscadosbuscador div');
        sn.each(function () {
            $(this).remove();
        });

        t = $('#seccionbuscadosbuscador');

        $(".hijos").remove();

        arregloconsulta = arregloconsultabuscados;

    } else if (tipoconsulta == "consultatodosanunciosoferta") 
    {
        t = $('#ofertasanuncios');
        $(".hijosofer").remove();
        arregloconsulta = arregloconsultaofertas;

    } 

    //+1 porque el primer elemento a mostrar debe ser uno mas al registro del bloque anterior
    var limite_inferior_amostrar = (cantidadporpagina * (numerodepagina - 1)) + 1; 
    var limite_superior_amostrar = cantidadporpagina * numerodepagina;

    for(var a = 0;a < arregloconsulta.length;a++)
    {
        if(a+1 >= limite_inferior_amostrar && a+1 <= limite_superior_amostrar)
            t.append(arregloconsulta[a].insercion);
    }

    imageneszoom();
    declaracollapsible();
    inicializaselect();

}

function focoencajabusqueda(teclafoco) 
{
        
    if (llama == "vender" || llama == "comprar" || llama == "anuncios" || llama == "stock") {
        if ($('#usalector').prop('checked') || teclafoco == 115) 
        {
            document.getElementById('cajabusqueda').value = "";
            $('#cajabusqueda').focus();
        }else if(teclafoco == "manual")
        {
            document.getElementById('cajabusqueda').value = "";
        }
    }
    
}

function ActivarCheckLector()
{
    if (llama == "vender" || llama == "comprar" || llama == "anuncios" || llama == "stock") 
    {
        if($('#usalector').prop('checked'))
            $('#usalector').prop('checked',false);
        else
            $('#usalector').prop('checked',true);
    }
}

//Funcion para capturar teclas
$(function(){ 
     
     $("body").keydown(function(e)
     { 
         var teclapresionada = e.keyCode || e.which; 
         
        if(teclapresionada == 115) //F4 para hacer foco en la caja de busqueda
        {
            e.preventDefault(); 
            focoencajabusqueda(teclapresionada);
            posicioninicial();
        }
        
        if(teclapresionada == 113) //F2 para activar el check del lector
        {
            e.preventDefault(); 
            ActivarCheckLector();
            focoencajabusqueda(teclapresionada);
            posicioninicial();
        } 
    }); 
});

//Funcion para la cantidad ver registros en las tablas Datatable
function verRegistros(tabla,cantidad)
{
    var table = $('#' + tabla).DataTable();
    if(cantidad == -1)
        table.page.len( -1 ).draw();
    else    
        table.page.len( cantidad ).draw();
}

function verListaReg(ver)
{
    if(ver==0)
        $("#listareg").css('display', 'none');
    else
        $("#listareg").css('display', 'block');
}

function buscarYcambiar(valor,buscado,reemplazo)
{
    var posicion = valor.toString().indexOf(buscado);
    if(posicion >=0)
        valor = valor.toString().slice(0, posicion) + reemplazo + valor.toString().slice(posicion + 1); 

    return valor;
}

//---------------------------------- Bloqueos ------------------------------------

function consultarbloqueos()
{
    var item = new Object();

    item.bdd = conexionbdd;
    item.tabla = tablabloqueos;
    item.tipo = "consultar";
    item.id = idencontrado;

    var objeto = JSON.stringify(item);
    
    arreglobloqueos = [];
    $.ajax({

        url:"consultabloqueos.php",
        data:{objeto:objeto},
        type:"post",
        success:function(data){

            if (data != '[]' && data != 'consultavacia') 
            {
                dd = JSON.parse(data); //data decodificado

                $.each(dd, function (key, value) 
                {
                    arreglobloqueos.push(dd[key].bloqueo);
                });
            }
        },
        error:function(e)
        {
            M.toast({
                html: "Error al consultar los permisos",
                displayLength: 3000
            });
        }
    });
}

function verificabloqueo()
{
    
    if(llama == "vender")
    {
        if(arreglobloqueos.length > 0)
        {
            arreglobloqueos.forEach(element => {                
                if(element == 1)
                    bloquearcosto();
                if(element == 4)
                    bloqueareliminar();
                if(element == 5)
                    bloquearmodificaprecio();
            });
        }
    }

    if(llama == "comprar")
    {
        if(arreglobloqueos.length > 0)
        {
            arreglobloqueos.forEach(element => {                
                if(element == 1)
                    bloquearcosto();
                if(element == 3)
                    bloquearstock();
                if(element == 4)
                    bloqueareliminar();
                if(element == 5)
                    bloquearmodificaprecio();
            });
        }
    }

    if(llama == "caja")
    {
        if(arreglobloqueos.length > 0)
        {
            arreglobloqueos.forEach(element => {                
                if(element == 1)
                    bloquearcosto();
                if(element == 2)
                    bloquearrentabilidad();
            });
        }
    }

    if (llama == "stock") {
        if (arreglobloqueos.length > 0) {
            arreglobloqueos.forEach(element => {
                if (element == 1)
                    bloquearcosto();
                if (element == 3)
                    bloquearstock();
            });
        }
    }

    if (llama == "masivos")
    {
        if (arreglobloqueos.length > 0) {
            arreglobloqueos.forEach(element => {
                if (element == 1)
                    bloquearcosto();
                if (element == 3)
                    bloquearstock();
            });
        }
    }
}

function bloquearcosto(){
    var obj = document.getElementsByClassName("blockcosto");
    for(var a = 0;a<obj.length;a++)
    {
        obj[a].style.visibility = "hidden";
    }
}

function bloquearrentabilidad(){
    var obj = document.getElementsByClassName("blockrentabilidad");
    for(var a = 0;a<obj.length;a++)
    {
        obj[a].style.visibility = "hidden";
    }
}

function bloquearstock(){
    var obj = document.getElementsByClassName("blockstock");
    for(var a = 0;a<obj.length;a++)
    {
        obj[a].style.visibility = "hidden";
    }
}

function bloqueareliminar()
{
    var obj = document.getElementsByClassName("blockeliminar");
    for(var a = 0;a<obj.length;a++)
    {
        obj[a].style.visibility = "hidden";
    }
}

function bloquearmodificaprecio()
{
    var obj = document.getElementsByClassName("blockmodiprecio");
    for (var a = 0; a < obj.length; a++) {
        obj[a].readOnly = true;
    }
}