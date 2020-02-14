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

function isValidNoiseInput(input) {
  if (isNaN(input) || typeof input === 'undefined' || input === null) {
    return false;
  }

  return true;
}

function getRandomSeed() {
  return Math.round(Math.random() * 9999);
}

function normalizeSeed(seed, m) {
  if (seed == null || seed == '') {
    return getRandomSeed() * m;
  }

  if (typeof seed != 'number') {
    seed = Number(seed.split('').map(function (_char) {
      return _char.charCodeAt(0);
    }).join(''));
  }

  return seed;
}

function computeSeed(seed) {
  // pick a random seed if seed is undefined or null
  // the >>> 0 casts the seed to an unsigned 32-bit integer
  return seed >>> 0;
}

function makePositive(input) {
  return input < 0 ? -input : input;
}

function fract(input) {
  input = this.makePositive(input);
  var integer = Math.floor(input);
  var decimal = input - integer;
  return decimal;
} // When x is 1, b is returned
// Linear interpolation is the fastest but has most jagged output


function interpolateLinear(a, b, x) {
  return a * (1 - x) + b * x;
}

function interpolateCubic(a, b, x) {
  return a * (1 - smoothStep(x)) + b * smoothStep(x);
} // function interpolateCubic(v0, v1, v2, v3, x) {
//     const p = (v3 - v2) - (v0 - v1);
//     const q = (v0 - v1) - p;
//     const r = v2 - v0;
//     const s = v1;
//     return p * x * x * x + q * x * x + r * x + s;
// }
// Slightly slower than linear interpolation but much smoother


function interpolateCosine(a, b, x) {
  var ft = x * Math.PI;
  var f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
}

function smoothStep(f) {
  return f * f * (3.0 - 2.0 * f);
}

function scaled_cosine(i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

var utils = {
  isValidNoiseInput: isValidNoiseInput,
  normalizeSeed: normalizeSeed,
  getRandomSeed: getRandomSeed,
  computeSeed: computeSeed,
  makePositive: makePositive,
  fract: fract,
  interpolateLinear: interpolateLinear,
  interpolateCubic: interpolateCubic,
  interpolateCosine: interpolateCosine,
  smoothStep: smoothStep,
  scaled_cosine: scaled_cosine
};

var FbmLayer = function FbmLayer(props) {
  _classCallCheck(this, FbmLayer);

  this.type = props.type;
  this.fuction = props["function"];
};

var Vect2 =
/*#__PURE__*/
function () {
  function Vect2(x, y) {
    _classCallCheck(this, Vect2);

    this.x = x;
    this.y = y;
    this.magnitude = null;
    this.heading = null;
  }

  _createClass(Vect2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "add",
    value: function add(otherVector) {
      this.x += otherVector.x;
      this.y += otherVector.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(otherVector) {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      return this;
    }
  }, {
    key: "mult",
    value: function mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
      return this;
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.atan(this.y, this.x);
    }
  }, {
    key: "distance",
    value: function distance(otherVector) {
      return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2));
    }
  }, {
    key: "dot",
    value: function dot(otherVector) {
      // const degAngle = 
      // const radAngle = Math.PI / 180 / degAngle
      // const radAngle = Math.atan(y/x)
      // return Math.sqrt(Math.pow(vect1.x, 2) + Math.pow(vect1.y, 2)) * Math.sqrt(Math.pow(vect2.x, 2) + Math.pow(vect2.y, 2)) * Math.cos(radAngle)
      return this.x * otherVector.x + this.y * otherVector.y;
    }
  }, {
    key: "copy",
    get: function get() {
      return Object.assign({}, this);
    }
  }, {
    key: "integer",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var integerX = Math.floor(posX);
      var integerY = Math.floor(posY);
      return new Vect2(integerX, integerY);
    }
  }, {
    key: "fract",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var decimalX = posX - Math.floor(posX);
      var decimalY = posY - Math.floor(posY);
      return new Vect2(decimalX, decimalY);
    }
  }, {
    key: "setMagnitude",
    set: function set(mag) {
      this.magnitude = mag;
    }
  }, {
    key: "setHeading",
    set: function set(head) {
      this.heading = head;
    }
  }], [{
    key: "add",
    value: function add(vector1, vector2) {
      return new Vect2(vector1.x + vector2.x, vector1.y + vector2.y);
    }
  }, {
    key: "sub",
    value: function sub(vector1, vector2) {
      return new Vect2(vector1.x - vector2.x, vector1.y - vector2.y);
    }
  }, {
    key: "mult",
    value: function mult(vector, scalar) {
      return new Vect2(vector.x * scalar, vector.y * scalar);
    }
  }, {
    key: "div",
    value: function div(vector, scalar) {
      return new Vect2(vector.x / scalar, vector.y / scalar);
    }
  }, {
    key: "magnitude",
    value: function magnitude(vector) {
      return Math.atan(vector.y, vector.x);
    }
  }, {
    key: "distance",
    value: function distance(vector1, vector2) {
      return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2));
    }
  }, {
    key: "dot",
    value: function dot(vector1, vector2) {
      return vector1.x * vector2.x + vector1.y * vector2.y;
    }
  }]);

  return Vect2;
}();

