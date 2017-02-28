
document.addEventListener('deviceready', onDeviceReady, false);
  

function onDeviceReady(){
	checkConnection(); 
	document.getElementById("footer").onclick = function(){
		document.getElementById("map").style.display = "block";
		document.getElementById("selectAction").className = "selectAction active";
	}
	
	document.getElementById("takePhoto").onclick = function(){
		caremaFunc("CAMERA");
	};
	document.getElementById("getPhoto").onclick = function(){
		caremaFunc("PHOTOLIBRARY");
	};
	document.getElementById("cancel").onclick = function(){
		document.getElementById("selectAction").className = "selectAction";
		document.getElementById("map").style.display = "none";
	}
	document.getElementById("map").onclick = function(){
		document.getElementById("selectAction").className = "selectAction";
		document.getElementById("map").style.display = "none";
	}
}

function checkConnection() { 
		var networkState = navigator.network.connection.type; 		 

		var states = {}; 
		states[Connection.UNKNOWN]  = 'Unknown connection'; 
		states[Connection.ETHERNET] = 'Ethernet connection'; 
		states[Connection.WIFI]     = 'WiFi connection'; 
		states[Connection.CELL_2G]  = 'Cell 2G connection'; 
		states[Connection.CELL_3G]  = 'Cell 3G connection'; 
		states[Connection.CELL_4G]  = 'Cell 4G connection'; 
		states[Connection.NONE]     = 'No network connection'; 

		document.getElementById("msg").innerHTML = 'Connection type: ' + states[networkState]; 
}
function caremaFunc(type){
	navigator.camera.getPicture( cameraSuccess, cameraError, {	
				quality : 75,//图片质量   0-100
				destinationType : Camera.DestinationType.FILE_URI,//选择返回数据的格式 DATA_URL -base64   FILE_URI ---uri
				//DATA_URL ---success   img.src = "data:image/jpeg;base64," + imageData;
				//FILE_URI ---success   img.src = imageData;
				sourceType : Camera.PictureSourceType[type],//设定图片来源  CAMERA---拍照   PHOTOLIBRARY、SAVEDPHOTOALBUM---相册选取
				allowEdit : true,//可以简单编辑图片
				encodingType : Camera.EncodingType.JPEG,//图片输出格式
				targetWidth : 100,//以像素为单位的图像缩放宽度，必须和targetHeight同时使用
				targetHeight : 100
			}
		);
}
       
function cameraSuccess(imageData){
	var imgs = document.createElement("img");
	imgs.src = imageData;
	document.getElementById("section").appendChild(imgs)
	document.getElementById("selectAction").className = "selectAction";
	document.getElementById("map").style.display = "none";
//	document.getElementById("img").src = imageData
}
function cameraError(err){
	alert(err)
	document.getElementById("selectAction").className = "selectAction";
	document.getElementById("map").style.display = "none";
}
