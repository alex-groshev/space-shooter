import { Coordinate } from "./coordinate"
import { MovableObject } from "./movableobject"

export class Enemy extends MovableObject {
	public constructor(coordinate: Coordinate) {
		super(coordinate);
	}

	public get width(): number {
		return 5;
	}

	public get height(): number {
		return 5;
	}

	protected nextCoordinate(): Coordinate {
		return this.coordinate.moveDown(this.pixelsPerMove());
	}

	protected pixelsPerMove(): number {
		return 1;
	}
}