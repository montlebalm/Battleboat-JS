// Define the possible spaces
var EMPTY = 0,
	SHIP = 1,
	HIT = 2,
	MISS = 3;

// Define the dimensions
var WIDTH = 10,
	HEIGHT = 10;

// Instantiate the util class
var util = new Util();

var ships = [
	util.makeShip("Battleship", 5),
	util.makeShip("Tug Boat", 2)
];