import { Coordinate } from "./coordinate"
import { Enemy } from "./enemy"

export class EnemyFactory {
	public constructor(private maxX: number) { }

	public create(): Enemy {
		return new Enemy(new Coordinate(this.getRandomInt(0, this.maxX - 5), 0));
	}

	private getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
}