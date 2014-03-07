//slide for sidebar
$(document).ready(function () {
    $("#showhide").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $(this).toggle("slide",{direction: "left"},500);
        if ($("#event-list").is(":visible")) {
            $("#event-list").hide();
        }    
    });
    
    $("#showhide-hidden").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $("#showhide").toggle("slide",{direction: "left"},500);
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