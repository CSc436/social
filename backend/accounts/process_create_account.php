<?php
	/****************************************************************************************
	 *								Script Executed When Loaded								*
	 ****************************************************************************************/

	// Connect to the DB.
	include("../connect.php");

	// First, check if a user attached to the provided email already exists.
	if(checkExistingUser($db, $_POST['email']) == true){
		die("Sorry, there is already an account associated with that email.");
	}
	
	// Check if the passwords match.
	if($_POST['password1'] != $_POST['password2']){
		die("Passwords do not match");
	}
	
	// Generate a salt.
	$salt = generateSalt(32);
		
	// Append the provided password to the salt and hash it.
	$hash = hash('sha256', $salt . htmlspecialchars($_POST['password1']));
	
	// Create the user.
	createUser($db, $_POST['email'], $_POST['username'], $_POST['firstname'], $_POST['lastname'],
			   $salt, $hash, $_POST['phone'], 0);
	
	/****************************************************************************************
	 *										Functions										*
	 ****************************************************************************************/
	
	/*
	*  checkExistingUser
	*  Returns whether or not a user exists in the DB with a provided email.
	*/
	function checkExistingUser($db, $email){

		// Prepare a query.
		$check_existing_user = $db->prepare("SELECT * FROM user WHERE Email = :email");
	
		// Parameterize the user-entered email.
		$params = array(":email" => htmlspecialchars($email));
	
		// Execute the query.
		$check_existing_user->execute($params);
	
		// See if anything was returned. Display an error if anything is.
		if($check_existing_user->fetch())
			return true;
		else
			return false;
	}
	
	/*
	*  generateSalt
	*  Randomly generates string of $length characters. (salt)
	*/
	function generateSalt($length){
		$characters = 'abcdefghijklmnopqrstuvwxyz123';	// Possible characters for the salt
		$lastchar = strlen($characters) - 1;

		$salt = '';
		for ($i = 0; $i < $length; $i++){				// Do $length times...
			$index = mt_rand(0, $lastchar);				// Pick a random number.
			$character = $characters{$index};			// Use it to pick a random character.
			$salt .= $character;						// Append that character to the salt.
		}
		return $salt;
	}
	
	/*
	*  createUser
	*  Inserts a user into the database.
	*/
	function createUser($db, $email, $username, $firstname, $lastname, $salt, $hash, $phone, $rep){
		
		// Prepare the insert query.
		$insert_user_query = $db->prepare("
			INSERT INTO user VALUES (:email, :username, :firstname, :lastname, :salt, :hash, :phone, :rep)
		");
		
		// Parameterize the user information.
		$params = array(
			":email" => htmlspecialchars($email),
			":username" => htmlspecialchars($username),
			":firstname" => htmlspecialchars($firstname),
			":lastname" => htmlspecialchars($lastname),
			":salt" => htmlspecialchars($salt),
			":hash" => htmlspecialchars($hash),
			":phone" => htmlspecialchars($phone),
			":rep" => $rep
		);
		
		try{
			// Execute the insertion.
			$insert_user_query->execute($params);
		} catch (PDOException $e){
			// Display an error.
			// echo("There was an error creating the user:<br><br>" . $e->getMessage());
			echo("There was an error creating the user:<br><br>" . $insert_user_query->errorInfo()[2]);
		}
	}
?>