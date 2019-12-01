class NoiseGenerator {
  
  constructor(props) {
        
    this.PERLIN_YWRAPB = 4
    this.PERLIN_YWRAP = 1 << this.PERLIN_YWRAPB
    this.PERLIN_ZWRAPB = 8
    this.PERLIN_ZWRAP = 1 << this.PERLIN_ZWRAPB
    this.PERLIN_SIZE = 4095
    
    this.perlin_octaves = props && props.octaves ? props.octaves : 4 // default to medium smooth
    this.perlin_amp_falloff = props && props.falloff ? props.falloff : 0.5 // 50% reduction/octave
    
    this.perlin // will be initialized lazily by getNoise() or setNoiseSeed()

    if(props && props.seed)
      this.setNoiseSeed(props.seed)

  }

  scaled_cosine(i) {
    return 0.5 * (1.0 - Math.cos(i * Math.PI))
  }

  getNoise(x, y, z) {
    y = y || 0
    z = z || 0

    if (this.perlin == null) {
      this.perlin = new Array(this.PERLIN_SIZE + 1)
      for (var i = 0; i < this.PERLIN_SIZE + 1; i++) {
        this.perlin[i] = Math.random();
      }
    }

    if (x < 0) {
      x = -x
    }
    if (y < 0) {
      y = -y
    }
    if (z < 0) {
      z = -z
    }

    var xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z)
    var xf = x - xi
    var yf = y - yi
    var zf = z - zi
    var rxf, ryf

    var r = 0
    var ampl = 0.5

    var n1, n2, n3

    for (var o = 0; o < this.perlin_octaves; o++) {
      var of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB)

      rxf = this.scaled_cosine(xf)
      ryf = this.scaled_cosine(yf)

      n1 = this.perlin[of & this.PERLIN_SIZE]
      n1 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n1)
      n2 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE]
      n2 += rxf * (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n2)
      n1 += ryf * (n2 - n1)

      of += this.PERLIN_ZWRAP
      n2 = this.perlin[of & this.PERLIN_SIZE]
      n2 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n2)
      n3 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE]
      n3 += rxf * (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n3)
      n2 += ryf * (n3 - n2)

      n1 += this.scaled_cosine(zf) * (n2 - n1)

      r += n1 * ampl
      ampl *= this.perlin_amp_falloff
      xi <<= 1
      xf *= 2
      yi <<= 1
      yf *= 2
      zi <<= 1
      zf *= 2

      if (xf >= 1.0) {
        xi++
        xf--
      }
      if (yf >= 1.0) {
        yi++
        yf--
      }
      if (zf >= 1.0) {
        zi++
        zf--
      }
    }
    return r
  }

  setNoiseDetail(lod, falloff) {
    if (lod > 0) {
      this.perlin_octaves = lod
    }
    if (falloff > 0) {
      this.perlin_amp_falloff = falloff
    }
  }

  setNoiseSeed(seed) {
    // Linear Congruential Generator
    // Variant of a Lehman Generator
    var lcg = (function() {
      // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
      // m is basically chosen to be large (as it is the max period)
      // and for its relationships to a and c
      var m = 4294967296
      // a - 1 should be divisible by m's prime factors
      var a = 1664525
      // c and m should be co-prime
      var c = 1013904223
      var seed, z
      return {
        setSeed: function setSeed(val) {
          // pick a random seed if val is undefined or null
          // the >>> 0 casts the seed to an unsigned 32-bit integer
          z = seed = (val == null ? Math.random() * m : val) >>> 0
        },
        getSeed: function getSeed() {
          return seed
        },
        rand: function rand() {
          // define the recurrence relationship
          z = (a * z + c) % m
          // return a float in [0, 1)
          // if z = m then z / m = 0 therefore (z % m) / m < 1 always
          return z / m
        }
      }
    })()

    lcg.setSeed(seed)
    this.perlin = new Array(this.PERLIN_SIZE + 1)
    for (var i = 0; i < this.PERLIN_SIZE + 1; i++) {
      this.perlin[i] = lcg.rand()
    }
  }

}
export default NoiseGenerator

