var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
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

 		var contentstring = 	"<form action='submit.php' method='post'>"+
 								"<input type ='hidden' name='user' value='me' >" +
 								"Event Title: <input type='text' name='title'><br>"+
								"Description: <input type='textarea' name='description'><br>"+
								"Category: <select>"+
									"<option value='sports'>sports</option>"+
									"<option value='music'>music</option>"+
								"</select><br>"+
								"<input type='submit'>" +
								"</form>";

		var infowindow = new google.maps.InfoWindow({
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
  		normal_map();

	});
	addEventOpen = true;
	}
<<<<<<< HEAD
});
        
//return map settings to normal
function normal_map() {
	google.maps.event.clearListeners(map, 'click');
	controlDiv.style.display = "none";
	map.setOptions({ draggableCursor: null, dragginCursor: null});
	$('#add-event').css("font-weight","normal");
	addEventOpen = false;
}

}
google.maps.event.addDomListener(window, 'load', initialize);
=======
});
>>>>>>> 5cdade6ad165d8863500a8c2510b54e133ebf78c
