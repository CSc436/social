<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$query = $db->prepare("
		SELECT `email` FROM `attending`
		WHERE
		`event` = :id
		");

	$query->execute(array(
		':id' => $_GET['eventID']
		));

	echo json_encode($query->fetchAll());
?>