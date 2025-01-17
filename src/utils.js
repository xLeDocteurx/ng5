function isValidNoiseInput(input) {
	if(isNaN(input) || typeof(input) === 'undefined' || input === null) {
		return false
	}
	return true
}

function getRandomSeed() {
	return Math.round(Math.random() * 9999)
}

function normalizeSeed(seed, m) {
	if(seed == null || seed == '') {
		return getRandomSeed() * m
	}
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

function computeSeed(seed) {
    // pick a random seed if seed is undefined or null
    // the >>> 0 casts the seed to an unsigned 32-bit integer
	return seed >>> 0
}

function makePositive(input) {
	return input < 0 ? -input : input
}

function fract(input) {
	// input = this.makePositive(input)
	const integer = Math.floor(input)
	const decimal = input - integer
	return decimal
}

// When x is 1, b is returned
// Linear interpolation is the fastest but has most jagged output
function interpolateLinear(a, b, x) {
    return a * (1 - x) + b * x;
}

function interpolateCubic(a, b, x) {
  	return a * (1 - smoothStep(x)) + b * smoothStep(x)
}

// function interpolateCubic(v0, v1, v2, v3, x) {
//     const p = (v3 - v2) - (v0 - v1);
//     const q = (v0 - v1) - p;
//     const r = v2 - v0;
//     const s = v1;
//     return p * x * x * x + q * x * x + r * x + s;
// }

// Slightly slower than linear interpolation but much smoother
function interpolateCosine(a, b, x) {
    const ft = x * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return a * (1 - f) + b * f;
}

function smoothStep(f) {
	return f * f * (3.0 - 2.0 * f)
}

function scaled_cosine(i) {
	return 0.5 * (1.0 - Math.cos(i * Math.PI))
}

export default {
	isValidNoiseInput,
	normalizeSeed,
	getRandomSeed,
	computeSeed,
	makePositive,
	fract,
	interpolateLinear,
	interpolateCubic,
	interpolateCosine,
	smoothStep,
	scaled_cosine,
}