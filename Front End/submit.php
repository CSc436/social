<?php
	include '..\backend\connect.php';

	$add_category = $db->prepare("
		REPLACE INTO `category` (`CategoryName`)
		VALUES 
		(:category)
		");
	$add_category->execute(array(
		':category' => $_POST['category']
		));

	$get_catID_query= $db->prepare("
		SELECT `categoryID` FROM `category`
		WHERE 
			categoryname = :category
		");

	$get_catID_query->execute(array(
		':category' => $_POST['category']
		));

	$catID = $get_catID_query->fetch();

	$add_locale = $db->prepare("
		REPLACE INTO `locale` (`longitude`, `latitude`)
		VALUES 
		(:xcoord, :ycoord)
		");
	$add_locale->execute(array(
		':xcoord' => $_POST['x'],
		':ycoord' => $_POST['y']
		));

	$get_locID_query= $db->prepare("
		SELECT `locationID` FROM `locale`
		WHERE
			ROUND(longitude, 4) = ROUND(:xcoord, 4) AND
			ROUND(latitude, 4) = ROUND(:ycoord, 4)
		");

	$get_locID_query->execute(array(
		':xcoord' => $_POST['x'],
		':ycoord' => $_POST['y']
		));

	$locID = $get_locID_query->fetch();

    $add_event = $db->prepare("
        INSERT INTO `event`
            (`title`, `email`, `timestamp`, `locationID`, `description`, `categoryID`)
        VALUES
            (:title, :email, CURRENT_TIMESTAMP, :locid, :desc, :catID)
    ");


    $add_event->execute(array(
        ':title' => $_POST['title'],
        ':email' => "bar@bar.com",
        ':locid' => $locID[0],
        ':desc' => $_POST['desc'],
        ':catID' => $catID[0]
    ));


    $get_event = $db->prepare("
    	SELECT * FROM `event`
    	ORDER BY `timestamp` DESC
    	LIMIT 1
    	");
    $get_event->execute();

    $result = $get_event->fetch();

    echo json_encode($result);
	// echo json_encode($_POST);


	// replace into `category` values ('derp');
	// select categoryID from category where categoryname = 'derp';

?>