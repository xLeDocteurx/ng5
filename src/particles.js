class Particles {

	// constructor(i, pos, vel) {
	// 	// this.position = p5.createVector(pos.x, pos.y)
	// 	// this.velocity = p5.createVector(vel.x, vel.y)
	// 	// this.acceleration = p5.createVector(vel.x, vel.y)
	// 	this.position = p5.createVector(p5.data.random(i) * p5.width, p5.data.random(i+1) * p5.height)
	// 	this.velocity = p5.createVector(0, 0)
	// 	this.acceleration = p5.createVector(0, 0)

	// 	this.color = p5.color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
	// 	this.color.setAlpha(p5.data.alphaValue)
	// }

	// update() {
	// 	this.velocity.add(this.acceleration)
	// 	this.velocity.limit(p5.data.particlesMaxSpeedValue)
	// 	this.position.add(this.velocity)

	// 	this.acceleration.mult(0)
	// }

	// applyForce(force) {
	// 	this.acceleration.add(force)
	// }

	// edges() {
	// 	if(this.position.x > p5.width) this.position.x = 0
	// 	if(this.position.x < 0) this.position.x = p5.width
	// 	if(this.position.y > p5.height) this.position.y = 0
	// 	if(this.position.y < 0) this.position.y = p5.height
	// }

	// draw() {
	// 	p5.stroke(this.color)
	// 	p5.strokeWeight(p5.data.particlesStrokeWeightValue)
	// 	p5.point(this.position.x, this.position.y)
	// }
}

export default Particle