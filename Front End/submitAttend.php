<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$add_query = $db->prepare("
		INSERT IGNORE INTO `attending` 
		(`email`, `event`) 
		VALUES 
		(:email, :id)
		");

	$add_query->execute(array(
		':email' => $_POST['email'],
		':id' => $_POST['eventID']
		));
	
	$select_query = $db->prepare("
		SELECT * FROM `attending`
		WHERE
		`email` = :email and
		`event` = :id
		");

	$select_query->execute(array(
		':email' => $_POST['email'],
		':id' => $_POST['eventID']
		));

	$result = $select_query->fetch();

	echo json_encode($result);

?>