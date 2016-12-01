import {Game} from "./game"

let canvas = document.getElementById('field');
let game : Game = new Game(<HTMLCanvasElement>canvas);
let prevX;

function draw() {
	game.move();
	window.requestAnimationFrame(draw);
}

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
	} else if (e.keyCode == '80') {
		game.pause();
	} else if (e.keyCode == '82') {
		game.restart();
	}
}

function onMouseDown() {
	game.shipFire();
}

function onMouseMove(e) {
	var x = e.clientX;
	if (x > prevX) {
		game.moveShipRight();
	} else if (x < prevX) {
		game.moveShipLeft();
	}
	prevX = x;
}

function init() {
	document.onkeydown = onKeyDown;
	canvas.onmousedown = onMouseDown;
	canvas.onmousemove = onMouseMove;
	window.requestAnimationFrame(draw);
}

init();