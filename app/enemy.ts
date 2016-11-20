import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"

export class Enemy implements Movable {
	private edgeSize : number = 5;

	public constructor(private coordinate: Coordinate) { }

	public move(context) {
		context.clearRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
		this.coordinate = this.nextCoordinate();
		context.fillRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
	}

	public inView(view: View): boolean {
		//if (this.coordinate.x < view.coordinate.x) return false;
		//if (this.coordinate.x > view.coordinate.x + view.width) return false;
		if (this.coordinate.y < view.coordinate.y) return false;
		if (this.coordinate.y > view.coordinate.y + view.height) return false;
		return true;
	}

	protected nextCoordinate(): Coordinate {
		return new Coordinate(this.coordinate.x, this.coordinate.y + 1);
	}
}