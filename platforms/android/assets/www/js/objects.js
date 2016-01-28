/*
GRAMIKASI
 */


var flag=false;
//rutas donde ser guarda la imagen de login del usuario etc
var appConstants = {
		localPermanentStorageFolder: "/sdcard/GramikasiFolder/",
		localPermanentStorageFolderImg: function () {
			return this.localPermanentStorageFolder+"img/";
		},
		serverURL: "http://158.227.56.135:8080/GramikasiServer/",//EHU WIFI
		requestUserURL: function() {
		return this.serverURL+"rest/School/requestUser";
	},
		requestTemasURL: function() {
				return this.serverURL+"rest/School/requestTematicas";

	},
		requestExamenURL: function(){
			
			return this.serverURL+ "rest/School/"+"requestExamen";
		},
				postUsuarioURL: function(){
			
			return this.serverURL+ "rest/School/"+"addUsuario";
				},
				downloadFileURL: function(){
					
					return this.serverURL+"img/";
				},
				uploadFile : function (){
					
					return this.serverURL+"rest/School/uploadFile";
				},
				enviarResultados: function(){
					
					return this.serverURL+"rest/School/addResultados";
					
				}
				
	}




var resultadoExamen={
		
		resultados:[]
		
};






var user;
var temaUser;
var nickname;
var examen;
var tematicas;
var plantillaindice=null;
//objeto pregunta

/*
var test={
		
		    Question:[{Tematica:null,
			Area:null,
			Tipo:null,
			Pregunta:null, 
			Respuesta :[null,null,null], 
			correcta:null

		}
		          
		          ]
};
*/


var test={
		
	    Question:[{Tematica:2,
			Area:2,
			Tipo:1,
			Pregunta:"Norena izan zen txakurra erostearen ideia?", 
			Respuesta :["Iñigorena izan zen","Gurasoak izan zen","Unaik nahi izan zen"], 
			correcta:0

		},{Tematica:2,
			Area:1,
			Tipo:2,
			Pregunta:"Nork eramango...........(gu) gaur jirafak batean lotu", 
			Respuesta :["hola",null,null], 
			correcta:0

		},
        {Tematica:2,
			Area:1,
			Tipo:1,
			Pregunta:"Atzo Krokodiloa ureaudiotara erori....", 
			Respuesta :["-ko da","zen","da"], 
			correcta:1

		},
		{Tematica:2,
			Area:1,
			Tipo:1,
			Pregunta:"Selecciona la frase correcta", 
			Respuesta :["Herenegun txakur berri bat oparituko didate","Herenegun txakur berri bat" +
					"oparitu zidate","Herenegun txakur bat oparitu didate"], 
			correcta:2

		},{Tematica:2,
			Area:1,
			Tipo:2,
			Pregunta:"Atzo loroa gauean abestem egon........eta gaur logure gara", 
			Respuesta :["hola",null,null], 
			correcta:0

		},{Tematica:2,
			Area:2,
			Tipo:1,
			Pregunta:"Marrazoa bere harrapakinaren atzetik......", 
			Respuesta :["zihoan","zuen","zihoazten"], 
			correcta:2

		},{Tematica:2,
			Area:2,
			Tipo:2,
			Pregunta:"Atzo sugandila eguzkia hartzen.....(egon) eta galdu egin zen", 
			Respuesta :["hola",null,null], 
			correcta:0

		},{Tematica:2,
			Area:3,
			Tipo:1,
			Pregunta:"Norena izan zen txakurra erostearen ideia?", 
			Respuesta :["Iñigorena izan zen","Gurasoak izan zen","Unaik nahi izan zen"], 
			correcta:0

		},{Tematica:2,
			Area:4,
			Tipo:2,
			Pregunta:"Nork eramango...........(gu) gaur jirafak batean lotu", 
			Respuesta :["hola",null,null], 
			correcta:0

		},{Tematica:2,
			Area:4,
			Tipo:1,
			Pregunta:"Elefanteek ikusi gaituzten", 
			Respuesta :["Haiek zu","Haiek ni","haiek gu"], 
			correcta:1

		},{Tematica:2,
			Area:5,
			Tipo:1,
			Pregunta:"Selecciona la oracion correcta", 
			Respuesta :["hola","hola","hola"], 
			correcta:1

		},
		{Tematica:2,
			Area:6,
			Tipo:1,
			Pregunta:"Selecciona la sentencia correcta", 
			Respuesta :["Basurdeak baso horretan bizi dira","Basurdeak horretan baso bizi dira",
			            "Basurdeak horretan basoetan bizi dira"], 
			correcta:1

		}
   ]
};

//array donde se van guardando la respuesta
var respuestas= [];
//posicion del array representa el area
var correctas=new Array(0,0,0,0,0,0);
var falladas=new Array(0,0,0,0,0,0);


var enviarUser={
		
		nickname:null,
		nombre:null,
		apellido1:null,
		apellido2:null,
		edad:null,
		profesora:null
}

