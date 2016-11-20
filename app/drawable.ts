export interface Drawable {
	draw(context);
	inView(x: number, y: number, width: number, height: number): boolean;
}