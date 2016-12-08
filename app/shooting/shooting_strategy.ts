import { Coordinate } from "../common/coordinate"
import { Projectile } from "../projectile"

export interface ShootingStrategy {
	shoot(from: Coordinate): Projectile;
}
