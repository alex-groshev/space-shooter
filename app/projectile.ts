import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"

export class Projectile implements Movable {
	public constructor(private context, private coordinate: Coordinate) { }

	public move() {
		this.context.clearRect(this.coordinate.x, this.coordinate.y, 1, 1);
		this.coordinate = this.nextCoordinate();
		this.context.fillRect(this.coordinate.x, this.coordinate.y, 1, 1);
	}

	public inView(view: View): boolean {
		//if (this.coordinate.x < view.coordinate.x) return false;
		//if (this.coordinate.x > view.coordinate.x + view.width) return false;
		if (this.coordinate.y < view.coordinate.y) return false;
		if (this.coordinate.y > view.coordinate.y + view.height) return false;
		return true;
	}

	protected nextCoordinate(): Coordinate {
		return new Coordinate(this.coordinate.x, this.coordinate.y - 1);
	}
}