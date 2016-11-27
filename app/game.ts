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
	private score: number;
	public isPaused: boolean = false;

	public constructor(private canvas: HTMLCanvasElement) {
		this.context = this.canvas.getContext('2d');
		this.view = new View(new Coordinate(0, 0), this.canvas.width, this.canvas.height);
		this.ship = this.createShip();
		this.resetScore();
	}

	public move() {
		if (this.isPaused || !this.ship.isVisible) {
			return;
		}

		if (this.isEndOfGame()) {
			this.hintRestart();
			return;
		}

		this.tryAddNewEnemy();

		this.hideOutOfViewObjects(this.projectiles);
		this.hideOutOfViewObjects(this.enemies);
		this.hideCollidedObjects();

		this.moveObjects(this.projectiles);
		this.moveObjects(this.enemies);

		this.projectiles = this.disposeHiddenObjects(this.projectiles);
		this.enemies = this.disposeHiddenObjects(this.enemies);

		this.ship.move(this.context);

		this.hintScore();
	}

	public moveShipLeft() {
		this.ship.moveLeft(this.context);
	}

	public moveShipRight() {
		this.ship.moveRight(this.context);
	}

	public pause() {
		if (this.ship.isVisible) {
			this.isPaused = !this.isPaused;
			this.hintPause();
		}
	}

	public restart() {
		this.projectiles = [];
		this.enemies = [];
		this.resetScore();
		this.ship = this.createShip();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public shipFire() {
		this.projectiles.push(this.ship.fire());
	}

	private isEndOfGame(): boolean {
		for (let enemy of this.enemies) {
			if (enemy.isCollidedWith(this.ship)) {
				this.collide(this.ship, enemy);
				return true;
			}
		}
		return false;
	}

	private hideCollidedObjects() {
		for (let projectile of this.projectiles) {
			if (projectile.isVisible) {
				for (let enemy of this.enemies) {
					if (enemy.isVisible) {
						if (projectile.isCollidedWith(enemy)) {
							this.collide(enemy, projectile);
							if (!enemy.isVisible) {
								this.score += 100;
							}
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

	private moveObjects(movables: MovableObject[]) {
		for (let movable of movables) {
			movable.move(this.context);
		}
	}

	private createShip(): Ship {
		return new Ship(new Coordinate(this.canvas.width / 2, this.canvas.height - 6));
	}

	private tryAddNewEnemy() {
		if (this.isNewEnemyAllowed()) {
			this.createEnemy();
		}
	}

	private isNewEnemyAllowed(): boolean {
		return Math.random() <= 0.1;
	}

	private createEnemy() {
		this.enemies.push(new EnemyFactory(this.canvas.width).create());
	}

	private hintRestart() {
		this.context.font = "32px Courier, monospace";
		this.context.clearRect(0, this.view.height / 2 - 25, this.view.width, 40);
		this.context.fillText("The end. Press 'R' to restart the game.", 25, this.view.height / 2);
	}

	private hintScore() {
		this.context.font = "10px Courier, monospace";
		let gap = (this.score + "").length * 5 + 5;
		this.context.clearRect(this.view.width - gap, 0, gap, 14);
		this.context.fillText(this.score, this.view.width - gap, 10);
	}

	public hintPause() {
		this.context.clearRect(this.view.width / 2 - 50, this.view.height / 2 - 50, 100, 40);
		if (this.isPaused) {
			this.context.font = "32px Courier, monospace";
			this.context.fillText("Pause", this.view.width / 2 - 50, this.view.height / 2 - 20);
		}
	}

	private resetScore() {
		this.score = 0;
	}
}