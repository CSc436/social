<?php
	// Create a new PDO object
	$db = new PDO(
		"mysql:host=localhost;dbname=cstestdb",
		"crowdsocial",
		"pooreview"
	);
	
	// Have the PDO object throw an exception if anything happens.
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>