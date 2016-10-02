// 3. http://thecodeplayer.com/walkthrough/html5-canvas-experiment-a-cool-flame-fire-effect-using-particles

if(exports === undefined || exports === null) {
	var exports = {};
}

exports.Particles = function() {

	var particles = [];

	//Lets create some particles now
	var particle_count = 100;
	for(var i = 0; i < particle_count; i++){
		particles.push(new particle());
	}

	function particle(){
	//speed, life, location, life, colors
	//speed.x range = -2.5 to 2.5 
	//speed.y range = -15 to -5 to make it move upwards
	//lets change the Y speed to make it look like a flame
	this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
	//location = mouse coordinates
	//Now the flame follows the mouse coordinates
	if(ballX && ballY){
		this.location = {x: ballX, y: ballY};
	}
	else{
		this.location = {x: canvas.width/2, y: canvas.height/2};
	}
	//radius range = 10-30
	this.radius = 10+Math.random()*20;
	//life range = 20-30
	this.life = 20+Math.random()*10;
	this.remaining_life = this.life;
	//colors
	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);
	}

	this.drawParticle = function(){
		//Painting the canvas black
		//Time for lighting magic
		//particles are painted with "lighter"
		//In the next frame the background is painted normally without blending to the 
		//previous frame
		//

		for(var i = 0; i < particles.length; i++){
			var p = particles[i];
			canvasContext.beginPath();
			//changing opacity according to the life.
			//opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remaining_life/p.life*100)/100
			//a gradient instead of white fill
			var gradient = canvasContext.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			canvasContext.fillStyle = gradient;
			canvasContext.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			canvasContext.fill();

			//lets move the particles
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

			//regenerate particles
			if(p.remaining_life < 0 || p.radius < 0){
			//a brand new particle replacing the dead one
			particles[i] = new particle();
			}
		}
	}
}