var usuario = {
		
		Nickname:null,
		Nombre : null,
		Apellido1 : null,
		Apellido2:null,
		Edad: null,
		Profesora:null,
		Foto: null

	
		

};

//objetos para funcionalidades con plugin-cordova

var foto;
//objeto foto
var photo = {
		fileFolder:null,
		fileName:null,
		takeAsync: function(fileFolder,fileName,onSuccess) {
			
			//Capturar una imagen
			//primero se le pasa la funcion de callback de exito
			//luego se le pasa la funcion de callback de error
			//alert("estamos en takeAsync");
			
			navigator.device.capture.captureImage(
					
					//función successCallback: si se tomó la imagen
				function(photoFiles) {
				
					var tempFullPath=photoFiles[0].fullPath;//Ubicación del fichero de la imagen tomada
				
					//extrae el substring desde que encuentra el primer / hasta el final
					tempFullPath=tempFullPath.substring(tempFullPath.indexOf("/"));
				
					//alert("New photo in: "+tempFullPath);
					
				
					//Mover el fichero de la imagen tomada a fileFolder+fileName
					fileUtilities.moveAsync(tempFullPath,fileFolder,fileName,
							//función successCallback: si se movió el fichero
				        function() {
					
							photo.fileFolder=fileFolder;//Guardar en el atributo fileFolder del objeto photo, la carpeta destino
							photo.fileName=fileName;//Guardar en el atributo fileName del objeto photo, el nuevo nombre del fichero
							
							if(onSuccess!=false)
								onSuccess();
							
		        		}							
					);
				},
				
				function(error) {
					var msgText = "Photo error: " + error.message + "(" + error.code + ")";
					alert(msgText);
				}
			);
		}
};



var fileUtilities = {
	
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
			//alert("estamos en move async");
			var url="file://"+sourceFullPath;
			var destFile=destFolder+destName;
			var ft=new FileTransfer();//Crear objeto FileTransfer
		    ft.download(//Copiar (descargar) el fichero indicado por URL en destFile
				url,
				destFile,
		    	function() {//función successCallback: si el fichero se descargó bien
					window.resolveLocalFileSystemURL(url,//Acceder al fichero original por su URL
		    				function(fileEntry) {//función successCallback: si se ha podido acceder al fichero original
								fileEntry.remove(onSuccess);//Borrar el fichero y seguir con onSuccess
		    				},
		    				function(error) {
		    					alert("Source file NOT accesible; not removed");
		    				}
		    		);			
				},
				function(error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);
		}
};





//objeto que represente una pagina plantilla
//CORRECTO ESCRITO NO HAY ERRORES AQUI

var plantilla = {
		
		
		create: function(i,j) {
			var atras=0;

			var boceto=$('<div data-role="page" id="plantilla-'+i+'"></div> class="pregunta"');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="text-align: center;color: green;">GRAMIKASI</h1>'+
						'<a href="#page-'+j+'" id="" class="ui-btn ui-corner-all ui-shadow ui-icon-arrow-l ui-btn-icon-left">Atras</a>'	   
			   +'</div>';


			var contentDiv=
				'<div data-role="content">'+
					'<h4 style="color: green">Si estas seguro y te gusta la temática dale a continuar : </h4>'+	
					'<a href="" id="plantilla-'+i+'-'+i+'" class="ui-btn ui-corner-all ui-shadow  ui-icon-check ui-btn-icon-right" onclick="DescargarTest('+i+')">Ok</a>'  	
					+'<a href="#pregunta-0" id="plantilla-'+i+'-'+i+'-'+i+'" class="ui-btn ui-corner-all ui-shadow  ui-icon-check ui-btn-icon-right" style="display: none" >ComenzarTest</a>'  	
				+'</div>';

			var footerDiv=
				'<div data-role="footer" id="footer-1" data-position="fixed" style="padding-top:1%;">'+
					'<h1 style="text-align: center;color: green;">Comenzar Prueba</h1>'+
				'</div>';

				
			boceto.append(headerDiv,contentDiv,footerDiv);// creada plantilla pagina

			return boceto;
		}
	};


//objeto que representa un aplantilla de pagina pregunta
//i representa el numero de pregunta


