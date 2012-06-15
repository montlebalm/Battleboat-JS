function Player() {};

Player.prototype.name = "WaterWings";

/**
 * Provide coordinates for placing each of your ships on the game board.
 *
 * @param {array} ships A list of ships to be placed
 * @returns {array} A list containing a placement object for each ship. Each object must implement:
 * 		- x: x position of the ship's nose
 *		- y: y position of the ship's nose
 *		- axis: orientation of the ship's body (x == horizontal, y == vertical)
 *		- ship: pointer to the ship object you're placing (ships[0])
 */
Player.prototype.placeShips = function(ships) {
	var placements = [];

	while (ships.length) {
		var x = this.rand(WIDTH);
		var y = this.rand(HEIGHT);
		var size = ships[ships.length - 1].size;
		var axis = (this.rand(2) == 0) ? "x" : "y";

		// Check that the ship both fits on the board and doesn't overlap another one
		var fitsOnBoard = this.shipFits(x, y, axis, size);
		var overlapsOtherShips = this.shipOverlaps(x, y, axis, size, placements);

		if (fitsOnBoard && !overlapsOtherShips) {
			placements.push({
				x: x,
				y: y,
				axis: axis,
				ship: ships.pop()
			});
		}
	}

	return placements;
};

/**
 * Shoot at an enemy ship.
 *
 * @param {array} turns A list of all your previous turns
 * @returns {object} An object specifying where you're shooting. Each object must implement:
 * 		- x: x value of shot
 *		- y: y value of shot
 */
Player.prototype.takeTurn = function(turns) {
	var new_x = 0;
	var new_y = 0;

	if (turns.length > 0) {
		var lastTurn = turns[turns.length - 1];

		if (lastTurn.x == WIDTH - 1) {
			new_x = 0;
			new_y = lastTurn.y + 1;
		} else {
			new_x = lastTurn.x + 1;
			new_y = lastTurn.y;
		}
	}

	return {
		x: new_x,
		y: new_y
	};
};

// ----------------------------------------------------------------------------
// Optional helper methods
// ----------------------------------------------------------------------------

Player.prototype.rand = function(boundry) {
	return Math.floor(Math.random() * boundry);
};

Player.prototype.shipFits = function(x, y, axis, size) {
	var fits = false;

	// First make sure it will fit on the board
	if (axis == "x" && x + size < WIDTH) {
		fits = true;
	} else if (axis == "y" && y + size < HEIGHT) {
		fits = true;
	}

	return fits;
};

Player.prototype.shipOverlaps = function(x, y, axis, size, placements) {
	var overlaps = false;

	// Look down the length of the ship
	for (var i = 0; i < size; i++) {
		var ship_x = (axis == "x") ? x + i : x;
		var ship_y = (axis == "y") ? y + i : y;

		// Compare against all previously placed ships
		for (var j = 0; j < placements.length; j++) {
			var place = placements[j];
			var max_x = (place.axis == "x") ? place.x + place.ship.size : place.x;
			var max_y = (place.axis == "y") ? place.y + place.ship.size : place.y;

			var overlaps_x = (ship_x >= place.x && ship_x <= max_x);
			var overlaps_y = (ship_y >= place.y && ship_y <= max_y);

			if (overlaps_x && overlaps_y) {
				overlaps = true;
				break;
			}
		}

		if (overlaps) {
			break;
		}
	}

	return overlaps;
};