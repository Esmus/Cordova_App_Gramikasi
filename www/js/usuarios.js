//gestion de usuarios

function inicio(){
	
	//alert("inicio funcion");
	
	var nickname2=$("#nickname-0").val();
	nickname2=nickname2.toString().toLowerCase().trim();

	if(flag==true){
		if(nickname2.toString().trim().localeCompare(sessionStorage.getItem("nick").toString().trim())==0){
		//alert("usuario logeado");
		$("#sesion-1").hide();
		$("#sesion-2").show();
		$("#enviarFoto").hide();
		}else{


			cargarUsuario(nickname2);
		}
	}else{
		cargarUsuario(nickname2);
	}

	
}

function cargarUsuario(nickname2){

	//consulta BBDD

	var proceed=true;	
	if(navigator.connection.type!=Connection.WIFI)
		proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
	if(proceed==true){
		//alert("Pedimos JSON");
		$.getJSON(appConstants.requestUserURL(),//Consultar en el Servidor el usuario
			{nickname:nickname2},
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					user=data;
					if(data.edad>0){
					//alert("json cargado");
					DescargarFotoUsuario(user.nickname+".jpg");
					$("#sesion-1").hide();
					$("#image-0").attr("src",appConstants.localPermanentStorageFolderImg()+user.nickname+".jpg");
				    $("#image-0").load();
				    fitImg();
					nickname=user.nickname;//guardamos el nick para el envio de resultados
					sessionStorage.setItem("nick",nickname);
					$("#nombre-1").text("Kaixo: "+user.nickname);
					$(".footer-1").text(user.nombre);
					$("#sesion-2").show();
					$("#enviarFoto").hide();
					flag=true;
					}else
						{
						 	alert("Usuario no registrado, vete página registro");
						
						}				
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	}
	
}


function guardarUsuario(){
	
	
	//alert("estamos en guardar usuario");
	
	var nick=usuario.Nickname;
	nick=nick.toString().toLowerCase().trim();
	 enviarUser.nickname=usuario.Nickname;
	 enviarUser.nombre=usuario.Nombre;
	 enviarUser.apellido1=usuario.Apellido1;
	 enviarUser.apellido2=usuario.Apellido2;
	 enviarUser.edad=usuario.Edad;
	 enviarUser.profesora=usuario.Profesora;

	 
	 $.ajaxSetup({
		   contentType: "application/json"
	 });
	var proceed=true;	

	if(navigator.connection.type!=Connection.WIFI)
		proceed=confirm("Need to connect to remote URL. Proceed whitout WIFI connection?");	
	if(proceed==true){
		//alert("vamos hacer el envio");

		$.post(appConstants.postUsuarioURL(),//guardar el usuario en la base de datos
				JSON.stringify(enviarUser),
			function(data,status) {//Función callback
	
				if(status=="success"){//Si la HTTP-RESPONSE es OK
				
					if(data=="ok"){
						//alert("cargando pagina inicio")
				    $("#image-0").attr("src",usuario.Foto);
				    $("#image-0").load();
					fitImg();
					nickname=usuario.Nickname;
					$("#nombre-1").text("Nickname:" + usuario.Nickname);
					$(".footer-1").text(usuario.Nombre);
					$("#login-0").hide();
					$("#login-5").show();
					
					
				   // $("#image-0").ready(function (){
							
							//$("#login-0").attr('href',"#page-1");
							
					//	} );
					
					
					}else{
						
						alert(data);
					}
				
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				
				}
				
			}
	,"text");
}
		
		
	//alert("salimos de guardar usuario");
	
	
	
}

