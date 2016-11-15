import { Drawable } from "./drawable"
import { Ship } from "./ship"

export class Game {
	private canvas : HTMLCanvasElement;
	private context;
	private ship: Ship;
	private objects: Drawable[] = [];

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.ship = new Ship(this.context, 150, 143);
	}

	public start(): void {
		this.ship.draw();
	}

	public end(): void {
	}

	public move(): void {
		//console.log(this.objects.length);
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].draw(this.context);
		}
	}

	public moveShipLeft(): void {
		this.ship.moveLeft();
	}

	public moveShipRight(): void {
		this.ship.moveRight();
	}

	public shipFire(): void {
		this.objects.push(this.ship.fire());
	}
}