<?php
	// Create a new PDO object.
	$db = new PDO(
        "mysql:host=localhost;dbname=cstestdb",
        "crowdsocial",
        "pooreview"
    );

	// Prepare a query.
	$query = $db->prepare("
		Select * From user
	");
	
	// Execute the query.
	$query->execute();
	
	// Fetch every result.
	$result = $query->fetchAll();
	
	echo("All users in the database:<ol>");
	
	// Loop through the results and print every username.
	foreach($result as $res){
		echo("<li>" . $res['Username'] . "</li>");
	}
	
	echo("</ol>");
?>