export class Coordinate {
	public constructor(readonly x: number, readonly y: number) { }

	public moveUp(pixels: number): Coordinate {
		return new Coordinate(this.x, this.y - pixels);
	}

	public moveRight(pixels: number): Coordinate {
		return new Coordinate(this.x + pixels, this.y);
	}

	public moveDown(pixels: number): Coordinate {
		return new Coordinate(this.x, this.y + pixels);
	}

	public moveLeft(pixels: number): Coordinate {
		return new Coordinate(this.x - pixels, this.y);
	}
}