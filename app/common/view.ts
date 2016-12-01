import { Coordinate } from "./coordinate"

export class View {
	public constructor(readonly coordinate: Coordinate, readonly width: number, readonly height: number) { }
}