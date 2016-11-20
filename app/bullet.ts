import { Drawable } from "./drawable"

export class Bullet implements Drawable {
	private context;
	private x: number;
	private y: number;

	public constructor(context, x: number, y: number) {
		this.context = context;
		this.x = x;
		this.y = y;
	}

	public draw() {
		this.context.clearRect(this.x, this.y, 1, 1);
		this.y = this.y - 1;
		this.context.fillRect(this.x, this.y, 1, 1);
	}

	public inView(x: number, y: number, width: number, height: number): boolean {
		if (this.x < x) return false;
		if (this.x > x + width) return false;
		if (this.y < y) return false;
		if (this.y > y + height) return false;
		return true;
	}
}