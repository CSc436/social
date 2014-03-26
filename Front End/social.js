$(document).ready(function () {

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

	// Open the login form when the user clicks "log in".
	$("#my-account").click(function () {
		$("#login").css("visibility", "visible");
	});
});

//slide for event list
$(document).ready(function () {
    
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
    function populateEventList(){
        $("#events-wrapper").append('<div class="event"><span>Midnight Salsa Dancing</span></br><span>12:00am - 2:00am</span></br><span>Dancing in the ancient style of Salsa. At midnight.</span></div>');
    }
    
    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
        if ($("#event-list").is(":hidden")) {
            populateEventList();
        } 
        eventList.toggle("slide",{direction: "left"}, 500);
    });
});

// Displays a message to the user.
function displayMsg(title, message){
	
	// Load the login form into the page.
	$.post(
		"accounts/accounterr.php",
		{ title: title,
		errmsg: message},
		function(data){
			$('body').append(data);
			$("#account_error_msg_window").css("margin-left", -($("#account_error_msg_window").width() / 2));
			$("#account_error_msg_window").css("margin-top", -($("#account_error_msg_window").width() / 2));
		}
	);
}

// Closes the message prompt.
function closeMsg(){
	$("#account_error").detach();
}
