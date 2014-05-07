<?php
	/****************************************************************************************
	 *								Script Executed When Loaded								*
	 ****************************************************************************************/

	session_name("loggedin");
	session_set_cookie_params(0);
	session_start();
	 
	$returnInfo = array(":code" => 0, ":data" => null);
	 
	// Check if a user is already logged in.
	if(isset($_SESSION['loggedin'])){
		$returnInfo[":code"] = 1;
		$returnInfo[":data"] = "You are already logged in as " . $_SESSION['loggedin'] . ".";
		die(json_encode($returnInfo));
	}
	 
	// Connect to the DB.
	include("../connect.php");

	// Attempt to log the user in.
	$returnInfo[":data"] = checkLogin($db, $_POST['email'], $_POST['password']);
	
	// Start the loggedin PHP session.
	$_SESSION['loggedin'] = $_POST['email'];
			   
	echo json_encode($returnInfo);
	
	/****************************************************************************************
	 *										Functions										*
	 ****************************************************************************************/
	
	/*
	*  checkLogin
	*  Returns whether or not a user exists in the DB with a provided email.
	*/
	function checkLogin($db, $email, $password){

		// Prepare a query.
		$salt_query = $db->prepare("SELECT salt FROM user WHERE Email = :email");
		$params = array(":email" => htmlspecialchars($email));
		$salt_query->execute($params);
	
		// See if anything was returned. Display an error if anything is.
		if($salt = $salt_query->fetch()){
		
			// Generate a hash to compare to what's in the database.
			$hash = hash('sha256', $salt[0] . htmlspecialchars($_POST['password']));
			
			// Compare the generated hash to the one in the database.
			$login_query = $db->prepare("
				SELECT Username FROM user
				WHERE
					Email = :email
				AND
					hash = :hash
			");
			
			$params = array(":email" => htmlspecialchars($email),
							":hash" => $hash);
			
			// Retrieve the username.
			$login_query->execute($params);
			if($username = $login_query->fetch()){
				return $username;
			}
			// Incorrect password.
			else{
				$returnInfo[":code"] = 1;
				$returnInfo[":data"] = "Password is incorrect.";
				die(json_encode($returnInfo));
			}
		}
		// User doesn't exist.
		else{
			$returnInfo[":code"] = 1;
			$returnInfo[":data"] = "There is no user associated with that email.";
			die(json_encode($returnInfo));
		}
	}
?>