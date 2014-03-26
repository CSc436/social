var current = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var keywordsarray = new Array();
var infowindow = null;
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 15,
			disableDefaultUI: true,
			panControl: true,
  			zoomControl: true,
  			panControlOptions: {
  				position: google.maps.ControlPosition.TOP_RIGHT
  			},
			zoomControlOptions: {
				position: google.maps.ControlPosition.TOP_RIGHT,
				style: google.maps.ZoomControlStyle.SMALL
			}
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
		if(navigator.geolocation) {
			browserSupportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position) {
				initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				map.setCenter(initialLocation);
				var image = 'img/user.png';
				var marker = new google.maps.Marker({
					position: initialLocation,
					title: 'Your Location',
					map: map,
					icon: image
				});
				//getGeocode(initialLocation, marker);
			}, function() {
				handleNoGeolocation(browserSupportFlag);
			});
		}
  // Browser doesn't support Geolocation
  else {
  	browserSupportFlag = false;
  	handleNoGeolocation(browserSupportFlag);
  }
   function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in NYC.");
    }
    initialLocation = current;   
    map.setCenter(initialLocation);
  }


  	//gets geocode nfo and displays in an infowindow
  	// function getGeocode(location, marker) {
  		//geocoder = new google.maps.Geocoder();
  		// var infowindow = new google.maps.InfoWindow();
  		// geocoder.geocode({'latLng': location}, function(results, status) {
    //     	infowindow.setContent(results[1].formatted_address);
    //     	infowindow.open(map, marker);
    //     });
    // }


  	//place a pin
	function placeMarker(location) {
		var image = 'img/newEvent.png';
 		var marker = new google.maps.Marker({
      		position: location,
      		map: map,
      		title: "mouseclick",
      		icon: image
 	   	});

 		var contentstring = 	"<form id='createEvent' onsubmit='return submitForm(event);'>"+
 								"<input id='user' type ='hidden' name='user' value='me' >" +
 								"Event Title: <input id='title' type='text' name='title' value=''><br>"+
								"Description: <input id='desc' type='textarea' name='description' value=''><br>"+
								"Keywords: <input id='keywords' type='textarea' value=''><br>" +
								"<small>enter to add a keyword</small><div id='kw'></div><br>" +
								"Category: <select id='category'>"+
									"<option value='sports'>sports</option>"+
									"<option value='music'>music</option>" +
								"</select><br>"+
								"<input type='submit'>" +
								"</form>";

		current = location;
		infowindow = new google.maps.InfoWindow({
 	   		content: contentstring
 	   	});
 	   	infowindow.open(map,marker);
		
		google.maps.event.addListener(infowindow,'closeclick',function(){
   			marker.setMap(null); //removes the marker
   			addEventOpen = false;
			});
	}

	

	//create the X control
	var controlDiv = document.createElement('div');
	controlDiv.style.padding = '5px';
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Cancel adding an Event';
	controlDiv.appendChild(controlUI);
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '34px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<strong>X</strong>';
	controlUI.appendChild(controlText);
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
	controlDiv.style.display = "none";

var addEventOpen = false;
//click on add event
$('#add-event').click(function() {
	if(addEventOpen == false){
	$('#add-event').css("font-weight","bold");
	map.setOptions({ draggableCursor: 'crosshair' });

	//display the X
	controlDiv.style.display = "inline"
	
	//clicking the x
	google.maps.event.addDomListener(controlDiv, 'click', function() {
    	normalMap();
  	});

	//placing the pin
	google.maps.event.addListener(map, 'click', function(event) {
  		currentMark = placeMarker(event.latLng);
  		// console.log(event.latLng);
  		normalMap();
	});
	addEventOpen = true;
	}
});
	loadEventsFromDB();
//return map settings to normal
	function normalMap() {
		google.maps.event.clearListeners(map, 'click');
		controlDiv.style.display = "none";
		map.setOptions({ draggableCursor: null, dragginCursor: null});
		$('#add-event').css("font-weight","normal");
		//addEventOpen = false;
	}
