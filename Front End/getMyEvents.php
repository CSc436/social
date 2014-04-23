<?php
 	include("connect.php");

	$query = $db->prepare("
		Select * From event
        where email = ".$_SESSION['loggedin'].";
	");
	
	// Execute the query.
	$query->execute();
	
	// Fetch every result.
	//$result = $query->fetchAll();

    echo json_encode($query->fetchAll());
?>