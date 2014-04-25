<?php
 	include("connect.php");

 	$query = $db->prepare("
 		SELECT `eventid`, `word` FROM
 		`keyword`, `eventkeyword`
 		WHERE
 		Keyword.keywordID = eventkeyword.keywordID 
 		AND
 		eventID = :id
 		");

 	$query->execute(array(
 		':id' => $_POST["eventID"]
 		));

 	echo json_encode($query->fetchAll());

 ?>

