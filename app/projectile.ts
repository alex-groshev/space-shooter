import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Drawable } from "./drawable"

export class Projectile implements Drawable {
	private context;
	private coordinate: Coordinate;

	public constructor(context, coordinate: Coordinate) {
		this.context = context;
		this.coordinate = coordinate;
	}

	public draw() {
		this.context.clearRect(this.coordinate.x, this.coordinate.y, 1, 1);
		this.coordinate = new Coordinate(this.coordinate.x, this.coordinate.y - 1);
		this.context.fillRect(this.coordinate.x, this.coordinate.y, 1, 1);
	}

	public inView(view: View): boolean {
		if (this.coordinate.x < view.coordinate.x) return false;
		if (this.coordinate.x > view.coordinate.x + view.width) return false;
		if (this.coordinate.y < view.coordinate.y) return false;
		if (this.coordinate.y > view.coordinate.y + view.height) return false;
		return true;
	}
}