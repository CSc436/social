$(document).ready(function () {

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

	// Position the hide button.
	$("#showhide").css('left', $("#sidebar-main").width());
	$("#showhide").css('height', $("#showhide").width());

    $("#showhide").click(function () {
	
		// Allow the show/hide button to slide upon it first being clicked.
		if(!$("#showhide").hasClass("sliding-object")){
			$("#showhide").addClass("sliding-object");
		}
	
		// Restore the sidebar.
		if($("#sidebar-main").position()['left'] < 0){
			$("#sidebar-main").css('left', 0);
			$("#showhide").css('left', $("#sidebar-main").width());
		}
		// Hide the sidebar.
		else{
			$("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
			$("#showhide").css('left', 0);
		}
		
        /*$("#sidebar-main").toggle("slide",{direction: "left"},500);
		$(this).toggle("slide",{direction: "left"},500);
		$(this).css('left', 0);*/
		
        if ($("#event-list").is(":visible")) {
            $("#event-list").hide();
        }
    });
    
    /*$("#showhide-hidden").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $("#showhide").toggle("slide",{direction: "left"},500);
    });*/    
});

// On window resize, do...
$(window).resize(function(){
	
	// Position and resize the hide button.
	$("#showhide").css('left', $("#sidebar-main").width());
	$("#showhide").css('height', $("#showhide").width());
	
	// If the sidebar is hidden, make sure it stays hidden.
	if($("#sidebar-main").position()['left'] < 0){
		$("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
		$("#showhide").css('left', 0);
	}
});

$(document).ready(function () {

	$("#my-account").click(function () {
		//load_page_into_body("accounts/newaccount.php");
		$("#login").css("visibility", "visible");
		//displayError("This is a test.");
	});
});

//slide for event list
$(document).ready(function () {
    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
        eventList.toggle("slide",{direction: "left"}, 500);
    });
});

messageIsDisplayed = false;

// Displays a message to the user.
function displayMsg(title, message){
	
	// Load the login form into the page.
	$.post(
		"accounts/accounterr.php",
		{ title: title,
		errmsg: message},
		function(data){
		
			// Prevent two messages from appearing at the same time.
			if(messageIsDisplayed){
				closeMsg();
			}
		
			$('body').append(data);
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

function toggleLogoutButton(state){

	// Switch from login to logout.
	if(state == 1){
		$("#my-account").html("Log Out");
		$("#my-account").attr('onclick','').unbind('click');
		$("#my-account").click(function () {
		
			// Processing message.
			displayMsg("Logging Out...", "");
		
			// Call the logout script.
			$.get(
				"../backend/accounts/process_logout.php",
				{},
				function(data){
					// Display a success message and toggle the logout button.
					closeMsg();
					displayMsg("Logout Successful!", "");
					toggleLogoutButton(0);
				}
			);
		});
	}
	// Switch from logout to login.
	else{
		// Open the login form when the user clicks "log in".
		$("#my-account").html("Log In");
		$("#my-account").attr('onclick','').unbind('click');
		$("#my-account").click(function () {
			$("#login").css("visibility", "visible");
		});
	}
}