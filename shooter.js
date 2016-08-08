/* Shooter */

(function(){
	// Actual game pixels
	var width = 1920;
	var height = 1080;
	
	var canvasHandle = document.getElementById("shooter-container");
	var context2D = canvasHandle.getContext("2d");
	var gameLoop = null;
	var backgroundColor = "#f5f5f0";
	
	// Loading assets
	var groundRock = new Image();
	groundRock.src = "assets/sprites/ground-rock-32x32.png"; 
	
	// Adjust screen on resize
	window.onresize = function(context2D){
		resizeWindow();
	}
	
	function resizeWindow(){
		// Always maintain 16:9
		if(window.innerWidth/16 < window.innerHeight/9){
			canvasHandle.style.height = (window.innerWidth/16*9).toFixed() + "px";
			canvasHandle.style.width = window.innerWidth + "px";
		} else {
			canvasHandle.style.height = window.innerHeight + "px";
			canvasHandle.style.width = (window.innerHeight/9*16).toFixed() + "px";
		}	
	}
	
	function setupCanvas(){
		// Set up canvas
		canvasHandle.width = width;
		canvasHandle.height = height;
		// Set initial size
		resizeWindow();
		// Background to something other than white for better visibility
		context2D.fillStyle = backgroundColor;
		context2D.fillRect(0, 0, width, height);
		
	}
	
	function drawObject(context, object){
		var x = Math.ceil(Math.random() * (1920-32));
		var y = Math.ceil(Math.random() * (1080 - 32));
		context.drawImage(object, x, y, 32, 32);
	}
	
	gameLoop = setInterval(function(){
		drawObject(context2D, groundRock);
	}, 1000);
	
	setupCanvas();
})();