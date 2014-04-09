<?php
	include '..\backend\connect.php';
	session_name("loggedin");
	session_start();

	$add_category = $db->prepare("
		INSERT IGNORE INTO `category` (`CategoryName`)
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
		INSERT IGNORE INTO `locale` (`longitude`, `latitude`)
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

    // echo json_encode($_SESSION['loggedin']);
    $add_event->execute(array(
        ':title' => $_POST['title'],
        ':email' => $_SESSION['loggedin'],
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



    $event_id = $result["EventID"];
    // echo json_encode($event_id);
    $kwID_array = array();

	if (isset($_POST['keywords'])) {
		$arr = $_POST['keywords'];
		foreach ($arr as $value) {
			$add_keyword = $db->prepare("
				INSERT IGNORE INTO `keyword`
					(`Word`)
				VALUES
					(:keyword)
				");
			$add_keyword->execute(array(
				':keyword' => $value
				));
			
			$get_kwID_query = $db->prepare("
				SELECT `keywordID` from `keyword`
				WHERE
				`Word` = :keyword
				");
			$get_kwID_query->execute(array(
				':keyword' => $value
				));
			$kwID = $get_kwID_query->fetch();
			array_push($kwID_array, $kwID['keywordID']);
		}
	}

	foreach($kwID_array as $val) {
		$add_kw_event_assoc = $db->prepare("
				INSERT INTO `eventkeyword`
					(`EventID`, `KeywordID`)
				VALUES
					(:eventid, :kw)
			");
		$add_kw_event_assoc->execute(array(
			':eventid' => $event_id,
			':kw' => $val
			));
	}

	// echo json_encode($db->lastInsertId());
    echo json_encode($result);
	

?>