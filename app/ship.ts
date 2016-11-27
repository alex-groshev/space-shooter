import { Coordinate } from "./coordinate"
import { MovableObject } from "./movableobject"
import { Projectile } from "./projectile"

export class Ship extends MovableObject {
	public constructor(coordinate: Coordinate) {
		super(coordinate);
	}

	public width(): number {
		return 5;
	}

	public height(): number {
		return 5;
	}

	protected nextCoordinate(): Coordinate {
		return null;
	}

	protected pixelsPerMove(): number {
		return 5;
	}

	public move(context) {
		context.beginPath();
		context.moveTo(this.coordinate.x, this.coordinate.y);
		context.lineTo(this.coordinate.x - this.width(), this.coordinate.y + this.height());
		context.lineTo(this.coordinate.x + this.width(), this.coordinate.y + this.height());
		//context.lineTo(this.x, this.y);
		//context.stroke();
		context.fill();
	}

	public moveLeft(context) {
		this.clear(context);
		this.coordinate = new Coordinate(this.coordinate.x - this.pixelsPerMove(), this.coordinate.y);
	}

	public moveRight(context) {
		this.clear(context);
		this.coordinate = new Coordinate(this.coordinate.x + this.pixelsPerMove(), this.coordinate.y);
	}

	public fire(): Projectile {
		return new Projectile(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x - this.width(), this.coordinate.y, this.width() * 2, this.height());
	}
}