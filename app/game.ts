import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"
import { Ship } from "./ship"
import { Enemy } from "./Enemy"
import { EnemyFactory } from "./enemyfactory"

export class Game {
	private context;
	private view: View;
	private ship: Ship;
	private movables: Movable[] = [];

	public constructor(private canvas: HTMLCanvasElement) {
		this.context = this.canvas.getContext('2d');
		this.view = new View(new Coordinate(0, 0), this.canvas.width, this.canvas.height);
		this.ship = new Ship(this.context, new Coordinate(this.canvas.width / 2, this.canvas.height - 6));
	}

	public move() {
		if (this.isNewEnemyAllowed()) {
			this.createEnemy();
		}
		this.disposeInvisibleObjects();
		this.drawVisibleObjects();
		this.ship.move(this.context);
	}

	public moveShipLeft() {
		this.ship.moveLeft();
	}

	public moveShipRight() {
		this.ship.moveRight();
	}

	public shipFire() {
		this.movables.push(this.ship.fire());
	}

	private disposeInvisibleObjects() {
		let movables: Movable[] = [];
		for (let i = 0; i < this.movables.length; i++) {
			if (this.movables[i].inView(this.view)) {
				movables.push(this.movables[i]);
			}
		}
		this.movables = movables;
	}

	private drawVisibleObjects() {
		for (var i = 0; i < this.movables.length; i++) {
			this.movables[i].move(this.context);
		}
	}

	private isNewEnemyAllowed(): boolean {
		return Math.random() <= 0.1;
	}

	private createEnemy() {
		this.movables.push(new EnemyFactory(this.canvas.width).create());
	}
}