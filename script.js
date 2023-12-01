console.clear();
// helper functions
function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
// advanced slide control
$("*[data-slide-to]").on("click", function() {
	var slide = $(this).data("slide-to");
	if (slide === "next") {
		console.log("Next slide");
		$(this).closest(".carousel").carousel("next");
	} else if (slide === "prev") {
		console.log("Prev slide");
		$(this).closest(".carousel").carousel("prev");
	} else if (Number.isInteger(slide) && slide < $(".carousel-item").length) {
		console.log("Go to slide: " + slide);
		$(this).closest(".carousel").carousel(slide - 1);
	} else if (typeof slide === "string" && $(".carousel-item#" + slide).length > 0) {
		console.log("Go to slide with id: " + slide);
		slide = $(".carousel-item#" + slide).index();
		$(this).closest(".carousel").carousel(slide);
	} else {
		console.log("Slide " + slide + " is not found.");
	}
	updateProgressBar();
});

// append step progress
$('#contentcarousel .carousel-item').each(function(index) {
	$(this).attr('data-progress-step', index);
});
// do initial progress update
updateProgressBar();

// Function to update the progress bar
function updateProgressBar() {
	var totalSteps = $('#contentcarousel .carousel-item').length - 1;
	console.log({totalSteps});
	var currentStep = $('#contentcarousel .carousel-item.active').data('progress-step');
	console.log({currentStep});
	var progressWidth = (currentStep / totalSteps) * 100;
	console.log({progressWidth});
	$('#progress-bar').css('width', progressWidth + '%');
}

// Call the function to update the progress bar
// This can be triggered based on your carousel's events