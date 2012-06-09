function Game() {}

Game.prototype = {
	numPlayers: 2,
	players: []
};

Game.prototype.init = function() {
	this.players = this.getPlayers(this.numPlayers);
	console.log("Created", this.players.length, "players");

	console.log(this.players[0].board.toString());
	console.log(this.players[1].board.toString());
}

Game.prototype.getPlayers = function(numPlayers) {
	var players = [];

	for (var i = 0; i < this.numPlayers; i++) {
		var p = new Player();
		var b = new Board();
		var newPlayer = this.makePlayer(p, b);

		this.players.push(newPlayer);
	}

	return players;
}

Game.prototype.makePlayer = function(player, board) {
	return {
		bot: player,
		ships: [],
		board: board
	};
}