// Define the possible spaces
var MISS = "MISS",
	HIT = "HIT",
	SUNK = "SUNK",
	DUPE = "DUPLICATE";

// Define the dimensions
var WIDTH = 10,
	HEIGHT = 10;

var DEBUG = (window.location.href.indexOf("debug=on") != -1);

function debug() {
	if (DEBUG) {
		console.log(Array.prototype.slice.call(arguments).join(" "));
	}
}