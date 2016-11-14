import { Ship } from "./ship"

window.onload = function() {
	let canvas = <HTMLCanvasElement>document.getElementById('field');
	let ctx = canvas.getContext('2d');
	let ship = new Ship(ctx, 150, 143);
	ship.draw();

	function onKeyDown(e) {
		e = e || window.event;

		if (e.keyCode == '38') {
			// up arrow
		}
		else if (e.keyCode == '40') {
			// down arrow
		}
		else if (e.keyCode == '37') {
			// left arrow
			ship.moveLeft()
		}
		else if (e.keyCode == '39') {
			// right arrow
			ship.moveRight();
		}
	}
	document.onkeydown = onKeyDown;
};