var Vect3 =
/*#__PURE__*/
function () {
  function Vect3(x, y, z) {
    _classCallCheck(this, Vect3);

    this.x = x;
    this.y = y;
    this.z = z;
    this.magnitude = null;
    this.heading = null;
  }

  _createClass(Vect3, [{
    key: "copy",
    value: function copy(x, y) {
      return Object.assign({}, this);
    }
  }, {
    key: "set",
    value: function set(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }, {
    key: "add",
    value: function add(otherVector) {
      this.x += otherVector.x;
      this.y += otherVector.y;
      this.z += otherVector.z;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(otherVector) {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      this.z -= otherVector.z;
      return this;
    }
  }, {
    key: "mult",
    value: function mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
      this.z /= scalar;
      return this;
    }
  }, {
    key: "distance",
    value: function distance(otherVector) {
      return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2) + Math.pow(otherVector.z - this.z, 2));
    }
  }, {
    key: "dot",
    value: function dot(otherVector) {
      return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
    }
  }, {
    key: "integer",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var posZ = this.z < 0 ? -this.z : this.z;
      var integerX = Math.floor(posX);
      var integerY = Math.floor(posY);
      var integerZ = Math.floor(posZ);
      return new Vect3(integerX, integerY, integerZ);
    }
  }, {
    key: "fract",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var posZ = this.z < 0 ? -this.z : this.z;
      var decimalX = posX - Math.floor(posX);
      var decimalY = posY - Math.floor(posY);
      var decimalZ = posZ - Math.floor(posZ);
      return new Vect3(decimalX, decimalY, decimalZ);
    }
  }, {
    key: "setMagnitude",
    set: function set(mag) {
      this.magnitude = mag;
    }
  }, {
    key: "setHeading",
    set: function set(head) {
      this.heading = head;
    }
  }], [{
    key: "add",
    value: function add(vector1, vector2) {
      return new Vect3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    }
  }, {
    key: "sub",
    value: function sub(vector1, vector2) {
      return new Vect3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    }
  }, {
    key: "mult",
    value: function mult(vector, scalar) {
      return new Vect3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
    }
  }, {
    key: "div",
    value: function div(vector, scalar) {
      return new Vect3(vector.x / scalar, vector.y / scalar, vector.z / scalar);
    }
  }, {
    key: "distance",
    value: function distance(vector1, vector2) {
      return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2));
    }
  }, {
    key: "dot",
    value: function dot(vector1, vector2) {
      return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }
  }]);

  return Vect3;
}();

