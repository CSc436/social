var current = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var addEventOpen = false;
var keywordsarray = new Array();
var markers = new Array();
var searchMarkers = new Array();
var geocoder;

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
			mapTypeId: google.maps.MapTypeId.ROADMAP,
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
		geocoder = new google.maps.Geocoder();
		map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);	
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
				circle = new google.maps.Circle({radius: 500, center: initialLocation});
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
				processClick();
			},
			error:function(message) {
				handleNotLoggedIn();
			}, dataType: "json"
		});
	});

	/*SearchBox stuff*/ 
  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('filter-address'));
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    console.log("places have been changed!");

    for (var i = 0, searchMarker; searchMarker = searchMarkers[i]; i++) {
      searchMarker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    searchMarkers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a searchMarker for each place.
      var searchMarker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      searchMarkers.push(searchMarker);

      bounds.extend(place.geometry.location);
    }
    if(places.length == 1){
    	circle = new google.maps.Circle({radius: 1000, center: places[0].geometry.location});
    			map.fitBounds(circle.getBounds());
    }
    else{
    	console.log(places);
    	map.fitBounds(bounds);
	}
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
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

		var contentstring = 	"<form id='createEvent' class='form-horizontal' role='form' onsubmit='return submitForm(event);'>" +
								"<input id='user' type ='hidden' name='user' value='me' >" +
								'<div class="form-group">'+
									'<div class="col-md-12">' + 
										"<label class='control-label'>Event Title:</label>" + 
										"<input id='title' class='form-control' type='text' name='title' value=''>" +
									'</div>' +
								'</div>' +
								'<div class="form-group">'+
									'<div class="col-md-12">' +
										"<label class='control-label'>Description:</label>" +
										"<input id='desc' class='form-control' type='text' name='description' value=''>" +
									'</div>' +
								'</div>' +
								'<div class="form-group">'+
									'<div class="col-md-12">' + 
										"<label class='control-label'> Category:</label>"+ 
										"<select class='form-control' id='category'>" +
											"<option value='sports'>sports</option>" +
											"<option value='music'>music</option>" +
										"</select>" +
									"</div>" +
								"</div>" +
								'<div class="form-group">'+
									'<div class="col-md-12">' +
										"<label class='control-label'>Address:</label>" +
										"<input id='addr' class='form-control' type='text' name='address' value=''>" +
										"<small>enter to update location</small>"+
									'</div>' +
								'</div>' +
							'<div class="form-group">'+
									'<div class="col-md-12">' + 
										"<label class='control-label'>Keywords:</label>" +
										"<input id='keywords' type='text' class='form-control' name='keywords' value=''>" +
										"<small>enter to add a keyword</small>"+
									"</div>" +
							"</div>" +
							'<div class="form-group">'+
								'<div class="col-md-12">' +
									"<div id='kw'></div>" +
								"</div>" +
							"</div>"+
							'<div class="col-md-12">' + 
								"<input class='btn btn-primary form-control btn-block' type='submit'>" +
							"</div>" +
							"</form>";

	current = location;
	infowindow = new google.maps.InfoWindow({
	   		content: contentstring,
	   		maxWidth: 500
   	});
   	infowindow.open(map,marker);
	
	geocoder.geocode({'latLng': location}, function(results, status) {
        	$("#addr").val(results[0].formatted_address);
    });


	google.maps.event.addListener(infowindow,'closeclick',function(){
			currentMarker = null;
			marker.setMap(null); //removes the marker
			addEventOpen = false;
	});
	// console.log(currentMark);
}

