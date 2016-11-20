import { View } from "./view"
import { Drawable } from "./drawable"
import { Ship } from "./ship"

export class Game {
	private canvas : HTMLCanvasElement;
	private context;
	private view: View;
	private ship: Ship;
	private objects: Drawable[] = [];

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.view = new View(0, 0, this.canvas.width, this.canvas.height);
		this.ship = new Ship(this.context, this.canvas.width / 2, this.canvas.height - 6);
	}

	public start() {
		this.ship.draw();
	}

	public end() {
	}

	public move() {
		this.disposeOutOfViewObjects();
		console.log(this.objects.length);
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].draw(this.context);
		}
	}

	public moveShipLeft() {
		this.ship.moveLeft();
	}

	public moveShipRight() {
		this.ship.moveRight();
	}

	public shipFire() {
		this.objects.push(this.ship.fire());
	}

	private disposeOutOfViewObjects() {
		let objects: Drawable[] = [];
		for (let i = 0; i < this.objects.length; i++) {
			if (this.objects[i].inView(this.view)) {
				objects.push(this.objects[i]);
			}
		}
		this.objects = objects;
	}
}