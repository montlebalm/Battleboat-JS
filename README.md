Battleboat JS
=============

An automated game of digital warfare on the waves of ingenuity.

# API

## Initial Ship Placement

Players must place all 5 ships at the beginning of the game. This placement is facilitated through the required <code>placeShips</code> method. This method accepts a single parameter, <code>ships</code>, which is an array of the 5 types of boats the player must place.

### Ship objects

Here is an example of a single index from the <code>ships</code> parameter:

<code>
ships[0] == {
	name: "Aircraft Carrier",
	size: 5,
	abbrev: "A"
};
</code>

- Name: the full name of the ship.
- Size: the number of board tiles the ship must occuppy. This is also the number of HITs the ship must endure before being SUNK.
- Abbrev: the one-letter abbreviation of the ship. This is used during visual representation of the game board.

**Ship objects cannot be altered**. Any attempt to do so will result in forfeiture of the game.

### Placing a ship

The <code>placeShips</code> must return an array containing 5 indexes (one for each placement). Each index must be an object containing the properties <code>x</code>, <code>y</code>, <code>axis</code>, <code>ship</code>.

- x: the x (column) value of the ship's nose.
- y: the y (row) value of the ship's nose.
- axis: the dimension (x or y) in which the rest of the ship will extend.
- ship: a pointer to the ship object for which you are providing coordinates.

For example, a placement of <code>{ x: 0, y: 2, axis: "x", ship: ships[0] }</code> puts the nose of the first ship at (0, 2) and indicates that the ship should run along the <code>x</code> axis. If <code>ships[0]</code> had a <code>size</code> of 4, the ship would occupy the following bolded tiles:

<table>
	<tr>
		<td>0,0</td>
		<td>1,0</td>
		<td>2,0</td>
		<td>3,0</td>
		<td>4,0</td>
	</tr>
	<tr>
		<td>0,1</td>
		<td>1,1</td>
		<td>2,1</td>
		<td>3,1</td>
		<td>4,1</td>
	</tr>
	<tr>
		<td><strong>0,2</strong></td>
		<td><strong>1,2</strong></td>
		<td><strong>2,2</strong></td>
		<td><strong>3,2</strong></td>
		<td>4,2</td>
	</tr>
	<tr>
		<td>0,3</td>
		<td>1,3</td>
		<td>2,3</td>
		<td>3,3</td>
		<td>4,3</td>
	</tr>
	<tr>
		<td>0,4</td>
		<td>1,4</td>
		<td>2,4</td>
		<td>3,4</td>
		<td>4,4</td>
	</tr>
</table>


## Submitting a Turn

Turns are submitted through the required <code>takeTurn</code> method. This method must return an object containing <code>x</code> and <code>y</code> properties. Any additional properties will be ignored. Neglecting to include either property will result in forfeiture of the turn.

Here is an example of a function that always shoots at position (2, 8):

<code>Player.prototype.takeTurn = function(turns) {
  return {
    x: 2,
    y: 8
  };
}</code>

This method contains a single <code>turns</code> parameter which contains a list of all the player's previous turns. Here is an example of a turn in which our player fired at (2,8) and missed.

<code>turns[0] == { x: 2, y: 8, damage: MISS };</code>

Note the <code>damage</code> property in the turn object. This tells you the result of your digital bombardment. Detailed descriptions of possible turn results are listed below in the "Turn results" section.

## Turn Results

Turns can result in four different outcomes: MISS, HIT, SUNK, and DUPE.

- MISS results when you shoot at a unique coordinate and do not hit any of your opponent's ships.
- HIT is returned if you shoot at a unique coordinate and damage an enemy ship.
- SUNK occurs on the final HIT of an enemy ship.
- DUPE is returned when you fire upon the same coordinate more than once. Multiple shots at the same coordinate will return DUPE regardless of whether your first shot was MISS, HIT, or SUNK.

## Board Dimensions

The HEIGHT and WIDTH globals refer to the number of rows and columns. A HEIGHT of 10 indicates that there are 10 rows. A WIDTH of 10 denotes 10 columns.

A (x, y) coordinate of (5, 7)* would hit column index 5, row index 7.

*Note that coordinates are 0 based, so the column at index 5 is the 6th column from the left.

# Ships

Each player must defend place and ultimately destroy 5 ships. The types of ships are: Aircraft Carrier, Battleship, Submarine, Destroyer, and Patrol Boat. Each ship occupies a specific number of places on the board. Each space must be HIT in order for the ship to be SUNK.

<table>
	<tr>
		<th>Name</th>
		<th>Size</th>
		<th>Abbreviation</th>
	</tr>
	<tr>
		<td>Aircraft Carrier</td>
		<td>5</td>
		<td>A</td>
	</tr>
	<tr>
		<td>Battleship</td>
		<td>4</td>
		<td>B</td>
	</tr>
	<tr>
		<td>Destroyer</td>
		<td>3</td>
		<td>D</td>
	</tr>
	<tr>
		<td>Submarine</td>
		<td>3</td>
		<td>S</td>
	</tr>
	<tr>
		<td>Patrol Boat</td>
		<td>2</td>
		<td>P</td>
	</tr>
</table>

Abbreviations will be used for the visual representation of ships on the game board.