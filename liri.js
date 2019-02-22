require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let axios = require("axios");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let action = process.argv[2];
let userInput = process.argv.slice(3).join(' ');
let isInputFromTextFile = false;


//	*******************************************
//					concert-this
//	*******************************************

// Syntax for CLI:
// node liri.js concert-this <artiist/band name here>

let concertThis = function (input) {
	if (isInputFromTextFile) {
		userInput = input;
	}

	axios
		.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
		.then(
			function (response) {
				let results = response.data;
				for (let i in results) {
					console.log("Venue name: ", results[i].venue.name);
					console.log("Venue location: ", results[i].venue.city
						+ " " + results[i].venue.region);
					date = moment(results[i].datetime).format('MM/DD/YYYY');
					console.log("Venue date: ", date);
					console.log('\n');
				}
			}
		);
	isInputFromTextFile = false;
}


//	*******************************************
//				spotify-this-song
//	*******************************************

// Syntax for CLI:
// node liri.js spotify-this-song '<song name here>'

let spotifyThisSong = function (input) {

	if (!isInputFromTextFile) {
		if (!userInput) {
			// default 'the sign'
			userInput = "The Sign";
			defaultArtist = "Ace of Base";
			spotify.search(
				{
					type: 'track',
					query: userInput,
					query: defaultArtist,
				},
				function (err, data) {
					if (err) {
						return console.log('Error occurred: ' + err);
					}

					console.log("Artist(s): ", data.tracks.items[0].artists[0].name);
					console.log("Song name: ", data.tracks.items[0].name);
					console.log("Album name: ", data.tracks.items[0].album.name);
					console.log("Preview URL: ", data.tracks.items[0].preview_url);
				});
		}
		else {
			// song info about song from CLI
			// userInput = process.argv.slice(3).join(' ');
			spotify.search(
				{
					type: 'track',
					query: userInput,
				},
				function (err, data) {
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
	else if (isInputFromTextFile) {
		userInput = input;
		spotify.search(
			{
				type: 'track',
				query: userInput,
			},
			function (err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}
				console.log("Artist(s): ", data.tracks.items[0].artists[0].name);
				console.log("Song name: ", data.tracks.items[0].name);
				console.log("Album name: ", data.tracks.items[0].album.name);
				console.log("Preview URL: ", data.tracks.items[0].preview_url);
			});

	}
	isInputFromTextFile = false;
}


//	*******************************************
//					movie-this
//	*******************************************

// Syntax for CLI:
// node liri.js movie-this '<movie name here>'

let movieThis = function (input) {

	if (isInputFromTextFile) {
		userInput = input;
	}
	else {
		userInput = "Mr. Nobody";
	}

	let movieInput = process.argv.slice(3).join(' ');
	if (movieInput) {
		userInput = movieInput;
	}
	axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy")
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
	isInputFromTextFile = false;
}


//	*******************************************
//					do-what-it-says
//	*******************************************

// Syntax for CLI:
// node liri.js do-what-it-says

if (action === "concert-this") {
	concertThis();
}

else if (action === "spotify-this-song") {
	spotifyThisSong();
}

else if (action === "movie-this") {
	movieThis();
}

else if (action === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function (error, data) {

		if (error) {
			return console.log(error);
		}
		newDirections = data.split(',');
		action = newDirections[0];

		inputFromText = newDirections[1];
		inputFromText = inputFromText.split('\"')[1];

		isInputFromTextFile = true;

		if (action === "concert-this") {
			concertThis(inputFromText);
		}

		else if (action === "spotify-this-song") {
			spotifyThisSong(inputFromText);
		}

		else if (action === "movie-this") {
			movieThis(inputFromText);
		}

	});
}
