function isValidNoiseInput(input: any): boolean {
	if(isNaN(input) || typeof(input) === 'undefined' || input === null) {
		return false
	}
	return true
}

function getRandomSeed(): number {
	return Math.round(Math.random() * 9999)
}

function normalizeSeed(seed: number | string, m: number): number {
    // pick a random seed if seed is undefined or null
	if(seed == null) {
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

function computeSeed(seed: number): number {
    // the >>> 0 casts the seed to an unsigned 32-bit integer
	return seed >>> 0
}

function makePositive(input: number): number {
	return input < 0 ? -input : input
}

function fract(input: number): number {
	input = this.makePositive(input)
	const integer = Math.floor(input)
	const decimal = input - integer
	return decimal
}

function smoothStep(f: number): number {
	return f * f * (3.0 - 2.0 * f)
}

// When x is 1, b is returned
// Linear interpolation is the fastest but has most jagged output
function interpolateLinear(a: number, b: number, x: number): number {
    return a * (1 - x) + b * x;
}

function interpolateCubic(a: number, b: number, x: number): number {
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
function interpolateCosine(a: number, b: number, x: number): number {
    const ft = x * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return a * (1 - f) + b * f;
}

function scaled_cosine(i: number): number {
	return 0.5 * (1.0 - Math.cos(i * Math.PI))
}

export default {
	isValidNoiseInput,
	getRandomSeed,
	normalizeSeed,
	computeSeed,
	makePositive,
	fract,
	smoothStep,
	interpolateLinear,
	interpolateCubic,
	interpolateCosine,
	scaled_cosine,
}