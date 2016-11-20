import { Coordinate } from "./coordinate"

export class View {
	public readonly coordinate: Coordinate;
	public readonly width: number;
	public readonly height: number;

	public constructor(coordinate: Coordinate, width: number, height: number) {
		this.coordinate = coordinate;
		this.width = width;
		this.height = height;
	}
}