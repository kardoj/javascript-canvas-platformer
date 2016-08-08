/* Objects which make up the world - walls, ground etc., they don't have mass */

function WorldObject(spriteSrc, width, height, x, y){
	this.spriteSrc = spriteSrc;
	this.width = width;
	this.height = height;
	this.x = parseInt(x);
	this.y = parseInt(y);
	// imageObject is a container to not create a new one everytime, it is populated with spriteSrc before drawing
	this.draw = function(imageObject, drawContext){
		imageObject.src = this.spriteSrc;
		drawContext.drawImage(imageObject, x, y, width, height);
	};
	this.wasHit = function(x, y){
		var xInRange = x >= this.x && x <= this.x + this.width;
		var yInRange = y >= this.y && y <= this.y + this.height;
		if(xInRange && yInRange){
			return true;
		}
		return false;
	};
}