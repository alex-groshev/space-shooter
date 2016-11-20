import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Drawable } from "./drawable"
import { Projectile } from "./projectile"

export class Ship implements Drawable {
	private context;
	private edgeSize : number = 5;
	private stepWidth: number = 2;
	private coordinate: Coordinate;

	public constructor(context, coordinate: Coordinate) {
		this.context = context;
		this.coordinate = coordinate;
	}

	public draw() {
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
		//this.draw();
	}

	public moveRight() {
		this.clear();
		this.coordinate = new Coordinate(this.coordinate.x + this.stepWidth, this.coordinate.y);
		//this.draw();
	}

	public fire(): Projectile {
		return new Projectile(this.context, new Coordinate(this.coordinate.x, this.coordinate.y - 1));
	}

	private clear() {
		this.context.clearRect(this.coordinate.x - this.edgeSize, this.coordinate.y,
			this.edgeSize * 2, this.edgeSize);
	}
}