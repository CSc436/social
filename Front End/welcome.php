<!DOCTYPE html>
<?php
	session_name("loggedin");
	session_set_cookie_params(0);
	session_start();
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

        <div id="top-menu">
            <div id="my-account" class="menu-item">
                <?php
							// Check if a user is already logged in.
							if(isset($_SESSION['loggedin'])){
								echo "
									<script type='text/javascript'>
										toggleLogoutButton(1);
									</script>";
							}
							else{
								echo "
									<script type='text/javascript'>
										toggleLogoutButton(0);
									</script>";
							}
				?>
            </div>
            <div id="notification-icon" class="menu-item">Notifications</div>
            <div id="logo" class="menu-item"></div>
            <div id="list-toggle" class="menu-item">List</div>
        </div>
		<div id="sidebar-main" class="sliding-object">
            <div id="events-wrapper"></div>
		</div>
		
        <div id="map-canvas"/>
	</div>
</body>
</html>