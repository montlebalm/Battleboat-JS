Battleboat JS
=============

An automated game of digital warfare on the waves of ingenuity.

# API

## Submitting a turn

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

## Turn results

Turns can result in four different outcomes: MISS, HIT, SUNK, and DUPE.

- MISS results when you shoot at a unique coordinate and do not hit any of your opponent's ships.
- HIT is returned if you shoot at a unique coordinate and damage an enemy ship.
- SUNK occurs on the final HIT of an enemy ship.
- DUPE is returned when you fire upon the same coordinate more than once. Multiple shots at the same coordinate will return DUPE regardless of whether your first shot was MISS, HIT, or SUNK.

## Board Dimensions

The HEIGHT and WIDTH globals refer to the number of rows and columns. A HEIGHT of 10 indicates that there are 10 rows. A WIDTH of 10 denotes 10 columns.

A (x, y) coordinate of (5, 7)* would hit column index 5, row index 7.

*Note that coordinates are 0 based, so the column at index 5 is the 6th column from the left.