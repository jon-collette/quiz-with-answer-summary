console.clear();
// helper functions
function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
var data = [{
	shortname: "q1",
	question: '<span class="eyebrow">Question 1</span><h2>I enjoy spending time outdoors.</h2><p>This question explores individual preferences towards outdoor activities and nature.</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.20, 0.10, 0.40, 0.30]
}, {
	shortname: "q2",
	question: '<span class="eyebrow">Question 2</span><h2>I believe technology improves our quality of life.</h2><p>Assesses opinions on the impact of technology on daily living and well-being.</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.10, 0.20, 0.35, 0.35]
}, {
	shortname: "q3",
	question: '<span class="eyebrow">Question 3</span><h2>I prefer reading books over watching movies.</h2><p>Compares preferences between reading and watching movies for entertainment.</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.30, 0.25, 0.20]
}, {
	shortname: "q4",
	question: '<span class="eyebrow">Question 4</span><h2>I think it\'s important to eat healthy foods.</h2><p>Surveys attitudes towards the importance of maintaining a healthy diet.</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.15, 0.15, 0.30, 0.40]
}, {
	shortname: "q5",
	question: '<span class="eyebrow">Question 5</span><h2>I feel comfortable meeting new people.</h2><p>Evaluates comfort levels in social interactions, particularly with new acquaintances.</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.30, 0.20, 0.25, 0.25]
}];

var $questionsContainer = $('#questions-container');

// Iterate through each item in the dataset
$.each(data, function(index, item) {
	// Create a new question block
	var $questionBlock = $('<div class="carousel-item"></div>');
	var $innerContainer = $('<div class="p-3"><div class="row"><div class="col"></div></div></div>');
	$questionBlock.append($innerContainer);
	var $colContainer = $innerContainer.find('.col');
	// Insert the question text
	var questionHtml = item.question; // This already contains the required HTML
	$colContainer.append('<div class="text-block">' + questionHtml + '</div>');
	// Create answer options
	var $answersRow = $('<div class="row mb-3"></div>');
	$.each(item.answers, function(ansIndex, answer) {
		var answerId = item.shortname + '-' + ansIndex;
		var $answerCol = $('<div class="col-3"></div>');
		var $formCheck = $('<div class="form-check"></div>');
		$formCheck.append('<input class="form-check-input" id="' + answerId + '" name="' + item.shortname + '-selection" type="radio" value="' + answerId + '">');
		$formCheck.append('<label class="form-check-label" for="' + answerId + '">' + answer + '</label>');
		$answerCol.append($formCheck);
		$answersRow.append($answerCol);
	});
	$colContainer.append($answersRow);
	// Append navigation buttons
	var $buttonGroup = $('<div class="button-group text-center"></div>');
	$buttonGroup.append('<button class="btn btn-primary" data-slide-to="prev">Previous question</button>');
	$buttonGroup.append(' ');
	$buttonGroup.append('<button class="btn btn-primary" data-slide-to="next">Next question</button>');
	$colContainer.append($buttonGroup);
	// Append the entire question block to the container
	$questionsContainer.append($questionBlock);
});
// move results to the end
$('#results').appendTo($('#results').parent());
// append step values to everything in the carousel
$('#contentcarousel .carousel-item').each(function(index) {
	$(this).attr('data-progress-step', index);
});

// advanced slide control
$("*[data-slide-to]").on("click", function() {
	var slide = $(this).data("slide-to");
	var currentIndex = $(this).closest(".carousel").find('.carousel-item.active').index();
	if (slide === "next") {
		$(this).closest(".carousel").carousel("next");
		updateProgressBar(currentIndex+1);
	} else if (slide === "prev") {
		$(this).closest(".carousel").carousel("prev");
		updateProgressBar(currentIndex-1);
	} else if (Number.isInteger(slide) && slide < $(".carousel-item").length) {
		$(this).closest(".carousel").carousel(slide);
		updateProgressBar(slide);
	} else if (typeof slide === "string" && $(".carousel-item#" + slide).length > 0) {
		slide = $(".carousel-item#" + slide).index();
		$(this).closest(".carousel").carousel(slide);
	} else {
		console.log("Slide " + slide + " is not found.");
	}
});

// Function to update the progress bar, snappier progress bar update when told on click where it's going
function updateProgressBar(index) {
	var totalSteps = $('#contentcarousel .carousel-item').length;
	// Calculate so step 1 is width: 0%, step -1 is width: 100%
	var progressWidth = (index / (totalSteps - 1)) * 100;
	$('#progress-bar').css('width', progressWidth + '%');
}