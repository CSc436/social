var current = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var keywordsarray = new Array();
var infowindow = null;
var bounds;
var circle;
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
		bounds = new google.maps.LatLngBounds();
		//add listener for dragging the map to reload events
		google.maps.event.addListener(map,'dragend',function(){
			if(!addEventOpen)
   			{
<<<<<<< HEAD
=======
                $('.event').remove();
>>>>>>> ryan
   				loadEventsFromDB();
   			}
		});
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
				loadEventsFromDB();
				circle = new google.maps.Circle({radius: 4828, center: initialLocation});
    			map.fitBounds(circle.getBounds());/*sets a radius around current location that will fit in viewport*/
				//getGeocode(initialLocation, marker);
			}, function() {
				handleNoGeolocation(browserSupportFlag);
			});
		}
  // Browser doesn't support Geolocation
  else {
  	loadEventsFromDB();
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
    circle = new Circle({radius: 32186, center: initialLocation});
    map.fitBounds(circle.getBounds());
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

 		var contentstring = 	"<form id='createEvent' onsubmit='return submitForm(event);'>" +
 								"<input id='user' type ='hidden' name='user' value='me' >" +
 								"Event Title: <input id='title' type='text' name='title' value=''><br>" +
								"Description: <input id='desc' type='textarea' name='description' value=''><br>" +
								"Keywords: <input id='keywords' type='textarea' value=''><br>" +
		 						"<small>enter to add a keyword</small><div id='kw'></div><br>" +
								"Category: <select id='category'>" +
									"<option value='sports'>sports</option>" +
									"<option value='music'>music</option>" +
								"</select><br>" +
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
  		//console.log(event.latLng);
  		normalMap();
	});
	//addEventOpen = true;
	}
});
	//loadEventsFromDB();
//return map settings to normal
	function normalMap() {
		google.maps.event.clearListeners(map, 'click');
		controlDiv.style.display = "none";
		map.setOptions({ draggableCursor: null, dragginCursor: null});
		$('#add-event').css("font-weight","normal");
		//addEventOpen = false;
	}


function loadEventsFromDB(){
	$.getJSON(
		'getEvents.php',
		{currentLat: map.getCenter().lat(),
		 currentLong: map.getCenter().lng()},
		function(data) {
			for(var message in data){
				var e = data[message]["Email"];
				var t = data[message]["Title"];
				var d = data[message]["Description"];
				var c = data[message]["CategoryName"];

				console.log(data[message]);
<<<<<<< HEAD
=======
                
                // Add event to sidebar list
                $("#events-wrapper").append('<div class="event"><span>'+t+'</span></br><span>'+d+'</span></div>');
                
>>>>>>> ryan
				var image = 'img/newEvent.png';
 				var marker = new google.maps.Marker({
      				position: new google.maps.LatLng(data[message]["latitude"],data[message]["longitude"]),
      				map: map,
      				title: data[message]["Title"],
      				icon: image
 	   			});
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
				(function(mark,info) {
					google.maps.event.addListener(mark, 'click', function() {
		    			if(!addEventOpen){
		    				info.open(map,mark);
		    				addEventOpen = true;
		    			}
		  			});
		  			google.maps.event.addListener(map, 'dragend', function() {
		  				if(!addEventOpen)
		  				{
		  					mark.setMap(null);
		  				}
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

}



function checkNotEmpty(title, desc, cat) {
	//TODO: Make pretty
	if (title === "") {
		displayMsg("No Title", "Please give your event a title.");
		return false;
	}
	if (desc === "") {
		displayMsg("No Description", "Please name your event.");
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
	console.log(current);
	console.log(coord.lat());
	console.log(coord.lng());
	
	var proceed = checkNotEmpty(title, desc);
	if (!proceed){
		return false;
	}

	$.ajax( {
		url: "submit.php",
		type: "POST",
		data: {user: user, title: title, desc: desc, category:cat, x:coord.lng(), y:coord.lat(), kewords:keywordsarray},
		success:function(message) {
			submitSuccess(message);
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});
	keywordsarray.length=0;
	return false;
}

function submitSuccess(data) {
	 console.log(data);
	var res = JSON.parse(data);
	console.log(res);
	addeventopen = false;
	infowindow.close();
}

google.maps.event.addDomListener(window, 'load', initialize);
