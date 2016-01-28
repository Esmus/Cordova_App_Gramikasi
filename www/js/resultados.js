//funciones tratamiento resultados

function enviarResultadosExamen(){
	

	

	$.ajaxSetup({
		   contentType: "application/json"
		  
		});
	var proceed=true;	

	if(navigator.connection.type!=Connection.WIFI)
		proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
	if(proceed==true)
		//alert("vamos hacer el envio");
		//alert(JSON.stringify(resultadoExamen) );
		$.post(appConstants.enviarResultados(),//guardar el usuario en la base de datos
				JSON.stringify(resultadoExamen) ,
			function(data,status) {//Función callback
			//alert("vamos a ejectura la funcion de callback");
				if(status=="success"){//Si la HTTP-RESPONSE es OK
				
					
					//alert("resultadoe enviados corerctamente");
				
				}
				else {
					alert("NO RESPONSE FROM SERVER");
					
				}
				
			}
	,"text");

	
	
	
	
	
	
	
	
	
}


