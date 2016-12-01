import { Coordinate } from "./coordinate"
import { MovableObject } from "./movableobject"
import { Projectile } from "./projectile"
import { View } from "./view"
import { ShootingStrategy } from "./shooting/shooting_strategy"
import { BasicShootingStrategy } from "./shooting/basic_shooting_strategy"

export class Ship extends MovableObject {
	private shootingStrategy: ShootingStrategy;

	public get view(): View {
		return new View(this.coordinate.moveLeft(this.width), this.width * 2 + 1, this.height);
	}

	public constructor(coordinate: Coordinate) {
		super(coordinate);
		this.shootingStrategy = new BasicShootingStrategy();
	}

	public get width(): number {
		return 5;
	}

	public get height(): number {
		return 5;
	}

	protected nextCoordinate(): Coordinate {
		return null;
	}

	protected pixelsPerMove(): number {
		return 1;
	}

	public move(context) {
		context.beginPath();
		context.moveTo(this.coordinate.x, this.coordinate.y);
		context.lineTo(this.coordinate.x - this.width, this.coordinate.y + this.height);
		context.lineTo(this.coordinate.x + this.width, this.coordinate.y + this.height);
		//context.lineTo(this.x, this.y);
		//context.stroke();
		context.fill();
	}

	public moveLeft(context) {
		if (this.isVisible) {
			this.clear(context);
			this.coordinate = new Coordinate(this.coordinate.x - this.pixelsPerMove(), this.coordinate.y);
		}
	}

	public moveRight(context) {
		if (this.isVisible) {
			this.clear(context);
			this.coordinate = new Coordinate(this.coordinate.x + this.pixelsPerMove(), this.coordinate.y);
		}
	}

	public shoot(): Projectile {
		if (this.isVisible) {
			return this.shootingStrategy.shoot(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
		}
		return null;
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x - this.width, this.coordinate.y, this.width * 2, this.height);
	}
}
