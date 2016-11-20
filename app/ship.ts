import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"
import { Projectile } from "./projectile"

export class Ship implements Movable {
	private edgeSize : number = 5;
	private stepWidth: number = 2;

	public constructor(private context, private coordinate: Coordinate) { }

	public move(context) {
		this.context.beginPath();
		this.context.moveTo(this.coordinate.x, this.coordinate.y);
		this.context.lineTo(this.coordinate.x - this.edgeSize, this.coordinate.y + this.edgeSize);
		this.context.lineTo(this.coordinate.x + this.edgeSize, this.coordinate.y + this.edgeSize);
		//context.lineTo(this.x, this.y);
		//context.stroke();
		this.context.fill();
	}

	public inView(view: View): boolean {
		return true;
	}

	public moveLeft() {
		this.clear();
		this.coordinate = new Coordinate(this.coordinate.x - this.stepWidth, this.coordinate.y);
	}

	public moveRight() {
		this.clear();
		this.coordinate = new Coordinate(this.coordinate.x + this.stepWidth, this.coordinate.y);
	}

	public fire(): Projectile {
		return new Projectile(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
	}

	private clear() {
		this.context.clearRect(this.coordinate.x - this.edgeSize, this.coordinate.y,
			this.edgeSize * 2, this.edgeSize);
	}
}