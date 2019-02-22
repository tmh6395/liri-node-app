# liri-node-app

This app will take in arguments about either a band that will soon go on tour, a song that you'd like to hear on Spotify, or a movie of which you'd like to see the details.
This app uses API keys from BandsInTown, Spotify, and the Open Movie Database (OMDB).  To access this information, you will need to use a command line interface and type in the appropriate syntax.

The syntax of the Command Line Interface (CLI) differs for each request, and each will be explained in their respective sections below.

At the very bottom is a video showcasing the app in action.

## Bands In Town

This is the syntax for the CLI:

* *node liri.js concert-this "_artist/band name here_"

The BandsInTown API will take in a band or music artist, given by you via the CLI, and will give the following details:
* The name of the venue where the tour will be held
* The location of the venue (city and region)
* The date of the tour at each given venue, in the MM/DD/YYYY format

## Spotify

This is the syntax for the CLI:

* node liri.js spotify-this-song "_song name here_"

The Spotify API will take in a song, given by you via the CLI, and will give the following details:
* The name of the artist(s) that sing the song
* The name of the song
* The name of the album on which the song appears
* A link to a 30-second preview of the song, supplied by Spotify
* If no song is supplied, then results will be given for "The Sign" by Aces of Bases

## Open Movie Database

This is the syntax for the CLI:

* node liri.js movie-this "_movie name here_"

The OMDB API will take in a movie title, given by you via the CLI, and will give the following details:
* The movie's title
* The year when the movie was released
* IMDB's rating for the movie
* Rotten Tomatoes' rating for the movie
* The country/countries that the movie was filmed in
* A short summary of the plot of the movie
* A list of actors that had roles the movie