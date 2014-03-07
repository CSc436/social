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
});

//slide for event list
$(document).ready(function () {
    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
        eventList.toggle("slide",{direction: "left"}, 500);
    });    
});