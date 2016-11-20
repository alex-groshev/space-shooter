import { Drawable } from "./drawable"
import { Bullet } from "./bullet"

export class Ship implements Drawable {
	private context;
	private edgeSize : number = 5;
	private stepWidth: number = 2;
	private x: number;
	private y: number;

	public constructor(context, x: number, y: number) {
		this.context = context;
		this.x = x;
		this.y = y;
	}

	public draw() {
		this.context.beginPath();
		this.context.moveTo(this.x, this.y);
		this.context.lineTo(this.x - this.edgeSize, this.y + this.edgeSize);
		this.context.lineTo(this.x + this.edgeSize, this.y + this.edgeSize);
		//context.lineTo(this.x, this.y);
		//context.stroke();
		this.context.fill();
	}

	public inView(x: number, y: number, width: number, height: number): boolean {
		return true;
	}

	public moveLeft() {
		this.clear();
		this.x = this.x - this.stepWidth;
		this.draw();
	}

	public moveRight() {
		this.clear();
		this.x = this.x + this.stepWidth;
		this.draw();
	}

	public fire(): Bullet {
		return new Bullet(this.context, this.x, this.y - 1);
	}

	private clear() {
		this.context.clearRect(this.x - this.edgeSize, this.y, this.edgeSize * 2, this.edgeSize);
	}
}