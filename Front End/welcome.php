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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
	<script type="text/javascript"
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1xyTkrjYqcS9qWjjgVt6uHEcbmuYysAE&sensor=true">
	</script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/js/bootstrap.min.js" rel="script"></script>
    <script src="social.js"></script>
    <script src="maps.js"></script>	
</head>
    
<body>
	<div id="wrapper">
        <div id="showhide-hidden"><span>>></span></div>
		<div id="sidebar-main">
            <div id="showhide"><span><<</span></div>
			<div id="sidebar-links-wrapper">
				<ul id="sidebar-links">
					<li class="sidebar-link"><a class="sidebar-link-button" href="#">Events</a></li>
					<li class="sidebar-link" id="add-event"><a class="sidebar-link-button" href="#">Create</a></li>
					<li class="sidebar-link" id="my-account"><a class="sidebar-link-button" href="#">My Account</a></li>
                    <li class="sidebar-link"><a class="sidebar-link-button" href="#">Settings</a></li>
				</ul>
			</div>
		</div>
        <div id="map-canvas"/>
	</div>
</body>
</html>