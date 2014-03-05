//sidebar slide animation
function sidebarAnimate() {
    $("#sidebar-main").animate({left: "-20%"}, "fast");
    //$("#sidebar-main").animate({width: "0px"}, "fast");
};

//slide for sidebar
$(document).ready(function () {
    $("#showhide").click(function () {
        //sidebarAnimate();
        //$("#sidebar-main").toggle("slow",sidebarAnimate());
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $(this).toggle("slide",{direction: "left"},500);
    });
    
    $("#showhide-hidden").click(function () {
        $("#sidebar-main").toggle("slide",{direction: "left"},500);
        $("#showhide").toggle("slide",{direction: "left"},500);
    });    
});