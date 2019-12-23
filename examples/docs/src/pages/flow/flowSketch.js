import p from 'p5'

export default (p5) => {

	let canvas = null
	const scale = 0.05
	// const scale = 1
	// const scale = 10

	let rectSize = 20
	
	const backgroundColor = p5.color('#FFFFFF')
	// const backgroundColor = p5.color('#BBFFFF')
	let particlesColor = null
	let vectors = []
	let particles = []

	let prevData = null

	let fr
	
	class Particles {

		constructor(i, pos, vel) {
			// this.position = p5.createVector(pos.x, pos.y)
			// this.velocity = p5.createVector(vel.x, vel.y)
			// this.acceleration = p5.createVector(vel.x, vel.y)
			this.position = p5.createVector(p5.data.random(i) * p5.width, p5.data.random(i+1) * p5.height)
			this.velocity = p5.createVector(0, 0)
			this.acceleration = p5.createVector(0, 0)

			// this.color = p5.color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
		}

		update() {
			this.velocity.add(this.acceleration)
			this.velocity.limit(p5.data.particlesMaxSpeedValue)
			this.position.add(this.velocity)

			this.acceleration.mult(0)
		}

		applyForce(force) {
			this.acceleration.add(force)
		}

		edges() {
			if(this.position.x > p5.width) this.position.x = 0
			if(this.position.x < 0) this.position.x = p5.width
			if(this.position.y > p5.height) this.position.y = 0
			if(this.position.y < 0) this.position.y = p5.height
		}

		draw() {
			p5.stroke(particlesColor)
			p5.strokeWeight(p5.data.particlesStrokeWeightValue)
			p5.point(this.position.x, this.position.y)
		}
	}

	p5.setup = function() {
	  	canvas = p5.createCanvas(0,0)
	  	resizeCanvas()

	  	p5.background(backgroundColor)

	  	fr = p5.createP('')
	}

	function initParticles() {
	  	p5.background(backgroundColor)
		particles = []
	  	for(let i=0; i < p5.data.particlesNumberValue; i++) {
	  		particles[i] = new Particles(i)
			// particles[i].color.setAlpha(p5.data.alphaValue)
	  	}
		particlesColor = p5.color(p5.data.particlesStrokeColorValue)
		particlesColor.setAlpha(p5.data.alphaValue)
	}

	p5.draw = function() {
        if(p5.data && p5.data !== prevData) {
        	// console.log('NEW DATA §!!!', p5.data.particlesNumberValue)
            initParticles()
            prevData = p5.data
        }

        drawFrame()
		
		// console.log('frameRate : ', p5.floor(p5.frameRate()))

        fr.html('frameRate : ' + p5.floor(p5.frameRate()))
	}

	function drawFrame() {

	  	// p5.background(backgroundColor)

	  	vectors = []
        for (var x = 0; x < p5.width; x += rectSize) {
        	vectors[x/rectSize] = []
            for (var y = 0; y < p5.height; y += rectSize) {
				const noiseValue = p5.data.getNoise(x * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale, p5.millis() / p5.data.timeScaleValue)
				drawCell(x, y, noiseValue)
				const cellVector = p.Vector.fromAngle(p5.TWO_PI * noiseValue * p5.data.noiseAppCoefValue)
            	vectors[x/rectSize][y/rectSize] = cellVector
				drawVector(x, y, cellVector)
            }
        }

        drawParticles()
	}

	function drawCell(x, y, noiseValue) {
		if(p5.data.showNoise) {
			p5.noStroke()
			p5.fill(noiseValue * 255 + 50)
			p5.rect(x, y, rectSize, rectSize)
		}
	}

	function drawVector(x, y, cellVector) {
		if(p5.data.showNoise) {
			// p5.stroke('#00ffee')
			p5.stroke(0)
			p5.strokeWeight(1)
			p5.push()
			p5.translate(x + rectSize/2, y + rectSize/2)
			p5.rotate(cellVector.heading())
			p5.line(0, 0, rectSize, 0)
			p5.pop()
		}
	}

	function drawParticles() {
        for(let i=0; i < particles.length; i++) {
        	const particle = particles[i]
        	particle.edges()
        	particle.applyForce(
        		vectors[Math.floor(particle.position.x / rectSize)][Math.floor(particle.position.y / rectSize)]
        	)
	        particle.update()
	        particle.draw()	
        }
	}

	function resizeCanvas() {
	  	const coef = 0.75
	  	const parentWidth = canvas.parent().clientWidth * coef
	  	const computedHeight = parentWidth * (9/16)
	  	p5.resizeCanvas(parentWidth, computedHeight)

	  	initParticles()
	}
	p5.windowResized = function() {
	  	resizeCanvas()
        drawFrame()
	}
}