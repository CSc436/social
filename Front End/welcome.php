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
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

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
            <a href="#" class="menu-link"><div id="my-account" class="menu-item">
                <?php
					// Check if a user is already logged in.
					if(isset($_SESSION['loggedin'])){
					echo "
						<script type='text/javascript'>
							toggleLoginButton(1);
						</script>";
					}
					else{
						echo "
							<script type='text/javascript'>
								toggleLoginButton(0);
							</script>";
					}
				?>
            </div></a>
            <a href="#" class="menu-link"><div id="notification-icon" class="menu-item">Notifications</div></a>
			<a href="#" class="menu-link"><div id="add-event" class="menu-item">Create Event</div></a>
            <div id="logo" class="menu-item"></div>
            <a href="#" class="menu-link"><div id="list-toggle" class="menu-item">Event List</div></a>
        </div>
		<div id="sidebar-main" class="sliding-object">
			<div id="events-searchbar">
				<form id="events-searchbar-form" method="POST">
					<input type="text" name="filter-title" id="filter-title" placeholder="Search" tabindex=1 />
					<select id="filter-category" tabindex=2>
						<option value="">Select Category...</option>
						<?php
							include("getCategories.php");
						?>
					</select>
					<input type="submit" id="filter-submit" value="Search">
				</form>
			</div>
			<div id="events-tabs">
				<a href="javascript:void(0)"><div id="all-events-tab" class="event-tab event-tab-active">All Events</div></a>
				<a href="javascript:void(0)"><div id="my-events-tab" class="event-tab">My Events</div></a>
				<a href="javascript:void(0)"><div id="my-attending-tab" class="event-tab">My Attending</div></a>
			</div>
            <div id="events-wrapper">
				<div id="events-list"></div>
			</div>
		</div>
        <div id="my-account-menu" class="sliding-object">
            <a href="#" class="my-account-menu-item" id="logout-button">Logout</a>
        </div>
		
        <div id="map-canvas"/>
	</div>
</body>
</html>