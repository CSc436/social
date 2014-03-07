//slide for sidebar
$(document).ready(function () {
    $("#showhide").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $(this).toggle("slide",{direction: "left"},500);
<<<<<<< HEAD
        if ($("#event-list").is(":visible")) {
            $("#event-list").hide();
        }    
=======
>>>>>>> 29296851537bb7a8d0438900b55a08086a50a01b
    });
    
    $("#showhide-hidden").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $("#showhide").toggle("slide",{direction: "left"},500);
    });    
<<<<<<< HEAD
});

//slide for event list
$(document).ready(function () {
    var eventList = $("#event-list");
    eventList.hide();
    
    $("#events-button").click(function () {
        eventList.toggle("slide",{direction: "left"}, 500);
    });    
});    
=======
});
>>>>>>> 29296851537bb7a8d0438900b55a08086a50a01b
