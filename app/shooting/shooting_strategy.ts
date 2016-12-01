import { Coordinate } from "../coordinate"
import { Projectile } from "../projectile"

export interface ShootingStrategy {
	shoot(from: Coordinate): Projectile;
}
