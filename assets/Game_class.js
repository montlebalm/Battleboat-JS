(function(HEIGHT, WIDTH, MISS, HIT, SUNK, DUPE) {
	function Game() {}

	Game.prototype = {
		players: [],
		maxTurns: WIDTH * HEIGHT
	};

	Game.prototype.init = function() {
		var ships = this.getShips();
		this.players = this.getPlayers(ships);
	};

	Game.prototype.start = function() {
		this.loop(this.players, this.maxTurns, 0);
	};

	Game.prototype.loop = function(players, maxTurns, turnNum) {
		// DEBUG
		debug("----- Turn", turnNum + 1, "-----");

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

			// DEBUG
			debug(attacker.bot.name, "fired on", defender.bot.name, "at (", choice.x, ",", choice.y, ") and", damage);
		}

		var p1Lives = this.hasShips(players[0]);
		var p2Lives = this.hasShips(players[1]);

		if (p1Lives && p2Lives) {
			turnNum += 1;

			if (turnNum == maxTurns) {
				return -1;
			} else {
				this.loop(players, maxTurns, turnNum);
			}
		} else {
			if (p1Lives) {
				debug(players[0].bot.name, "won");
				return players[0];
			} else if (p2Lives) {
				debug(players[1].bot.name, "won");
				return players[1];
			} else {
				debug("Tie");
				return 0;
			}
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

	Game.prototype.displayBoard = function(player) {
		var string = (WIDTH <= 10 && HEIGHT <= 10) ? "  0 1 2 3 4 5 6 7 8 9\n" : "";
		var turnsObj = {};

		for (var i = 0; i < player.turns.length; i++) {
			if (player.turns[i].damage != DUPE) {
				turnsObj[player.turns[i].x + "," + player.turns[i].y] = player.turns[i];
			}
		}

		for (var i = 0; i < HEIGHT; i++) {
			var y = i;
			var row = (WIDTH <= 10 && HEIGHT <= 10) ? i + " " : "";

			for (var j = 0; j < WIDTH; j++) {
				var x = j;
				var turn = turnsObj[x + "," + y];
				var mark = "-";

				if (turn) {
					if (turn.damage == HIT) {
						mark = "H";
					} else if (turn.damage == SUNK) {
						mark = "S";
					} else if (turn.damage == MISS) {
						mark = "M";
					}
				}

				row += mark + " ";
			}

			string += row + "\n";
		}

		return string;
	};

	Game.prototype.getShips = function() {
		return [
			this.makeShip("Aircraft carrier", 5, "A"),
			this.makeShip("Battleship", 4, "B"),
			this.makeShip("Submarine", 3, "S"),
			this.makeShip("Destroyer", 3, "D"),
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
		var players = [];

		for (var i = 0; i < 2; i++) {
			var bot = new Player();
			var placements = bot.placeShips(ships.slice());

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

			players.push({
				bot: bot,
				ships: placements,
				turns: []
			});
		}

		// TEST
		players[1].bot.name = "Dumbot";

		return players;
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

	// Initialize the game
	var gm = new Game();
	gm.init();
	gm.start();
	// Display the results
	debug("-----Results-----");
	debug("Player 1's turns\n" + gm.displayBoard(gm.players[0]));
	debug("Player 2's turns\n" + gm.displayBoard(gm.players[1]));

	// Function to conditionally log messages
	function debug() {
		if (window.location.href.indexOf("debug=on") != -1) {
			console.log(Array.prototype.slice.call(arguments).join(" "));
		}
	}
}(HEIGHT, WIDTH, MISS, HIT, SUNK, DUPE));