var Vect4 =
/*#__PURE__*/
function () {
  function Vect4(x, y, z, w) {
    _classCallCheck(this, Vect4);

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.magnitude = null;
    this.heading = null;
  }

  _createClass(Vect4, [{
    key: "copy",
    value: function copy(x, y) {
      return Object.assign({}, this);
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
  }, {
    key: "add",
    value: function add(otherVector) {
      this.x += otherVector.x;
      this.y += otherVector.y;
      this.z += otherVector.z;
      this.w += otherVector.w;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(otherVector) {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      this.z -= otherVector.z;
      this.w -= otherVector.w;
      return this;
    }
  }, {
    key: "mult",
    value: function mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;
      return this;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
      this.z /= scalar;
      this.w /= scalar;
      return this;
    }
  }, {
    key: "distance",
    value: function distance(otherVector) {
      return Math.sqrt(Math.pow(otherVector.x - this.x, 2) + Math.pow(otherVector.y - this.y, 2) + Math.pow(otherVector.z - this.z, 2) + Math.pow(otherVector.w - this.w, 2));
    }
  }, {
    key: "dot",
    value: function dot(otherVector) {
      return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z + this.w * otherVector.w;
    }
  }, {
    key: "integer",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var posZ = this.z < 0 ? -this.z : this.z;
      var posW = this.w < 0 ? -this.w : this.w;
      var integerX = Math.floor(posX);
      var integerY = Math.floor(posY);
      var integerZ = Math.floor(posZ);
      var integerW = Math.floor(posW);
      return new Vect3(integerX, integerY, integerZ, integerW);
    }
  }, {
    key: "fract",
    get: function get() {
      var posX = this.x < 0 ? -this.x : this.x;
      var posY = this.y < 0 ? -this.y : this.y;
      var posZ = this.z < 0 ? -this.z : this.z;
      var posW = this.w < 0 ? -this.w : this.w;
      var decimalX = posX - Math.floor(posX);
      var decimalY = posY - Math.floor(posY);
      var decimalZ = posZ - Math.floor(posZ);
      var decimalW = posW - Math.floor(posW);
      return new Vect3(decimalX, decimalY, decimalZ, decimalW);
    }
  }, {
    key: "setMagnitude",
    set: function set(mag) {
      this.magnitude = mag;
    }
  }, {
    key: "setHeading",
    set: function set(head) {
      this.heading = head;
    }
  }], [{
    key: "add",
    value: function add(vector1, vector2) {
      return new Vect4(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z, vector1.w + vector2.w);
    }
  }, {
    key: "sub",
    value: function sub(vector1, vector2) {
      return new Vect4(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z, vector1.w - vector2.w);
    }
  }, {
    key: "mult",
    value: function mult(vector, scalar) {
      return new Vect4(vector.x * scalar, vector.y * scalar, vector.z * scalar, vector.w * scalar);
    }
  }, {
    key: "div",
    value: function div(vector, scalar) {
      return new Vect4(vector.x / scalar, vector.y / scalar, vector.z / scalar, vector.w / scalar);
    }
  }, {
    key: "distance",
    value: function distance(vector1, vector2) {
      return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2) + Math.pow(vector2.z - vector1.z, 2) + Math.pow(vector2.w - vector1.w, 2));
    }
  }, {
    key: "dot",
    value: function dot(vector1, vector2) {
      return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z + vector1.w * vector2.w;
    }
  }]);

  return Vect4;
}();

var vectors = {
  Vect2: Vect2,
  Vect3: Vect3,
  Vect4: Vect4
};

