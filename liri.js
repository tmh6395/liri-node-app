require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
// let spotify = new Spotify(keys.spotify);
let action = process.argv[2];

//	*******************************************
//					concert-this
//	*******************************************

// node liri.js concert-this <artiist/band name here>
	// name of the venue
	// venue location
	// date of the event (use moment to format this as "MM/DD/YYYY")

if (action === "concert-this"){
	let artist = process.argv[3];

axios.get("https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp")
	.then(
		function(response){
			console.log(response.venue);
		}
	);
}






//	*******************************************
//				spotify-this-song
//	*******************************************



// node liri.js spotify-this-song '<song name here>'
	// artist(s)
	// the song's name
	// a preview link of the song from spotify
	// the album that the song is from

	// if no song is provided then your program will default to "The Sign" by Ace of Base

	// you will utilize the node-spotify-api package in order to retrieve song information
		//from the Spotify API
	// client ID: 104db1fcf07745d781013016e18e3590
	// client secret: c72f25d543e94a77aa3d87a6b9d0260e







//	*******************************************
//					movie-this
//	*******************************************


// node liri.js movie-this '<movie name here>'
	/* this will output the following information to your terminal/bash window:
		* Title of the movie.
		* Year the movie came out.
		* IMDB Rating of the movie.
		* Rotten Tomatoes Rating of the movie.
		* Country where the movie was produced.
		* Language of the movie.
		* Plot of the movie.
		* Actors in the movie.
	*/
	// if the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody'

	// you'll use the axios package to retrieve data from the OMDB API. Like all of the in-class
		// activities, the OMDB API requires an API key. You may use trilogy.






//	********************************************************************************
//	THE BELOW WORKS, JUST COMMENTED OUT TO NOT BE ANNOYING FOR CHECKING ABOVE CODES
//	********************************************************************************

// else if (action === "movie-this"){
// 	let title = "Mr. Nobody";
// 	let movieInput = process.argv[3];
// 	if (movieInput){
// 		title = movieInput;
// 	}

// 	axios.get("http://www.omdbapi.com/?t=" + title + "&y=&apikey=trilogy")
// 		.then(
// 			function (response) {
// 				// console.log(response);
// 				console.log("The movie's title is: " + response.data.Title);
// 				console.log("The movie's release year is: " + response.data.Year);
// 				console.log("The movie's IMDB rating is: " + response.data.imdbRating);
// 				// console.log("The movie's Rotten Tomatoes rating is: " + response.data.tomatoRating);
// 				console.log("The movie's country it was produced in is: " + response.data.Country);
// 				console.log("The movie's plot is: " + response.data.Plot);
// 				console.log("The movie's actors are: " + response.data.Actors);
// 			}
// 		);
// }















	
// node liri.js do-what-it-says
	// using the fs node package, LIRI will take the text inside of random.txt and then use
	// it to call one of LIRI's commands
	// it should run spotify-this-song for "I Want it That Way" as follows the text
	// in random.txt
	// edit the text in random.txt to test out the feature for movie-this and concert-this












