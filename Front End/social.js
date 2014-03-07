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
    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
        eventList.toggle("slide",{direction: "left"}, 500);
    });    
});