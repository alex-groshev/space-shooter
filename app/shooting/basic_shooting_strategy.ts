import { Coordinate } from "../common/coordinate"
import { Projectile } from "../projectile"
import { ShootingStrategy } from "./shooting_strategy"

export class BasicShootingStrategy implements ShootingStrategy {
	private n: number = 10;
	private frequency: number;

	public constructor() {
		this.frequency = this.n;
	}

	public shoot(from: Coordinate): Projectile {
		let result = null;
		if (this.frequency % this.n == 0) {
			result = new Projectile(from);
		}
		this.frequency--;
		if (this.frequency == 0) {
			this.frequency = this.n;
		}
		return result;
	}
}
