import { Coordinate } from "./coordinate"
import { Movable } from "./movable"
import { Projectile } from "./projectile"

export class Ship extends Movable {
	public constructor(private context, coordinate: Coordinate) {
		super(coordinate);
	}

	public width(): number {
		return 5;
	}

	public height(): number {
		return 5;
	}

	public move(context) {
		this.context.beginPath();
		this.context.moveTo(this.coordinate.x, this.coordinate.y);
		this.context.lineTo(this.coordinate.x - this.width(), this.coordinate.y + this.height());
		this.context.lineTo(this.coordinate.x + this.width(), this.coordinate.y + this.height());
		//context.lineTo(this.x, this.y);
		//context.stroke();
		this.context.fill();
	}

	public pixelsPerMove(): number {
		return 5;
	}

	public moveLeft() {
		this.clear(this.context);
		this.coordinate = new Coordinate(this.coordinate.x - this.pixelsPerMove(), this.coordinate.y);
	}

	public moveRight() {
		this.clear(this.context);
		this.coordinate = new Coordinate(this.coordinate.x + this.pixelsPerMove(), this.coordinate.y);
	}

	public fire(): Projectile {
		return new Projectile(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
	}

	public clear(context) {
		context.clearRect(this.coordinate.x - this.width(), this.coordinate.y, this.width() * 2, this.height());
	}
}