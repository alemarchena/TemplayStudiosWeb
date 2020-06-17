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