<?php
 	include("connect.php");

	$query = $db->prepare("
		Select * From event, locale,category
		where event.locationid=locale.locationid 
		AND event.categoryID=category.categoryID
		AND ABS(".$_GET['currentLat']."-latitude) < 0.1167
		AND ABS(".$_GET['currentLong']."-longitude) < 0.1167;
	");
	
	// Execute the query.
	$query->execute();
	
	// Fetch every result.
	//$result = $query->fetchAll();

    echo json_encode($query->fetchAll());
?>
