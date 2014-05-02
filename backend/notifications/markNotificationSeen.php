<?php
	include("../connect.php");

	$queryString = "
		UPDATE notifications SET seen=1 WHERE NotificationID=:notifid";
		
	$params = array(
		":notifid" => htmlspecialchars($_POST['notifid'])
	);
	
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute($params);
?>
