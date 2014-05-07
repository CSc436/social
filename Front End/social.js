$(document).ready(function () {

    $("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
	$("#sidebar-main").css('top', $("#top-menu").height());
	$("#my-account-menu").css('top', 0 - $("#my-account-menu").height());
	$("#notifications-dropdown").css('top', 0 - $("#notifications-dropdown").height());
	//$("#notifications-dropdown").css('right', $(window).width() - $("#notification-icon").offset().left + $("#notification-icon").outerWidth());
	
	$("#events-wrapper").css('height', $(window).height()-$("#events-wrapper").position().top-40);
    
	// Load the login form into the page.
	$.get(
		"accounts/login.php",
		{},
		function(data){
			// Attach the returned content to the body.
			$('body').append(data);
			$("#login_form").css("margin-left", -($("#login_form").width() / 2));
			$("#login_form").css("margin-top", -($("#login_form").width() / 2));
		}
	);
	
	// Load the new account form into the page.
	$.get(
		"accounts/newaccount.php",
		{},
		function(data){
			// Attach the returned content to the body.
			$('body').append(data);
			$("#new_account_form").css("margin-left", -($("#new_account_form").width() / 2));
			$("#new_account_form").css("margin-top", -($("#new_account_form").width() / 2));
		}
	);
	
	// Bind some functionality to the logout button.
	$("#logout-button").click(function () {
		
		// Processing message.
		displayMsg("Logging Out...", "");
		
		// Close any opened events.
		unfocusEvent();
	
		// Call the logout script.
		$.get(
			"../backend/accounts/process_logout.php",
			{},
			function(data){
				// Display a success message and toggle the logout button.
				closeMsg();
				displayMsg("Logout Successful!", "", "OK");
				toggleLoginButton(0);
				unfocusEvent(currentMarker);
				loadEventsFromDB();
			}
		);
	});

	// Toggle the sidebar
    $("#list-toggle").click(function () {
	
		// Allow the show/hide button to slide upon it first being clicked.
		if(!$("#list-toggle").hasClass("sliding-object")){
			$("#list-toggle").addClass("sliding-object");
		}
	
		// Restore the sidebar.
		if($("#sidebar-main").position()['left'] < 0){
			$("#sidebar-main").css('left', 0);
		}
		// Hide the sidebar.
		else{
			$("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
		}
    });
	
	$("#notification-icon").click(function() {
		toggleNotifications();
	});
	
	// all-events tab clicked.
	$("#all-events-tab").click(function(){
		switchTabs("#all-events-tab");
		loadEventsFromDB();
	});
	$("#my-events-tab").click(function(){
		switchTabs("#my-events-tab");
		loadEventsFromDB(false, ":self");
	});
	$("#my-attending-tab").click(function(){
		switchTabs("#my-attending-tab");
		loadEventsFromDB();
	});
	
	// Intercept the form submit and use AJAX instead.
	$("#events-searchbar-form").submit(function(e){
	
		// Prevent the form from changing the page.
		e.preventDefault();
		
		// Display a "processing" message.
		//displayMsg("Filter Events", "Searching...");
		
		// Apply filters and reload events.
		var owner = (currentActiveTab == "#my-events-tab")? ":self" : null;
		var title = ($("#filter-title").val() != "")? $("#filter-title").val() : null;
		var category = ($("#filter-category").val() != "")? $("#filter-category").val() : null;
		//var radius = $("#filter-radius").val();
		setFilterSettings(owner, title, category, null);
		circle = new google.maps.Circle({radius: (1609*($("#filter-radius").val())), center: map.getCenter()});
    			map.fitBounds(circle.getBounds());
	});
});

// On window resize, do...
$(window).resize(function(){	
	// If the sidebar is hidden, make sure it stays hidden.
	if($("#sidebar-main").position()['left'] < 0){
		$("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
	}
	
	$("#events-wrapper").css('height', $(window).height()-$("#events-wrapper").position().top-40);
	//$("#notifications-dropdown").css('right', $(window).width() - $("#notification-icon").offset().left + $("#notification-icon").outerWidth());
});

messageIsDisplayed = false;

// Displays a message to the user.
function displayMsg(title, message, buttonText, onCancelFunction){
	
	buttonText = (typeof buttonText !== 'undefined' && buttonText != null) ? buttonText : "Cancel";
	
	// Load the login form into the page.
	$.post(
		"accounts/accounterr.php",
		{ title: title,
		errmsg: message,
		buttonText: buttonText},
		function(data){
		
			// Prevent two messages from appearing at the same time.
			if(messageIsDisplayed){
				closeMsg();
			}
		
			$('body').append(data);
			
			// Bind a function to the cancel button if one is supplied.
			if(typeof onCancelFunction !== 'undefined' && onCancelFunction != null && typeof onCancelFunction === 'function')
				$("#account_error_cancel").click(onCancelFunction);
			
			$("#account_error_msg_window").css("margin-left", -($("#account_error_msg_window").width() / 2));
			$("#account_error_msg_window").css("margin-top", -($("#account_error_msg_window").width() / 2));
			
			messageIsDisplayed = true;
		}
	);
}

// Closes the message prompt.
function closeMsg(){
	$("#account_error").css("visibility", "hidden");
	$("#account_error").detach();
	messageIsDisplayed = false;
}

function toggleMyAccountMenu(state){

	// Restore the menu.
	if($("#my-account-menu").position()['top'] < 0){
		$("#my-account-menu").css('top', $("#top-menu").height());
	}
	// Hide the menu.
	else{
		$("#my-account-menu").css('top', 0 - $("#my-account-menu").height());
	}
}

function toggleNotifications(){

	// Restore the menu.
	if($("#notifications-dropdown").position()['top'] < 0){
		$("#notifications-dropdown").css('top', $("#top-menu").height());
		
		// Update the notifications;
		getNotifications();
	}
	// Hide the menu.
	else{
		$("#notifications-dropdown").css('top', 0 - $("#notifications-dropdown").height());
	}
}

function toggleLoginButton(state){

	// Switch from login to my account.
	if(state == 1){
		$("#my-account").html("My Account");
		$("#my-account").attr('onclick','').unbind('click');
		$("#my-account").click(function (){
			toggleMyAccountMenu();
		});
	}
	// Switch from my account to login.
	else{
		$("#my-account-menu").css('top', 0 - $("#my-account-menu").height());
	
		// Open the login form when the user clicks "log in".
		$("#my-account").html("Log In");
		$("#my-account").attr('onclick','').unbind('click');
		$("#my-account").click(function () {
			$("#login").css("visibility", "visible");
		});
	}
}

currentActiveTab = "#all-events-tab";
function switchTabs(tab){

	// Switch the currently active tab.
	$(currentActiveTab).removeClass("event-tab-active");
	currentActiveTab = tab;
	$(currentActiveTab).addClass("event-tab-active");
}

function clearNotifications(){
	$("#notifications-dropdown").html("");
}

function markNotificationSeen(notifID){

	$("#notif-" + notifID).addClass("notification-seen");
	
	// Ajax call to the mark php script.
	$.post(
		'../backend/notifications/markNotificationSeen.php',
		{notifid: notifID},
		function(message) { 
		}
	);
}

function processNotification(notifID, description, eventID, seen){

	// Style differently if the notification has been seen.
	var seenClass = (seen == 1)? "notification-seen" : "";
	var notif = "<a href=# class='notification-link'><div id='notif-" + notifID + "' class='notification " + seenClass + "'>" + description + "</div></a>";
	$("#notifications-dropdown").append(notif);
	
	// Attach an on-click to the notification.
	$("#notif-" + notifID).click(function() {
	
		// Focus the event attached to this notification if it has one.
		if(eventID >= 0)
			focusEventGivenID(eventID);
			
		// Mark this event as 'seen'
		markNotificationSeen(notifID);
	});
}

function getNotifications(){

	clearNotifications();

	// Check if the user is logged in.
	$.ajax({
		url: "checkloggedin.php",
		type: "POST",
		success:function(email) {
			console.log(email['message']);
			
			// Get all of this user's notifications;
			$.get(
				'../backend/notifications/getNotifications.php',
				{email: email['message']},
				function(notifs) {
				
					clearNotifications();
					
					// Sort the notifications so that the unseen ones are first.
					notifs.sort(function(x, y) { return x['Seen'] - y['Seen'] } )
					
					// Process each notification.
					for(var key in notifs){
						var notif = notifs[key];
						processNotification(notif['NotificationID'], notif['Description'], notif['EventID'], notif['Seen']);
					}
				},
				"json"
			);
		},
		error:function(message) {
			// Not logged in. Do nothing.
		},
		dataType: "json"
	});
}