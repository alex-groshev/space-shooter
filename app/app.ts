import {Game} from "./game"

let canvas = document.getElementById('field');
let game : Game = new Game(<HTMLCanvasElement>canvas);
let prevX;
let leftMove: boolean = false;
let rightMove: boolean = false;

function draw() {
	if (leftMove) {
		game.moveShipLeft();
	}
	if (rightMove) {
		game.moveShipRight();
	}
	game.move();
	window.requestAnimationFrame(draw);
}

function onKeyDown(e) {
	e = e || window.event;
	if (e.keyCode == '32') {
		game.toggleFireMode();
	} else if (e.keyCode == '37') {
		leftMove = true;
		rightMove = false;
	} else if (e.keyCode == '39') {
		leftMove = false;
		rightMove = true;
	} else if (e.keyCode == '80') {
		game.pause();
	} else if (e.keyCode == '82') {
		game.restart();
	}
}

function onMouseDown() {
	game.toggleFireMode();
}

function onMouseMove(e) {
	leftMove = false;
	rightMove = false;

	var x = e.clientX;
	if (x > prevX) {
		rightMove = true;
	} else if (x < prevX) {
		leftMove = true;
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