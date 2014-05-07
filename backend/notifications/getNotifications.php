<?php
 	include("../connect.php");

	// Query to get all notifications for a user.
 	$queryString = "
		SELECT NotificationID, EventID, Description, Seen
		FROM notifications LEFT JOIN user ON notifications.Email=user.Email
		WHERE
			user.Email = :email;";
		
	$params = array(
		":email" => htmlspecialchars($_GET['email'])
	);
	
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute($params);

	// Return all of the notifications.
    echo json_encode($query->fetchAll());
?>
