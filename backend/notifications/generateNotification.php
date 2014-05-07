<?php

	function generateNotification($db, $target, $eventID, $description){
	
		$queryString = "
			INSERT INTO notifications (Email, EventID, Description, Seen)
			VALUES (:email, :eventid, :description, 0);";
			
		$params = array(
			":email" => htmlspecialchars($target),
			":eventid" => htmlspecialchars($eventID),
			":description" => htmlspecialchars($description)
		);
		
		$query = $db->prepare($queryString);
		
		// Execute the query.
		$query->execute($params);
	}
?>
