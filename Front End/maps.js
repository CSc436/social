var current = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var addEventOpen = false;
var keywordsarray = new Array();
var markers = new Array();
var infowindow = null;
var bounds;
var circle;
var map;
var controlDiv;
var controlUI;
var controlText;
var currentMarker = null;

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
		// map.getUiSettings().setMyLocationButtonEnabled(true);
		bounds = new google.maps.LatLngBounds();
		//add listener for dragging the map to reload events
		google.maps.event.addListener(map,'dragend',function(){
			if(!addEventOpen){
				loadEventsFromDB(true);
			}
		});
		google.maps.event.addListener(map,'zoom_changed',function(){
			if(!addEventOpen){
				loadEventsFromDB(true);
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
				loadEventsFromDB(true);
				circle = new google.maps.Circle({radius: 4828, center: initialLocation});
    			map.fitBounds(circle.getBounds());/*sets a radius around current location that will fit in viewport*/
				//getGeocode(initialLocation, marker);
			}, function() {
				handleNoGeolocation(browserSupportFlag);
			});
		}
  // Browser doesn't support Geolocation
  else {
  	loadEventsFromDB(true);
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
	   	currentMarker = marker;

		var contentstring = 	"<form id='createEvent' onsubmit='return submitForm(event);'>" +
								"<input id='user' type ='hidden' name='user' value='me' >" +
								"Event Title: <input id='title' type='text' name='title' value=''><br>" +
							"Description: <input id='desc' type='textarea' name='description' value=''><br>" +
							"Keywords: <input id='keywords' type='textarea' name='keywords' value=''><br>" +
	 						"<small>enter to add a keyword</small><div id='kw'></div><br>" +
	 						"<div id='kw'></div>" + 
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
			currentMarker = null;
			console.log("close");
			marker.setMap(null); //removes the marker
			addEventOpen = false;
		});
	// console.log(currentMark);

}

function handleNotLoggedIn() {
	displayMsg("NOT LOGGED IN", "Please log in before doing that");
}

