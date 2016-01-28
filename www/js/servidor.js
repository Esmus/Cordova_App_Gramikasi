/*Gramikasi funciones de subida y bajada de fotografias*/


var SubidaBajadaServidor = {
	
		downloadFile: function (sourceFullPath,destFolder,destName){ //Método asíncrono para mover ficheros
			var url=sourceFullPath;
			var destFile=destFolder+destName;
			var ft=new FileTransfer();//Crear objeto FileTransfer
			//alert(sourceFullPath);
			//alert(destFile);
			
		    ft.download(//Copiar (descargar) el fichero indicado por URL en destFile
				url,
				destFile,
		    	function() {//función successCallback: si el fichero se descargó bien
				
					//alert("Fichero correctamente descargado y guardado en:"+destFile);		
					$("#image-0").attr("src",appConstants.localPermanentStorageFolderImg()+user.nickname+".jpg");
					$("#image-0").load();
					$("#enviarFoto").hide();
					fitImg();
				},
				function(error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
					
				}
			);
		},
	uploadFileAsync: function(sourceFullPath,filename,fileType,uploadFileServiceURL,onSuccess) {
	
		var fileURL="file://"+sourceFullPath;
		var fileName=filename//usuario.Nickname+".jpg";
		//alert(fileName);
		//alert(fileURL);
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.mimeType = "multipart/form-data";
		options.fileName = fileName;
		var params = {filetype:fileType};
		options.params=params;
		//alert("cargado el opciones");
		var ft=new FileTransfer();//Crear objeto FileTransfer
		ft.upload(fileURL,encodeURI(uploadFileServiceURL),//Subir el fichero indicado por fileURL al servicio de subida de ficheros
			function() {//función successCallback: si el fichero se subió bien
				//alert("File uploaded");
				if(onSuccess!=false)
					onSuccess();
			}, 
			function(error) {//función errorCallback: si el fichero NO se subió bien
				alert("File upload error: "+error.code);//Indicar el error al usuario
			}, 
			options//Opciones de subida
		);
	}
};

//subir las fotos del alumno
//bajarse las fotos del alumno

function DescargarFotoUsuario(nickname){
	//alert("estamos en descargar foto");
	 var dowloadfile=true;
	if(navigator.connection.type!=Connection.WIFI)//Si la conexión a red NO es por wifi
		dowloadfile=confirm("Para subir el fichero mejor que estes con WIFI");
	if(dowloadfile==true){
		SubidaBajadaServidor.downloadFile(appConstants.downloadFileURL()+nickname,appConstants.localPermanentStorageFolderImg(),
				nickname);
	}
	
}

function subirFotoServidor()
{
	//alert("estamos en subir foto alumno");
	var uploadFile=true;	
	if(navigator.connection.type!=Connection.WIFI)//Si la conexión a red NO es por wifi
		uploadFile=confirm("Para subir el fichero mejor que estes con WIFI");//Indicar al usuario q se va a conectar a una URL remota, y recoger su respuesta en uploadFile
	if(uploadFile==true){
		//alert("vamos a mandar la foto al servidor ");
		//alert(usuario.Foto);
		//alert(appConstants.uploadFile());
	SubidaBajadaServidor.uploadFileAsync(usuario.Foto,usuario.Nickname+".jpg",
			"img",appConstants.uploadFile(),false);
	$("#enviarFoto").hide();

	}
}

