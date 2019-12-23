function fract(input) {
	input = this.makePositive(input)
	const integer = Math.floor(input)
	const decimal = input - integer
	return decimal
}

function normalizeSeed(seed) {
	if(typeof(seed) != 'number') {
	  seed = Number(seed
	    .split('')
	    .map((char) => {
	      return char.charCodeAt(0)
	    })
	    .join('')
	  )
	}
	return seed
}

function makePositive(input) {
	return input < 0 ? -input : input
}

function smoothStep(f) {
	return f * f * (3.0 - 2.0 * f)
}

function scaled_cosine(i) {
	return 0.5 * (1.0 - Math.cos(i * Math.PI))
}

export default {
	fract,
	normalizeSeed,
	makePositive,
	smoothStep,
	scaled_cosine,
}