/*
function loadMarker(marker, user, title, description, category) {
 		var contentstring = 	"<div class='event-content'>"+
 								"<input type ='hidden' name='user' value='"+user+"' >" +
 								"Event Title: <input type='text' name='title' value='"+title+"'><br>"+
								"Description: <input type='textarea' name='description' value='"+description+"'><br>"+
								"Category: <select>"+
									"<option value='sports'>"+category+"</option>"+
									"<option value='music'>music</option>"+
								"</select><br>"+
								"</div>";

		infowindow = new google.maps.InfoWindow({
 	   		content: contentstring
 	   	});
		
		google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map,marker);
  		});
		google.maps.event.addListener(infowindow,'closeclick',function(){
   			//marker.setMap(null); //removes the marker
   			addEventOpen = false;
			});
	}
var markers;*/
function loadEventsFromDB(){
	$.getJSON(
		'getEvents.php',
		function(data) {
			for(var message in data){
				var e = data[message]["Email"];
				var t = data[message]["Title"];
				var d = data[message]["5"];
				var c = data[message]["CategoryID"];

				console.log(data[message]);
				var image = 'img/newEvent.png';
 				var marker = new google.maps.Marker({
      				position: new google.maps.LatLng(data[message]["longitude"],data[message]["latitude"]),
      				map: map,
      				title: data[message]["Title"],
      				icon: image
 	   			});
 				//autoCenter(markerr);
				//loadMarker(marker,data[message]["Email"],data[message]["Title"],data[message]["5"],data[message]["CategoryID"]);
				var contentstring = 	"<div class='event-content'>"+
 								"<input type ='hidden' name='user' value='"+e+"' >" +
 								"Event Title: <input type='text' name='title' value='"+t+"'><br>"+
								"Description: <input type='textarea' name='description' value='"+d+"'><br>"+
								"Category: <select>"+
									"<option value='sports'>"+c+"</option>"+
									"<option value='music'>music</option>"+
								"</select><br>"+
								"</div>";

				infowindow = new google.maps.InfoWindow({
		 	   		content: contentstring
		 	   	});
				infowindow.open(map,marker);
				(function(mark,info) {
					google.maps.event.addListener(mark, 'click', function() {
		    			info.open(map,mark);
		  			});
				})(marker,infowindow);
				google.maps.event.addListener(infowindow,'closeclick',function(){
		   			//marker.setMap(null); //removes the marker
		   			addEventOpen = false;
					});
			}
		}
	);
	return false;
}

function autoCenter(marker) {
//  Create a new viewpoint bound
var bounds = new google.maps.LatLngBounds();
bounds.extend(marker.position);
//  Fit these bounds to the map
map.fitBounds(bounds);
}


}



function checkNotEmpty(title, desc, cat) {
	//TODO: Make pretty
	if (title === "") {
		alert("no title");
		return false;
	}
	if (desc === "") {
		alert("no description");
		return false;
	}
	return true;
}

function submitForm(e){
	var kw;

	//if enter is presse in the title or description field, do nothing
	if ($(document.activeElement).attr("type") !=  "submit" && $(document.activeElement).attr("id") != "keywords") {
		console.log("return my dilla")
		return false;
	}

	if ($(document.activeElement).attr("id") == "keywords") {
		kw = $(document.activeElement).val();
		keywordsarray.push(kw.toUpperCase());
		// $("kw").innerHTML = keywordsarray[0];
		$(document.activeElement).val("");
		return false;
	}

	var user = $("#user").val();
	var title = $("#title").val();
	var desc = $("#desc").val();
	var cat = $("#category").val();
	var coord = current;

	console.log(keywordsarray);
	
	var proceed = checkNotEmpty(title, desc);
	if (!proceed){
		return false;
	}

	$.ajax( {
		url: "submit.php",
		type: "POST",
		data: {user: user, title: title, desc: desc, category:cat, x:coord.lat(), y:coord.lng(), keywords:keywordsarray},
		success:function(message) {
			submitSuccess(message);
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});
	keywordsarray.length = 0;
	return false;
}

function submitSuccess(data) {
	// console.log(data);
	var res = JSON.parse(data);
	console.log(res);
	addeventopen = false;
	infowindow.close();
}

google.maps.event.addDomListener(window, 'load', initialize);
