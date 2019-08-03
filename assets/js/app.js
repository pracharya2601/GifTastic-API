var topics = [
	"san franscisco",
	"berkeley",
	"Barak Obama",
	"Donald Trump",
	"Bernie Sanders",
	"Leo Messi",
	"Cristiano Ronaldo",
	"KarimBenzema",
	"Taylor Swift",
	"James Bond",
	"Coldplay",
	"AC DC",
	"beyonce",
	"Cristien Bale",
	"Drake",
	"Dave Chappel",
	"Divya Shrestha",
	"Prakash",
	"Hello",
	"Good Day"
];

//for topics to put it on page; 
for(var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-graphy", topics[i]); //set vlue of selected element
	button.addClass("giphy-button"); //class for selected element
	$("#button-group").append(button);
}

// onclick event
$(document).on("click", ".giphy-button", function() {
	var giphyImg = $(this).attr("data-graphy");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphyImg + "&api_key=fUmHIGEO9gHHoRTvMZsgFVjY2nycRhju&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	// console.log(results);

		var resultsContainer = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;// value of rating

    		var p = $("<p>").text("Rating: " + rating); //rating on top of image

    		var resultImg = $("<img class='result'>");
    		resultImg.attr("src", results[i].images.fixed_height_still.url);
    		resultImg.attr("data-state", "still");
    		resultImg.attr("data-still", results[i].images.fixed_height_still.url);
    		resultImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(resultImg);
    		singleResultDiv.prepend(p);

    		resultsContainer.prepend(singleResultDiv);
    	}

    	$("#result-img-group").prepend(resultsContainer);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//new giphy search

$("#add-new-button").on("click", function() {
	event.preventDefault();
	// console.log('ghhghg');
	var newSearch = $("#new-giphy-input").val();
	// console.log(newSearch);
	topics.push(newSearch);
	var button = $("<button>").text(newSearch);
	button.attr("data-graphy", newSearch);
	button.addClass("giphy-button");
	$("#button-group").append(button);
	$("#new-giphy-input").val("");
});
//finished