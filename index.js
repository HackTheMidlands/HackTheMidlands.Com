$(document).ready(function(){
	var sponsorsLink = $("#sponsorsSignupLink");
	var sponsorsPanel = $("#sponsorsSignupPanel");

	sponsorsLink.click(function(event){
		sponsorsPanel.slideToggle();

		event.preventDefault();
	});
});
