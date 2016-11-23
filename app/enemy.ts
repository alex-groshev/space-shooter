import { Coordinate } from "./coordinate"
import { MovableObject } from "./MovableObject"

export class Enemy extends MovableObject {
	public constructor(coordinate: Coordinate) {
		super(coordinate);
	}

	public width(): number {
		return 5;
	}

	public height(): number {
		return 5;
	}

	public move(context) {
		this.clear(context);
		if (this.isVisible()) {
			this.coordinate = this.nextCoordinate();
			this.draw(context);
		}
	}

	public pixelsPerMove(): number {
		return 1;
	}

	protected nextCoordinate(): Coordinate {
		return this.coordinate.moveDown(this.pixelsPerMove());
	}

	protected draw(context) {
		context.fillRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}
}