<?php
 	include("connect.php");

 	$query = $db->prepare("
 		UPDATE `event`
 		SET `FlagCount` = `FlagCount` + 1
 		WHERE `eventID` = :id;
 		");

 	$query->execute(array(
 		':id' => $_POST["eventID"]
 		));

 ?>

