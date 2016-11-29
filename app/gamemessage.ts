import { View } from "./view"

export class GameMessage {
	private fontBig: string = "32px Courier, monospace";
	private fontSmall: string = "10px Courier, monospace";

	public constructor(private context, private view: View) {}

	public restart() {
		this.context.font = this.fontBig;
		this.context.clearRect(0, this.view.height / 2 - 25, this.view.width, 40);
		this.context.fillText("The end. Press 'R' to restart the game.", 25, this.view.height / 2);
	}

	public score(x: number) {
		this.context.font = this.fontSmall;
		let gap = (x + "").length * 5 + 5;
		this.context.clearRect(this.view.width - gap, 0, gap, 14);
		this.context.fillText(x, this.view.width - gap, 10);
	}

	public pause(isPaused: boolean) {
		this.context.clearRect(this.view.width / 2 - 50, this.view.height / 2 - 50, 100, 40);
		if (isPaused) {
			this.context.font = this.fontBig;
			this.context.fillText("Pause", this.view.width / 2 - 50, this.view.height / 2 - 20);
		}
	}
}