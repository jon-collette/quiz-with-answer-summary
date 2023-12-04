console.clear();
// ==== Helper functions ====

// Random num gen
function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// Function to help move the carousel by console
function slideto(index) {
	var slideto = index;
	var totalSteps = $("#contentcarousel .carousel-item").length;
	// basic error proofing
	if (slideto > totalSteps) {
		slideto = totalSteps-1;
	} else if (slideto < 0) {
		slideto = 0;
	}
	$("#contentcarousel").carousel(slideto);
}

// ==== The code ====
// data input
var data = [{
    shortname: "q1",
    eyebrow: "Question 1",
    question: "I enjoy spending time outdoors",
    description: "This question explores individual preferences towards outdoor activities and nature",
    answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    results: [0.20, 0.10, 0.40, 0.30]
}, {
    shortname: "q2",
    eyebrow: "Question 2",
    question: "I believe technology improves our quality of life",
    description: "Assesses opinions on the impact of technology on daily living and well-being.",
    answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    results: [0.10, 0.20, 0.35, 0.35]
}/*, {
    shortname: "q3",
    eyebrow: "Question 3",
    question: "I prefer reading books over watching movies",
    description: "Compares preferences between reading and watching movies for entertainment.",
    answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    results: [0.25, 0.30, 0.25, 0.20]
}, {
    shortname: "q4",
    eyebrow: "Question 4",
    question: "I think it's important to eat healthy foods",
    description: "Surveys attitudes towards the importance of maintaining a healthy diet.",
    answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    results: [0.15, 0.15, 0.30, 0.40]
}, {
    shortname: "q5",
    eyebrow: "Question 5",
    question: "I feel comfortable meeting new people",
    description: "Evaluates comfort levels in social interactions, particularly with new acquaintances.",
    answers: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    results: [0.30, 0.20, 0.25, 0.25]
}*/];

// Container
var $questionsContainer = $("#questions-container");

// Iterate through each item in the dataset
$.each(data, function(index, item) {
	// Create a new question block
	var $questionBlock = $("<div class='carousel-item'></div>");
	var $innerContainer = $("<div class='p-3'><div class='row'><div class='col'></div></div></div>");
	$questionBlock.append($innerContainer);
	var $colContainer = $innerContainer.find(".col");

	// Insert the prompt text
	var questionHtml = "";
	if (item.eyebrow) {
        questionHtml += "<span class='eyebrow'>" + item.eyebrow + "</span>";
    }
    if (item.question) {
        questionHtml += "<h2>" + item.question + "</h2>";
    }
    if (item.description) {
        questionHtml += "<p>" + item.description + "</p>";
    }	
	$colContainer.append("<div class='text-block'>" + questionHtml + "</div>");
	
	// Create answer options
	var $answersRow = $("<div class='row mb-3'></div>");
	$.each(item.answers, function(ansIndex, answer) {
		var answerId = item.shortname + "-" + ansIndex;
		var $answerCol = $("<div class='col-lg-3'></div>");
		var $formCheck = $("<div class='form-check'></div>");
		$formCheck.append("<input class='form-check-input' id='" + answerId + "' name='" + item.shortname + "' type='radio' value='" + answerId + "'>");
		$formCheck.append("<label class='form-check-label' for='" + answerId + "'>" + answer + "</label>");
		$answerCol.append($formCheck);
		$answersRow.append($answerCol);
	});
	$colContainer.append($answersRow);
	// Append navigation buttons
	var $buttonGroup = $("<div class='button-group text-center'></div>");
	$buttonGroup.append("<button class='btn btn-primary' data-slide-to='prev'>Previous question</button>");
	$buttonGroup.append(" ");
	$buttonGroup.append("<button class='btn btn-primary' data-slide-to='next' disabled>Next question</button>");
	$colContainer.append($buttonGroup);
	// Append the entire question block to the container
	$questionsContainer.append($questionBlock);
});

var $resultsBlock = $("#results-block");
$.each(data, function(index, item) {
	// Create a new result block
	var $resultBlock = $("<div id='result-" + item.shortname + "'></div>");
	// Add the question header
	$resultBlock.append("<code>" + item.question + ":</code>");
	// Create the progress bars
	var $progressDiv = $("<div class='progress my-3'></div>");
	$.each(item.results, function(resultIndex, result) {
		// Create each progress bar
		var $progressBar = $("<div class='progress-bar results-bar result-" + item.shortname + "-a" + (resultIndex + 1) + "' role='progressbar' style='width: " + (result * 100) + "%;'></div>");
		$progressDiv.append($progressBar);
	});
	// Append the progress bars to the result block
	$resultBlock.append($progressDiv);
	// Append the result block to the results-block container
	$resultsBlock.append($resultBlock);
});

// append step values to everything in the carousel
$("#contentcarousel .carousel-item").each(function(index) {
	$(this).attr("data-progress-step", index);
});

// move results to the end
$("#results").appendTo($("#results").parent());
// move results to front for debug
/* $("#results").prependTo($("#results").parent());
slideto(-1); */

// advanced slide control
$("*[data-slide-to]").on("click", function() {
	var slide = $(this).data("slide-to");
	var currentIndex = $(this).closest(".carousel").find(".carousel-item.active").index();
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

// Attach change event listener to radio buttons
$(".form-check-input").on("change", function() {
    // Get the name of the group, which corresponds to the question shortname
    var questionName = $(this).attr("name");
    // Remove existing user-selected classes for this question
    $("#result-" + questionName + " .user-selected").removeClass("user-selected");

    // Get the index of the selected answer
    var answerIndex = $(this).parent().parent().index();

    // Add user-selected class to the corresponding progress bar in results
    $("#result-" + questionName + " .results-bar").eq(answerIndex).addClass("user-selected");

    var $currentQuestion = $(this).closest(".carousel-item");
    $currentQuestion.find("[data-slide-to='next']").prop('disabled', false);
});

// Function to update the progress bar, snappier progress bar update when told on click where it"s going
function updateProgressBar(index) {
	var totalSteps = $("#contentcarousel .carousel-item").length;
	// Calculate so step 1 is width: 0%, step -1 is width: 100%
	var progressWidth = (index / (totalSteps - 1)) * 100;
	$("#progress-bar").css("width", progressWidth + "%");
}