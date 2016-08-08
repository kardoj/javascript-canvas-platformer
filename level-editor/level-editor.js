/* Shooter */
/* Kardo Jõeleht, 2016 */

(function(){
	// Actual game pixels
	var width = 1920;
	var height = 1080;
	
	var canvasHandle = document.getElementById("shooter-container");
	var context2D = canvasHandle.getContext("2d");
	var backgroundColor = "#f5f5f0";
	var xCoordinateContainer = document.getElementById("x-coordinate-container");
	var yCoordinateContainer = document.getElementById("y-coordinate-container");
	var insertByCoordinateButton = document.getElementById("insert-by-coordinate-button");
	var xCoordinateInput = document.getElementById("x-coordinate-input");
	var yCoordinateInput = document.getElementById("y-coordinate-input");
	var spriteSelection = document.getElementsByClassName("sprite-select");
	var currentlySelected = document.getElementById("currently-selected-sprite-image");
	var selectedSpriteSrc = currentlySelected.getAttribute("src");
	var canvasContainer = document.getElementById("canvas-container");
	var boundingRect, scaleX, scaleY;
	var worldObjects = [];
	var xOnCanvas = 0;
	var yOnCanvas = 0;
	var controlPanelToggleHandle = document.getElementById("toggle-control-panel");
	var controlPanelsContainerHandle = document.getElementById("panels-container");
	var controlPanelDragHandle = document.getElementById("dragbox");
	var controlPanelHandle = document.getElementById("control-panel");
	var dragStartMouse = {
		x: 0,
		y: 0
	};
	var dragStartControlPanel = {
		x: 0,
		y: 0
	};
	var draggingControlPanel = false;
	
	// imageObject used for drawing. src is changed and images are drawn.
	var imageObject = new Image();
	
	// Set sprite selection listeners
	for(var i=0; i<spriteSelection.length; i++){
		spriteSelection[i].onclick = function(){
			selectedSpriteSrc = this.getAttribute("src");
			currentlySelected.setAttribute("src", selectedSpriteSrc);
		};
	}
	
	// Adjust screen on resize
	window.onresize = function(context2D){
		resizeWindow();
	};
	
	// Toggle Control panel visibility
	controlPanelToggleHandle.onclick = function(){
		if(controlPanelToggleHandle.innerHTML == "-"){
			// Hide panels
			controlPanelsContainerHandle.style.display = "none";
			controlPanelToggleHandle.innerHTML = "[]";
		} else if(controlPanelToggleHandle.innerHTML == "[]"){
			// Show panels
			controlPanelsContainerHandle.style.display = "initial";
			controlPanelToggleHandle.innerHTML = "-";
		}
	};
	
	// Dragging Control panel
	controlPanelDragHandle.onmousedown = function(event){
		draggingControlPanel = true;
		// Save panel top and left
		dragStartControlPanel.x = controlPanelHandle.offsetLeft;
		dragStartControlPanel.y = controlPanelHandle.offsetTop;
		// Save mouse top and left
		dragStartMouse.x = event.clientX;		
		dragStartMouse.y = event.clientY;
		// Disallow any selection while moving
		document.getElementsByTagName("body")[0].setAttribute("class", "unselectable");
	};
	
	window.onmouseup = function(event){
		if(draggingControlPanel){			
			// Calculate mouse difference
			var xChange = -(dragStartMouse.x - event.clientX);
			var yChange = -(dragStartMouse.y - event.clientY);
			// Set the same difference to panel top and left
			controlPanelHandle.style.left = dragStartControlPanel.x + xChange + "px";
			controlPanelHandle.style.top = dragStartControlPanel.y + yChange + "px";
			draggingControlPanel = false;
			// Allow selection again
			document.getElementsByTagName("body")[0].removeAttribute("class");
		}
	};
	// End of dragging Control panel
	
	
	// Show coordinates when moving on canvas
	canvasHandle.onmousemove = function(event){
		xOnCanvas = Math.round((event.clientX - boundingRect.left) * scaleX);
		yOnCanvas = Math.round((event.clientY - boundingRect.top) * scaleY);
		xCoordinateContainer.innerHTML = xOnCanvas;
		yCoordinateContainer.innerHTML = yOnCanvas;
	};
	
	// Draw sprites on click
	canvasHandle.onclick = function(){
		createNewWorldObject(xCoordinateContainer.innerHTML, yCoordinateContainer.innerHTML);
	};
	
	// Insert selected sprite by coordinate
	insertByCoordinateButton.onclick = function(){
		createNewWorldObject(xCoordinateInput.value, yCoordinateInput.value);
	};
		
	// Remove sprite on right click
	canvasHandle.onmousedown = function(event){
		if(event.button == 2){
			for(var i=0; i<worldObjects.length; i++){
				if(worldObjects[i].wasHit(xOnCanvas, yOnCanvas)){
					worldObjects.splice(i, 1);
				}
			}
			
			// Redraw all the objects
			context2D.clearRect(0, 0, width, height);
			context2D.fillStyle = backgroundColor;
			context2D.fillRect(0, 0, width, height);
			for(var i=0; i<worldObjects.length; i++){
				worldObjects[i].draw(imageObject, context2D);
			}
		}
	};
	
	// Disable right click menu
	canvasHandle.oncontextmenu = function(){return false;};

	// Adds a new object to the array which can be exported from the editor
	function createNewWorldObject(x, y){
		var newObject = new WorldObject(selectedSpriteSrc, currentlySelected.width, currentlySelected.height, x, y);
		worldObjects.push(newObject);
		newObject.draw(imageObject, context2D);
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
		
		boundingRect = canvasHandle.getBoundingClientRect();
		scaleX = canvasHandle.width / boundingRect.width;
		scaleY = canvasHandle.height / boundingRect.height;
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
	
	setupCanvas();
	
	window.xCoordinateInput = xCoordinateInput;
	window.yCoordinateInput = yCoordinateInput;
})();

function changeInsertCoordinates(axis, change){
	if(axis == 'x'){
		window.xCoordinateInput.value = parseInt(window.xCoordinateInput.value) + change;
	} else if(axis == 'y'){
		window.yCoordinateInput.value = parseInt(window.yCoordinateInput.value) + change;
	}
}