import { Coordinate } from "./coordinate"
import { View } from "./view"
import { MovableObject } from "./movableobject"
import { Ship } from "./ship"
import { Enemy } from "./enemy"
import { EnemyFactory } from "./enemyfactory"

export class Game {
	private context;
	private view: View;
	private ship: Ship;
	private projectiles: MovableObject[] = [];
	private enemies: MovableObject[] = [];

	public constructor(private canvas: HTMLCanvasElement) {
		this.context = this.canvas.getContext('2d');
		this.view = new View(new Coordinate(0, 0), this.canvas.width, this.canvas.height);
		this.ship = new Ship(new Coordinate(this.canvas.width / 2, this.canvas.height - 6));
	}

	public move() {
		//console.log("enemies="+this.enemies.length);
		//console.log("projectiles="+this.projectiles.length);

		if (!this.ship.isVisible) {
			return;
		}

		if (this.isNewEnemyAllowed()) {
			this.createEnemy();
		}

		this.hideOutOfViewObjects(this.projectiles);
		this.hideOutOfViewObjects(this.enemies);
		this.hideCollidedObjects();

		this.drawVisibleObjects();

		this.projectiles = this.disposeHiddenObjects(this.projectiles);
		this.enemies = this.disposeHiddenObjects(this.enemies);

		this.ship.move(this.context);
	}

	public moveShipLeft() {
		this.ship.moveLeft(this.context);
	}

	public moveShipRight() {
		this.ship.moveRight(this.context);
	}

	public shipFire() {
		this.projectiles.push(this.ship.fire());
	}

	private hideCollidedObjects() {
		for (let enemy of this.enemies) {
			if (enemy.isCollidedWith(this.ship)) {
				this.collide(this.ship, enemy);
				break;
			}
		}

		for (let projectile of this.projectiles) {
			if (projectile.isVisible) {
				for (let enemy of this.enemies) {
					if (enemy.isVisible) {
						if (projectile.isCollidedWith(enemy)) {
							this.collide(enemy, projectile);
						}
					}
				}
			}
		}
	}

	private collide(m1: MovableObject, m2: MovableObject) {
		let damage = m1.life;
		m1.receiveDamage(m2.life);
		m2.receiveDamage(damage);
	}

	private hideOutOfViewObjects(movables: MovableObject[]) {
		for (let movable of movables) {
			if (!movable.inView(this.view)) {
				this.collide(movable, movable);
			}
		}
	}

	private disposeHiddenObjects(movables: MovableObject[]): MovableObject[] {
		let result: MovableObject[] = [];
		for (let movable of movables) {
			if (movable.isVisible) {
				result.push(movable);
			}
		}
		return result;
	}

	private drawVisibleObjects() {
		for (let projectile of this.projectiles) {
			projectile.move(this.context);
		}
		for (let enemy of this.enemies) {
			enemy.move(this.context);
		}
	}

	private isNewEnemyAllowed(): boolean {
		return Math.random() <= 0.1;
	}

	private createEnemy() {
		this.enemies.push(new EnemyFactory(this.canvas.width).create());
	}
}