<!DOCTYPE html>
<?php
	// TODO: Actually set this variable.
	$loggedin = false;
?>
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
		<a href="javascript:void(0);">
			<div id="showhide">
				<div class="colored-line"></div>
				<div class="colored-line"></div>
				<div class="colored-line"></div>
			</div>
		</a>
		<div id="sidebar-main" class="sliding-object">
            <div id="sidebar-header">LOGO HERE</div>
			<div id="sidebar-links-wrapper">
				<ul id="sidebar-links">
					<a class="sidebar-link-button" id="events-button" href="#"><li class="sidebar-link">Events</li></a>
					<a class="sidebar-link-button" href="#"><li class="sidebar-link" id="add-event">Create</li></a>
					<a class="sidebar-link-button" href="#">
					<li class="sidebar-link" id="my-account">Log In</li>
					</a>
                    <a class="sidebar-link-button" href="#"><li class="sidebar-link">Settings</li></a>
				</ul>
			</div>
		</div>
		
        <div id="event-list">
            <div id="events-wrapper">
                <div class="event">
                    <span>Event Name</span></br>
                    <span>12:00pm - 2:00pm</span></br>
                    <span>This could be an event description.</span>
                </div>
                <div class="event">
                    <span>Midnight Salsa Dancing</span></br>
                    <span>12:00am - 2:00am</span></br>
                    <span>Dancing in the ancient style of Salsa. At midnight.</span>
                </div>
            </div>
        </div>
        <div id="map-canvas"/>
	</div>
</body>
</html>