
// NOTE
// MIGRATE THE KEYS TO THE .ENV WHEN EVERYTHING ELSE IS CONFIRMED TO WORK

// this line will be helpful:
// let name = process.argv.slice(3).join(' ');

require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);
let action = process.argv[2];


//	*******************************************
//					concert-this
//	*******************************************

// Syntax for CLI:
// node liri.js concert-this <artiist/band name here>

if (action === "concert-this"){
	let bandInput = process.argv.slice(3).join(' ');
axios
	.get("https://rest.bandsintown.com/artists/" + bandInput + "/events?app_id=codingbootcamp")
	.then(
		function(response){
			let results = response.data;
			for (let i in results){
				console.log("Venue name: ", results[i].venue.name);
				console.log("Venue location: ", results[i].venue.city
				+ " " + results[i].venue.region);
				date = moment(results[i].datetime).format('MM/DD/YYYY');
				console.log("Venue date: ", date);
				console.log('\n');
			}
		}
	);
}


//	*******************************************
//				spotify-this-song
//	*******************************************

// Syntax for CLI:
// node liri.js spotify-this-song '<song name here>'

else if (action === "spotify-this-song"){
	let defaultSong = "The Sign";
	let defaultArtist = "Ace of Base";
	let songInput = process.argv.slice(3).join(' ');

	if (!songInput){
		spotify.search(
			{
				type: 'track',
				query: defaultSong,
				query: defaultArtist,
			},

			function(err, data) {
			if (err) {
			return console.log('Error occurred: ' + err);
			}
		
			console.log("Artist(s): ", data.tracks.items[0].artists[0].name);
			console.log("Song name: ", data.tracks.items[0].name);
			console.log("Album name: ", data.tracks.items[0].album.name);
			console.log("Preview URL: ", data.tracks.items[0].preview_url);
		});
	}
	else{
		spotify.search(
			{
				type: 'track',
				query: songInput,
			},

			function(err, data) {
			if (err) {
			return console.log('Error occurred: ' + err);
			}
		
			console.log("Artist(s): ", data.tracks.items[0].artists[0].name);
			console.log("Song name: ", data.tracks.items[0].name);
			console.log("Album name: ", data.tracks.items[0].album.name);
			console.log("Preview URL: ", data.tracks.items[0].preview_url);
		});
	}

}


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

		
else if (action === "movie-this"){
	let title = "Mr. Nobody";
	let movieInput = process.argv.slice(3).join(' ');
	if (movieInput){
		title = movieInput;
	}

	axios.get("http://www.omdbapi.com/?t=" + title + "&apikey=trilogy")
		.then(
			function (response) {
				// console.log(response);
				console.log("The movie's title is: " + response.data.Title);
				console.log("The movie's release year is: " + response.data.Year);
				console.log("The movie's IMDB rating is: " + response.data.Ratings[0].Value);
				console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
				console.log("The movie's country it was produced in is: " + response.data.Country);
				console.log("The movie's plot is: " + response.data.Plot);
				console.log("The movie's actors are: " + response.data.Actors);
			}
		);
}















	
// node liri.js do-what-it-says
	// using the fs node package, LIRI will take the text inside of random.txt and then use
	// it to call one of LIRI's commands
	// it should run spotify-this-song for "I Want it That Way" as follows the text
	// in random.txt
	// edit the text in random.txt to test out the feature for movie-this and concert-this












