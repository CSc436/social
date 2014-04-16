<?php
 	include("connect.php");

 	$queryString = "
		Select * From event, locale,category
		where event.locationid=locale.locationid 
		AND event.categoryID=category.categoryID
		AND ABS(".$_GET['currentLat']."-latitude) < (3276.8/POW(2,".$_GET['zoom']."))
		AND ABS(".$_GET['currentLong']."-longitude) < (3276.8/POW(2,".$_GET['zoom'].")"

	if(isset($_GET['Category'])){
		$queryString.="AND category.categoryName='".$_GET['Category']."'"
	}
	if(isset($_GET['Title'])){
		$queryString.="AND event.Title LIKE '%".$_GET['Title']."%'"
	}
	if(isset($_GET['Owner'])){
		$queryString.="AND event.Email='".$_GET['Owner']."'"
	}
	if(isset($_GET['StartDate'])){
		//$queryString.="AND category.categoryName='".$_GET['Category']."'"
	}
	$queryString.=");"
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute();
	
	// Fetch every result.
	//$result = $query->fetchAll();

    echo json_encode($query->fetchAll());
?>
