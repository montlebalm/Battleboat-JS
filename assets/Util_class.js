function Util() {};

Util.prototype.rand = function(max) {
	return Math.floor(Math.random() * max);
}

Util.prototype.makeShip = function(name, length) {
	return {
		name: name,
		size: length
	};
}