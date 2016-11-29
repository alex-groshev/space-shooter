import { Coordinate } from "./coordinate"
import { MovableObject } from "./movableobject"
import { Projectile } from "./projectile"
import { View } from "./view"

export class Ship extends MovableObject {
	public get view(): View {
		return new View(this.coordinate.moveLeft(this.width()), this.width() * 2 + 1, this.height());
	}

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

		//context.strokeRect(this.coordinate.x - this.width(), this.coordinate.y, this.width() * 2 + 1, this.height());
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

	public fire(): Projectile {
		if (this.isVisible) {
			return new Projectile(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
		}
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x - this.width(), this.coordinate.y, this.width() * 2, this.height());
	}
}