function processUnAttend(eventID, msg) {
	email = msg['message'];

	$.ajax( {
		url: "submitUnAttend.php",
		type: "POST",
		data: {email: email, eventID: eventID},
		success:function(message) {
			// console.log(message);
			// console.log(infowindow.content);
			// console.log("success unclick");
			contentstring = infowindow.content.replace("return btnunattend(", "return btnclick(");
			contentstring = contentstring.replace("btn-danger", "btn-primary");
			contentstring = contentstring.replace(">Cancel<", ">Attend<");
			// console.log(contentstring);
			infowindow.setContent(contentstring);
			// loadEventsFromDB();
			// $("attendbtn").attr("disabled", "disabled");
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});

}


function processAttend(eventId, msg) {
	// console.log("attend");
	email = msg['message'];

	$.ajax( {
		url: "submitAttend.php",
		type: "POST",
		data: {email: email, eventID: eventId},
		success:function(message) {
			// console.log(message);
			// console.log(infowindow.content);
			// console.log("click success")
			contentstring = infowindow.content.replace("return btnclick(", "return btnunattend(");
			contentstring = contentstring.replace("btn-primary", "btn-danger");
			contentstring = contentstring.replace(">Attend<", ">Cancel<");
			infowindow.setContent(contentstring);
			// $("attendbtn").attr("disabled", "disabled");
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});


}

function processClick() {
	if(addEventOpen == false){
	
		if(infowindow != null){
			infowindow.close();
		}
	
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
		addEventOpen = true;
	}
}

//return map settings to normal
	function normalMap() {
		google.maps.event.clearListeners(map, 'click');
		controlDiv.style.display = "none";
		map.setOptions({ draggableCursor: null, dragginCursor: null});
		$('#add-event').css("font-weight","normal");
		//addEventOpen = false;
	}



function processLoadEvent(curUser, data, userEvents) {
			for(var message in data){
				var e = data[message]["Email"];
				var t = data[message]["Title"];
				var d = data[message]["Description"];
				var c = data[message]["CategoryName"];
				var id = data[message]["EventID"];
				var pos = new google.maps.LatLng(data[message]["latitude"],data[message]["longitude"]);
				// console.log(data[message]);

				if(currentMarker != null && currentMarker.eventID == id){
					$("#events-list").append('<div class="event"><span>'+t+'</span></br><span>'+d+'</span></div>');
					continue;
				}
                
                // Add event to sidebar list
                $("#events-list").append('<div class="event"><span>'+t+'</span></br><span>'+d+'</span></div>');

				var image = 'img/newEvent.png';
 				var marker = new google.maps.Marker({
      				position: pos,
      				map: map,
      				title: data[message]["Title"],
      				icon: image,
					eventID: id
 	   			});
				
				markers.push(marker);

   				var contentstring = 	"<div class='event-content'>"+
							"<input type ='hidden' name='user' value='"+e+"' >" +
							"Event Title: <input type='textarea' name='title' value='"+t+"' disabled ><br>"+
						"Description: <input type='textarea' name='description' value='"+d+"' disabled ><br>"+
						"Category: <select disabled>"+
							"<option value='sports'>"+c+"</option>" + 
						"</select>";

				// contentstring = contentstring + "<br><kbd>" + "abcd"+ "</kbd> <br><br>"
 	   			if ( e === curUser) {
 	   				contentstring = contentstring + 
							"<button type='button' id='attendcountbtn' onclick='return btnattendcount(" + id + ")' class='btn btn-primary btn-sm'>Get Attendees</button>"+
							"</div>";
 	   			}
 	   			else {
 	   				var result = $.grep(userEvents, function(e) {return e[0] == id; });
 	   				if (result.length > 0) {
	 	   				contentstring = contentstring + 
							"<button type='button' id='attendbtn' onclick='return btnunattend(" + id + ")' class='btn btn-danger btn-sm'>Cancel</button>"+
							"</div>";
					}
					else {
						contentstring = contentstring + 
						"<button type='button' id='attendbtn' onclick='return btnclick(" + id + ")' class='btn btn-primary btn-sm'>Attend</button>"+
							"</div>";	
					}
				}



				var iWindow;
				iWindow = new google.maps.InfoWindow({
		 	   		content: contentstring
		 	   	});


				(function(mark,info) {
					google.maps.event.addListener(mark, 'click', function() {
						if(addEventOpen)
							return;
					
						if(infowindow != null){
							infowindow.close();
						}
						infowindow = info;
						currentMarker = mark;
						info.open(map,mark);
						// $("#attendbtn").click(function() {console.log("test");});
		  			});
				})(marker,iWindow);

				google.maps.event.addListener(iWindow,'closeclick',function(){
		   			currentMarker = null;
					infowindow = null;
				});
			}
		}

function btnunattend(e) {
	$.ajax({
		url: "checkloggedin.php",
		type: "POST",
		success:function(message) {
			// console.log("success");
			// console.log(message);
			// console.log(message["message"]);
			processUnAttend(e, message);
		},
		error:function(message) {
			// console.log("fail");
			// console.log(message);
			handleNotLoggedIn();
		}, dataType: "json"
	});

}


function btnattendcount(e) {
	// console.log("attendeelist");
	$.ajax({
		url: "getAttendeeList.php",
		type: "GET",
		data: {eventID: e},
		success:function(message) {
			// console.log("success");
			// console.log(message);
			// console.log(message["message"]);
			processAttendeeList(message);
		},
		error:function(message) {
			console.log(message);
			// console.log("fail");
			// console.log(message);
			// handleNotLoggedIn();
		}, dataType: "json"
	});
}

function processAttendeeList(message) {
	// console.log("process");
	var array = [];
	message.forEach(function(element) {
		array.push(element[0]);
	});
	// console.log(array);
	displayMsg("Attendees", array.toString(), "Done");
}

function btnclick(e) {
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
			// console.log("fail");
			// console.log(message);
			handleNotLoggedIn();
		}, dataType: "json"
	});
}

// Previous filter settings for loading events.
var previousEventFilterSettings = {
	ownerFilter: null,
	categoryFilter: null,
	descriptionFilter: null,
	startDateFilter: null
}

