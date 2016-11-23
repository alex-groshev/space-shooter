import { View } from "./view"
import { Coordinate } from "./coordinate"

export abstract class MovableObject {
	private visible: boolean = true;

	public constructor(protected coordinate: Coordinate) { }

	public getView(): View {
		return new View(this.coordinate, this.width(), this.height());
	}

	public hide() {
		this.visible = false;
	}

	public isCollidedWith(movable: MovableObject): boolean {
		return this.inView(movable.getView());
	}

	public inView(view: View): boolean {
		if (this.coordinate.x < view.coordinate.x) return false;
		if (this.coordinate.x > view.coordinate.x + view.width) return false;
		if (this.coordinate.y < view.coordinate.y) return false;
		if (this.coordinate.y > view.coordinate.y + view.height) return false;
		return true;
	}

	public isVisible(): boolean {
		return this.visible;
	}

	public move(context) {
		this.clear(context);
		if (this.isVisible()) {
			this.coordinate = this.nextCoordinate();
			this.draw(context);
		}
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}

	protected draw(context) {
		context.fillRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}

	public abstract height(): number;

	public abstract width(): number;

	protected abstract nextCoordinate(): Coordinate;

	protected abstract pixelsPerMove(): number;
}