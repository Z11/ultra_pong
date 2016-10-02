// special thanks to:
// 1. Game Development Coach Chris DeLeon - https://www.udemy.com/code-your-first-game/learn/v4/content 
// 2. http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// 3. http://thecodeplayer.com/walkthrough/html5-canvas-experiment-a-cool-flame-fire-effect-using-particles

var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');

if(exports === undefined || exports === null) {
	var exports = {};
}

var particlesModule = new exports.Particles();
var matrixModule = new exports.Matrix();
var pongModule = new exports.Pong();

var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10

	function calculateMousePos(evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return{
			x:mouseX, 
			y:mouseY
		};
	}

	function handleMouseClick(evt){
		if(showingWinScreen){
			player1Score= 0;
			player2Score = 0;
			showingWinScreen = false;
		}
	}

	window.onload = function (){
		setInterval(callBoth, 35);
		canvas.addEventListener('mousedown', handleMouseClick);
		canvas.addEventListener('mousemove',
			function(evt){
				var mousePos = calculateMousePos(evt);
				paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			});
	}


	function computerMovement() {
		var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
		if(paddle2YCenter < ballY - 35){
			paddle2Y += 10;
		}else if(paddle2YCenter > ballY + 35){
			paddle2Y -= 10;
		}
	}

	function callBoth(){
		moveEverything();
		drawEverything();
	}

	function ballReset(){
		if(pongModule.playerWin(player1Score)|| pongModule.playerWin(player2Score)){
			showingWinScreen = true;
		}

		ballSpeedX = -ballSpeedX;
		ballX = canvas.width/2;
		ballY = canvas.height/2;
	}

	function moveEverything(){
		if(showingWinScreen){
			canvasContext.fillStyle = 'white';
			canvasContext.fillText("click to continue", 100, 100);
			return;
		}
		computerMovement();
		ballX += ballSpeedX;
		ballY += ballSpeedY;
		if(ballX < 0){
			if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT ){
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * .35;
			}else{
				player2Score++;
				ballReset();				
			}
		}
		if(ballX > canvas.width){
			if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT ){
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * .35;
			}else{
				player1Score++;
				ballReset();
			}
		}
		if(ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
		if(ballY > canvas.height){
			ballSpeedY = -ballSpeedY;
		}
	}

	function drawNet(){
		for(var i = 0; i<canvas.height; i +=40){
			colorRect(canvas.width/2-1, i,2,20,'white');
		}
	}

	function drawEverything() {
		//colorRect(0,0,canvas.width,canvas.height,'black');
		//matrixModule.drawMatrix();
		
		//canvasContext.fillStyle = "black";
		//canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	   canvasContext.globalCompositeOperation = "lighter";
	   canvasContext.globalCompositeOperation = "source-over";

	   if(showingWinScreen){
	   	canvasContext.fillStyle = 'white';
	   	if(pongModule.playerWin(player1Score)){
	   		canvasContext.fillText("Left player won!", 350, 200);
	   	}else if (pongModule.playerWin(player2Score)){
	   		canvasContext.fillText("Right player won!", 350, 200);
	   	}

	   	canvasContext.fillText("click to continue", 350, 500);
	   	return;
	   }
		//canvasContext.globalCompositeOperation = "lighter";
		drawNet();
		particlesModule.drawParticle();
		matrixModule.drawMatrix();
		colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
		colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
		colorCircle(ballX,ballY,10,'white');
		canvasContext.fillText(player1Score, 100, 100);
		canvasContext.fillText(player2Score, canvas.width - 100, 100);
	}

	function colorCircle(centerX, centerY, radius, drawColor){
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius, 0, Math.PI*2, true);
		canvasContext.fill()
	}

	function colorRect(leftX, topY, width, height, drawColor){
		canvasContext.fillStyle = drawColor;
		canvasContext.fillRect(leftX, topY, width, height);
	}
	


