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
	private projectiles: Movable[] = [];
	private enemies: Movable[] = [];

	public constructor(private canvas: HTMLCanvasElement) {
		this.context = this.canvas.getContext('2d');
		this.view = new View(new Coordinate(0, 0), this.canvas.width, this.canvas.height);
		this.ship = new Ship(this.context, new Coordinate(this.canvas.width / 2, this.canvas.height - 6));
	}

	public move() {
		if (this.isNewEnemyAllowed()) {
			this.createEnemy();
		}

		this.hideOutOfViewObjects(this.projectiles);
		this.hideOutOfViewObjects(this.enemies);
		this.hideCollidedObjects();

		//console.log("enemies="+this.enemies.length);
		//console.log("projectiles="+this.projectiles.length);

		this.drawVisibleObjects();

		this.projectiles = this.disposeHiddenObjects(this.projectiles);
		this.enemies = this.disposeHiddenObjects(this.enemies);

		this.ship.move(this.context);
	}

	public moveShipLeft() {
		this.ship.moveLeft();
	}

	public moveShipRight() {
		this.ship.moveRight();
	}

	public shipFire() {
		this.projectiles.push(this.ship.fire());
	}

	private hideCollidedObjects() {
		for (let i = 0; i < this.projectiles.length; i++) {
			if (this.projectiles[i].isVisible()) {
				for (let j = 0; j < this.enemies.length; j++) {
					if (this.enemies[j].isVisible()) {
						if (this.projectiles[i].isCollidedWith(this.enemies[j])) {
							this.projectiles[i].hide();
							this.enemies[j].hide();
						}
					}
				}
			}
		}
	}

	private hideOutOfViewObjects(movables: Movable[]) {
		for (let i = 0; i < movables.length; i++) {
			if (!movables[i].inView(this.view)) {
				movables[i].hide();
			}
		}
	}

	private disposeHiddenObjects(movables: Movable[]): Movable[] {
		let result: Movable[] = [];
		for (let i = 0; i < movables.length; i++) {
			if (movables[i].isVisible()) {
				result.push(movables[i]);
			}
		}
		return result;
	}

	private drawVisibleObjects() {
		for (var i = 0; i < this.projectiles.length; i++) {
			this.projectiles[i].move(this.context);
		}
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].move(this.context);
		}
	}

	private isNewEnemyAllowed(): boolean {
		return Math.random() <= 0.1;
	}

	private createEnemy() {
		this.enemies.push(new EnemyFactory(this.canvas.width).create());
	}
}