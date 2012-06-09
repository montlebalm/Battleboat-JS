function Player() {};

Player.prototype.name = "Barack O-bot-ma";

Player.prototype.placeShips = function(ships) {
	return [
		{
			ship: ships[0],
			x: 0,
			y: 0,
			axis: "y"
		}
	];
};

Player.prototype.takeTurn = function(ships) {
	return {
		x: 0,
		y: 0
	};
};

Player.prototype.rand = function(max) {
	return Math.floor(Math.random() * max);
}