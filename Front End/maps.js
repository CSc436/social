var current = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var addEventOpen = false;
var keywordsarray = new Array();
var infowindow = null;
var bounds;
var circle;
var map;
var controlDiv;
var controlUI;
var controlText;
var currentMark;

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
		map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
		bounds = new google.maps.LatLngBounds();
		//add listener for dragging the map to reload events
		google.maps.event.addListener(map,'dragend',function(){
			if(!addEventOpen)
   			{
                $('.event').remove();
   				loadEventsFromDB();
   			}
		});
		google.maps.event.addListener(map,'zoom_changed',function(){
			loadEventsFromDB();
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

	//create the X control
	controlDiv = document.createElement('div');
	controlDiv.style.padding = '5px';
	controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Cancel adding an Event';
	controlDiv.appendChild(controlUI);
	controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '34px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<strong>X</strong>';
	controlUI.appendChild(controlText);
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
	controlDiv.style.display = "none";

	//click on add event
	$('#add-event').click(function() {
		$.ajax({
			url: "checkloggedin.php",
			type: "POST",
			success:function(message) {
				console.log("success");
				console.log(message);
				console.log(message["message"]);
				processClick();
			},
			error:function(message) {
				console.log("fail");
				console.log(message);
				handleNotLoggedIn();
			}, dataType: "json"
		});
	});


}

	//place a pin
function placeMarker(location) {
	var image = 'img/newEvent.png';
		var marker = new google.maps.Marker({
  		position: location,
  		map: map,
  		title: "mouseclick",
  		icon: image
	   	});
	   	currentMark = marker;
	   	console.log(currentMark);

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
			console.log("close");
			marker.setMap(null); //removes the marker
			addEventOpen = false;
		});
	// console.log(currentMark);

}

function handleNotLoggedIn() {
	displayMsg("NOT LOGGED IN", "Please log in before creating an event");
}

function processAttend(eventId, msg) {
	// console.log("attend");
	email = msg['message'];

	$.ajax( {
		url: "submitAttend.php",
		type: "POST",
		data: {email: email, eventID: eventId},
		success:function(message) {
			console.log(message);
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});


}

function processClick() {
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
	  		placeMarker(event.latLng);
	  		//console.log(event.latLng);
	  		normalMap();
		});
		//addEventOpen = true;
	}
}
	//loadEventsFromDB();
//return map settings to normal
	function normalMap() {
		google.maps.event.clearListeners(map, 'click');
		controlDiv.style.display = "none";
		map.setOptions({ draggableCursor: null, dragginCursor: null});
		$('#add-event').css("font-weight","normal");
		addEventOpen = false;
	}

function processLoadEvent(curUser, data) {
			for(var message in data){
				var e = data[message]["Email"];
				var t = data[message]["Title"];
				var d = data[message]["Description"];
				var c = data[message]["CategoryName"];
				var id = data[message]["EventID"];
				// console.log(data[message]);

                
                // Add event to sidebar list
                $("#events-wrapper").append('<div class="event"><span>'+t+'</span></br><span>'+d+'</span></div>');

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
						"</select>";



 	   			if ( e === curUser) {
 	   				contentstring = contentstring +"</div>";


 	   			}
 	   			else {
 	   				contentstring = contentstring + 
						"<button type='button' id='attendbtn' style='float: right' onclick='return btnclick(" + id + ")' class='btn btn-primary btn-sm'>Attend</button>"+
						"</div>";

				}


				infowindow = new google.maps.InfoWindow({
		 	   		content: contentstring
		 	   	});


				(function(mark,info) {
					google.maps.event.addListener(mark, 'click', function() {
		    			if(!addEventOpen){
		    				info.open(map,mark);
		    				addEventOpen = true;
		    				// console.log($("#attendbtn"));
		    				$("#attendbtn").click(function() {console.log("test");});
		    				
		    			}
		  			});
		  			google.maps.event.addListener(map, 'dragend', function() {
		  				if(!addEventOpen)
		  				{
		  					mark.setMap(null);
		  				}
		  			});
		  			google.maps.event.addListener(map, 'zoom_changed', function() {
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
				// console.log(infowindow["closeclick"]);

			}
		}


function btnclick(e) {
	// console.log("click");
	$.ajax({
		url: "checkloggedin.php",
		type: "POST",
		success:function(message) {
			// console.log("success");
			// console.log(message);
			// console.log(message["message"]);
			processAttend(e, message);
		},
		error:function(message) {
			console.log("fail");
			console.log(message);
			handleNotLoggedIn();
		}, dataType: "json"
	});
}



function loadEventsFromDB(){
	$.getJSON(
		'getEvents.php',
		{currentLat: map.getCenter().lat(),
		 currentLong: map.getCenter().lng(),
		 zoom: map.getZoom()},
		function(data) {
			var curUser;
			$.ajax({
					url: "checkloggedin.php",
					type: "POST",
					success:function(message) {
						// console.log(message['message']);
						curUser = message["message"];
						processLoadEvent(curUser, data);
					},
					error:function(message) {
						// console.log(message);
						curUser = null;
						processLoadEvent(curUser, data);
					}, dataType: "json"
				});
			// console.log(curUser);
		});
	return false;
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
	// console.log(currentMark);
	var kw;
 	//if enter is presse in the title or description field, do nothing
 	if ($(document.activeElement).attr("type") !=  "submit" && $(document.activeElement).attr("id") != "keywords") {
 		// console.log("return my dilla")
 		return false;
 	}
 
 	if ($(document.activeElement).attr("id") == "keywords") {
 		kw = $(document.activeElement).val();
 		keywordsarray.push(kw.toUpperCase());
 		// $("kw").innerHTML = keywordsarray[0];
 		$(document.activeElement).val("");
 		return false;
 	}
	// var user = $_SESSION['loggedin'];
	// console.log(user);
	// console.log("user");
	// marker.setMap(null);
	var title = $("#title").val();
	var desc = $("#desc").val();
	var cat = $("#category").val();
	var coord = current;
	// console.log(keywordsarray);
	// console.log(current);
	// console.log(coord.lat());
	// console.log(coord.lng());
	
	var proceed = checkNotEmpty(title, desc);
	if (!proceed){
		return false;
	}

	$.ajax( {
		url: "submit.php",
		type: "POST",
		data: {title: title, desc: desc, category:cat, x:coord.lng(), y:coord.lat(), kewords:keywordsarray},
		success:function(message) {
			submitSuccess(message);
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});
	keywordsarray.length=0;
	// loadEventsFromDB();
	return false;
}

function submitSuccess(data) {
	 console.log(data);
	var res = JSON.parse(data);
	console.log(res);
	addeventopen = false;
	// infowindow."onclick".call()
	// console.log(infowindow);
	infowindow.close();
	currentMark.setMap(null);
	loadEventsFromDB();
}

google.maps.event.addDomListener(window, 'load', initialize);
