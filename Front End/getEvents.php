<?php
 	include("connect.php");

 	$queryString = "
		Select * From event, locale, category
		where event.locationid=locale.locationid 
		AND event.categoryID=category.categoryID
		AND ABS(:currentLat-latitude) < (3276.8/POW(2,:zoom))
		AND ABS(:currentLong-longitude) < (3276.8/POW(2,:zoom))";
		
	$params = array(
		":currentLat" => htmlspecialchars($_GET['currentLat']),
		":currentLong" => htmlspecialchars($_GET['currentLong']),
		":zoom" => htmlspecialchars($_GET['zoom']),
	);

	// ***** APPLY FILTERS *****
	if(isset($_GET['Category'])){
		$params[":category"] = htmlspecialchars($_GET['Category']);
		$queryString.=" AND category.CategoryName=':category'";
	}
	if(isset($_GET['Title'])){
		$params[":title"] = htmlspecialchars($_GET['Title']);
		$queryString.=" AND event.Title LIKE '%:title%'";
	}
	if(isset($_GET['Owner'])){
		$params[":owner"] = htmlspecialchars($_GET['Owner']);
		$queryString.=" AND event.Email=':owner'";
	}
	if(isset($_GET['StartDate'])){
		//$params[":startdate"] = htmlspecialchars($_GET['StartDate']);
		//$queryString.=" AND event.StartDate=':startdate'";
	}
	
	$queryString.=";";
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute($params);

    echo json_encode($query->fetchAll());
?>
