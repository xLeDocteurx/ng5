import utils from './utils'

import vectors from './Vector'
import Particle from './Particle'

export default class NoiseGenerator {

    // GLOBAL VARIABLES
    sineAmplitude: number = 100000.0
    referenceVector: vectors.Vect3 = new vectors.Vect3(12.9898,78.233, 91.93432)

    seed: number | string
    computedSeed: number

    // Linear Congruential Generator
    // Variant of a Lehman Generator
    private lcg: object = {
        // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
        // m is basically chosen to be large (as it is the max period)
        // and for its relationships to a and c
        m: 4294967296,
        // a - 1 should be divisible by m's prime factors
        a: 1664525,
        // c and m should be co-prime
        c: 1013904223,
        z: null
    }

    constructor() {
        // GLOBAL VARIABLES
        // this.referenceVector = new vectors.Vect3(12.9898,78.233, 91.93432)

    }
}