function updateLocation() {
	var addr = $("#addr").val();
	geocoder.geocode({'address': addr, 'bounds': map.getBounds()}, function(results, status) {
        	$("#addr").val(results[0].formatted_address);
        	currentMarker.setPosition(results[0].geometry.location);
        	map.panTo(results[0].geometry.location);
        	console.log(results[0].geometry.location);
        	current = results[0].geometry.location;
    });
	
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
			contentstring = contentstring.replace(">Cancel Attend<", ">Attend<");
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
			contentstring = contentstring.replace(">Attend<", ">Cancel Attend<");
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
	    	addEventOpen = false;
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



function LoadSingleEvent(curUser, data, userEvents, message, keywords) {
	var e = data[message]["Email"];
	var t = data[message]["Title"];
	var d = data[message]["Description"];
	var c = data[message]["CategoryName"];
	var id = data[message]["EventID"];
	var pos = new google.maps.LatLng(data[message]["latitude"],data[message]["longitude"]);
	var location = data[message]["LocationString"];
	// console.log(data[message]);
    
    if (currentMarker != null && id == currentMarker['eventID']) {
        focusEvent(currentMarker);
        return;
    }

	var result = $.grep(userEvents, function(e) {return e[0] == id; });

	if(!(result.length > 0) && $('#my-attending-tab').hasClass('event-tab-active')){
		return;
	}
	else{
		var image = 'img/newEvent.png';
		var marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: data[message]["Title"],
			icon: image,
			eventID: id
		});
		
		markers.push(marker);

	var contentstring = 	'<div id ="viewEvent"> <div class="form-group">'+
									'<div class="col-md-12">' + 
										"<label class='control-label'>Event Title:</label>" + 
										"<p class='form-control event-content'>"+t+"</p>" +
									'</div>' +
									'<div class="form-group">'+
										'<div class="col-md-12">' +
											"<label class='control-label'>Description:</label>" +
											"<p class='form-control event-content'>"+d+"</p>" +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="form-group">'+
									'<div class="col-md-12">' + 
										"<label class='control-label'> Category:</label>"+ 
										"<p class='form-control event-content'>"+c+"</p>" +
									"</div>" +
								"</div>" + 
								'<div class="form-group">'+
									'<div class="col-md-12">' +
										"<label class='control-label'>Address:</label>" +
										"<p class='form-control event-content' id = 'addr' >"+location+"</p>" +
									'</div>' +
								'</div>' +
								"<div class='form-group'><div class='col-md-12'><br>";

	for(var key in keywords) {
		// console.log(keywords[key]["word"]);
		contentstring = contentstring + "<button class='btn btn-info btn-xs'>" + keywords[key]["word"] + "</button> ";
	}
	contentstring = contentstring + "</div></div>";

	console.log(e);

	if ( e === curUser) {
		contentstring = contentstring + 
		'<div class="col-md-12"><br>' + 
		"<button type='button' id='attendcountbtn' onclick='return btnattendcount(" + id + ")' class='btn btn-primary btn-sm form-control'>Get Attendees</button>"+
		"</div>"+
		"</div>";
	}
	else {
		if (result.length > 0) {
			contentstring = contentstring + 
			'<div class="col-md-12"><br>' + 
			"<br><button type='button' id='attendbtn' onclick='return btnunattend(" + id + ")' class='btn btn-danger btn-sm form-control'>Cancel Attend</button>"+
			"</div>" +
			"</div>";
		}
		else {
			contentstring = contentstring + 
			'<div class="col-md-12"><br>' + 
			"<button type='button' id='attendbtn' onclick='return btnclick(" + id + ")'  class='btn btn-primary btn-sm form-control'>Attend</button><br><br>"+ 
			"<button type='button' id='flagbtn'   onclick='return flagclick(" + id + ")' class='btn btn-primary btn-sm form-control'>Flag Inappropriate</button>"+
			"</div>"+
			"</div>";

		}
	}
	contentstring = contentstring + "</div>"
    
	var iWindow;
	iWindow = new google.maps.InfoWindow({
   		content: contentstring,
   		maxWidth: 500
   	});
	
	marker['infoWindow'] = iWindow;
		(function(mark,info) {
			google.maps.event.addListener(mark, 'click', function() {
			
				if(addEventOpen)
					return;
				
				focusEvent(mark);
			});
		})(marker,iWindow);

		google.maps.event.addListener(iWindow,'closeclick',function(){
			unfocusEvent(marker);
		});
}
}


