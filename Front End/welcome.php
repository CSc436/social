<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="social.css">
	<style type="text/css">
	html { height: 100% }
	body { height: 100%; margin: 0; padding: 0 }
	#map-canvas { height: 100% }
	</style>
	<script type="text/javascript"
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1xyTkrjYqcS9qWjjgVt6uHEcbmuYysAE&sensor=true">
	</script>
	<script type ="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js" rel="script"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/js/bootstrap.min.js" rel="script"></script>
	<script type="text/javascript">
	var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 15,
			disableDefaultUI: true,
			panControl: true,
  			zoomControl: true,
			zoomControlOptions: {
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
				var marker = new google.maps.Marker({
					position: initialLocation,
					title: 'Your Location',
					map: map
				});
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

  	//place a pin
	function placeMarker(location) {
 		var marker = new google.maps.Marker({
      		position: location,
      		map: map,
      		title: "mouseclick"
 	   	});
		var input = create_input_control();
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

}

	function create_input_control() {
		var inputDiv = document.createElement('div');
		inputDiv.style.padding = '5px';
		var controlUI = document.createElement('div');
		controlUI.style.backgroundColor = 'white';
		controlUI.style.borderStyle = 'solid';
		controlUI.style.borderWidth = '2px';
		controlUI.style.cursor = 'pointer';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'Cancel adding an Event';
		inputDiv.appendChild(controlUI);
		var controlForm = document.createElement('form');
		controlForm.setAttribute('method',"post");
		controlForm.setAttribute('action',"submit.php");
		controlUI.appendChild(controlForm);

		
		var controlTitleText = document.createElement("textarea");
		controlTitleText.setAttribute('innterHTML', "party name:");
		controlTitleText.setAttribute('')
	

		var controlInput = document.createElement("input"); //input element, text
		controlInput.setAttribute('type',"text");
		controlInput.setAttribute('name',"username");
		controlInput.style.fontFamily = 'Arial,sans-serif';
		controlInput.style.fontSize = '15px';
		controlInput.style.paddingLeft = '4px';
		controlInput.style.paddingRight = '4px';

		var controlSubmit = document.createElement("input"); //input element, Submit button
		controlSubmit.setAttribute('type',"submit");
		controlSubmit.setAttribute('value',"Submit");

		controlForm.appendChild(controlTitleText);
		controlForm.appendChild(controlInput);
		controlForm.appendChild(controlSubmit);
		
		return inputDiv;
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
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);
	controlDiv.style.display = "none";


//click on add event
$('#add-event').click(function() {
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
  		placeMarker(event.latLng);
  		normal_map();

	});

});

//return map settings to normal
function normal_map() {
	google.maps.event.clearListeners(map, 'click');
	controlDiv.style.display = "none";
	map.setOptions({ draggableCursor: null, dragginCursor: null});
	$('#add-event').css("font-weight","normal");
}


}
google.maps.event.addDomListener(window, 'load', initialize);



</script>
</head>
<body>
	<div id="wrapper">
		<div id="sidebar-main">
			<div id="sidebar-links-wrapper">
				<ul id="sidebar-links">
					<li class="sidebar-link"><a href="#">Events</a></li>
					<li class="sidebar-link" id="add-event"><a href="#">Create</a></li>
					
				</ul>
			</div>
		</div>
		<div id="map-canvas"/>
	</div>
</body>
</html>