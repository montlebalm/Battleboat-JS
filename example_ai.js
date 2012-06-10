function Player() {};

Player.prototype.name = "Barack O-bot-ma";

Player.prototype.placeShips = function(ships) {
	var placements = [];

	while (ships.length) {
		var x = this.rand(WIDTH),
			y = this.rand(HEIGHT),
			size = ships[0].size,
			axis = (this.rand(1) == 0) ? "x" : "y";

		if (this.shipFits(x, y, axis, size)) {
			var ship = ships.splice(0, 1);

			placements.push({
				x: x,
				y: y,
				axis: axis,
				ship: ship[0]
			});
		}
	}

	return placements;
};

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

Player.prototype.rand = function(boundry) {
	return Math.floor(Math.random() * boundry);
};

Player.prototype.shipFits = function(x, y, axis, size) {
	var fits = false;

	if (axis == "x" && x + size < WIDTH) {
		fits = true;
	} else if (axis == "y" && y + size < HEIGHT) {
		fits = true;
	}

	return fits;
};