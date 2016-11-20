import { View } from "./view"

export interface Movable {
	move(context);
	inView(view: View): boolean;
	pixelsPerMove(): number;
}