function loadEventsFromDB(usePreviousSettings, ownerFilter, descriptionFilter, categoryFilter, startDateFilter){

	// Use previous filter settings.
	if(typeof usePreviousSettings !== 'undefined' && usePreviousSettings != null && usePreviousSettings == true){
		ownerFilter = previousEventFilterSettings["ownerFilter"];
		categoryFilter = previousEventFilterSettings["categoryFilter"];
		descriptionFilter = previousEventFilterSettings["descriptionFilter"];
		startDateFilter = previousEventFilterSettings["startDateFilter"];
	}
	// Keep track of these new filter settings.
	else{
		previousEventFilterSettings = {
			ownerFilter: ownerFilter,
			categoryFilter: categoryFilter,
			descriptionFilter: descriptionFilter,
			startDateFilter: startDateFilter
		}
	}

	var marker;

	// Clear all markers off the map.
	while(marker = markers.shift()){
	
		if(currentMarker != marker){
			marker.setMap(null);
		}
	}
	
	// Reinsert the currently selected marker into the markers array.
	if(currentMarker != null){
		markers.push(currentMarker);
	}
	
	// Parameters for even retrieval.
	var eventParams = {
		currentLat: map.getCenter().lat(),
		currentLong: map.getCenter().lng(),
		zoom: map.getZoom()
	};
	
	// Pass filter parameters if some are available.
	if(typeof ownerFilter !== 'undefined' && ownerFilter != null)
		eventParams["owner"] = ownerFilter;
	if(typeof categoryFilter !== 'undefined' && categoryFilter != null)
		eventParams["category"] = categoryFilter;
	if(typeof descriptionFilter !== 'undefined' && descriptionFilter != null)
		eventParams["description"] = descriptionFilter;
	if(typeof startDateFilter !== 'undefined' && startDateFilter != null)
		eventParams["startdate"] = startDateFilter;

	// First check if a user is logged in.
	$.ajax({
		url: "checkloggedin.php",
		type: "POST",
		success:function(message) {
			curUser = message["message"];
			$('.event').remove();
			
			// Pass filter parameters if some are available.
			if(typeof ownerFilter !== 'undefined' && ownerFilter != null){
			
				// If :self was passed in for the owner filter, use the login information to retrieve events.
				eventParams["owner"] = (ownerFilter == ":self")? curUser : ownerFilter;
			}
			
			// Retrieve all events, applying filters.
			$.get(
				'getEvents.php',
				eventParams,
				function(events) {
					
					// Retrieve all events that the current logged-in user is attending.
					$.ajax( {
						url: "getUserEvents.php",
						type: "POST",
						data: {user: curUser},
						// Found some events that the user is attending.
						success:function(message) {
							var eventsCurrentlyAttending = JSON.parse(message)
							processLoadEvent(curUser, events, eventsCurrentlyAttending);
						},
						// User isn't attending any events.
						error:function(message) {
							console.log(message);
							processLoadEvent(curUser, events, null);
						}
					});
				},
				"json"
			);
		},
		error:function(message) {
			$('.event').remove();
			
			// Retrieve all events, applying filters.
			$.getJSON(
				'getEvents.php',
				eventParams,
				function(events) {
					processLoadEvent(null, events, new Array());
				},
				"json"
			);
		}, dataType: "json"
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
 		//adding keywords
 		kw = $(document.activeElement).val().trim().toUpperCase();
 		console.log(kw);
 		if (keywordsarray.indexOf(kw) < 0 && kw != "") {
 			contentstring = infowindow.content.replace("<div id='kw'>", "<div id='kw'> <kbd onclick=\"return kwclick(this)\">" + kw+ "</kbd> ");
 			keywordsarray.push(kw.toUpperCase());
 			var title = $("#title").val();
 			var desc = $("#desc").val();
 			infowindow.setContent(contentstring);
 			//setContent() takes `1` unit of time, so this must wait 1 time unit
 			setTimeout('$("#keywords").focus()',1);
 			$("#title").val(title);
 			$("#desc").val(desc);
 				
 		}
 		else{
 			$(document.activeElement).val("");	
 		}
 		return false;
 	}
	var title = $("#title").val();
	var desc = $("#desc").val();
	var cat = $("#category").val();
	var coord = current;
	
	var proceed = checkNotEmpty(title, desc);
	if (!proceed){
		return false;
	}

		
	if ($("#keywords").val() != "") {
		keywordsarray.push($("#keywords").val().trim().toUpperCase());
	}
	console.log(keywordsarray);
	$.ajax( {
		url: "submit.php",
		type: "POST",
		data: {title: title, desc: desc, category:cat, x:coord.lng(), y:coord.lat(), keywords:keywordsarray},
		success:function(message) {
			submitSuccess(message);
		},
		error:function(message) {
			console.log("error");
			console.log(message);
		}
	});
	keywordsarray.length=0;
	loadEventsFromDB();
	return false;
}

function kwclick(e) {
	var text = $(e)[0].innerHTML;
	var outer = $(e)[0].outerHTML;
	// console.log($(e)[0].outerHTML);
	var i = keywordsarray.indexOf(text);
	keywordsarray.splice(i, 1);
	console.log(keywordsarray);
	// e.remove();
	// console.log(outer);
	var contentstring = infowindow.content.replace(outer, " ");
	// console.log(contentstring);
	infowindow.setContent(contentstring);

}

function submitSuccess(data) {
	 console.log(data);
	var res = JSON.parse(data);
	console.log(res);
	addEventOpen = false;
	// infowindow."onclick".call()
	// console.log(infowindow);
	infowindow.close();
	currentMarker.setMap(null);
	loadEventsFromDB();
}

google.maps.event.addDomListener(window, 'load', initialize);