function processLoadEvent(curUser, data, userEvents) {
	console.log(data);

	for(var message in data){
		// console.log(data[message]);
		
		// Add event to sidebar list
		var result = $.grep(userEvents, function(e) {return e[0] == data[message]["EventID"]; });

		if(!(result.length > 0) && $('#my-attending-tab').hasClass('event-tab-active')){
			continue;
		}
		
		$("#events-list").append('<a href=# class="event-link"><div class="event" id="event-'+data[message]["EventID"]+'"><span><b>'+data[message]["Title"]+'</b></span></br><span>'+data[message]["Description"]+'</span></div></a>');

		(function(msg){
			var id = data[msg]["EventID"];
			// console.log("loading");
			$.ajax( {
				url:"getEventKeywords.php",
				type: "POST",
				data: {eventID: id},
				success: function(keywords) {
					// console.log(keywords);
					LoadSingleEvent(curUser, data, userEvents, msg, keywords);
				}, 
				error: function(keywords) {
					console.log("FAILED to find keywords");
				}, dataType: "json"
			});
		})(message);
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

function flagclick(e) {
	console.log("flag");
	$.ajax({
		url: "checkloggedin.php",
		type: "POST",
		success:function(message) {
			console.log("sucess");
			var r = confirm("Are you sure you want to flag this?");
			if (r == true) {
				displayMsg("Event flagged", "You have flagged this event", "OK"),
				$.ajax({
					url: "flagInappropriate.php",
					type: "POST",
					data: {eventID: currentMarker['eventID']},
					success:function(message) {				
					},
					error:function(message){
					}, dataType: "json"
				});
			} 
			else {    
			}
		},
		error:function(message) {
			 console.log("fail");
			 console.log(message);
			handleNotLoggedIn();
		}, dataType: "json"
	});

}
// Previous filter settings for loading events.
var eventFilterSettings = {
	ownerFilter: null,
	categoryFilter: null,
	descriptionFilter: null,
	startDateFilter: null
}

function setFilterSettings(ownerFilter, descriptionFilter, categoryFilter, startDateFilter){
	eventFilterSettings = {
			ownerFilter: ownerFilter,
			categoryFilter: categoryFilter,
			descriptionFilter: descriptionFilter,
			startDateFilter: startDateFilter
		}
}

function loadEventsFromDB(usePreviousSettings, ownerFilter, descriptionFilter, categoryFilter, startDateFilter){

	// Use previous filter settings.
	if(typeof usePreviousSettings !== 'undefined' && usePreviousSettings != null && usePreviousSettings == true){
		ownerFilter = eventFilterSettings["ownerFilter"];
		categoryFilter = eventFilterSettings["categoryFilter"];
		descriptionFilter = eventFilterSettings["descriptionFilter"];
		startDateFilter = eventFilterSettings["startDateFilter"];
	}
	// Keep track of these new filter settings.
	else{
		eventFilterSettings = {
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
	// console.log("submit");
	// console.log(currentMark);

	if ($(document.activeElement).attr("id") === "addr") {
		updateLocation();
	}
	var kw;
 	//if enter is presse in the title or description field, do nothing
 	if ($(document.activeElement).attr("type") !=  "submit" && $(document.activeElement).attr("id") != "keywords") {
 		// console.log("return my dilla")
 		return false;
 	}
 
 	if ($(document.activeElement).attr("id") == "keywords") {
 		//adding keywords
 		kw = $(document.activeElement).val().trim().toUpperCase();
 		if (keywordsarray.indexOf(kw) < 0 && kw != "") {
 			contentstring = infowindow.content.replace("<div id='kw'>", "<div id='kw'> <button type=\"button\" class=\"btn btn-info btn-sm\" onclick=\"return kwclick(this)\">" + kw+ "</button> ");
 			keywordsarray.push(kw.toUpperCase());
 			var title = $("#title").val();
 			var desc = $("#desc").val();
 			var loc = $("#addr").val();
 			infowindow.setContent(contentstring);
 			//setContent() takes `1` unit of time, so this must wait 1 time unit
 			setTimeout('$("#keywords").focus()',1);
 			$("#title").val(title);
 			$("#desc").val(desc);
 			$("#addr").val(loc);

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
	var locationStr = $("#addr").val();
	
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
		data: {title: title, desc: desc, category:cat, x:coord.lng(), y:coord.lat(), keywords:keywordsarray, location:locationStr},
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

function focusEvent(marker){

	var id = "#event-" + marker['eventID'];
	
	unfocusEvent(marker);
	
	// Mark the current event in the list.
	if(!$(id).hasClass("event-focused")){
		$(id).addClass("event-focused");
	}
	
	currentMarker = marker;
	infowindow = marker['infoWindow'];
	infowindow.open(map, marker);
}

function focusEventGivenID(eventID){
	
	// Find the marker for the event.
	for(marker in markers){
		
		// Focus the marker if we find it.
		if(markers[marker]['eventID'] == eventID){
			focusEvent(markers[marker]);
			break;
		}
	}
}

function unfocusEvent(){

	// Update the marker in the list view.
	if (currentMarker != null) {
		$("#event-" + currentMarker['eventID']).removeClass("event-focused");
	}
	
	// Close the current info window.
	if(infowindow != null){
		infowindow.close();
	}
	
	infowindow = null;
	currentMarker = null;
}

function kwclick(e) {
	var text = $(e)[0].innerHTML;
	var outer = $(e)[0].outerHTML;
	var i = keywordsarray.indexOf(text);
	keywordsarray.splice(i, 1);
	// e.remove();
	// console.log(outer);

	console.log(infowindow.content);
	var title = $("#title").val();
	var desc = $("#desc").val();
	var loc = $("#addr").val();

	var contentstring = infowindow.content.replace(outer, " ");
	// console.log(contentstring);
	infowindow.setContent(contentstring);
	setTimeout('$("#keywords").focus()',1);
	$("#title").val(title);
	$("#desc").val(desc);
	$("#addr").val(loc);
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

$(document).ready(function () {
    // Center on event on map when clicked in the sidebar.
    $("#events-wrapper").on('click', '.event', function() {
        var num = (this.id).match(/\d+$/); // Get event id from end of html id.
        if (num) {
            var eventId = parseInt(num);
            for (var i=0; i<markers.length; i++) {
                if (markers[i]['eventID'] == eventId) {
                    map.setCenter(markers[i]['position']);
					focusEvent(markers[i]);
                }
            }
        }
    });
    
    $("#re-center-img").click(function() {
        map.setCenter(initialLocation); 
    });
});

google.maps.event.addDomListener(window, 'load', initialize);
