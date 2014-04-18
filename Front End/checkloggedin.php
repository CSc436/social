<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	if (!isset($_SESSION['loggedin'])) {
		die("ERROR!");
	}
	else {
		echo json_encode(array('message' => $_SESSION['loggedin']));
	}

?>