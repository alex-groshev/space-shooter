import { View } from "./view"

export interface Drawable {
	draw(context);
	inView(view: View): boolean;
}