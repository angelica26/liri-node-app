var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var command = process.argv[2];
var songOrMovie = process.argv[3];

//Twitter feature//
function getTweets() {
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
// console.log(keys.consumer_key)
var params = {screen_name: 'MacnCheeseBros'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
}

//Spotify feature//
function spotify() {
var spotify = new Spotify({
  id: "21fea63f2e07474fbc311f5fa4da8313",
  secret: "174c37c1462a4b94a42d0a77ab7615ca"
});
//if no song input, default to "The Sign"//
  if (songOrMovie == null){
	songOrMovie = "The Sign";
}
 
spotify.search({ type: 'track', query: songOrMovie, limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

 // had a hard time navigating to the data I wanted :( //
// console.log(data.tracks.items); 
var trackInfo = data.tracks.items;

for (var i = 0; i < trackInfo.length; i++){
	console.log("Song name: " + trackInfo[i].name);
	console.log("Album: " + trackInfo[i].album.name);
 	console.log("Link to song preview: " + trackInfo[i].preview_url);
 	var artistInfo = trackInfo[i].artists;
 	for (var i = 0; i < artistInfo.length; i++){
	console.log("Artist(s): " + artistInfo[i].name); 
	}
}
});
}
//Need to add movie-this feature//
function movie(){

if (songOrMovie == null){
	songOrMovie = "Mr. Nobody";
}
request("http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
  	// console.log(JSON.parse(body));
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
    console.log("Countries: " + JSON.parse(body).Country);
    console.log("Languages: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Starring: " + JSON.parse(body).Actors);

  }
});


}

//assigning the different feature functions to the different commands
if (command == "my-tweets"){
	getTweets();
} else if (command == "spotify-this-song"){
	spotify();
} 
//need to add condition of command being "movie-this"
else if (command == "movie-this"){
	movie();
}