var NoiseGenerator =
/*#__PURE__*/
function () {
  function NoiseGenerator(props) {
    _classCallCheck(this, NoiseGenerator);

    // GLOBAL VARIABLES
    this.sineAmplitude = 100000.0;
    this.referenceVector = new vectors.Vect3(12.9898, 78.233, 91.93432);
    this.seed = null;
    this.computedSeed = null;
    this.noise = null; // will be initialized lazily by getNoise() or setNoiseSeed()

    this.NOISE_YWRAPB = 4;
    this.NOISE_YWRAP = 1 << this.NOISE_YWRAPB;
    this.NOISE_ZWRAPB = 8;
    this.NOISE_ZWRAP = 1 << this.NOISE_ZWRAPB;
    this.NOISE_SIZE = props && props.noiseSize ? props.noiseSize : 4095; // Linear Congruential Generator
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
    }; // FBM

    this.fbmLayers = []; // WHITE NOISE

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
    key: "getFbm",
    value: function getFbm(x, y, z) {
      x = x ? utils.normalizeSeed(x) : Math.random();
      y = y ? utils.normalizeSeed(y) : 0;
      z = z ? utils.normalizeSeed(z) : 0;
      x = utils.makePositive(x);
      y = utils.makePositive(y);
      z = utils.makePositive(z); // float fbm( in vecN x, in float H ) {    
      // float t = 0.0;
      // for( int i=0; i<numOctaves; i++ ) {
      //     float f = pow( 2.0, float(i) );
      //     float a = pow( f, -H );
      //     t += a*noise(f*x);
      // }
      // return t;
      // }
    }
  }, {
    key: "setFbmLayers",
    value: function setFbmLayers() {}
  }, {
    key: "addFbmLayer",
    value: function addFbmLayer(layerType) {
      var callback;

      if (layerType == 'white') {
        callback = this.getWhiteNoise;
      } else if (layerType == 'perlin') {
        callback = this.getPerlinNoise;
      } else {
        callback = this.random;
      }

      fbmLayers.push(new FbmLayer(layerType, function () {
      }));
    }
  }, {
    key: "editFbmLayer",
    value: function editFbmLayer() {}
  }, {
    key: "removeFbmLayer",
    value: function removeFbmLayer() {}
  }, {
    key: "resetFbmLayers",
    value: function resetFbmLayers() {}
  }, {
    key: "random",
    value: function random(x, y, z) {
      x = x ? utils.normalizeSeed(x) : Math.random();
      y = y ? utils.normalizeSeed(y) : 0;
      z = z ? utils.normalizeSeed(z) : 0;
      x = utils.makePositive(x);
      y = utils.makePositive(y);
      z = utils.makePositive(z);
      var output = utils.fract(Math.sin(x) * this.sineAmplitude * (this.computedSeed ? this.computedSeed : utils.getRandomSeed()));
      return output;
    } // dot(vector1, vector2) {
    //   return vector1.x * vector2.x + vector1.y * vector2.y
    // }
    // WHITE NOISE

  }, {
    key: "getWhiteNoise",
    value: function getWhiteNoise(x, y, z) {
      x = utils.isValidNoiseInput(x) ? x : this.random();
      y = utils.isValidNoiseInput(y) ? y : 0;
      z = utils.isValidNoiseInput(z) ? z : 0;
      return utils.fract(Math.sin(vectors.Vect3.dot(new vectors.Vect3(x, y, z), this.referenceVector)) // *43758.5453123
      * this.sineAmplitude * (this.computedSeed ? this.computedSeed : utils.getRandomSeed()));
    } // PERLIN NOISE

  }, {
    key: "getPerlinNoise",
    value: function getPerlinNoise(x, y, z) {
      x = utils.isValidNoiseInput(x) ? x : this.random();
      y = utils.isValidNoiseInput(y) ? y : 0;
      z = utils.isValidNoiseInput(z) ? z : 0; // const xi = Math.floor(x)
      // const xf = utils.fract(x)
      // const yi = Math.floor(y)
      // const yf = utils.fract(y)
      // const zi = Math.floor(z)
      // const zf = utils.fract(z)

      var r = 0; // let r = []

      for (var o = 0; o < this.perlin_octaves; o++) {
        var octaveAmplitude = o > 0 ? Math.pow(this.perlin_amp_falloff, o) : 1; // const octaveScale = o > 0 ? 1 / (o * 2) : 1
        // const octaveScale = o > 0 ? Math.pow(0.5, o) : 1

        var octaveScale = o > 0 ? Math.pow(2, o) : 1;
        var vector = new vectors.Vect3(x * octaveScale, y * octaveScale, z * octaveScale);
        var vectorInteger = vector.integer;
        var vectorFract = vector.fract; // const os = o > 0 ? Math.pow(2, o) : 1
        // console.log('os', os)
        // const octaveScale = 1

        var randA = this.getWhiteNoise(vectorInteger.x, vectorInteger.y, vectorInteger.z);
        var randB = this.getWhiteNoise(vectorInteger.x + 1, vectorInteger.y, vectorInteger.z);
        var randC = this.getWhiteNoise(vectorInteger.x, vectorInteger.y + 1, vectorInteger.z);
        var randD = this.getWhiteNoise(vectorInteger.x + 1, vectorInteger.y + 1, vectorInteger.z);
        var randE = this.getWhiteNoise(vectorInteger.x, vectorInteger.y, vectorInteger.z + 1);
        var randF = this.getWhiteNoise(vectorInteger.x + 1, vectorInteger.y, vectorInteger.z + 1);
        var randG = this.getWhiteNoise(vectorInteger.x, vectorInteger.y + 1, vectorInteger.z + 1);
        var randH = this.getWhiteNoise(vectorInteger.x + 1, vectorInteger.y + 1, vectorInteger.z + 1);
        var lerpABCDEFGH = utils.interpolateCubic(utils.interpolateCubic(utils.interpolateCubic(randA, randB, vectorFract.x), utils.interpolateCubic(randC, randD, vectorFract.x), vectorFract.y), utils.interpolateCubic(utils.interpolateCubic(randE, randF, vectorFract.x), utils.interpolateCubic(randG, randH, vectorFract.x), vectorFract.y), vectorFract.z);
        r = o > 0 ? r * (1 - lerpABCDEFGH * octaveAmplitude / octaveScale) : lerpABCDEFGH; // r = o > 0 ? r + (1 - lerpABCDEFGH * octaveAmplitude / octaveScale) / o : lerpABCDEFGH
        // r.push(lerpABCDEFGH * octaveAmplitude / octaveScale)
      } // return lerpABCDEFGH


      return r; // let avarageResult = r.reduce((a, b) => {
      //   return a + b
      // }, 0)
      // avarageResult /= this.perlin_octaves
      // return avarageResult
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
    } // // Draft
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

  }, {
    key: "setNoiseSeed",
    value: function setNoiseSeed(seed) {
      this.seed = seed;
      seed = utils.normalizeSeed(seed, this.lcg.m);
      this.computedSeed = this.lcg.z = utils.computeSeed(seed);
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
