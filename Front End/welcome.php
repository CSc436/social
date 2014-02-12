<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="social.css">
	<style type="text/css">
	html { height: 100% }
	body { height: 100%; margin: 0; padding: 0 }
	#map-canvas { height: 100% }
	</style>
	<script type="text/javascript"
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1xyTkrjYqcS9qWjjgVt6uHEcbmuYysAE&sensor=true">
	</script>
	<script type="text/javascript">
	var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 15
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
}
google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>
<body>
	<div id="wrapper">
		<div id="sidebar-main">
			<div id="sidebar-links-wrapper">
				<ul id="sidebar-links">
					<li class="sidebar-link"><a href="">Events</a></li>
				</ul>
			</div>
		</div>
		<div id="map-canvas"/>
	</div>
</body>
</html>