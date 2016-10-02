if(exports === undefined || exports === null) {
	var exports = {};
}

exports.Matrix = function() {
	var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	chinese = chinese.split("");

	var font_size = 10;
	var columns = canvas.width/font_size; //number of columns for the rain
	//an array of drops - one per column
	var drops = [];
	//x below is the x coordinate
	//1 = y co-ordinate of the drop(same for every drop initially)
	for(var x = 0; x < columns; x++)
		drops[x] = 1; 

	//drawing the characters
	this.drawMatrix = function(){
		//Black BG for the canvas
		//translucent BG to show trail
		canvasContext.globalCompositeOperation = "source-over";
		//canvasContext.fillStyle = "black";
		//canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		canvasContext.fillStyle = "rgba(0, 0, 0, 0.05)";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		canvasContext.fillStyle = "#0F0"; //green text
		canvasContext.font = font_size + "px arial";
		//canvasContext.globalCompositeOperation = "lighter";
		//looping over drops
		for(var i = 0; i < drops.length; i++){
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random()*chinese.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		canvasContext.fillText(text, i*font_size, drops[i]*font_size);

		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > canvas.height && Math.random() > 0.975)
			drops[i] = 0;

		//incrementing Y coordinate
		drops[i]++;
		}
	}
}