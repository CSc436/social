<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$query = $db->prepare("
		SELECT `Event` FROM `attending`
		WHERE
		`email` = :user
		");

	$query->execute(array(
		':user' => $_POST['user']
		));

	echo json_encode($query->fetchAll());
?>