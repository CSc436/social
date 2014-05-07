<?php
	include '..\backend\connect.php';

	$event_query = $db->prepare("
		DELETE FROM notifications WHERE EventId=:eventid;
		DELETE FROM eventkeyword WHERE EventId=:eventid;
		DELETE FROM attending WHERE Event=:eventid;
		DELETE FROM event WHERE EventId=:eventid;
	");
	
	$params = array( ":eventid" => htmlspecialchars($_POST['eventid']) );
	
	$event_query->execute($params);
?>