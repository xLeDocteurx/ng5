# A noise generator inspired by the P5.js noise engine

## Features
 - SVG based
 - Light weight
 - Scalable
 - Easy to use
 - Easy to integrate with custom editor
 - Comes from [Avataaars](https://avataaars.com/)

## Installation
```
npm install ng5 --save (not on npm yet)
```

## Usage

- Using the generator with Node :
```javascript
// Import
const NoiseGenerator = require('ng5')

// Initialize and config at the same time
const myNoiseMachine = new NoiseGenerator({
    lod: 2,
    falloff: 0.25
    seed: 'seed'
})

// Initialize and config later
const myNoiseMachine = new NoiseGenerator()
myNoiseMachine.setNoiseDetail(2, 0.25)
myNoiseMachine.setSeed('seed')

// By default the noise generator ... and a random seed !!!

// Get a 1D noise
const noise1D = myNoiseMachine.getNoise(x)

// Get a 2D noise
const noise1D = myNoiseMachine.getNoise(x,y)

// Get a 3D noise
const noise1D = myNoiseMachine.getNoise(x,y,z)
```
<!-- 
- Using the generator without Node :
```

```

- Using the generator with React :
```

```

- Using the generator with Vue.js :
```

``` -->

## Methods of the noise generator class

