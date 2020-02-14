class Vect2 {

    x: number;
    y: number;

    // magnitude: number;
    // heading: number;

	constructor(x: number, y: number) {
		this.x = x
		this.y = y

		// this.magnitude = null
		// this.heading = null
	}

	get copy(): Vect2 {
		return Object.assign({}, this)
	}

	get integer(): Vect2 {
		const posX = this.x < 0 ? -this.x : this.x
		const posY = this.y < 0 ? -this.y : this.y
		const integerX = Math.floor(posX)
		const integerY = Math.floor(posY)
		return new Vect2(integerX, integerY)
	}

	get fract(): Vect2 {
		const posX = this.x < 0 ? -this.x : this.x
		const posY = this.y < 0 ? -this.y : this.y
		const decimalX = posX - Math.floor(posX)
		const decimalY = posY - Math.floor(posY)
		return new Vect2(decimalX, decimalY)
	}

	set(x: number, y: number): void {
		this.x = x
		this.y = y
    }

	// set setMagnitude(mag: number) {
	// 	this.magnitude = mag
	// }

	// set setHeading(head: number) {
	// 	this.heading = head
	// }

	static add(vector1: Vect2, vector2: Vect2): Vect2 {
		return new Vect2(vector1.x + vector2.x, vector1.y + vector2.y)
	}

	add(otherVector: Vect2): Vect2 {
		this.x += otherVector.x
		this.y += otherVector.y
		return this
	}

	static sub(vector1: Vect2, vector2: Vect2): Vect2 {
		return new Vect2(vector1.x - vector2.x, vector1.y - vector2.y)
	}

	sub(otherVector: Vect2): Vect2 {
		this.x -= otherVector.x
		this.y -= otherVector.y
		return this
	}

	static mult(vector: Vect2, scalar: number): Vect2 {
		return new Vect2(vector.x * scalar, vector.y * scalar)
	}

	mult(scalar: number): Vect2 {
		this.x *= scalar
		this.y *= scalar
		return this
	}

	static div(vector: Vect2, scalar: number) {
		return new Vect2(vector.x / scalar, vector.y / scalar)
	}

	div(scalar: number): Vect2 {
		this.x /= scalar
		this.y /= scalar
		return this
	}

	// static magnitude(vector: Vect2): number {
	// 	return Math.atan(vector.y, vector.x)
	// }

	// magnitude(): number {
	// 	return Math.atan(this.y, this.x)
	// }

	static distance(vector1: Vect2, vector2: Vect2): number {
		return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2))
	}

	distance(otherVector: Vect2): number {
		return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2))
	}

	static dot(vector1: Vect2, vector2: Vect2): number {
		return vector1.x * vector2.x + vector1.y * vector2.y
	}

	dot(otherVector: Vect2): number {
		// const degAngle = 
		// const radAngle = Math.PI / 180 / degAngle
		// const radAngle = Math.atan(y/x)
		// return Math.sqrt(Math.pow(vect1.x, 2) + Math.pow(vect1.y, 2)) * Math.sqrt(Math.pow(vect2.x, 2) + Math.pow(vect2.y, 2)) * Math.cos(radAngle)
		return this.x * otherVector.x + this.y * otherVector.y
	}
}

class Vect3 {

	x: number;
	y: number;
	z: number;

	// magnitude: number;
	// heading: number;

	constructor(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z

		// this.magnitude = null
		// this.heading = null
	}

	copy(): Vect3 {
		return Object.assign({}, this)
	}

	get integer(): Vect3 {
		const posX = this.x < 0 ? -this.x : this.x
		const posY = this.y < 0 ? -this.y : this.y
		const posZ = this.z < 0 ? -this.z : this.z
		const integerX = Math.floor(posX)
		const integerY = Math.floor(posY)
		const integerZ = Math.floor(posZ)
		return new Vect3(integerX, integerY, integerZ)
	}

	get fract(): Vect3 {
		const posX = this.x < 0 ? -this.x : this.x
		const posY = this.y < 0 ? -this.y : this.y
		const posZ = this.z < 0 ? -this.z : this.z
		const decimalX = posX - Math.floor(posX)
		const decimalY = posY - Math.floor(posY)
		const decimalZ = posZ - Math.floor(posZ)
		return new Vect3(decimalX, decimalY, decimalZ)
	}

	set(x: number, y: number, z: number): void {
		this.x = x
		this.y = y
		this.z = z
	}

	// set setMagnitude(mag) {
	// 	this.magnitude = mag
	// }

	// set setHeading(head) {
	// 	this.heading = head
	// }

	static add(vector1: Vect3, vector2: Vect3): Vect3 {
		return new Vect3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z)
	}

	add(otherVector: Vect3): Vect3 {
		this.x += otherVector.x
		this.y += otherVector.y
		this.z += otherVector.z
		return this
	}

	static sub(vector1: Vect3, vector2: Vect3): Vect3 {
		return new Vect3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z)
	}

	sub(otherVector: Vect3): Vect3 {
		this.x -= otherVector.x
		this.y -= otherVector.y
		this.z -= otherVector.z
		return this
	}

	static mult(vector: Vect3, scalar: number): Vect3 {
		return new Vect3(vector.x * scalar, vector.y * scalar, vector.z * scalar)
	}

	mult(scalar: number): Vect3 {
		this.x *= scalar
		this.y *= scalar
		this.z *= scalar
		return this
	}

	static div(vector: Vect3, scalar: number): Vect3 {
		return new Vect3(vector.x / scalar, vector.y / scalar, vector.z / scalar)
	}

	div(scalar: number): Vect3 {
		this.x /= scalar
		this.y /= scalar
		this.z /= scalar
		return this
	}

	static distance(vector1: Vect3, vector2: Vect3): number {
		return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2))
	}

	distance(otherVector: Vect3): number {
		return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2) + Math.pow(otherVector.z - this.z, 2))
	}

	static dot(vector1: Vect3, vector2: Vect3): number {
		return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
	}

	dot(otherVector: Vect3): number {
		return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
	}

}

// class Vect4 {

// }

export default {
    Vect2,
    Vect3,
    // Vect4,
}