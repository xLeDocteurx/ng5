class Vect2 {
	constructor(x, y) {
		this.x = x
		this.y = y

		this.magnitude = null
		this.heading = null
	}

	get copy() {
		return Object.assign({}, this)
	}

	set(x, y) {
		this.x = x
		this.y = y
	}

	static add(vector1, vector2) {
		return new Vect2(vector1.x + vector2.x, vector1.y + vector2.y)
	}

	add(otherVector) {
		this.x += otherVector.x
		this.y += otherVector.y
		return this
	}

	static sub(vector1, vector2) {
		return new Vect2(vector1.x - vector2.x, vector1.y - vector2.y)
	}

	sub(otherVector) {
		this.x -= otherVector.x
		this.y -= otherVector.y
		return this
	}

	static mult(vector, scalar) {
		return new Vect2(vector.x * scalar, vector.y * scalar)
	}

	mult(scalar) {
		this.x *= scalar
		this.y *= scalar
		return this
	}

	static div(vector, scalar) {
		return new Vect2(vector.x / scalar, vector.y / scalar)
	}

	div(scalar) {
		this.x /= scalar
		this.y /= scalar
		return this
	}

	static magnitude(vector) {
		return Math.atan(vector.y, vector.x)
	}

	magnitude() {
		return Math.atan(this.y, this.x)
	}


	static distance(vector1, vector2) {
		return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2))
	}

	distance(otherVector) {
		return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2))
	}

	static dot(vector1, vector2) {
		return vector1.x * vector2.x + vector1.y * vector2.y
	}

	dot(otherVector) {
		// const degAngle = 
		// const radAngle = Math.PI / 180 / degAngle
		// const radAngle = Math.atan(y/x)
		// return Math.sqrt(Math.pow(vect1.x, 2) + Math.pow(vect1.y, 2)) * Math.sqrt(Math.pow(vect2.x, 2) + Math.pow(vect2.y, 2)) * Math.cos(radAngle)
		return this.x * otherVector.x + this.y * otherVector.y
	}

}

class Vect3 {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z

		this.magnitude = null
		this.heading = null
	}

	copy(x, y) {
		return Object.assign({}, this)
	}

	set(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	static add(vector1, vector2) {
		return new Vect3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z)
	}

	add(otherVector) {
		vector1.x += vector2.x
		vector1.y += vector2.y
		vector1.z += vector2.z
		return this
	}

	static sub(vector1, vector2) {
		return new Vect3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z)
	}

	sub(otherVector) {
		vector1.x -= vector2.x
		vector1.y -= vector2.y
		vector1.z -= vector2.z
		return this
	}

	static mult(vector, scalar) {
		return new Vect3(vector.x * scalar, vector.y * scalar, vector.z * scalar)
	}

	mult(scalar) {
		this.x *= scalar
		this.y *= scalar
		this.z *= scalar
		return this
	}

	static div(vector, scalar) {
		return new Vect3(vector.x / scalar, vector.y / scalar, vector.z / scalar)
	}

	div(scalar) {
		this.x /= scalar
		this.y /= scalar
		this.z /= scalar
		return this
	}

	static distance(vector1, vector2) {
		return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2))
	}

	distance(otherVector) {
		return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2) + Math.pow(otherVector.z - this.z, 2))
	}

	static dot(vector1, vector2) {
		return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
	}

	dot(otherVector) {
		return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
	}

}

class Vect4 {
	constructor(x, y, z, w) {
		this.x = x
		this.y = y
		this.z = z
		this.w = w

		this.magnitude = null
		this.heading = null
	}

	copy(x, y) {
		return Object.assign({}, this)
	}

	set(x, y, z, w) {
		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}

	static add(vector1, vector2) {
		return new Vect4(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z, vector1.w + vector2.w)
	}

	add(otherVector) {
		vector1.x += vector2.x
		vector1.y += vector2.y
		vector1.z += vector2.z
		vector1.w += vector2.w
		return this
	}

	static sub(vector1, vector2) {
		return new Vect4(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z, vector1.w - vector2.w)
	}

	sub(otherVector) {
		vector1.x -= vector2.x
		vector1.y -= vector2.y
		vector1.z -= vector2.z
		vector1.w -= vector2.w
		return this
	}

	static mult(vector, scalar) {
		return new Vect4(vector.x * scalar, vector.y * scalar, vector.z * scalar, vector.w * scalar)
	}

	mult(scalar) {
		this.x *= scalar
		this.y *= scalar
		this.z *= scalar
		this.w *= scalar
		return this
	}

	static div(vector, scalar) {
		return new Vect4(vector.x / scalar, vector.y / scalar, vector.z / scalar, vector.w / scalar)
	}

	div(scalar) {
		this.x /= scalar
		this.y /= scalar
		this.z /= scalar
		this.w /= scalar
		return this
	}

	static distance(vector1, vector2) {
		return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2) + Math.pow(vector2.w - vector1.w, 2))
	}

	distance(otherVector) {
		return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2) + Math.pow(otherVector.z - this.z, 2) + Math.pow(otherVector.w - this.w, 2))
	}

	static dot(vector1, vector2) {
		return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z + vector1.w * vector2.w
	}

	dot(otherVector) {
		return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z + this.w * otherVector.w
	}

}

export default {
	Vect2,
	Vect3,
	Vect4,
}