var gm = (function(HEIGHT, WIDTH, MISS, HIT, SUNK, DUPE, Display_class) {

	function Game() {}

	Game.prototype = {
		players: [],
		maxTurns: WIDTH * HEIGHT,
		turnNum: 0,
		turnResults: {
			TIE: "TIE",
			TURN_LIMIT: "TURN_LIMIT",
			CONTINUE: "CONTINUE"
		}
	};

	Game.prototype.init = function() {
		var ships = this.getShips();
		this.players = this.getPlayers(ships);
		this.turnNum = 0;

		display.showInit(this.players);
	};

	Game.prototype.start = function(isSingleTurn) {
		if (this.players.length) {
			var result = null;

			while (result = this.turn(this.players, this.maxTurns, this.turnNum++)) {
				if (result != this.turnResults.CONTINUE || isSingleTurn) {
					break;
				}
			}

			// Display the results of the game
			if (result != this.turnResults.CONTINUE) {
				display.showWinner(result, this.players);
			}
		}
	};

	// Main game turn. Runs once per turn
	Game.prototype.turn = function(players, maxTurns, turnNum) {
		for (var i = 0; i < players.length; i++) {
			var attacker = (i == 0) ? players[0] : players[1];
			var defender = (i == 0) ? players[1] : players[0];

			var choice = attacker.bot.takeTurn(attacker.turns);
			var damage = this.fireOn(choice.x, choice.y, attacker, defender);

			attacker.turns.push({
				x: choice.x || 0,
				y: choice.y || 0,
				damage: damage
			});

			display.showTurn(attacker, defender, choice.x, choice.y, damage, turnNum);
		}

		var p1Lives = this.hasShips(players[0]);
		var p2Lives = this.hasShips(players[1]);

		// Declare a winner or keep looping
		if (p1Lives && p2Lives) {
			if (turnNum == maxTurns) {
				return this.turnResults.TURN_LIMIT;
			} else {
				return this.turnResults.CONTINUE;
			}
		} else if (!p1Lives && !p2Lives) {
			return this.turnResults.TIE;
		} else {
			return (p1Lives) ? players[0] : players[1];
		}
	};

	Game.prototype.isDuplicateShot = function(x, y, turns) {
		var isDupe = false;

		for (var i = 0; i < turns.length; i++) {
			if (x == turns[i].x && y == turns[i].y) {
				isDupe = true;
				break;
			}
		}

		return isDupe;
	};

	Game.prototype.fireOn = function(x, y, attacker, defender) {
		var result = MISS;

		if (this.isDuplicateShot(x, y, attacker.turns)) {
			result = DUPE;
		} else {
			for (var i = 0; i < defender.ships.length; i++) {
				var shipObj = defender.ships[i];
				var ship = shipObj.ship;

				var hits_x = (x >= shipObj.x && x <= shipObj.max_x);
				var hits_y = (y >= shipObj.y && y <= shipObj.max_y);

				if (hits_x && hits_y) {
					shipObj.hits += 1;

					if (shipObj.hits >= ship.size) {
						result = SUNK;
					} else {
						result = HIT;
					}

					break;
				}
			}
		}

		return result;
	};

	Game.prototype.getShips = function() {
		return [
			this.makeShip("Aircraft carrier", 5, "A"),
			this.makeShip("Battleship", 4, "B"),
			this.makeShip("Submarine", 3, "S"),
			this.makeShip("Patrol boat", 2, "P")
		];
	};

	Game.prototype.makeShip = function(name, size, abbrev) {
		return {
			name: name,
			size: size,
			abbrev: abbrev
		};
	};

	Game.prototype.getPlayers = function(ships) {
		var players = [
			this.getPlayer(BoringBot),
			this.getPlayer(Player)
		];

		for (var i = 0; i < players.length; i++) {
			var placements = players[i].bot.placeShips(ships.slice());

			// Format the placements by adding in some helper properties
			for (var j = 0; j < placements.length; j++) {
				var place = placements[j];
				var max_x = (place.axis == "x") ? place.x + place.ship.size - 1 : place.x;
				var max_y = (place.axis == "y") ? place.y + place.ship.size - 1 : place.y;

				placements[j] = {
					x: place.x,
					y: place.y,
					ship: place.ship,
					axis: place.axis,
					max_x: max_x,
					max_y: max_y,
					hits: 0
				};
			}

			players[i].ships = placements;
			players[i].index = i;
		}

		return players;
	};

	Game.prototype.getPlayer = function(className) {
		return {
			bot: new className(),
			ships: [],
			turns: []
		};
	};

	Game.prototype.hasShips = function(player) {
		var hasShip = false;

		for (var i = 0; i < player.ships.length; i++) {
			if (player.ships[i].hits < player.ships[i].ship.size) {
				hasShip = true;
				break;
			}
		}

		return hasShip;
	};

	// ------------------------------------------------------------------------
	// Util methods
	// ------------------------------------------------------------------------

	// Make sure an object has all the required properties
	function hasProperties(obj /*, arguments*/) {
		var hasAllProperties = true;

		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i] in obj == false) {
				hasAllProperties = false;
				break;
			}
		}

		return hasAllProperties;
	}

	// Does the ship fit on the game board?
	function shipFits(x, y, axis, size) {
		var fits = false;

		// First make sure it will fit on the board
		if (axis == "x" && x + size < WIDTH) {
			fits = true;
		} else if (axis == "y" && y + size < HEIGHT) {
			fits = true;
		}

		return fits;
	}

	// Does the ship overlap any others?
	function shipOverlaps(x, y, axis, size, placements) {
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
	}

	// Make local copies of objects so the player can't override them
	var display = jQuery.extend(true, {}, new Display_class());

	return new Game();
}(
	HEIGHT,
	WIDTH,
	MISS,
	HIT,
	SUNK,
	DUPE,
	Display // Class
));