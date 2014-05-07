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
		":zoom" => htmlspecialchars($_GET['zoom'])
	);

	
	// ***** APPLY FILTERS *****
	if(isset($_GET['owner'])){
		$params[":owner"] = htmlspecialchars($_GET['owner']);
		$queryString .=" AND event.Email=:owner";
	}
	if(isset($_GET['category'])){
		$params[":category"] = htmlspecialchars($_GET['category']);
		$queryString .=" AND category.CategoryName=:category";
	}
	if(isset($_GET['description'])){
		$params[":description"] = "%" . htmlspecialchars($_GET['description']) . "%";
		$params[":kdescription"] = htmlspecialchars($_GET['description']);
		$queryString .=" AND (event.Title LIKE :description OR event.Description LIKE :description
									OR event.eventID IN (Select distinct event.eventID from event, eventkeyword, keyword where
															keyword.word = :kdescription AND keyword.keywordID=eventkeyword.keywordID
															AND event.eventID=eventkeyword.eventID))";
	}
	if(isset($_GET['startdate'])){
		//$params[":startdate"] = htmlspecialchars($_GET['StartDate']);
		//$queryString.=" AND event.StartDate=':startdate'";
	}
	
	$queryString.=" ORDER BY Title;";
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute($params);

    echo json_encode($query->fetchAll());
?>