var pregunta = {
	
	
			
		createPreguntaTest: function(i) {
//			alert("create1");
			var preg=$('<div data-role="page" id="pregunta-'+i+'" class="pregunta"></div>');
			
			if (i==0){
				
				var headerDiv=
					'<div data-role="header" data-position="fixed" >'+
						'<h1 style="text-align: center;color: green;">GRAMIKASI</h1>'		   
				   +'</div>';
				
			}else{
				var headerDiv=
					'<div data-role="header" data-position="fixed" >'+
						'<h1 style="text-align: center;color: green;">GRAMIKASI</h1>'+
						'<a href="#pregunta-'+(i-1)+'" id="" class="ui-btn ui-corner-all ui-shadow ui-icon-arrow-l ui-btn-icon-left">Atras</a>'
				 +'</div>';
				
			}
			

			var contentDiv=
				'<div data-role="content" id="content-i">'+
					'<h2 style="color: green">Pregunta : </h2>'+
					'<h3 id="question-'+i+'"></h3>'+
					
					'<form id="form-'+i+'">'+
					'<fieldset data-role="controlgroup" data-iconpos="right">'+
					'<legend id="question-'+i+'"></legend>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'a" data-mini="true" value="0" type="radio"/>'+
					'<label for="radio-choice-'+i+'a" id="label-radio-choice-'+i+'-0"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'b" data-mini="true" value="1" type="radio"/>'+
					'<label for="radio-choice-'+i+'b" id="label-radio-choice-'+i+'-1"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'c" data-mini="true" value="2" type="radio"/>'+
					'<label for="radio-choice-'+i+'c" id="label-radio-choice-'+i+'-2"></label>'+
					'</fieldset>'+
								'<div style="text-align:center;">';
								//alert("i:"+i+"longitud:"+(examen.exam.length-1));
								if(i==(examen.exam.length-1)){
									//alert("creando href ultima pregunta");
									contentDiv+='<a href="#resultadoAreaP" id="button-'+i+'" class="ui-btn ui-btn-inline ui-corner-all" onclick="guardarRespuesta('+i+')">Corregir Examen</a>';

								}else
								{
									contentDiv+='<a href="#pregunta-'+(i+1)+'" id="button-'+i+'" class="ui-btn ui-btn-inline ui-corner-all" onclick="guardarRespuesta('+i+')">Siguiente</a>';

								}
						
								contentDiv+='</div>'+
					'</form>'
				
				+'</div>';
			
			var footerDiv=
				'<div data-role="footer"  data-position="fixed" style="padding-top:1%;">'+
					'<h1 style="text-align: center;color: green;" >Pregunta</h1>'+
				'</div>';
			
			preg.append(headerDiv,contentDiv,footerDiv);// creada plantilla pagina
			
    	//	alert("preguntaTest creada");
		
			return preg;
		},
		 
		
		createPreguntaRellenar: function(i) {
			//alert("estamos en createPreguntaRellenar");
			
			var preg=$('<div data-role="page" id="pregunta-'+i+'" class="pregunta"></div>');
			
			
			if (i==0){
			
				var headerDiv=
					'<div data-role="header" data-position="fixed" >'+
						'<h1 style="text-align: center;color: green;">GRAMIKASI</h1>'				    
						    
				   +'</div>';
				
			}else{
		
				var headerDiv=
					'<div data-role="header" data-position="fixed" >'+
						'<h1 style="text-align: center;color: green;">GRAMIKASI</h1>'+
						'<a href="#pregunta-'+(i-1)+'" id="" class="ui-btn ui-corner-all ui-shadow ui-icon-arrow-l ui-btn-icon-left">Atras</a>'
				 +'</div>';
				
			}
			
			
			contentDiv
			var contentDiv=
				'<div data-role="content" >'+
					'<h2 style="color: green">Pregunta : </h2>'+
					'<h3 id="question-'+i+'"></h3>'+
					'<input type="text" name="rellenar" id="rellenar-'+i+'"  placeholder="dut...">     ';
					
					
					//alert("i:"+i+"longitud:"+(examen.exam.length-1));
			if(i==(examen.exam.length-1)){
				//alert("creando href ultima pregunta");
				contentDiv+='<a href="#resultadoAreaP" id="button-'+i+'" class="ui-btn ui-btn-inline ui-corner-all" onclick="guardarRespuesta('+i+')">Corregir Examen</a>';

			}else
			{
				contentDiv+='<a href="#pregunta-'+(i+1)+'" id="button-'+i+'" class="ui-btn ui-btn-inline ui-corner-all" onclick="guardarRespuesta('+i+')">Siguiente</a>';

			}
	
					
				
			contentDiv+='</div>';
				
			
			var footerDiv=
				'<div data-role="footer"  data-position="fixed" style="padding-top:1%;">'+
					'<h1 style="text-align: center;color: green;" >Pregunta</h1>'+
				'</div>';
			
			preg.append(headerDiv,contentDiv,footerDiv);// creada plantilla pagina
			
		
			//alert("creada pregunta rellenar");
			return preg;
		}
			
			
		
		
		
		
		
	};





var BarChart = {
		 labels: ["Area1", "Area2", "Area3", "Area4", "Area5","Area6"],
		 datasets: [{
		 fillColor: "rgba(151,249,190,0.5)",
		 strokeColor: "rgba(255,255,255,1)",
		 data: [0, 0, 0, 0, 0,0]
		 }, {
		 fillColor: "rgba(252,147,65,0.5)",
		 strokeColor: "rgba(255,255,255,1)",
		 data: [0,0,0,0,0,0]
		 }]
		};























