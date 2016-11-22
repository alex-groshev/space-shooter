import { Coordinate } from "./coordinate"
import { View } from "./view"
import { Movable } from "./movable"
import { Projectile } from "./projectile"

export class Ship implements Movable {
	private edgeSize : number = 5;
	private visible: boolean = true;

	public constructor(private context, private coordinate: Coordinate) { }

	public move(context) {
		this.context.beginPath();
		this.context.moveTo(this.coordinate.x, this.coordinate.y);
		this.context.lineTo(this.coordinate.x - this.edgeSize, this.coordinate.y + this.edgeSize);
		this.context.lineTo(this.coordinate.x + this.edgeSize, this.coordinate.y + this.edgeSize);
		//context.lineTo(this.x, this.y);
		//context.stroke();
		this.context.fill();
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
		return 5;
	}

	public getView(): View {
		return new View(this.coordinate, this.edgeSize, this.edgeSize);
	}

	public isCollidedWith(movable: Movable): boolean {
		return this.inView(movable.getView());
	}

	public moveLeft() {
		this.clear();
		this.coordinate = new Coordinate(this.coordinate.x - this.pixelsPerMove(), this.coordinate.y);
	}

	public moveRight() {
		this.clear();
		this.coordinate = new Coordinate(this.coordinate.x + this.pixelsPerMove(), this.coordinate.y);
	}

	public fire(): Projectile {
		return new Projectile(new Coordinate(this.coordinate.x, this.coordinate.y - 1));
	}

	private clear() {
		this.context.clearRect(this.coordinate.x - this.edgeSize, this.coordinate.y,
			this.edgeSize * 2, this.edgeSize);
	}
}