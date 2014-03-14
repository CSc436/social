var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
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
    initialLocation = newyork;   
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

 		var contentstring = 	"<form id='create_event' onsubmit='return submitForm();'>"+
 								"<input type ='hidden' name='user' value='me' >" +
 								"Event Title: <input type='text' name='title' value=''><br>"+
								"Description: <input type='textarea' name='description' value=''><br>"+
								"Category: <select>"+
									"<option value='sports'>sports</option>"+
									"<option value='music'>music</option>"+
								"</select><br>"+
								"<input type='submit'>" +
								"</form>";

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
    	normal_map();
  	});

	//placing the pin
	google.maps.event.addListener(map, 'click', function(event) {
  		currentMark = placeMarker(event.latLng);
  		console.log(event.latLng);
  		normal_map();

	});
	addEventOpen = true;
	}
});
	loadEventsFromDB();
//return map settings to normal
	function normal_map() {
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



function submitForm(){
	var postData = $('#create_event').serialize();
	$.ajax( {
		url: "submit.php",
		type: "POST",
		data: postData,
		success:function(message) {
			//submitsuccess(data)
			console.log(message);
			addeventopen = false;
			infowindow.close();
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});
	return false;
}

google.maps.event.addDomListener(window, 'load', initialize);
