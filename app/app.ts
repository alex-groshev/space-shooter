import {Game} from "./game"

var game : Game = new Game(<HTMLCanvasElement>document.getElementById('field'));

function draw() {
	game.move();
	window.requestAnimationFrame(draw);
}

function init() {
	function onKeyDown(e) {
		e = e || window.event;
		if (e.keyCode == '32') {
			game.shipFire();
		}
		else if (e.keyCode == '38') {
			// up arrow
		}
		else if (e.keyCode == '40') {
			// down arrow
		}
		else if (e.keyCode == '37') {
			game.moveShipLeft();
		}
		else if (e.keyCode == '39') {
			game.moveShipRight();
		} else if (e.keyCode == '82') {
			game.restart();
		}
	}
	document.onkeydown = onKeyDown;
	window.requestAnimationFrame(draw);
}

init();