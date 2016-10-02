"use strict";

if(exports === undefined || exports === null) {
  var exports = {};
}

exports.Pong = function() {
	const WINNING_SCORE = 3;

	this.playerWin = function(playerScore){
		if(playerScore >= WINNING_SCORE)
			return true
		else
			return false
	}

}