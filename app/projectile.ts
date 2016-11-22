import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"

export class Projectile implements Movable {
	private edgeSize : number = 1;
	private visible: boolean = true;

	public constructor(private coordinate: Coordinate) { }

	public move(context) {
		this.clear(context);
		if (this.isVisible()) {
			this.coordinate = this.nextCoordinate();
			this.draw(context);
		}
	}

	public hide() {
		this.visible = false;
	}

	public isVisible(): boolean {
		return this.visible;
	}

	public inView(view: View): boolean {
		if (this.coordinate.x < view.coordinate.x) return false;
		if (this.coordinate.x > view.coordinate.x + view.width) return false;
		if (this.coordinate.y < view.coordinate.y) return false;
		if (this.coordinate.y > view.coordinate.y + view.height) return false;
		return true;
	}

	public pixelsPerMove(): number {
		return 1;
	}

	public getView(): View {
		return new View(this.coordinate, this.edgeSize, this.edgeSize);
	}

	public isCollidedWith(movable: Movable): boolean {
		return this.inView(movable.getView());
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
	}

	protected nextCoordinate(): Coordinate {
		return this.coordinate.moveUp(this.pixelsPerMove());
	}

	protected draw(context) {
		context.fillRect(this.coordinate.x, this.coordinate.y, this.edgeSize, this.edgeSize);
	}
}