import utils from './utils.js'
// import {dot, Vect2, Vect3, Vect4} from './vectors.js'
import vectors from './vectors.js'
import particles from './particles.js'

class NoiseGenerator {
  
  constructor(props) {

    // GLOBAL VARIABLES
    this.sineAmplitude = 100000.0
    this.referenceVector = new vectors.Vect3(12.9898,78.233, 91.93432)

    this.seed = null
    this.computedSeed = null

    this.noise = null // will be initialized lazily by getNoise() or setNoiseSeed()
    
    this.NOISE_YWRAPB = 4
    this.NOISE_YWRAP = 1 << this.NOISE_YWRAPB
    this.NOISE_ZWRAPB = 8
    this.NOISE_ZWRAP = 1 << this.NOISE_ZWRAPB
    this.NOISE_SIZE = props && props.noiseSize ? props.noiseSize : 4095

    // Linear Congruential Generator
    // Variant of a Lehman Generator
    this.lcg = {
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

    // WHITE NOISE
    this.white = null

    // // BROWNIAN NOISE
    // this.BROWNIAN_YWRAPB = 4
    // this.BROWNIAN_YWRAP = 1 << this.BROWNIAN_YWRAPB
    // this.BROWNIAN_ZWRAPB = 8
    // this.BROWNIAN_ZWRAP = 1 << this.BROWNIAN_ZWRAPB
    // this.BROWNIAN_SIZE = 4095

    // this.brownian = null

    // PERLIN NOISE    
    this.perlin_octaves = props && props.octaves ? props.octaves : 4 // default to medium smooth
    this.perlin_amp_falloff = props && props.falloff ? props.falloff : 0.5 // 50% reduction/octave
    
    // this.perlin = null // will be initialized lazily by getNoise() or setNoiseSeed()

    // CELLULAR NOISE

    if(props && props.seed)
      this.setNoiseSeed(props.seed)

  }

  random(x, y ,z) {
    x = x ? utils.normalizeSeed(x) : Math.random()
    y = y ? utils.normalizeSeed(y) : 0
    z = z ? utils.normalizeSeed(z) : 0

    x = utils.makePositive(x)
    y = utils.makePositive(y)
    z = utils.makePositive(z)

    const output = utils.fract(Math.sin(x)*this.sineAmplitude*(this.computedSeed ? this.computedSeed : utils.getRandomSeed()))
    return output
  }

  // dot(vector1, vector2) {
  //   return vector1.x * vector2.x + vector1.y * vector2.y
  // }

  // WHITE NOISE
  getWhiteNoise(x, y, z) {

    x = utils.isValidNoiseInput(x) ? x : this.random()
    y = utils.isValidNoiseInput(y) ? y : 0
    z = utils.isValidNoiseInput(z) ? z : 0

    return utils.fract(
      Math.sin(
        vectors.Vect3.dot(
          new vectors.Vect3(x,y,z),
          this.referenceVector
        )
      )
      // *43758.5453123
      *this.sineAmplitude*(this.computedSeed ? this.computedSeed : utils.getRandomSeed())
    );

  }

  // PERLIN NOISE
  getPerlinNoise(x, y, z) {

    x = utils.isValidNoiseInput(x) ? x : this.random()
    y = utils.isValidNoiseInput(y) ? y : 0
    z = utils.isValidNoiseInput(z) ? z : 0
    // const xi = Math.floor(x)
    // const xf = utils.fract(x)
    // const yi = Math.floor(y)
    // const yf = utils.fract(y)
    // const zi = Math.floor(z)
    // const zf = utils.fract(z)

    let r = 0
    // let r = []
    let ampl = 0.5

    for(let o = 0; o < this.perlin_octaves; o++) {

      const octaveAmplitude = o > 0 ? Math.pow(this.perlin_amp_falloff, o) : 1
      // const octaveScale = o > 0 ? 1 / (o * 2) : 1
      // const octaveScale = o > 0 ? Math.pow(0.5, o) : 1
      const octaveScale = o > 0 ? Math.pow(2, o) : 1

      const vector = new vectors.Vect3(x * octaveScale,y * octaveScale,z * octaveScale)
      const vectorInteger = vector.integer
      const vectorFract = vector.fract

      // const os = o > 0 ? Math.pow(2, o) : 1
      // console.log('os', os)
      // const octaveScale = 1

      const randA = this.getWhiteNoise(vectorInteger.x, vectorInteger.y, vectorInteger.z)
      const randB = this.getWhiteNoise(vectorInteger.x+1, vectorInteger.y, vectorInteger.z)
      const randC = this.getWhiteNoise(vectorInteger.x, vectorInteger.y+1, vectorInteger.z)
      const randD = this.getWhiteNoise(vectorInteger.x+1, vectorInteger.y+1, vectorInteger.z)
      const randE = this.getWhiteNoise(vectorInteger.x, vectorInteger.y, vectorInteger.z+1)
      const randF = this.getWhiteNoise(vectorInteger.x+1, vectorInteger.y, vectorInteger.z+1)
      const randG = this.getWhiteNoise(vectorInteger.x, vectorInteger.y+1, vectorInteger.z+1)
      const randH = this.getWhiteNoise(vectorInteger.x+1, vectorInteger.y+1, vectorInteger.z+1)

      const lerpABCDEFGH = utils.interpolateCubic(
        utils.interpolateCubic(
          utils.interpolateCubic(randA, randB, vectorFract.x),
          utils.interpolateCubic(randC, randD, vectorFract.x),
          vectorFract.y
        ),
        utils.interpolateCubic(
          utils.interpolateCubic(randE, randF, vectorFract.x),
          utils.interpolateCubic(randG, randH, vectorFract.x),
          vectorFract.y
        ),
        vectorFract.z
      )

      r = o > 0 ? r * (1 - lerpABCDEFGH * octaveAmplitude / octaveScale) : lerpABCDEFGH
      // r = o > 0 ? r + (1 - lerpABCDEFGH * octaveAmplitude / octaveScale) / o : lerpABCDEFGH
      // r.push(lerpABCDEFGH * octaveAmplitude / octaveScale)
    }

    // return lerpABCDEFGH
    return r
    // let avarageResult = r.reduce((a, b) => {
    //   return a + b
    // }, 0)
    // avarageResult /= this.perlin_octaves
    // return avarageResult
  }

  setPerlinNoiseDetail(lod, falloff) {
    if (lod > 0) {
      this.perlin_octaves = lod
    }
    if (falloff > 0) {
      this.perlin_amp_falloff = falloff
    }
  }

  // // Draft
  // // u est la valeur d'interpolation entre le bruit de perlin et la forme de voronoi
  // getVoronoise(x, y, z, u, v) {
  //   x = utils.isValidNoiseInput(x) ? x : this.random()
  //   y = utils.isValidNoiseInput(y) ? y : 0
  //   z = utils.isValidNoiseInput(z) ? z : 0

  //   u = u ? u : 0.5
  //   v = v ? v : 0.5

  //   const p = Math.floor(x)
  //   const f = utils.fract(x)

  //   const k = 1.0 + 63.0 * Math.pow(1.0-v, 4.0)
  //   const va = 0.0
  //   const wt = 0.0
  //   for(let j=-2; j<=2; j++) {
  //     for(let i=-2; i<=2; i++) {
  //         // const g = new vectors.Vect2(Number(i), Number(j));
  //         const g = new vectors.Vect2(i, j)
  //         const o = new vectors.Vect3(u,u,1.0).dot(hash3( p + g ))
  //         const r = g.sub(f).add(o)
  //         const d = r.dot(r)
  //         const w = Math.pow(1.0 - utils.smoothStep(0.0, 1.414, Math.sqrt(d)), k)
  //         va += w*o.z
  //         wt += w
  //     }
  //   }

  //   return va/wt
  // }

  // setVoronoiseDetail() {

  // }

  setNoiseSeed(seed) {
    this.seed = seed

    seed = utils.normalizeSeed(seed, this.lcg.m)
    this.computedSeed = this.lcg.z = utils.computeSeed(seed)

    this.noise = new Array(this.NOISE_SIZE + 1)
    for (var i = 0; i < this.NOISE_SIZE + 1; i++) {

      this.lcg.z = (this.lcg.a * this.lcg.z + this.lcg.c) % this.lcg.m
      // define the recurrence relationship
      // return a float in [0, 1)
      // if this.lcg.z = m then this.lcg.z / m = 0 therefore (this.lcg.z % m) / m < 1 always
      this.noise[i] = this.lcg.z / this.lcg.m
    }
  }

  getNoiseSeed() {
    return this.seed
  }

}
export default NoiseGenerator

