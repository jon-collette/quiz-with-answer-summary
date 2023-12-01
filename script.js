var data = [{
	shortname: "q1",
	question: '<span class="eyebrow">Scenario 1</span><h2>Ipsum</h2><p>Lorem</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.25, 0.25, 0.25]
}, {
	shortname: "q2",
	question: '<span class="eyebrow">Scenario 2</span><h2>Ipsum</h2><p>Lorem</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.25, 0.25, 0.25]
}, {
	shortname: "q3",
	question: '<span class="eyebrow">Scenario 3</span><h2>Ipsum</h2><p>Lorem</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.25, 0.25, 0.25]
}, {
	shortname: "q4",
	question: '<span class="eyebrow">Scenario 4</span><h2>Ipsum</h2><p>Lorem</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.25, 0.25, 0.25]
}, {
	shortname: "q5",
	question: '<span class="eyebrow">Scenario 5</span><h2>Ipsum</h2><p>Lorem</p>',
	answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
	results: [0.25, 0.25, 0.25, 0.25]
}];

// Assuming you have a div with an ID 'questions-container' where you want to append all questions
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
        $buttonGroup.append('<button class="btn btn-primary mr-auto" data-slide-to="prev">Previous <i class="fas fa-arrow-left"></i></button>');
        $buttonGroup.append('<button class="btn btn-primary ml-auto" data-slide-to="next">Next <i class="fas fa-arrow-right"></i></button>');
        $colContainer.append($buttonGroup);

        // Append the entire question block to the container
        $questionsContainer.append($questionBlock);
    });
    $('#results').appendTo($('#results').parent());

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

$("body").append(data);
console.log(data);

// Call the function to update the progress bar
// This can be triggered based on your carousel's events