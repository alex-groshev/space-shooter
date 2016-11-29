import { Coordinate } from "./coordinate"
import { MovableObject } from "./movableobject"

export class Projectile extends MovableObject {
	public constructor(coordinate: Coordinate) {
		super(coordinate);
	}

	public get width(): number {
		return 1;
	}

	public get height(): number {
		return 1;
	}

	protected nextCoordinate(): Coordinate {
		return this.coordinate.moveUp(this.pixelsPerMove());
	}

	protected pixelsPerMove(): number {
		return 1;
	}
}