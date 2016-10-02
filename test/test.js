
var pongTestModule = require('../game/UltraPong.js')
var assert = require('assert');


describe('Pong Logic', function() {


  before(function(){
        this.pong = new pongTestModule.Pong();
    });

	it('Canary test', function() {
		assert.equal(true, true);
	});

	it('Player Win', function() {
		assert.equal(true, this.pong.playerWin(3));
	});

	it('Player No Win', function() {
		assert.equal(false, this.pong.playerWin(0));
	});

	it('should return -1 when the value is not present', function() {
		assert.equal(-1, [1,2,3].indexOf(4));
	});

});
