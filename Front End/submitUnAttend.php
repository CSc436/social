<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$delete_query = $db->prepare("
		DELETE FROM `attending`
		WHERE 
		`email`= :email  
		AND
		`event` = :id
		");

	$delete_query->execute(array(
		':email' => $_POST['email'],
		':id' => $_POST['eventID']
		));
	
	// $result = $select_query->fetch();

	echo json_encode(1);

?>