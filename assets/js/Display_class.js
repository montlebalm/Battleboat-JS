function Display() {};

Display.prototype.resetBoard = function(player) {
	var board = document.getElementById("board-" + player.index);
	var cells = board.getElementsByTagName("td");

	for (var i = 0; i < cells.length; i++) {
		cells[i].className = "";
		cells[i].innerHTML = "";
	}
}

Display.prototype.resetResult = function(player) {
	var result = document.getElementById("result-" + player.index);
	result.innerHTML = "";
}

Display.prototype.showShips = function(player) {
	for (var i = 0; i < player.ships.length; i++) {
		var initial_x = player.ships[i].x;
		var initial_y = player.ships[i].y;

		for (var j = 0; j < player.ships[i].ship.size; j++) {
			var ship_x = (player.ships[i].axis == "x") ? initial_x + j : initial_x;
			var ship_y = (player.ships[i].axis == "y") ? initial_y + j : initial_y;

			var square = document.getElementById(player.index + "-" + ship_x + "," + ship_y)
			square.className = "boat-" + player.ships[i].ship.abbrev.toLowerCase();
		}
	}
};

Display.prototype.showWinner = function(result, players) {
	var p1Cell = document.getElementById("result-0");
	var p2Cell = document.getElementById("result-1");

	// Show the results of the game
	if (result == "TIE") {
		p1Cell.innerHTML = "Tie!";
		p2Cell.innerHTML = "Tie!";
	} else if (result == "TURN_LIMIT") {
		p1Cell.innerHTML = "Turn Limit Reached!";
		p2Cell.innerHTML = "Turn Limit Reached!";
	} else {
		if (result == players[0]) {
			p1Cell.innerHTML = "Wins!";
			p2Cell.innerHTML = "Loses!";
		} else {
			p1Cell.innerHTML = "Loses!";
			p2Cell.innerHTML = "Wins!";
		}
	}
};

Display.prototype.showInit = function(players) {
	this.resetBoard(players[0]);
	this.resetBoard(players[1]);

	this.resetResult(players[0]);
	this.resetResult(players[1]);

	this.showShips(players[0]);
	this.showShips(players[1]);
};

Display.prototype.showTurn = function(attacker, defender, x, y, damage) {
	var cell = document.getElementById(defender.index + "-" + x + "," + y);
	cell.innerHTML = (damage == MISS) ? "&ndash;" : "x";
};