<?php
 	include("connect.php");

	$query = $db->prepare("
		Select * From event, locale where event.locationid=locale.locationid;
	");
	
	// Execute the query.
	$query->execute();
	
	// Fetch every result.
	//$result = $query->fetchAll();

    echo json_encode($query->fetchAll());
?>
