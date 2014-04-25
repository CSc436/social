<?php
 	include("connect.php");

 	$queryString = "SELECT CategoryName FROM category";
	
	$query = $db->prepare($queryString);
	
	// Execute the query.
	$query->execute();
	
    while($category = $query->fetch()){
		echo("<option value='" . $category["CategoryName"] . "'>" . $category["CategoryName"] . "</option>");
	}
?>
