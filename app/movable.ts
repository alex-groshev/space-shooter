import { View } from "./view"
import { Coordinate } from "./coordinate"

export abstract class Movable {
	private visible: boolean = true;

	public constructor(protected coordinate: Coordinate) {
	}

	abstract height(): number;

	abstract move(context);

	abstract pixelsPerMove(): number;

	abstract width(): number;

	public getView(): View {
		return new View(this.coordinate, this.width(), this.height());
	}

	public hide() {
		this.visible = false;
	}

	public isCollidedWith(movable: Movable): boolean {
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

	public clear(context) {
		context.clearRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}
}