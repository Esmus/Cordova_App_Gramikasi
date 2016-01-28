/*
GRAMIKASI
 */


function loginoff(){

	$("#sesion-2").hide();
	$("#sesion-1").show();
	$("#nickname-0").val(" ");
	$("#login-0").hide();
	$("#login-5").hide();
   var selec=$("input[id|='registro']");//datos del usuario
	
	
	selec.each(function(index){
		$(this).val("");//guardamos los datos del usuario

		
	});
	

}
function login() {
	
	
	var array=[];
	var check=0;
	var selec=$("input[id|='registro']");//datos del usuario
	
	
	selec.each(function(index){
		array[index]=$(this).val();//guardamos los datos del usuario

		if(array[index].length<=0){check++;};
	});
	
	//guardamos los datos del usuario en el objeto usuario
	usuario.Nombre=array[0];
	usuario.Apellido1=array[1];
	usuario.Apellido2=array[2];
	var nick=array[3];
	usuario.Nickname=nick.toString().toLocaleLowerCase().trim();
	usuario.Edad=$("#slider-fill").val();
	usuario.Profesora=array[4];

	user=usuario;
	
	if(check==0)
	{

		$("#enviarFoto").show();
		guardarUsuario();
	
		
		
		}else{alert("FALTAN DATOS");}
	

}


function takePhoto() {

	
	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName="usuario_perfil.jpg";

	
	photo.takeAsync(
		fileFolder,
		fileName,
		function() {
	
			usuario.Foto=photo.fileFolder+photo.fileName;		
			$("#login-0").show();
		
		}
	);

}

function subirFoto() {
	
	
	
	subirFotoServidor();
}
function moverFoto(){
	

	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName=usuario.Nickname+".jpg";
	
	
	var tempFullPath=usuario.Foto;//Ubicación del fichero de la imagen tomada


	//Mover el fichero de la imagen tomada a fileFolder+fileName
	fileUtilities.moveAsync(tempFullPath,fileFolder,fileName,
			//función successCallback: si se movió el fichero
        function() {
	
					usuario.Foto=fileFolder+fileName;
				
					
			if(onSuccess!=false)
				onSuccess();
			
		}		

	);

}


//pasamos la tematica
function DescargarTest(i){

	resultadoExamen.resultados=new Array();
	//alert("indice tema"+i);
	temaUser=$("#tema-"+i).text();
	//alert(temaUser);

	 consultaExamen(temaUser,i);
	plantillaindice=i;
	 

 	
}


function consultaExamen(tematica,i){
	
	
	var proceed=true;	
	if(navigator.connection.type!=Connection.WIFI)
		proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
	if(proceed==true)
		$.get(appConstants.requestExamenURL(),{tematica:tematica},//Consultar en el Servidor el examen
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK

					
					var cont=data.exam.length;//numero de preguntas
			
					examen=data;
				
					for(var l=0;l<cont;l++){

					crearPregunta(l,examen.exam[l].tipo);
					
					}

					$("#plantilla-"+i+"-"+i).hide();
					$("#plantilla-"+i+"-"+i+"-"+i).show();
					
				}
				else {
					//alert("NO RESPONSE FROM SERVER");
				}
			}
		);

	
}

function crearPregunta(i,tipo){


	if(tipo==1){

		//ir creando las diferentes preguntas
		var pageDiv=null;
		pageDiv=pregunta.createPreguntaTest(i); //creamos la platilla
	 	$("body").append(pageDiv);
	 
	 	//hacer los load
	 	$("#question-"+i).text(examen.exam[i].pregunta);
	 	
	 	var selec=$("label[id|='label-radio-choice-"+i+"']");

	 	selec.each(function (index){
	 		
	 		if(index==0){
	 			$(this).text(examen.exam[i].respuesta1);
	 		}else if(index==1){
	 			$(this).text(examen.exam[i].respuesta2);
	 			
	 		}else{
	 			$(this).text(examen.exam[i].respuesta3);
	 		}
	 			
	 		
	 	}	);

	}else{

		var pageDiv=null;
		pageDiv=pregunta.createPreguntaRellenar(i); //creamos la platilla
	 	$("body").append(pageDiv);
	 	$("#question-"+i).text(examen.exam[i].pregunta);
	 	$("#rellenar-"+i).text(examen.exam[i].respuesta1);

	}

}

function guardarRespuesta(i){

	if(examen.exam[i].tipo==1)
		{
		var aux=$("input[name='radio-choice-"+i+"']:checked").val();
		var answer= $("#label-radio-choice-"+i+"-"+aux).text();
		respuestas[i]=answer;
	    
		
		}else
			{
			var answer=$("#rellenar-"+i).val();
			respuestas[i]=answer;
			
			//cargamos los datos en la pagina de final de test

			}


	if(i>=examen.exam.length-1)
	{
		

	corregirTest();

	}
 
	
}


//guardamos los datos para mostrar en la proxima sesion



function corregirTest(){


	for(i=0;i<respuestas.length;i++){
		var ok=examen.exam[i].correcta;
		 

		
		if(ok==1){
			
			var answer=examen.exam[i].respuesta1;
		
		}else if(ok==2){
			var answer=examen.exam[i].respuesta2;
		
			
		}else{
			var answer=examen.exam[i].respuesta3;
		
			
		}
			

		var answer_usuario=respuestas[i];

		if(answer.toUpperCase() ==answer_usuario.toUpperCase() ){

			var indice =examen.exam[i].area;
			

		

			resultadoExamen.resultados.push({idtest:examen.exam[i].idtest,resultado:"correcta",nickname:nickname,tematica:temaUser});
			
			
			
			correctas[indice-1]+=1;
	
		}
		else
		{//
		 
			var indice =examen.exam[i].area;
		
			falladas[indice-1]+=1;
			

        
			resultadoExamen.resultados.push({idtest:examen.exam[i].idtest,resultado:"incorrecta",nickname:nickname,tematica:temaUser});
			
			
			
		
		
		}
		
	}
 //alert("vamos a fin de test");

	finTest();

}



