import { Coordinate } from "./coordinate"
import { Movable } from "./movable"

export class Projectile extends Movable {
	public constructor(coordinate: Coordinate) {
		super(coordinate);
	}

	public width(): number {
		return 1;
	}

	public height(): number {
		return 1;
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
		return this.coordinate.moveUp(this.pixelsPerMove());
	}

	protected draw(context) {
		context.fillRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}
}