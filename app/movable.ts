import { View } from "./view"

export interface Movable {
	move(context);
	hide();
	isVisible(): boolean;
	inView(view: View): boolean;
	pixelsPerMove(): number;
	getView(): View;
	isCollidedWith(movable: Movable): boolean;
}