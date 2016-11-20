import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Drawable } from "./drawable"

export class Enemy implements Drawable {
	private edgeSize : number = 5;
	private context;
	private coordinate: Coordinate;

	public constructor(context, coordinate: Coordinate) {
		this.context = context;
		this.coordinate = coordinate;
	}

	public draw(context) {
		console.log(this.coordinate.y);
		this.context.clearRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
		this.coordinate = this.nextCoordinate();
		this.context.fillRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
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