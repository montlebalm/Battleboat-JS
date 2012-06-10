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
	return {
		x: this.rand(WIDTH),
		y: this.rand(HEIGHT)
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