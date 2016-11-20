export class Coordinate {
	public constructor(readonly x: number, readonly y: number) { }

	public moveUp(pixels: number): Coordinate {
		return new Coordinate(this.x, this.y - pixels);
	}

	public moveDown(pixels: number): Coordinate {
		return new Coordinate(this.x, this.y + pixels);
	}
}