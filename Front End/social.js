$(document).ready(function () {

    $("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
	$("#sidebar-main").css('top', $("#top-menu").height());
	$("#my-account-menu").css('top', 0 - $("#my-account-menu").height());
    
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
		
        /*$("#sidebar-main").toggle("slide",{direction: "left"},500);
		$(this).toggle("slide",{direction: "left"},500);
		$(this).css('left', 0);*/
		
        if ($("#event-list").is(":visible")) {
            $("#event-list").hide();
        }
    });
    
    /*$("#list-toggle-hidden").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $("#list-toggle").toggle("slide",{direction: "left"},500);
    });*/    
});

// On window resize, do...
$(window).resize(function(){	
	// If the sidebar is hidden, make sure it stays hidden.
	if($("#sidebar-main").position()['left'] < 0){
		$("#sidebar-main").css('left', 0 - $("#sidebar-main").width());
	}
});

/*$(document).ready(function () {

	$("#my-account").click(function () {
		//load_page_into_body("accounts/newaccount.php");
		$("#login").css("visibility", "visible");
		//displayError("This is a test.");
	});
});*/

//slide for event list
$(document).ready(function () {

    $("#logout-button").click(function () {
		
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
					toggleLoginButton(0);
				}
			);
		});
    
    
    //get events and fill event list
    /*function populateEventList(){
	   $.getJSON('getEvents.php', function(data) {
           console.log(data[0]);
           for(var message in data){
               console.log(data[message]["Title"]);
           }
        });
	   return false;
    }*/
    
    /*function populateEventList(){
        $("#events-wrapper").append('<div class="event"><span>Midnight Salsa Dancing</span></br><span>12:00am - 2:00am</span></br><span>Dancing in the ancient style of Salsa. At midnight.</span></div>');
    }*/

    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
	    /*if ($("#event-list").is(":hidden")) {
            populateEventList();
        } */

        eventList.toggle("slide",{direction: "left"}, 500);
    });
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