<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$add_query = $db->prepare("
		INSERT IGNORE INTO `attending` 
		(`email`, `event`) 
		VALUES 
		(:email, :id)
		");

	$add_query->execute(array(
		':email' => $_POST['email'],
		':id' => $_POST['eventID']
		));
	
	$select_query = $db->prepare("
		SELECT * FROM `attending`
		WHERE
		`email` = :email and
		`event` = :id
		");

	$select_query->execute(array(
		':email' => $_POST['email'],
		':id' => $_POST['eventID']
		));

	$result = $select_query->fetch();

	echo json_encode($result);
	
	// Get information about the event being attended so we can generate a notification.
	$event_query = $db->prepare("
		SELECT Title, Email FROM event WHERE EventId=:eventid;
	");
	$params = array( ":eventid" => htmlspecialchars($_POST['eventID']) );
	$event_query->execute($params);
	$eventInfo = $event_query->fetchAll();
	
	$username_query = $db->prepare("
		SELECT Username FROM user WHERE Email=:email;
	");
	$params = array( ":email" => htmlspecialchars($_POST['email']) );
	$username_query->execute($params);
	$username = $username_query->fetchAll();

	// Generate a notification about the RSVP.
	generateNotification($db, $eventInfo[0]['Email'], $_POST['eventID'], $username[0]['Username'] . " is attending your event: " . $eventInfo[0]['Title'] . "");
?>