import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Drawable } from "./drawable"
import { Ship } from "./ship"
import { Enemy } from "./Enemy"

export class Game {
	private canvas : HTMLCanvasElement;
	private context;
	private view: View;
	private ship: Ship;
	private objects: Drawable[] = [];

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.view = new View(new Coordinate(0, 0), this.canvas.width, this.canvas.height);
		this.ship = new Ship(this.context, new Coordinate(this.canvas.width / 2, this.canvas.height - 6));
	}

	public start() {
		this.ship.draw();
	}

	public end() {
	}

	public move() {
		if (this.isNewEnemyMove()) {
			this.createEnemy();
		}
		this.disposeInvisibleObjects();
		this.drawVisibleObjects();
		this.ship.draw();
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

	private disposeInvisibleObjects() {
		let objects: Drawable[] = [];
		for (let i = 0; i < this.objects.length; i++) {
			if (this.objects[i].inView(this.view)) {
				objects.push(this.objects[i]);
			}
		}
		this.objects = objects;
	}

	private drawVisibleObjects() {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].draw(this.context);
		}
	}

	private isNewEnemyMove(): boolean {
		return Math.random() <= 0.1;
	}

	private createEnemy() {
		this.objects.push(new Enemy(this.context, new Coordinate(this.getRandomInt(0, this.canvas.width - 5), 0)));
	}

	private getRandomInt(min, max): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
}