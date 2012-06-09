function Board() {
	this.tiles = this.build();
}

Board.prototype = {
	tiles: []
}

Board.prototype.build = function() {
	var b = [];

	for (var i = 0; i < HEIGHT; i++) {
		var row = [];

		for (var j = 0; j < WIDTH; j++) {
			row.push(EMPTY);
		}

		b.push(row);
	}

	return b;
}

Board.prototype.willFit = function(x, y, length, axis) {
	var fits = true;

	if (this.inBounds(x, y)) {
		for (var i = 0; i < length; i++) {
			var new_x = (axis == "x") ? x + i : x;
			var new_y = (axis == "y") ? y + i : y;

			if (!this.isEmpty(new_x, new_y)) {
				fits = false;
				break;
			}
		}
	} else {
		fits = false;
	}

	return fits;
}

// Whether or not the Board space is EMPTY
Board.prototype.isEmpty = function(x, y) {
	return this.tiles[x][y] == 0;
}

// Whether the x, y coordinates are on the Board
Board.prototype.inBounds = function(x, y) {
	var x_in_bounds = (x >= 0 && x < this.tiles.length);
	var y_in_bounds = (y >= 0 && y < this.tiles[0].length);

	return x_in_bounds || y_in_bounds;
}

Board.prototype.toString = function() {
	var string = "";

	for (var i = 0; i < this.tiles.length; i++) {
		var row = "";

		for (var j = 0; j < this.tiles[0].length; j++) {
			row += this.tiles[i][j] + " ";
		}

		string += row + "\n";
	}

	return string;
}

Board.prototype.set = function (x, y, value) {
	if (this.inBounds(x, y)) {
		this.tiles[x][y] = value;
	}
}

Board.prototype.get = function (x, y) {
	return this.tiles[x][y];
}