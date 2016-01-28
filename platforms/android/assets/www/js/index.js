/*
GRAMIKASI
 */
 

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	
	 	$.ajaxSetup({cache:false});

			$("#page-1").load();//cargamos la pagina 1
    		var j=0;
    	 	var pageDiv;
    	 	for(i=0;i<7;i++){
    	 	
        		if(i<5){
        			j=2;
        		}else {
        			j=3;
        			
        		}
    	 	pageDiv=plantilla.create(i,j); //creamos la platilla
    	 	$("body").append(pageDiv);
    	
    	 	}
    	 	
    		//consultamos las 6 tematicas a la base de datos
    	 	consultarTemas();
    	 

 
		$("body").enhanceWithin();//To apply styles
		
    	$(window).bind("resize",fitImg);//Bind imgFit function to resize event

    }
};

app.initialize();

function fitImg() {
	var screenWidth=$(window).width()-16*2;
	var screenHeight=$(window).height()-16*2;
	$("img").each(
		function () {
			$(this).css({"max-width":screenWidth, "max-height":screenHeight});
		}
	);	
}

function consultarTemas(){

	var proceed=true;	
	if(navigator.connection.type!=Connection.WIFI)
		proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
	if(proceed==true)
		
		$.getJSON(appConstants.requestTemasURL(),//Consultar en el Servidor las tematicas
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					tematicas=data;

					for(i=0;i< tematicas.tematicas.length;i++){
				    	 		var tema=tematicas.tematicas[i].tematica;
				    	 		tema=tema.toString().toLowerCase().trim();
				    	 		$("#tema-"+i).text(tematicas.tematicas[i].tematica );
				    	 		$("#foto-"+i).attr("src","img/"+tema+".png");
				    	 		//alert(tema+".png");
				    	 		
				    	 	}
				    
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);

	}


