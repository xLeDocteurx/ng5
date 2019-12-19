'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var NoiseGenerator =
/*#__PURE__*/
function () {
  function NoiseGenerator(props) {
    _classCallCheck(this, NoiseGenerator);

    // GLOBAL VARIABLES
    this.seed = null;
    this.computedSeed = null;
    this.noise = null; // will be initialized lazily by getNoise() or setNoiseSeed()

    this.NOISE_YWRAPB = 4;
    this.NOISE_YWRAP = 1 << this.NOISE_YWRAPB;
    this.NOISE_ZWRAPB = 8;
    this.NOISE_ZWRAP = 1 << this.NOISE_ZWRAPB;
    this.NOISE_SIZE = 4095; // Linear Congruential Generator
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
    }; // WHITE NOISE

    this.white = null; // // BROWNIAN NOISE
    // this.BROWNIAN_YWRAPB = 4
    // this.BROWNIAN_YWRAP = 1 << this.BROWNIAN_YWRAPB
    // this.BROWNIAN_ZWRAPB = 8
    // this.BROWNIAN_ZWRAP = 1 << this.BROWNIAN_ZWRAPB
    // this.BROWNIAN_SIZE = 4095
    // this.brownian = null
    // PERLIN NOISE    

    this.perlin_octaves = props && props.octaves ? props.octaves : 4; // default to medium smooth

    this.perlin_amp_falloff = props && props.falloff ? props.falloff : 0.5; // 50% reduction/octave
    // this.perlin = null // will be initialized lazily by getNoise() or setNoiseSeed()
    // CELLULAR NOISE

    if (props && props.seed) this.setNoiseSeed(props.seed);
  }

  _createClass(NoiseGenerator, [{
    key: "random",
    value: function random(x, y, z) {
      x = x ? this.normalizeSeed(x) : Math.random();
      y = y ? this.normalizeSeed(y) : 0;
      z = z ? this.normalizeSeed(z) : 0;
      x = this.makePositive(x);
      y = this.makePositive(y);
      z = this.makePositive(z);
      var output = this.fract(Math.sin(x) * 100000.0);
      return output;
    } // UTILS FUNCTIONS

  }, {
    key: "fract",
    value: function fract(input) {
      input = this.makePositive(input);
      var integer = Math.floor(input);
      var decimal = input - integer;
      return decimal;
    }
  }, {
    key: "normalizeSeed",
    value: function normalizeSeed(seed) {
      if (typeof seed != 'number') {
        seed = Number(seed.split('').map(function (_char) {
          return _char.charCodeAt(0);
        }).join(''));
      }

      return seed;
    }
  }, {
    key: "makePositive",
    value: function makePositive(input) {
      return input < 0 ? -input : input;
    }
  }, {
    key: "smoothStep",
    value: function smoothStep(f) {
      return f * f * (3.0 - 2.0 * f);
    }
  }, {
    key: "scaled_cosine",
    value: function scaled_cosine(i) {
      return 0.5 * (1.0 - Math.cos(i * Math.PI));
    } // WHITE NOISE

  }, {
    key: "getWhiteNoise",
    value: function getWhiteNoise(x, y, z) {
      x = x || Math.random();
      y = y || 0;
      z = z || 0;
      var xi = Math.floor(this.makePositive(x));
      var yi = Math.floor(this.makePositive(y));
      var zi = Math.floor(this.makePositive(z));
      var xf = this.fract(x);
      var yf = this.fract(y);
      var zf = this.fract(z);
      var rxf, ryf;

      if (this.noise == null) {
        this.noise = new Array(this.NOISE_SIZE + 1);

        for (var i = 0; i < this.NOISE_SIZE + 1; i++) {
          // this.noise[i] = this.random()
          this.noise[i] = Math.random();
        }
      }

      var r = 0;
      var n1, n2, n3;
      var of = xi + (yi << this.NOISE_YWRAPB) + (zi << this.NOISE_ZWRAPB);
      rxf = this.scaled_cosine(xf);
      ryf = this.scaled_cosine(yf);
      n1 = this.noise[of & this.NOISE_SIZE];
      n2 = this.noise[of + this.NOISE_YWRAP & this.NOISE_SIZE];
      of += this.NOISE_ZWRAP;
      n3 = this.noise[of + this.NOISE_YWRAP & this.NOISE_SIZE];
      n1 += this.scaled_cosine(zf) * (n2 - n1); // r += n1 * ampl

      r += n1;
      return r;
    }
  }, {
    key: "setWhiteNoiseSeed",
    value: function setWhiteNoiseSeed(input) {} // this.white = new Array(this.NOISE_SIZE + 1)
    // for (var i = 0; i < this.NOISE_SIZE + 1; i++) {
    //   this.white[i] = lcg.rand()
    // }
    // PERLIN NOISE

  }, {
    key: "getPerlinNoise",
    value: function getPerlinNoise(x, y, z) {
      y = y || 0;
      z = z || 0;

      if (this.noise == null) {
        this.noise = new Array(this.NOISE_SIZE + 1);

        for (var i = 0; i < this.NOISE_SIZE + 1; i++) {
          this.noise[i] = Math.random();
        }
      }

      x = this.makePositive(x);
      y = this.makePositive(y);
      z = this.makePositive(z);
      var xi = Math.floor(x),
          yi = Math.floor(y),
          zi = Math.floor(z);
      var xf = x - xi;
      var yf = y - yi;
      var zf = z - zi;
      var rxf, ryf;
      var r = 0;
      var ampl = 0.5;
      var n1, n2, n3;

      for (var o = 0; o < this.perlin_octaves; o++) {
        var of = xi + (yi << this.NOISE_YWRAPB) + (zi << this.NOISE_ZWRAPB);
        rxf = this.scaled_cosine(xf);
        ryf = this.scaled_cosine(yf);
        n1 = this.noise[of & this.NOISE_SIZE];
        n1 += rxf * (this.noise[of + 1 & this.NOISE_SIZE] - n1);
        n2 = this.noise[of + this.NOISE_YWRAP & this.NOISE_SIZE];
        n2 += rxf * (this.noise[of + this.NOISE_YWRAP + 1 & this.NOISE_SIZE] - n2);
        n1 += ryf * (n2 - n1);
        of += this.NOISE_ZWRAP;
        n2 = this.noise[of & this.NOISE_SIZE];
        n2 += rxf * (this.noise[of + 1 & this.NOISE_SIZE] - n2);
        n3 = this.noise[of + this.NOISE_YWRAP & this.NOISE_SIZE];
        n3 += rxf * (this.noise[of + this.NOISE_YWRAP + 1 & this.NOISE_SIZE] - n3);
        n2 += ryf * (n3 - n2);
        n1 += this.scaled_cosine(zf) * (n2 - n1);
        r += n1 * ampl;
        ampl *= this.perlin_amp_falloff;
        xi <<= 1;
        xf *= 2;
        yi <<= 1;
        yf *= 2;
        zi <<= 1;
        zf *= 2;

        if (xf >= 1.0) {
          xi++;
          xf--;
        }

        if (yf >= 1.0) {
          yi++;
          yf--;
        }

        if (zf >= 1.0) {
          zi++;
          zf--;
        }
      }

      return r;
    }
  }, {
    key: "setPerlinNoiseDetail",
    value: function setPerlinNoiseDetail(lod, falloff) {
      if (lod > 0) {
        this.perlin_octaves = lod;
      }

      if (falloff > 0) {
        this.perlin_amp_falloff = falloff;
      }
    }
  }, {
    key: "setNoiseSeed",
    value: function setNoiseSeed(seed) {
      this.seed = seed;
      seed = this.normalizeSeed(seed); // pick a random seed if seed is undefined or null
      // the >>> 0 casts the seed to an unsigned 32-bit integer

      this.computedSeed = this.lcg.z = (seed == null ? Math.random() * this.lcg.m : seed) >>> 0;
      this.noise = new Array(this.NOISE_SIZE + 1);

      for (var i = 0; i < this.NOISE_SIZE + 1; i++) {
        this.lcg.z = (this.lcg.a * this.lcg.z + this.lcg.c) % this.lcg.m; // define the recurrence relationship
        // return a float in [0, 1)
        // if this.lcg.z = m then this.lcg.z / m = 0 therefore (this.lcg.z % m) / m < 1 always

        this.noise[i] = this.lcg.z / this.lcg.m;
      }
    }
  }, {
    key: "getNoiseSeed",
    value: function getNoiseSeed() {
      return this.seed;
    }
  }]);

  return NoiseGenerator;
}();

// module.exports = require('./noise.js')

module.exports = NoiseGenerator;