function finTest(){
	//corregimos 
	// comparar array respuestas con la respuesta correcta de la pregunta 
	
	

	for(i=0;i<6;i++) {
		var selector=$(".area-"+i).children('p');

		selector.each(function(index) {
			
			var s=$(this).text();
	
			
			if(index==0){
				
				$(this).text("Correctas: "+correctas[i]);
			
			}else{
				
				
				$(this).text("Erroneas: "+falladas[i]);
		
			}
		
		});
	}
	
}

function borrarTest() {

	


	
	$(".pregunta").remove();//borramos el test del DOM
	$("#visualisation2").empty();
	$("#visualisation").empty();
	
	i=plantillaindice;
	//restablecemos la pagina plantilla
	$("#plantilla-"+i+"-"+i+"-"+i).hide();
	$("#plantilla-"+i+"-"+i).show();
	//$(".resultadosTest").remove();

	
	//reseteamos los contadores
	 correctas=new Array(6);
	 falladas=new Array(6);
	correctas=[0,0,0,0,0,0];
	falladas=[0,0,0,0,0,0];
	respuestas=new Array();
	
	//enviamos los resultados a la BBDD
	 enviarResultadosExamen();
	 examen.exam=new Array();
	 
}

function crearGrafica(i){

	////alert("estamos en crear grafica");

	    	
	    	  // draw the art-->
	  if(i==0){

		  var barData = [{
  		    'x': "Area1",
  		    'y':  correctas[0]
  		  }, {
  		    'x': "Area2",
  		    'y':  correctas[1]
  		  }, {
  		    'x': "Area3",
  		    'y':  correctas[2]
  		  }, {
  		    'x': "Area4",
  		    'y':  correctas[3]
  		  }, {
  		    'x': "Area5",
  		    'y':  correctas[4]
  		  }, {
  		    'x': "Area6",
  		    'y':  correctas[5]
  		  }];
		 
			  var vis = d3.select('#visualisation'),
			    WIDTH =350,
			    HEIGHT = 500,
			    MARGINS = {
			      top: 20,
			      right: 20,
			      bottom: 20,
			      left: 50
			    },
			    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
			      return d.x;$("#visualisation2").removeData();
			    })),


			    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
			      d3.max(barData, function (d) {
			        return d.y;
			      })
			    ]),

			    xAxis = d3.svg.axis()
			      .scale(xRange)
			      .tickSize(5)
			      .tickSubdivide(true),

			    yAxis = d3.svg.axis()
			      .scale(yRange)
			      .tickSize(5)
			      .orient("left")
			      .tickSubdivide(true);


			  vis.append('svg:g')
			    .attr('class', 'x axis')
			    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			    .call(xAxis);

			  vis.append('svg:g')
			    .attr('class', 'y axis')
			    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			    .call(yAxis);

			  vis.selectAll('rect')
			    .data(barData)
			    .enter()
			    .append('rect')
			    .attr('x', function (d) {
			      return xRange(d.x);
			    })
			    .attr('y', function (d) {
			      return yRange(d.y);
			    })
			    .attr('width', xRange.rangeBand())
			    .attr('height', function (d) {
			      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
			    })
			    .attr('fill', 'green');
	  }else{
		  var barData = [{
	  		    'x': "Area1",
	  		    'y':  falladas[0]
	  		  }, {
	  		    'x': "Area2",
	  		    'y':  falladas[1]
	  		  }, {
	  		    'x': "Area3",
	  		    'y':  falladas[2]
	  		  }, {
	  		    'x': "Area4",
	  		    'y':  falladas[3]
	  		  }, {
	  		    'x': "Area5",
	  		    'y':  falladas[4]
	  		  }, {
	  		    'x': "Area6",
	  		    'y':  falladas[5]
	  		  }];

		  var vis = d3.select('#visualisation2'),
		    WIDTH =350,
		    HEIGHT = 500,
		    MARGINS = {
		      top: 20,
		      right: 20,
		      bottom: 20,
		      left: 50
		    },
		    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
		      return d.x;
		    })),


		    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
		      d3.max(barData, function (d) {
		        return d.y;
		      })
		    ]),

		    xAxis = d3.svg.axis()
		      .scale(xRange)
		      .tickSize(5)
		      .tickSubdivide(true),

		    yAxis = d3.svg.axis()
		      .scale(yRange)
		      .tickSize(5)
		      .orient("left")
		      .tickSubdivide(true);


		  vis.append('svg:g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
		    .call(xAxis);

		  vis.append('svg:g')
		    .attr('class', 'y axis')
		    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
		    .call(yAxis);

		  vis.selectAll('rect')
		    .data(barData)
		    .enter()
		    .append('rect')
		    .attr('x', function (d) {
		      return xRange(d.x);
		    })
		    .attr('y', function (d) {
		      return yRange(d.y);
		    })
		    .attr('width', xRange.rangeBand())
		    .attr('height', function (d) {
		      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		    })
		    .attr('fill', 'red');
		  
		  
		  
	  }
	    	
	    		 


	
}


