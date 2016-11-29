import { View } from "./view"
import { Coordinate } from "./coordinate"

export abstract class MovableObject {
	private visible: boolean = true;
	private remainingLife: number = 100;

	public get isVisible(): boolean {
		return this.visible;
	}

	public get life(): number {
		return this.remainingLife;
	}

	public get view(): View {
		return new View(this.coordinate, this.width(), this.height());
	}

	public constructor(protected coordinate: Coordinate) { }

	public isCollidedWith(movable: MovableObject): boolean {
		return this.inView(movable.view);
	}

	public inView(view: View): boolean {
		if (this.coordinate.x < view.coordinate.x + view.width &&
			this.coordinate.x + this.width() > view.coordinate.x &&
			this.coordinate.y < view.coordinate.y + view.height &&
			this.height() + this.coordinate.y > view.coordinate.y) {
			return true;
		}
		return false;
	}

	public move(context) {
		this.clear(context);
		if (this.isVisible) {
			this.coordinate = this.nextCoordinate();
			this.draw(context);
		}
	}

	public receiveDamage(amount: number) {
		this.remainingLife -= amount;
		if (this.life <= 0) {
			this.hide();
		}
	}

	protected clear(context) {
		context.clearRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}

	protected draw(context) {
		context.fillRect(this.coordinate.x, this.coordinate.y, this.width(), this.height());
	}

	private hide() {
		this.visible = false;
	}

	public abstract height(): number;

	public abstract width(): number;

	protected abstract nextCoordinate(): Coordinate;

	protected abstract pixelsPerMove(): number;
}